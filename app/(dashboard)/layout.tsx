import Navbar from "@/components/Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-screen flex flex-col relative">
      <Navbar />    
      <div className="w-full">{children}</div>
    </div>
  );
};

export default Layout;
