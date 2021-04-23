/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { Redirect } from "react-router";
import { ConfigProvider } from "../context/config";
import { useQueryParam } from "../hooks/useQueryParam";
import { Grid, GridItem } from "../styles";
import Cart from "./Cart";
import Config from "./Config";

// TODO: create a PriceID and redirect the user to checkout?price_id=PriceID
export default function Customer() {
  const id = useQueryParam("id");
  if (!id) return <Redirect to="/" />;

  return (
    <ConfigProvider>
      <Grid css={{ gridTemplateColumns: "1fr" }}>
        <GridItem>
          <Config />
        </GridItem>
        <GridItem>
          <Cart customer={id} />
        </GridItem>
      </Grid>
    </ConfigProvider>
  );
}
