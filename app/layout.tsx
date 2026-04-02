import type { Metadata } from "next";
import type { ReactNode } from "react";

import "./base.css";
import "./theme.css";
import "./ui.css";
import "./compendium.css";
import "./homepage.css";

export const metadata: Metadata = {
  title: "Chivalry 2 Arms Compendium",
  description:
    "A scholarly record of every blade, axe, and bludgeon in the realm.",
};

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
