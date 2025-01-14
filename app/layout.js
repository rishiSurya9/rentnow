"use client";
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { ToastContainer } from 'react-toastify';
import Navbar from "./components/header";

export default function RootLayout({ children }) {
  return (
    <Provider store={store}>
      <Navbar />
      {children}
      <ToastContainer />
    </Provider>
  );
}