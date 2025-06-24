'use client';

import Link from 'next/link';
import { useIsMobile } from '../IsMobile/IsMobile';
import { useAuthStore } from '@/components/stores/AuthStore/useAuthStore';
import LogoutButton from '@/components/Auth/LogoutButton';
import React, { useEffect, useState } from 'react';

export default function Navbar() {
  const isMobile = useIsMobile();
  const { user, isAuthenticated, loading } = useAuthStore();
  const [redirectPath, setRedirectPath] = useState<string | null>(null);
  const fetchUser = useAuthStore((state) => state.fetchUser);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setRedirectPath(window.location.pathname);

      if (!useAuthStore.getState().isAuthenticated) {
        fetchUser();
      }
    }
  }, []);


  return (
    <nav className="sticky top-0 left-0 w-full h-[4rem] bg-[#0C0C0C] text-white z-30 px-8 md:px-[4.5rem]">
      <div className="flex items-center justify-between h-full">
        <div className="flex items-center justify-between w-full">
          <Link href={'/'} className="text-xl">JustSeen</Link>
          <ul className="flex items-end-safe gap-6 text-xl">
            {!isMobile ? (
              <>
                <li><Link href="/" className="hover:underline">Home</Link></li>
                <li><Link href="/about" className="hover:underline">About</Link></li>
                <li>
                  <span className="text-gray-400 cursor-not-allowed">Contact</span>
                </li>
                {loading ? null : isAuthenticated ? (
                  <div className="flex items-center gap-2 ml-20">
                    <Link href="#" className="hover:underline">
                      {user?.username || 'Profile'}
                    </Link>
                    <LogoutButton />
                  </div>
                ) : (
                  redirectPath && (
                    <Link href={`/login?redirect=${encodeURIComponent(redirectPath)}`}>
                      Login
                    </Link>
                  )
                )}
              </>
            ) : (
              <div className="flex items-center">
                {isAuthenticated ? (
                  <div className="flex items-center gap-2">
                    <Link href="/profile" className="hover:underline">
                      {user?.username || 'Profile'}
                    </Link>
                    <LogoutButton />
                  </div>
                ) : (
                  redirectPath && (
                    <Link href={`/login?redirect=${encodeURIComponent(redirectPath)}`}>
                      Login
                    </Link>
                  )
                )}
              </div>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
