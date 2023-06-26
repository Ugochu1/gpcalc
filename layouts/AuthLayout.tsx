import { ReactNode } from "react";

export type LayoutProps = {
  children?: ReactNode;
};

const AuthLayout = ({ children }: LayoutProps) => {
  return (
    <div>
      <div>{children}</div>
    </div>
  );
};

export default AuthLayout;
