'use client';

import Link from 'next/link';
import { useIsMobile } from '../IsMobile/IsMobile';

export default function Navbar() {
    const isMobile = useIsMobile();

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
                                <li><Link href="/contact" className="hover:underline">Contact</Link></li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link href="/about" className="hover:underline">About</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>

    );
}
