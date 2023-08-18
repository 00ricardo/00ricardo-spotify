import React, { useEffect, useState } from 'react'
import SpotifyControllers from './SpotifyControllers';
import {
    TableBody, Table,
    TableRow, TableHead, TableCell, Avatar
} from '@mui/material';
import { AccessTime, Pause, PlayArrow } from '@mui/icons-material';
import { Audio } from 'react-loader-spinner'
import { useDispatch, useSelector } from 'react-redux';
import { setSongPlaying, setSongSelected, setSpotifyMusicList } from '../redux/reducers/spotifyReducer';

function SpotifyMusicList({ headerRef, headerStyle }) {
    const dispatch = useDispatch()
    const { songSelected, spotifyMusicList } = useSelector((state) => state)
    const [playingIconOnHover, setPlayingIconOnHover] = useState(false)
    const [data, setData] = useState(spotifyMusicList)

    const handleHover = (index) => {
        let newObj = { ...playingIconOnHover }
        for (let key in newObj) {
            newObj[key] = false;
        }
        newObj[index] = true
        setPlayingIconOnHover({ ...newObj })
    }
    const handleUnHover = (index) => {
        let newObj = { ...playingIconOnHover }
        newObj[index] = false
        setPlayingIconOnHover({ ...newObj })
    }
    const handlePlaySong = (songObj, songIdx) => {
        const _data = [...data]
        _data.map((dt, i) => {
            const d = { ...dt }
            if (d.isPlaying && i !== songIdx) d.isPlaying = false
            if (i === songIdx) d.isPlaying = true
            return d
        })
        setData([..._data])
        dispatch(setSpotifyMusicList([..._data]))
        const updateSongSelected = { ...songObj, isPlaying: true }
        dispatch(setSongSelected(updateSongSelected))
        dispatch(setSongPlaying(true))
        console.log(updateSongSelected)
    }

    const handlePauseSong = (songObj, songIdx) => {
        const _data = [...data]
        _data.map((dt, i) => {
            const d = { ...dt }
            d.isPlaying = false
            return d
        })
        setData([..._data])
        dispatch(setSpotifyMusicList([..._data]))
        dispatch(setSongSelected({ ...songObj }))
        dispatch(setSongPlaying(false))
    }

    useEffect(() => {
        const _data = [...data]
        const completeData = _data.map((d, i) => {
            let obj = { ...d }
            obj.title =
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar
                        style={{
                            height: '40px',
                            width: '40px',
                        }}
                        variant='square'
                        src="https://upload.wikimedia.org/wikipedia/commons/3/37/Music_Of_The_Spheres_%28Album%29_2021.jpg"
                    />
                    <div style={{ paddingLeft: '20px' }}>
                        <div style={{
                            paddingBottom: '5px',
                            color: d.isPlaying ?
                                'var(--spotify-green)' :
                                'var(--spotify-white)'
                        }}>
                            {d.name}
                        </div>
                        <div style={{
                            color: d.isPlaying ? 'var(--spotify-white)' : 'var(--spotify-grey)'
                        }}>
                            Coldplay
                        </div>
                    </div>
                </div>
            return obj
        })
        setData(completeData)
        dispatch(setSpotifyMusicList(completeData))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const _data = [...spotifyMusicList]
        setData(_data)
    }, [spotifyMusicList])

    const columns = [
        { id: '#', label: '#' },
        { id: 'title', label: 'Title' },
        { id: 'plays', label: 'Plays' },
        { id: 'time', label: <AccessTime />, minWidth: 100 },
    ];

    return (
        <div className='spotify-container' style={{ color: 'white' }}>
            <SpotifyControllers />
            <Table
                stickyHeader
                style={{ paddingLeft: '23px' }}
                ref={headerRef}
            >
                <TableHead>
                    <TableRow >
                        {columns.map((column, idx) => (
                            <TableCell
                                key={idx}
                                align={column.align}
                                style={{
                                    padding: 0,
                                    minWidth: idx === 2 ? '185px' : 'auto',
                                    width: idx === 1 ? '600px' : idx === 2 ? '-webkit-fill-available' : '0px',
                                    backgroundColor: headerStyle ? 'var(--spotify-container3)' : 'transparent',
                                    color: 'var(--spotify-grey)'
                                }}
                            >
                                {column.label}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody
                    sx={{
                        '& .MuiTableRow-root:hover': {
                            backgroundColor: 'var(--spotify-container3)'
                        }
                    }}
                >
                    {data.map((row, index) => {
                        return (
                            <TableRow
                                hover
                                role="checkbox"
                                key={index}
                                onMouseEnter={() => { handleHover(index) }}
                                onMouseLeave={() => { handleUnHover(index) }}
                            >
                                {columns.map((column, idx) => {
                                    const value = row[column.id];
                                    return (
                                        <TableCell key={idx} align={column.align} style={{ color: 'white', borderBottom: 'none', width: column.id === '#' ? '25px' : 'inherit' }}>
                                            {column.format && typeof value === 'number'
                                                ? column.format(value)
                                                : column.id === '#' &&
                                                    (row['#'] === songSelected['#'] && songSelected.isPlaying) &&
                                                    !playingIconOnHover[index] ?
                                                    <Audio
                                                        height='20'
                                                        width='20'
                                                        color='var(--spotify-green)'
                                                        ariaLabel='audio-loading'
                                                        wrapperClass='wrapper-class'
                                                        visible={true}
                                                    /> : column.id === '#' &&
                                                        (row['#'] === songSelected['#'] && songSelected.isPlaying) ? <Pause onClick={() => handlePauseSong(row, index)} /> :
                                                        <div style={{
                                                            fontWeight: 'bold',
                                                            color: column.id === '#' &&
                                                                songSelected['#'] === row['#'] ?
                                                                'var(--spotify-green)' : 'inherit'
                                                        }}>
                                                            {column.id === '#' &&
                                                                (row['#'] !== songSelected['#'] || !songSelected.isPlaying) &&
                                                                playingIconOnHover[index]
                                                                ? <PlayArrow onClick={() => handlePlaySong(row, index)} /> :
                                                                value}
                                                        </div>
                                            }
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    )
}

export default SpotifyMusicList