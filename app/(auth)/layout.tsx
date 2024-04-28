import Logo from "@/components/Logo";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center relative">
      <Logo />
      <div className="mt-12">{children}</div>
    </div>
  );
};

export default Layout;
