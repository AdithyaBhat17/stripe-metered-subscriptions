import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Redirect } from "react-router";
import { useConfig } from "../context/config";
import { useQueryParam } from "../hooks/useQueryParam";
import { Grid, GridItem } from "../styles";
import Cart from "./Cart";
import CheckoutCard from "./CheckoutCard";

export default function Checkout() {
  const id = useQueryParam("id");

  const { vm } = useConfig();

  if (!id || !vm) return <Redirect to="/" />;

  return (
    <Grid>
      <GridItem>
        <Cart readOnly />
      </GridItem>
      <GridItem>
        <Elements
          stripe={loadStripe(
            process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || ""
          )}
        >
          <CheckoutCard />
        </Elements>
      </GridItem>
    </Grid>
  );
}
