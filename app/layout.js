"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import dotenv from "dotenv";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";


// import privateRoute from "./components/privateRoute";

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
            <Navbar />
            {children}
            <ToastContainer />
           
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
