import { useLocation } from "react-router-dom";

export function useQueryParam(key: string) {
  const { search } = useLocation();

  const query = new URLSearchParams(search);

  return query.get(key);
}
