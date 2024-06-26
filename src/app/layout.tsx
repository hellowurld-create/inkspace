import NavBar from "@/components/NavBar";
import Providers from "@/components/Providers";
import {Toaster} from "@/components/ui/toaster";
import { cn, constructMetadata } from "@/lib/utils";
import { Montserrat } from "next/font/google";
import "./globals.css";

import 'react-loading-skeleton/dist/skeleton.css';
import 'simplebar-react/dist/simplebar.min.css'

const montserrat = Montserrat({
  subsets:["cyrillic"]
});

export const metadata = constructMetadata()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <Providers>
      <body className={cn(
        'min-h-screen font-sans antialiased grainy',
        montserrat.className
      )}>
        <NavBar/>
          {children}
          <Toaster/>
        </body>
        </Providers>
    </html>
  );
}
