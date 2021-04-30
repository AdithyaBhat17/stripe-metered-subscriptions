/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { Redirect } from "react-router";
import { useQueryParam } from "../hooks/useQueryParam";
import { Grid, GridItem } from "../styles";
import Cart from "./Cart";
import Config from "./Config";

export default function Customer() {
  const id = useQueryParam("id");
  if (!id) return <Redirect to="/" />;

  return (
    <Grid css={{ gridTemplateColumns: "1fr" }}>
      <GridItem>
        <Config />
      </GridItem>
      <GridItem>
        <Cart customer={id} />
      </GridItem>
    </Grid>
  );
}
