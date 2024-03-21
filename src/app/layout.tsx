import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/providers/AuthProvider";
import { getServerSession } from "next-auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Instagram Clone",
  description: "Generated by create next app",
  icons: {
    icon: ["https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png"]
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>)
{
  const session = await getServerSession()
  return (
    <html lang="en">
      <AuthProvider session={session}>
        <body className={inter.className}>{children}</body>
      </AuthProvider>
    </html>
  );
}
