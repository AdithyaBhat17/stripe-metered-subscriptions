const url = "http://localhost:8080";

export async function fetcher<T>(
  endpoint: string,
  options?: HeadersInit
): Promise<T> {
  const defaultOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(url + endpoint, {
    ...defaultOptions,
    ...options,
  });

  const data: T = await response.json();

  return data;
}
