import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import Layout from "./components/Layout";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${GeistMono.variable} ${GeistSans.variable} antialiased`}
      >
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
