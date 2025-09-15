// app/layout.tsx (Server Component)
import type { Metadata } from "next";
import "./globals.css";
import SupabaseProvider from "./components/SupabaseProvider"; // Client component

export const metadata: Metadata = {
  title: "Quiet Blocks App",
  description: "Create and manage quiet-study time blocks",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SupabaseProvider>{children}</SupabaseProvider>
      </body>
    </html>
  );
}
