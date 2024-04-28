import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center relative">
      {children}
    </div>
  );
};

export default Layout;
