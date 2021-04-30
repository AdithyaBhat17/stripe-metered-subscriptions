export const price = {
  vm: 10,
  o365: 5,
  csp: {
    aws: 1,
    azure: 1,
    gcp: 2,
  },
};

export function totalPrice(
  vm?: string,
  o365?: string,
  csp?: keyof typeof price["csp"] | undefined
) {
  let vmCost = vm ? Number(vm) * price.vm : 0;
  let o365Cost = o365 ? Number(o365) * price.o365 : 0;
  let cspCost = !csp ? 0 : price.csp[csp];

  return {
    amount: vmCost + o365Cost,
    metered: cspCost,
  };
}
