import { PropsWithChildren } from "react";

export type ChildrenProps = PropsWithChildren<{}>;

export type Project = {
  id?: string;
  title: string;
  description: string;
  stack: string[];
  link: string;
};