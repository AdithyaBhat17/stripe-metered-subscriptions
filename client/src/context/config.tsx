import {
  ChangeEvent,
  createContext,
  ReactChild,
  useCallback,
  useContext,
  useState,
} from "react";
import { ConfigProps, PriceFactors } from "../types";

const ConfigContext = createContext<
  { [key in PriceFactors]: string | undefined }
>({
  vm: undefined,
  csp: undefined,
  users: undefined,
});

const ConfigUpdates = createContext<ConfigProps["handleConfigUpdates"]>(
  () => {}
);

export function ConfigProvider({ children }: { children: ReactChild }) {
  const value = useConfigValue();

  const { vm, users, csp, handleConfigUpdates } = value;

  console.log(vm, users, csp);

  return (
    <ConfigContext.Provider value={{ vm, users, csp }}>
      <ConfigUpdates.Provider value={handleConfigUpdates}>
        {children}
      </ConfigUpdates.Provider>
    </ConfigContext.Provider>
  );
}

function useConfigValue() {
  const [state, setState] = useState<
    { [key in PriceFactors]: string | undefined }
  >({
    vm: undefined,
    csp: undefined,
    users: undefined,
  });

  const handleConfigUpdates = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setState({
        ...state,
        [event.target.name]: event.target.value,
      });
    },
    [state]
  );

  return {
    ...state,
    handleConfigUpdates,
  };
}

export function useConfig() {
  const state = useContext(ConfigContext);
  const updateConfig = useContext(ConfigUpdates);
  if (state === undefined)
    throw new Error("Cannot use useConfig() outside <ConfigProvider />");

  return {
    ...state,
    updateConfig,
  };
}
