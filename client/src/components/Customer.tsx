/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { ChangeEvent, useMemo, useState } from "react";
import { Redirect } from "react-router";
import { useQueryParam } from "../hooks/useQueryParam";
import { FormGroup, Grid, GridItem, PrimaryButton } from "../styles";
import { CloudStorage } from "../types";
import { price, totalPrice } from "../utils/pricing";

// TODO: create a PriceID and redirect the user to checkout?price_id=PriceID
export default function Customer() {
  const [state, setState] = useState<{ [key: string]: string | undefined }>({
    vm: undefined,
    csp: undefined,
    users: undefined,
  });

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const total = useMemo(() => {
    const { vm, csp, users } = state;
    if (!vm || !csp || !users) return { amount: 0, metered: 0 };
    return totalPrice(vm, users, csp as CloudStorage);
  }, [state]);

  const id = useQueryParam("id");
  if (!id) return <Redirect to="/" />;

  return (
    <Grid>
      <GridItem>
        <form method="post">
          <h2>Configure Backup Options</h2>
          <FormGroup>
            <label htmlFor="vm">Select the number of VMs to backup.</label>
            <input
              value={state.vm}
              onChange={handleInputChange}
              required
              type="number"
              name="vm"
              id="vm"
              step="1"
              min="0"
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="users">
              Select the number of Office365 accounts to backup.
            </label>
            <input
              value={state.users}
              onChange={handleInputChange}
              required
              type="number"
              name="users"
              id="users"
              step="1"
              min="0"
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="csp">Select the Cloud Storage option</label>
            <select
              value={state.csp}
              onChange={handleInputChange}
              css={{ padding: "1rem" }}
              required
              name="csp"
              id="csp"
            >
              <option value="" disabled selected>
                Select an option
              </option>
              <option value="aws">AWS S3</option>
              <option value="azure">Microsoft Azure Blob Storage</option>
              <option value="gcp">Google Cloud Platform</option>
            </select>
          </FormGroup>
        </form>
      </GridItem>
      <GridItem>
        <h2>Order Breakdown</h2>
        <div>
          {state.vm && (
            <p css={{ display: "flex", justifyContent: "space-between" }}>
              <span>VMs</span>
              <span>
                {state.vm} x ${price.vm}
              </span>
            </p>
          )}
          {state.users && (
            <p css={{ display: "flex", justifyContent: "space-between" }}>
              <span>O365 accounts</span>
              <span>
                {state.users} x ${price.o365}
              </span>
            </p>
          )}
          {state.csp && (
            <p css={{ display: "flex", justifyContent: "space-between" }}>
              <span>Cloud Storage ({state.csp.toLocaleUpperCase()})</span>{" "}
              <span>${price.csp[state.csp as CloudStorage]} per GB</span>
            </p>
          )}
          <hr />
          <h3 css={{ display: "flex", justifyContent: "space-between" }}>
            <span css={{ lineHeight: 1.5 }}>Total</span>
            <span>
              ${total.amount} per month <br />{" "}
              <small
                css={{ marginTop: 4, fontWeight: "normal", float: "right" }}
              >
                + ${total.metered}/GB storage
              </small>
            </span>
          </h3>
        </div>
        <PrimaryButton css={{ width: "100%" }}>Checkout</PrimaryButton>
      </GridItem>
    </Grid>
  );
}
