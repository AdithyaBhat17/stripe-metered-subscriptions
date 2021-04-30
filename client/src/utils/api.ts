import { Stripe } from "@stripe/stripe-js";
import { Customer, PriceFactors } from "../types";
import { fetcher } from "./fetcher";

export async function createCustomer(
  name: string,
  email: string
): Promise<Customer> {
  return await fetcher("/create-customer", {
    method: "POST",
    body: JSON.stringify({
      email,
      name,
    }),
  });
}

export async function createPrice(
  total: number,
  meteredAmount: number,
  productMetadata?: { [key in PriceFactors]: string | undefined }
): Promise<{ id: string } | { success: false; message: string }> {
  return await fetcher("/create-price", {
    method: "POST",
    body: JSON.stringify({
      total,
      meteredAmount,
      productMetadata,
    }),
  });
}

export async function createSubscription(
  stripe: Stripe,
  customerId: string,
  paymentMethodId: string,
  priceId: string,
  metadata?: { [key: string]: any }
) {
  const data: any = await fetcher("/create-subscription", {
    method: "POST",
    body: JSON.stringify({
      customerId,
      paymentMethodId,
      priceId,
      metadata,
    }),
  });
  if (data) {
    console.log(data);
    return await handleCardSetupRequired({
      stripe,
      subscription: data,
      paymentMethodId: paymentMethodId,
      priceId: priceId,
    }).then(handlePaymentThatRequiresCustomerAction);
  }
}

async function handleCardSetupRequired({
  stripe,
  subscription,
  invoice,
  priceId,
  paymentMethodId,
}: {
  [key: string]: any;
}) {
  let setupIntent = subscription.pending_setup_intent;

  if (setupIntent && setupIntent.status === "requires_action") {
    if (stripe)
      return stripe
        .confirmCardSetup(setupIntent.client_secret, {
          payment_method: paymentMethodId,
        })
        .then((result: any) => {
          if (result.error) {
            // start code flow to handle updating the payment details
            // Display error message in your UI.
            // The card was declined (i.e. insufficient funds, card has expired, etc)
            throw result;
          } else {
            console.log("result", result);

            if (result.setupIntent.status === "succeeded") {
              // There's a risk of the customer closing the window before callback
              // execution. To handle this case, set up a webhook endpoint and
              // listen to setup_intent.succeeded.
              return {
                priceId: priceId,
                subscription: subscription,
                paymentMethodId: paymentMethodId,
                stripe,
              };
            }
          }
        });
  } else {
    return { stripe, subscription, priceId, paymentMethodId };
  }
}

async function handlePaymentThatRequiresCustomerAction({
  stripe,
  subscription,
  priceId,
  invoice,
  paymentMethodId,
}: {
  [key: string]: any;
}) {
  let paymentIntent = subscription.latest_invoice.payment_intent;

  if (!paymentIntent) return { subscription, priceId, paymentMethodId };

  if (
    paymentIntent.status === "requires_action" ||
    paymentIntent.status === "requires_payment_method"
  ) {
    return stripe
      .confirmCardPayment(paymentIntent.client_secret, {
        payment_method: paymentMethodId,
      })
      .then((result: any) => {
        if (result.error) {
          // start code flow to handle updating the payment details
          // Display error message in your UI.
          // The card was declined (i.e. insufficient funds, card has expired, etc)
          throw result;
        } else {
          if (result.paymentIntent.status === "succeeded") {
            // There's a risk of the customer closing the window before callback
            // execution. To handle this case, set up a webhook endpoint and
            // listen to invoice.paid. This webhook endpoint returns an Invoice.
            return {
              priceId: priceId,
              subscription: subscription,
              invoice: invoice,
              paymentMethodId: paymentMethodId,
            };
          }
        }
      });
  } else {
    // No customer action needed
    return { subscription, priceId, paymentMethodId };
  }
}
