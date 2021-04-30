/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { Fragment, useMemo } from "react";
import { useHistory } from "react-router";
import { useConfig } from "../context/config";
import { PrimaryButton } from "../styles";
import { CloudStorage } from "../types";
import { createPrice } from "../utils/api";
import { price, totalPrice } from "../utils/pricing";

export default function Cart({
  readOnly,
  customer,
}: {
  readOnly?: boolean;
  customer?: string;
}) {
  const { vm, csp, users } = useConfig();
  const history = useHistory();

  const total = useMemo(() => {
    if (!vm || !csp || !users) return { amount: 0, metered: 0 };
    return totalPrice(vm, users, csp as CloudStorage);
  }, [csp, users, vm]);

  const checkoutDisabled = !vm || !csp || !users;

  const checkout = async () => {
    const price = await createPrice(total.amount, total.metered, {
      vm,
      csp,
      users,
    });

    if ("id" in price && price.id) {
      history.push(`/checkout?id=${price.id}&cus=${customer}`);
    }
  };

  if (!vm && !csp && !users)
    return (
      <p css={{ textAlign: "center" }}>
        Start adding VMs / accounts to see a breakdown of pricing.
      </p>
    );

  return (
    <Fragment>
      <h2>Order Breakdown</h2>
      <div>
        {vm && (
          <p css={{ display: "flex", justifyContent: "space-between" }}>
            <span>VMs</span>
            <span>
              {vm} x ${price.vm}
            </span>
          </p>
        )}
        {users && (
          <p css={{ display: "flex", justifyContent: "space-between" }}>
            <span>O365 accounts</span>
            <span>
              {users} x ${price.o365}
            </span>
          </p>
        )}
        {csp && (
          <p css={{ display: "flex", justifyContent: "space-between" }}>
            <span>Cloud Storage ({csp.toLocaleUpperCase()})</span>{" "}
            <span>${price.csp[csp as CloudStorage]} per GB</span>
          </p>
        )}
        <hr />
        <h3 css={{ display: "flex", justifyContent: "space-between" }}>
          <span css={{ lineHeight: 1.5 }}>Total</span>
          <span>
            ${total.amount} per month <br />{" "}
            <small css={{ marginTop: 4, fontWeight: "normal", float: "right" }}>
              + ${total.metered}/GB storage
            </small>
          </span>
        </h3>
      </div>
      {!readOnly && (
        <PrimaryButton
          onClick={checkout}
          disabled={checkoutDisabled}
          css={{ textTransform: "none", fontSize: "1rem" }}
        >
          Proceed to Checkout
        </PrimaryButton>
      )}
    </Fragment>
  );
}
