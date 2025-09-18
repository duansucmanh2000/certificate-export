import "./globals.css";
import type { Metadata } from "next";
import { inter } from "@/lib/fonts";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "Certificate Generator",
  description: "Generate professional certificates for volunteers and charity events",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-yellow-50 flex">
          <Sidebar />
          <div className="flex-1 lg:ml-0">{children}</div>
        </div>
      </body>
    </html>
  );
}
