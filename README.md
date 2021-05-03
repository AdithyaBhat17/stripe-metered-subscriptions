# Stripe Metered Billing

A POC to integrate Stripe metered billing to a SaaS Data Management Platform.  

https://user-images.githubusercontent.com/20818481/116705576-4fba8f80-a9ea-11eb-9ed8-f4a7bad64322.mp4  

This repository contains the source code for an example on how to integrate a SaaS product with Stripe metered billing.  

### Pre-requisites:

1. A Stripe Account
2. React.js
3. Node.js
4. (React) Stripe.js

### Setup Guide

1. **Client**
    - Login to stripe.com and turn on "Viewing test data" on the sidebar menu.
    - Go to https://dashboard.stripe.com/your_username/apikeys and copy the publishable key that starts with pk_test_
    - Paste the publishable key in `client/.env` as `REACT_APP_STRIPE_PUBLISHABLE_KEY = <paste here>`
    - Start the client development environment using `yarn start` or `npm run start`
2. **Server**
    - Go to https://dashboard.stripe.com/your_username/apikeys and copy the secret key that starts with sk_test_
    - Paste the secret key in `server/.env` as `STRIPE_KEY = <paste here>`
    - Start the server using `yarn dev` or `npm run dev`

### Steps involved in creating a stripe metered subscription

1. Create a customer on stripe using the [Customer API](https://stripe.com/docs/api/customers) when a user signs up to your application. Store this `customer_id` in the users table of your app's database. This is to ensure that you don't create duplicate customers on stripe (Stripe does not check for duplicate customers, it creates a new customer every time you add a customer with same credentials.)
2. Create a cart and calculate the total price of a purchase.
3. Create a payment method using [React Stripe.js](https://stripe.com/docs/stripe-js/react) which returns the `payment_method_id`
4. Create a Price (`price_id`) using the [Prices API](https://stripe.com/docs/api/prices) or using the Stripe dashboard (you can create a product and price on the dashboard manually).
     - Using the API, you can create both the price and the product at once using the prices API (using the product_data object)
5. Now, using the `customer_id`, `payment_method_id` and `price_id`, create a subscription for the customer.
6. (Additional step, which is not covered in this example) You can keep track of usage using your own business logic and update this usage to Stripe using their [Usage API](https://stripe.com/docs/api/usage_records)

### References

- https://stripe.com/docs/billing/subscriptions/metered
- https://stripe.com/docs/api/customers
- https://stripe.com/docs/api/prices/create?lang=node
- https://stripe.com/docs/api/subscriptions
- https://stripe.com/docs/billing/subscriptions/multiple-products
- https://stripe.com/docs/api/usage_records
