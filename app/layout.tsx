import { GeistSans } from "geist/font/sans";
import Script from "next/script";
import "./globals.css";

export const metadata = {
  title: `SwiftieGPT`,
  description: `Welcome to SwiftieGPT, your go-to chatbot for all things Taylor Swift! Whether you're curious about her latest songs, looking for fun facts, or just want to chat about Tay's amazing journey, I'm here to keep you in the Swift loop. Let's talk Taylor!`,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-MFYVD97W0Z" />
      <Script id="google-analytics">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
   
            gtag('config', 'G-MFYVD97W0Z');
          `}
      </Script>
      <body>{children}</body>
    </html>
  );
}
