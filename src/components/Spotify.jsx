import React from 'react'
import SpotifyHeader from './SpotifyHeader';
import SpotifyMusicList from './SpotifyMusicList';
import SpotifyCopyright from './SpotifyCopyright';
function Spotify({ audioRef }) {
    return (
        <div className='spotify container-1' >
            <SpotifyHeader />
            <SpotifyMusicList audioRef={audioRef} />
            <SpotifyCopyright />
        </div >
    )
}

export default Spotify