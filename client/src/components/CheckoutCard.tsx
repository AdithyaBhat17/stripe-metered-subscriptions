/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { FormEvent } from "react";
import { useQueryParam } from "../hooks/useQueryParam";
import { PrimaryButton } from "../styles";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: 'Inter, "Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

// TODO: complete the subscription process.
function createSubscription({}) {}

export default function CheckoutCard() {
  const stripe = useStripe();
  const elements = useElements();
  const cus = useQueryParam("cus");
  const id = useQueryParam("id");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const result = await stripe.createPaymentMethod({
      type: "card",

      card: elements.getElement(CardElement)!,
      billing_details: {},
    });

    if (result.error) {
      alert(result.error.message);
      return;
    }

    createSubscription({
      customerID: cus,
      paymentMethodID: result.paymentMethod.id,
      priceID: id,
    });
  };

  return (
    <form onSubmit={handleSubmit} method="POST" css={{ padding: "2rem 1rem" }}>
      <label>
        <h2>Payment Details</h2>
        <CardElement options={CARD_ELEMENT_OPTIONS} />
      </label>
      <br />
      <PrimaryButton type="submit" css={{ width: "100%" }}>
        Confirm Order
      </PrimaryButton>
    </form>
  );
}
