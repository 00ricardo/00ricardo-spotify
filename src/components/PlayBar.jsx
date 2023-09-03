import React from 'react'
import PlayerTrack from './PlayerTrack';
import Player from './Player';
import PlayerSubControls from './PlayerSubControls';
function PlayBar({ handleSliderChange }) {
    return (
        <div className='playbar container-1'>
            <PlayerTrack />
            <Player handleSliderChange={handleSliderChange} />
            <PlayerSubControls />
        </div >
    )
}

export default PlayBar