import { type Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { urbanist } from "@/utils/fonts";
import { ThemeProvider } from "@/components/theme-provider";
import clsx from "clsx";
import Link from "next/link";
import React from "react";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ToggleMood";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description:
    "Admin Dashboard for managing the application provided by Syenxa Tech",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${urbanist.className} font-sans`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <header className="relative flex items-center h-16 gap-4 p-4 justify-evenly">
              <nav>
                <ul
                  className={clsx(
                    "flex gap-5 text-sm sm:text-base font-semibold ",
                    "[&>li]:hover:text-primary"
                  )}
                >
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  <li>
                    <Link href="/admin">Dashboard</Link>
                  </li>
                </ul>
              </nav>
              <div className="flex items-center gap-2 font-semibold cursor-pointer login-btns">
                <ModeToggle />
                <SignedOut>
                  <SignInButton>
                    <Button>Sign In</Button>
                  </SignInButton>
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </div>
            </header>
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
