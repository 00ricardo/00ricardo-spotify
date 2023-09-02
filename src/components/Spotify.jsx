import React from 'react'
import SpotifyHeader from './SpotifyHeader';
import SpotifyMusicList from './SpotifyMusicList';
import SpotifyCopyright from './SpotifyCopyright';
function Spotify() {
    return (
        <div className='spotify container-1' >
            <SpotifyHeader />
            <SpotifyMusicList />
            <SpotifyCopyright />
        </div >
    )
}

export default Spotify