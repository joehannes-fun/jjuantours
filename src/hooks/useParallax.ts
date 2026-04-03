import { useEffect, useState } from 'react';

const useParallax = (scrollSpeed = 0.5) => {
    const [offset, setOffset] = useState(0);

    const handleScroll = () => {
        const newOffset = window.pageYOffset * scrollSpeed;
        setOffset(newOffset);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return offset;
};

export default useParallax;