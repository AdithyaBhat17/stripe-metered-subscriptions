/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";

import { FormEvent } from "react";
import { useHistory } from "react-router-dom";
import { FormGroup, PrimaryButton, UserDetails } from "../styles";
import { Customer, UserForm } from "../types";
import { fetcher } from "../utils/fetcher";
async function createCustomer(name: string, email: string): Promise<Customer> {
  return await fetcher("/create-customer", {
    method: "POST",
    body: JSON.stringify({
      email,
      name,
    }),
  });
}

function App() {
  const history = useHistory();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const customer = await createCustomer(
      (event.target as typeof event.target & UserForm).name.value,
      (event.target as typeof event.target & UserForm).email.value
    );

    if (customer.id) history.push(`/customer?id=${customer.id}`);
  }

  return (
    <div
      css={{
        padding: "1rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <UserDetails method="POST" onSubmit={handleSubmit}>
        <h1
          css={css`
            text-align: center;
            font-weight: bolder;
          `}
        >
          DMP
        </h1>
        <FormGroup>
          <label htmlFor="name">Name</label>
          <input type="text" required aria-required name="name" id="name" />
        </FormGroup>
        <FormGroup>
          <label htmlFor="email">Email</label>
          <input type="email" required aria-required name="email" id="email" />
        </FormGroup>
        <FormGroup>
          <PrimaryButton css={{ width: "100%" }} type="submit">
            Get started
          </PrimaryButton>
        </FormGroup>
      </UserDetails>
    </div>
  );
}

export default App;
