import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { useRouter } from "next/navigation";

function privateRoute() {
  const router = useRouter();
  const { currentUser } = useSelector((state) => state.user);
  return currentUser ? router.push('/Profile') : <Navigate to="/signup" />;
}

export default privateRoute;
