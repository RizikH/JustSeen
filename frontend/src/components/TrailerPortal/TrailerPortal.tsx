'use client';

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { FaPlay } from "react-icons/fa";

interface TrailerPortalProps {
    trailerKey: string;
}

export default function TrailerPortal({ trailerKey }: TrailerPortalProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const portalRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        // Ensure client-only render
        setMounted(true);
    }, []);

    useGSAP(() => {
        if (!portalRef.current) return;

        const tl = gsap.timeline({
            paused: true,
            defaults: { duration: 0.5, ease: "power2.inOut" },
        });

        tl.fromTo(
            portalRef.current,
            { opacity: 0 },
            { opacity: 1, ease: "power2.inOut", duration: 0.7 }
        );

        if (isOpen) {
            tl.play();
        } else {
            tl.reverse();
        }

        return () => {
            tl.kill();
        };
    }, [isOpen]);

    if (!mounted) return null;

    return (
        <>
            <button
                className="inline-flex gap-1 items-center justify-centertext-white hover:text-gray-300 max-w-fit cursor-pointer"
                onClick={() => setIsOpen(true)}
            >
                <FaPlay /> Play Trailer
            </button>

            {isOpen &&
                createPortal(
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center"
                        style={{
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        }}
                        ref={portalRef}
                        onClick={() => setIsOpen(false)}
                    >
                        <div className="relative w-11/12 md:w-3/4 lg:w-2/3 h-[90%]">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-2 right-2 text-white text-2xl font-bold hover:text-red-400"
                            >
                                ✕
                            </button>
                            <iframe
                                className="w-full h-full rounded-lg shadow-xl"
                                src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=0&controls=1&rel=0&showinfo=0&modestbranding=1`}
                                title="Trailer"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    </div>,
                    document.body
                )}
        </>
    );
}
