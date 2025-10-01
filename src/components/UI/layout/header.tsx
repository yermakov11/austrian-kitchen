"use client";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@heroui/react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site.config";
import { layoutConfig } from "@/config/layout.config";
import RegistrationModal from "../modals/registration.modal";
import LoginModal from "../modals/login.modal";
import { useState } from "react";
import { signOut } from "next-auth/react";
import { useAuthStore } from "@/store/auth.store";

export const Logo = () => {
  return (
    <Image
      src="/logo.png"
      alt="austrian kitchen"
      width={69}
      height={70}
      priority
    />
  );
};

export default function Header() {
  const pathname = usePathname();
  const [isRegistrationOpen, setRegistrationOpen] = useState<boolean>(false);
  const [isLoginOpen, setLoginOpen] = useState<boolean>(false);
  const { isAuth, session, status, setAuthState } = useAuthStore();

  const handleSignOut = async () => {
    try {
      await signOut({ callbackUrl: "/" });
    } catch (error) {
      console.log("error", error);
    }
    setAuthState("unauthenticated", null);
  };

  const getNavItems = () => {
    return siteConfig.navItems.filter((item) => {
      if (item.href === "/ingredients") {
        return isAuth;
      }
      return true;
    });
  };

  return (
    <Navbar
      className="bg-black text-white"
      style={{ height: layoutConfig.headerHeight }}
    >
      <NavbarBrand>
        <Link href="/" className="flex items-center gap-2">
          <Logo />
          <span className="font-bold text-inherit">{siteConfig.title}</span>
        </Link>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {getNavItems().map((item) => {
          const isActive = pathname === item.href;
          return (
            <NavbarItem key={item.href}>
              <Link
                href={item.href}
                className={`px-3 py-1 
                  ${isActive ? "text-red-500" : "text-white"} 
                  hover:text-red-300 hover:border 
                  hover:border-red-300 hover:rounded-md 
                  transition-colors transition-border duration-200`}
              >
                {item.labels}
              </Link>
            </NavbarItem>
          );
        })}
      </NavbarContent>

      <NavbarContent justify="end">
        {isAuth && <p>Hello, {session?.user?.email}!</p>}
        {status === "loading" ? (
          <p>loading...</p>
        ) : !isAuth ? (
          <>
            <NavbarItem className="hidden lg:flex">
              <Button
                as={Link}
                color="secondary"
                href="#"
                variant="flat"
                onPress={() => setLoginOpen(true)}
              >
                Login
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button
                as={Link}
                className="text-white"
                color="primary"
                href="#"
                variant="flat"
                onPress={() => setRegistrationOpen(true)}
              >
                Sign Up
              </Button>
            </NavbarItem>
          </>
        ) : (
          <NavbarItem className="hidden lg:flex">
            <Button
              as={Link}
              color="secondary"
              href="#"
              variant="flat"
              onPress={handleSignOut}
            >
              Logout
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>

      <RegistrationModal
        isOpen={isRegistrationOpen}
        onClose={() => setRegistrationOpen(false)}
      />
      <LoginModal isOpen={isLoginOpen} onClose={() => setLoginOpen(false)} />
    </Navbar>
  );
}
