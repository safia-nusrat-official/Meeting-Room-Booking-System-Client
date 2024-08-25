import { ReactNode } from "react";

export type TUserPath = {
  name?: string;
  path?: string;
  element?: ReactNode;
  index?: boolean;
  children?: TUserPath[];
};

export type TRoute = {
  path?: string;
  element: ReactNode;
  index?: boolean;
};
export type TSidebarLink = {
  key: string;
  label: ReactNode;
  children?: (TSidebarLink|undefined)[];
};
