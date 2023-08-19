import React, { useState, useEffect } from 'react'
import {
    Avatar
} from '@mui/material';
import { useSelector } from 'react-redux';
import useImageColor from 'use-image-color'
import { useDispatch } from 'react-redux';
import { setGradientColor } from '../redux/reducers/spotifyReducer';
function SpotifyHeader() {
    const dispatch = useDispatch()
    const [gradientColor, setHeaderGradientColor] = useState("");
    const { playlistSelected } = useSelector((state) => state.spotify)
    const { id, name, owner, tracksReference, type, src } = playlistSelected

    const { colors } = useImageColor(src, { cors: true, colors: 2 })

    useEffect(() => {
        if (colors) {
            dispatch(setGradientColor(colors))
            setHeaderGradientColor(colors)
        }
    }, [dispatch, colors])

    return (
        <div id={id}
            className='header'
            style={{ background: `linear-gradient(180deg, ${gradientColor[2]} 0%, ${gradientColor[1]} 100%, ${gradientColor[0]} 100%)` }}
        >
            <Avatar
                style={{
                    height: '230px',
                    width: '230px'
                }}
                variant='square'
                src={src}
            />
            <div style={{ paddingLeft: '25px' }}>
                <p style={{ margin: 0 }}>{type.label}</p>
                <h1 style={{
                    fontSize: '65px',
                    marginBottom: '10px',
                    marginTop: '10px',
                    minWidth: '395px'
                }}>{name}</h1>
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
                        {owner} • 2021 • {tracksReference.total} {`${tracksReference.total === 1 ? 'songs' : 'song'}`}, {'testestest'}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default SpotifyHeader