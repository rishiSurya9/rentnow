"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import dotenv from "dotenv";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { SessionProvider } from "next-auth/react"; // ✅ Import SessionProvider
import Navbar from "./components/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  dotenv.config();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <SessionProvider> {/* ✅ Wrap app with SessionProvider */}
              <Navbar />
              {children}
              <ToastContainer />
            </SessionProvider>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
