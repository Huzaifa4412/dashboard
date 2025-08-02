import { type Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { urbanist } from "@/utils/fonts";

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
      <html lang="en">
        <body className={`antialiased ${urbanist.className}`}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
