import { useState, useEffect } from 'react';

// Custom hook to track screen width
export function useScreenWidth() {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        // Function to update screen width state
        const updateScreenWidth = () => {
            setScreenWidth(window.innerWidth);
        };

        // Add resize event listener
        window.addEventListener('resize', updateScreenWidth);

        // Cleanup function to remove event listener
        return () => window.removeEventListener('resize', updateScreenWidth);
    }, []); // Empty dependency array means this effect runs only on mount and unmount

    return screenWidth;
}