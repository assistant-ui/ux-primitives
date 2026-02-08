import "./globals.css";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Provider } from "./provider";

export const metadata: Metadata = {
  title: {
    template: "%s | UX Primitives",
    default: "UX Primitives — assistant-ui",
  },
  description:
    "State-aware UX patterns for assistant-ui. Drop-in components that eliminate chat UI boilerplate.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col antialiased">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
