import Image from "next/image";
import Content from "./components/content";
import dotenv from 'dotenv';
export default function Home() {
  dotenv.config();
  return (
   <Content/>
  );
}
