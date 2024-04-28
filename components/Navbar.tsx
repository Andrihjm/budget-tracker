"use client";

import Link from "next/link";
import Logo, { LogoMobile } from "./Logo";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "./ui/button";
import { UserButton } from "@clerk/nextjs";
import { ThemeSwitcherBtn } from "./ThemeSwitcherBtn";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Menu } from "lucide-react";

const Navbar = () => {
  return (
    <>
      <DesktopNavbar />
      <NavbarMobile />
    </>
  );
};

// Fiture Navbar
const items = [
  { label: "Dashboard", link: "/" },
  { label: "Transactions", link: "/transactions" },
  { label: "Manage", link: "/manage" },
];

// Navbar Mobile
const NavbarMobile = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="block border-separate bg-background md:hidden">
      <nav className="container flex items-center justify-between px-8">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant={"ghost"} size={"icon"}>
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[400px] sm:w-[540px]" side="left">
            <Logo />
            <div className="flex flex-col gap-1 mt-4">
              {items.map((item) => (
                <NavbarItems
                  key={item.label}
                  link={item.link}
                  label={item.label}
                  clickCallback={() => setIsOpen((prev) => !prev)}
                />
              ))}
            </div>
          </SheetContent>
        </Sheet>

        <div className="h-[80px] min-h-[60px] flex items-center gap-x-4">
          <LogoMobile />
        </div>
        <div className="flex items-center gap-2">
          <ThemeSwitcherBtn />
          <UserButton afterMultiSessionSingleSignOutUrl="/sign-in" />
        </div>
      </nav>
    </div>
  );
};

// Navbar Desktop
const DesktopNavbar = () => {
  return (
    <div className="hidden border-b border-separate bg-background md:block">
      <nav className="container flex items-center justify-between px-8">
        <div className="min-h-[60px] h-[80px] flex items-center gap-x-4">
          <Logo />
          <div className="h-full flex">
            {items.map((item) => (
              <NavbarItems
                key={item.label}
                link={item.link}
                label={item.label}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ThemeSwitcherBtn />
          <UserButton afterSignOutUrl="/sign-in" />
        </div>
      </nav>
    </div>
  );
};

// Functions Items Navbar
const NavbarItems = ({
  link,
  label,
  clickCallback,
}: {
  link: string;
  label: string;
  clickCallback?: () => void;
}) => {
  const pathname = usePathname();
  const isActive = pathname === link;

  return (
    <div className="relative flex items-center">
      <Link
        href={link}
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "w-full justify-start text-lg text-muted-foreground hover:text-foreground",
          isActive && "text-foreground"
        )}
        onClick={() => {
          if (clickCallback) clickCallback();
        }}
      >
        {label}
      </Link>

      {isActive && (
        <div className="absolute -bottom-[2px] left-1/2 hidden h-[2px] w-[80%] -translate-x-1/2 rounded-xl bg-foreground md:block" />
      )}
    </div>
  );
};

export default Navbar;
