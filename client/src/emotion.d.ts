import "@emotion/react";
import { theme } from ".";

type ColorKeys = "prussianBlue" | "celadonBlue" | "white";

declare module "@emotion/react" {
  export interface Theme {
    color: {
      [key in ColorKeys]: string;
    };
  }
}
