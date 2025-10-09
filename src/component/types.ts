import { PropsWithChildren } from "react";

export type ChildrenProps = PropsWithChildren<{}>;

export type Project = {
  title: string;
  description: string;
  stack: string[];
  link: string;
};