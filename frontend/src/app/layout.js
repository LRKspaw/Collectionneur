import "./globals.css";
import {Providers} from "./providers";
import Navigation from "@/components/Navigation";

export default function RootLayout({children}) {
  return (
    <html lang="en" className='dark'>
      <body>
        <Providers>
          <main className="pb-16">
          {children}
          </main>
          <Navigation/ >
        </Providers>
      </body>
    </html>
  );
}