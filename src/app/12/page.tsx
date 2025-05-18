'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';

// Import images directly
import airpods from '../../../public/airpods.webp';
import mac from '../../../public/mac.webp';
import watch from '../../../public/watch.webp';
import iphone from '../../../public/iphone.webp';

const products = [
    { src: airpods, alt: 'AirPods' },
    { src: mac, alt: 'Mac' },
    { src: watch, alt: 'Watch' },
    { src: iphone, alt: 'iPhone' },
];

export default function Page() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const isFirstMount = useRef(true);
    const initialDelay = 2000;

    useEffect(() => {
        if (isFirstMount.current) {
            // On first mount, wait for initialDelay before starting
            const initialTimeout = setTimeout(() => {
                isFirstMount.current = false;
                // Start the interval after the initial delay
                const interval = setInterval(() => {
                    setCurrentIndex((prev) => (prev + 1) % products.length);
                }, 1000);
                return () => clearInterval(interval);
            }, initialDelay);

            return () => clearTimeout(initialTimeout);
        } else {
            // On subsequent mounts, start interval immediately
            const interval = setInterval(() => {
                setCurrentIndex((prev) => (prev + 1) % products.length);
            }, 1000);

            return () => clearInterval(interval);
        }
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-rose-50 to-rose-200 flex flex-col items-center justify-center">
            <div className="relative w-64 h-64">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0"
                    >
                        <Image
                            src={products[currentIndex].src}
                            alt={products[currentIndex].alt}
                            fill
                            priority
                            onLoad={() => console.log(`Loaded: ${products[currentIndex].alt}`)}
                            onError={(e) => console.error(`Error loading: ${products[currentIndex].alt}`, e)}
                            loading="eager"
                            fetchPriority="high"
                            className="object-contain"
                        />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* <p className="mt-2 text-sm text-gray-600">
                Currently showing: {products[currentIndex].alt}
            </p> */}

            <div className="mt-4">
                <svg
                    className="w-8 h-8"
                    viewBox="0 0 24 24"
                    fillRule="evenodd"
                >
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
            </div>
        </div>
    );
}
