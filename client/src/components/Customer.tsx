import { useQueryParam } from "../hooks/useQueryParam";

export default function Customer() {
  const id = useQueryParam("id");
  return <div>Customer {id}</div>;
}
