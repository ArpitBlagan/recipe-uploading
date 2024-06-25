import type { Metadata } from "next";
import "./globals.css";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { Toaster } from "react-hot-toast";
import { Provider } from "./Provider";
import { ThemeProvider } from "@/components/theme-provider";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
export const metadata: Metadata = {
  title: "Recipe Sharing App",
  description: "Share you recipe with others",
};
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased my-4 mx-8 flex flex-col gap-4",
          fontSans.variable
        )}
      >
        <Provider session={session}>
          <ThemeProvider attribute="class" defaultTheme="light">
            <Toaster />
            <Navbar />
            {children}
            <Footer />
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
