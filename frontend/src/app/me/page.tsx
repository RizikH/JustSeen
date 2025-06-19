'use client';

import React, { useEffect, useState } from "react";

type User = {
  id: string;
  email: string;
  username: string;
};

const MePage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState("Loading...");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/user/me", {
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data);
          setStatus("✅ You are logged in.");
        } else {
          setStatus("❌ Not logged in.");
        }
      } catch (err) {
        setStatus("⚠️ Failed to fetch user.");
        console.error(err);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white dark:bg-gray-800 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-gray-100">Session Info</h2>
      <p className="text-center text-gray-600 dark:text-gray-300 mb-4">{status}</p>

      {user && (
        <div className="text-sm text-gray-800 dark:text-gray-100 space-y-2">
          <p><strong>ID:</strong> {user.id}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Username:</strong> {user.username}</p>
        </div>
      )}
    </div>
  );
};

export default MePage;
