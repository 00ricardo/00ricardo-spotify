import React from 'react'
import {
    Avatar
} from '@mui/material';
import { useSelector } from 'react-redux';
function SpotifyHeader() {
    const { playlistSelected } = useSelector((state) => state)
    const { title, author, playlistType, songsCount, timeCount, src } = playlistSelected

    return (
        <div className='header'>
            <Avatar
                style={{
                    height: '230px',
                    width: '230px'
                }}
                variant='square'
                src={src}
            />
            <div style={{ paddingLeft: '25px' }}>
                <p style={{ margin: 0 }}>{playlistType}</p>
                <h1 style={{
                    fontSize: '65px',
                    marginBottom: '10px',
                    marginTop: '10px',
                    minWidth: '395px'
                }}>{title}</h1>
                <div style={{ display: 'flex' }}>
                    <Avatar
                        style={{
                            height: '27px',
                            width: '27px'
                        }}
                        variant='circular'
                        src={src}
                    />
                    <span style={{ marginLeft: '5px' }}>
                        {author} • 2021 • {songsCount} {`${songsCount === 1 ? 'songs' : 'song'}`}, {timeCount}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default SpotifyHeader