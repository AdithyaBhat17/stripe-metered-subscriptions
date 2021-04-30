/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { FormEvent, useState } from "react";
import { useHistory } from "react-router";
import { useConfig } from "../context/config";
import { useQueryParam } from "../hooks/useQueryParam";
import { PrimaryButton } from "../styles";
import { createSubscription } from "../utils/api";

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

export default function CheckoutCard() {
  const stripe = useStripe();
  const elements = useElements();
  const cus = useQueryParam("cus");
  const id = useQueryParam("id");
  const [status, setStatus] = useState("idle");

  const { csp, users, vm } = useConfig();

  const history = useHistory();

  if (!cus || !id) return null;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    setStatus("loading");

    const result = await stripe.createPaymentMethod({
      type: "card",

      card: elements.getElement(CardElement)!,
      billing_details: {},
    });

    if (result.error) {
      alert(result.error.message);
      return;
    }

    try {
      const subscription = await createSubscription(
        stripe,
        cus,
        result.paymentMethod.id,
        id,
        {
          vm,
          csp,
          users,
        }
      );

      if (
        subscription?.subscription.id &&
        subscription?.subscription.status === "active"
      ) {
        setStatus("success");
        history.push(`/subscription?id=${subscription.subscription.id}`);
      } else {
        setStatus("error");
      }
    } catch (stripeError) {
      if (stripeError.error.message) alert(stripeError.error.message);
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} method="POST" css={{ padding: "2rem 1rem" }}>
      <label>
        <h2>Payment Details</h2>
        <CardElement
          onChange={() => {
            if (status !== "idle") setStatus("idle");
          }}
          options={CARD_ELEMENT_OPTIONS}
        />
      </label>
      <br />
      <PrimaryButton type="submit" css={{ width: "100%" }}>
        {status === "success"
          ? "Order Completed!"
          : status === "error"
          ? "Order Failed"
          : status === "loading"
          ? "Verifying order..."
          : "Confirm Order"}
      </PrimaryButton>
    </form>
  );
}
