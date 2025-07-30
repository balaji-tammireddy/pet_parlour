"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Navbar() {
  const router = useRouter();
  const isAuthenticated = false; // Replace with actual auth check

  const navLinks = [
    { href: "#services", label: "Services" },
    { href: "#packages", label: "Packages" },
    { href: "#reviews", label: "Reviews" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        <Link href="/" className="text-2xl font-bold text-primary">
          The Pet Parlour
        </Link>
        <nav className="hidden md:flex space-x-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-primary">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex space-x-4">
          {isAuthenticated ? (
            <Button variant="outline" onClick={() => router.push("/dashboard")}>
              Dashboard
            </Button>
          ) : (
            <>
              <Button variant="outline" onClick={() => router.push("/register")}>
                Register
              </Button>
              <Button onClick={() => router.push("/signin")}>Sign In</Button>
            </>
          )}
        </div>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-64 p-4 flex flex-col space-y-4 bg-background"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-lg hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
              <div className="border-t border-border my-4" />
              {isAuthenticated ? (
                <Button onClick={() => router.push("/dashboard")}>Dashboard</Button>
              ) : (
                <>
                  <Button onClick={() => router.push("/register")}>Register</Button>
                  <Button variant="outline" onClick={() => router.push("/signin")}>
                    Sign In
                  </Button>
                </>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
