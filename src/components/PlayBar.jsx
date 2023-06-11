import React from 'react'
import PlayerTrack from './PlayerTrack';
import Player from './Player';
import PlayerSubControls from './PlayerSubControls';
function PlayBar() {
    return (
        <div className='playbar container-1'>
            <PlayerTrack />
            <Player />
            <PlayerSubControls />
        </div >
    )
}

export default PlayBar