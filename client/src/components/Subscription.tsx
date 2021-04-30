/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { Fragment, useEffect, useState } from "react";
import { Redirect } from "react-router";
import { useQueryParam } from "../hooks/useQueryParam";
import { Grid, GridItem, Item } from "../styles";
import { Subscription } from "../types";
import { fetcher } from "../utils/fetcher";
import { price, totalPrice } from "../utils/pricing";

export async function fetchSubscription(id: string): Promise<Subscription> {
  return await fetcher("/subscription?id=" + id, {
    method: "GET",
  });
}

export default function SubscriptionDetails() {
  const id = useQueryParam("id");

  const [subscription, setSubscription] = useState<Subscription | null>(null);

  useEffect(() => {
    if (!id) return;
    fetchSubscription(id)
      .then(setSubscription)
      .catch((error) => console.error(error));
  }, [id]);

  if (!id) return <Redirect to="/" />;

  if (!subscription)
    return (
      <div css={{ margin: "50vh auto", textAlign: "center" }}>Loading...</div>
    );

  return (
    <Grid>
      <GridItem>
        <h2>Invoice for {subscription?.customer}</h2>
        {subscription ? (
          <Fragment>
            <Item>
              <span>VMs</span>
              <span>
                {subscription.metadata.vm} x ${price.vm}
              </span>
            </Item>
            <Item>
              <span>O365 Accounts</span>
              <span>
                {subscription.metadata.users} x ${price.o365}
              </span>
            </Item>
            <Item>
              <span>{subscription.metadata.csp.toLocaleUpperCase()}</span>
              <span>${price.csp[subscription.metadata.csp]} per GB</span>
            </Item>
            <hr />
            <Item as="h3">
              <span>Total amount</span>
              <span>
                $
                {Object.values(
                  totalPrice(
                    subscription.metadata.vm,
                    subscription.metadata.users,
                    subscription.metadata.csp
                  )
                ).reduce((t, c) => t + c, 0)}{" "}
                per month
              </span>
            </Item>
          </Fragment>
        ) : null}
      </GridItem>
    </Grid>
  );
}
