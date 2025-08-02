import BlurText from "@/components/BlurText";
import ColourfulText from "@/components/ui/colourful-text";
import clsx from "clsx";
import Link from "next/link";
import React from "react";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

const page = () => {
  return (
    <div className="relative w-full min-h-screen bg-white">
      {/* Dual Gradient Overlay Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
        linear-gradient(to right, rgba(229,231,235,0.8) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(229,231,235,0.8) 1px, transparent 1px),
        radial-gradient(circle 500px at 20% 80%, rgba(139,92,246,0.3), transparent),
        radial-gradient(circle 500px at 80% 20%, rgba(59,130,246,0.3), transparent)
      `,
          backgroundSize: "48px 48px, 48px 48px, 100% 100%, 100% 100%",
        }}
      />
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
          <SignedOut>
            <SignUpButton></SignUpButton>
            <SignInButton>
              <Button>Sign In</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </header>
      <div className="container py-20">
        <div className="text-3xl font-semibold text-[#131316] md:text-5xl ">
          <BlurText
            text="Hi,"
            delay={150}
            animateBy="words"
            direction="top"
            className="text-2xl"
          />
          <span className="ml-5">
            <ColourfulText text={process.env.AdminName!} />
          </span>
        </div>
        <BlurText
          text="Wellcome to the Admin Dashboard!"
          delay={350}
          animateBy="words"
          direction="top"
          className="flex items-center justify-center w-full ml-5 text-6xl text-center "
        />{" "}
      </div>
    </div>
  );
};

export default page;
