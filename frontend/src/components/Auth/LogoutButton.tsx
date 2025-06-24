'use client';

import React from "react";
import { IoIosLogOut } from "react-icons/io";
import { useAuthStore } from "@/components/stores/AuthStore/useAuthStore"; // <-- import store

export default function LogoutButton() {
  const logout = useAuthStore((state) => state.logout); // <-- get logout action from store

  const handleLogout = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    logout(); // <-- clear Zustand state
    window.location.reload(); // Optionally reload page
  };

  return (
    <button
      onClick={handleLogout}
      className="text-lg text-gray-300 hover:opacity-80 ml-2 cursor-pointer"
    >
      <IoIosLogOut className="inline-block mr-1" />
    </button>
  );
}
