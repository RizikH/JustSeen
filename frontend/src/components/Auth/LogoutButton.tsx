'use client';

import React from "react";
import { IoIosLogOut } from "react-icons/io";

export default function LogoutButton() {
  const handleLogout = async () => {
    await fetch("http://localhost:8080/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    // Force reload to reset auth state
    window.location.reload();
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
