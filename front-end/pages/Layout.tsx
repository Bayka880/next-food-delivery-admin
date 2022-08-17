import React from "react";
import Navbar from "../components/navbar";
export default function Layout({ children }: any) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}
