
import React, { PropsWithChildren } from "react";

type ChildrenProps = PropsWithChildren<{}>;
export const Container = ({ children }: ChildrenProps) => (
  <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
);