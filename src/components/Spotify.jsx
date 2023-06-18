import React, { useState, useRef, useEffect } from 'react'
import SpotifyHeader from './SpotifyHeader';
import SpotifyMusicList from './SpotifyMusicList';
import SpotifyCopyright from './SpotifyCopyright';
function Spotify() {
    const [headerStyle, setHeaderStyle] = useState(false)
    const headerRef = useRef(null)
    const containerRef = useRef(null)

    useEffect(() => {
        const containerElement = containerRef.current;
        const tableElement = headerRef.current;
        const handleScroll = () => {
            if (containerElement && tableElement) {
                const containerRect = containerElement.getBoundingClientRect();
                const tableRect = tableElement.getBoundingClientRect();
                const isSticky = tableRect.top <= containerRect.top;
                setHeaderStyle(isSticky)
            }
        };

        const scrollListener = () => {
            handleScroll();
        };

        containerElement.addEventListener('scroll', scrollListener);
        return () => {
            containerElement.removeEventListener('scroll', scrollListener);
        };
    }, []);
    return (
        <div className='spotify container-1' ref={containerRef}>
            <SpotifyHeader />
            <SpotifyMusicList headerRef={headerRef} headerStyle={headerStyle} />
            <SpotifyCopyright />
        </div >
    )
}

export default Spotify