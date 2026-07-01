import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import WaFloat from "@/components/WaFloat";
import { CompareProvider } from "@/components/CompareProvider";
import CompareBar from "@/components/CompareBar";
import { profil } from "@/lib/data";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: `${profil.nama} — ${profil.jabatan}`,
  description:
    "Temukan hunian & properti komersial Paramount Gading Serpong. Konsultasi langsung dengan Hizkia, Inhouse Agent Paramount Land.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={`${inter.variable} h-full`}>
      <body className="flex min-h-full flex-col antialiased">
        <CompareProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <CompareBar />
          <WaFloat />
        </CompareProvider>
      </body>
    </html>
  );
}
