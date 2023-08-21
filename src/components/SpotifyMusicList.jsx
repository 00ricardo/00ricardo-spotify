import React, { useEffect, useState } from 'react'
import SpotifyControllers from './SpotifyControllers';
import {
    TableBody, Table,
    TableRow, TableHead, TableCell
} from '@mui/material';
import { AccessTime, Pause, PlayArrow } from '@mui/icons-material';
import { Audio } from 'react-loader-spinner'
import { useDispatch, useSelector } from 'react-redux';
import { setSongPlaying, setSongSelected, setSpotifyMusicList } from '../redux/reducers/spotifyReducer';
import CustomButtonWrapper from './CustomSpotifyLikeWrapper';

function SpotifyMusicList({ headerRef, headerStyle }) {
    const dispatch = useDispatch()
    const { songSelected, spotifyMusicList, gradientColor } = useSelector((state) => state.spotify)
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
        const newData = _data.map((dt, i) => {
            const d = { ...dt }
            if (d.isPlaying && i !== songIdx) d.isPlaying = false
            if (i === songIdx) d.isPlaying = true
            return d
        })
        setData([...newData])
        dispatch(setSpotifyMusicList([...newData]))
        const updateSongSelected = { ...songObj, isPlaying: true }
        dispatch(setSongSelected(updateSongSelected))
        dispatch(setSongPlaying(true))
        console.log(updateSongSelected)
    }

    const handlePauseSong = (songObj, songIdx) => {
        const _data = [...data]
        const newData = _data.map((dt, i) => {
            const d = { ...dt }
            d.isPlaying = false
            return d
        })
        setData([...newData])
        dispatch(setSpotifyMusicList([...newData]))
        const updateSongSelected = { ...songObj, isPlaying: false }
        dispatch(setSongSelected(updateSongSelected))
        dispatch(setSongPlaying(false))
    }

    useEffect(() => {
        const _data = [...spotifyMusicList]
        setData(_data)
    }, [spotifyMusicList])

    const columns = [
        { id: '#', label: '#' },
        { id: 'title', label: 'Title' },
        { id: 'album', label: 'Album' },
        { id: 'added_at', label: 'Date added' },
        { id: 'spotifyLike', label: '' },
        { id: 'formatedTime', label: <AccessTime />, minWidth: 100 },
    ];

    return (
        <div className='spotify-container' style={{ color: 'white', background: `linear-gradient(180deg, ${gradientColor[1]} 0%, rgba(18, 18, 18, 1) 10%)` }}>
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
                                    padding: '5px',
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
                            backgroundColor: '#8584846e'
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
                                        <TableCell key={idx} align={column.align}
                                            style={{
                                                padding: '5px',
                                                color: 'var(--spotify-grey)',
                                                borderBottom: 'none',
                                                width: column.id === '#' ? '25px' : 'inherit'
                                            }}>
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
                                                            //fontWeight: 'bold',
                                                            color: column.id === '#' &&
                                                                songSelected['#'] === row['#'] ?
                                                                'var(--spotify-green)' : 'inherit'
                                                        }}>
                                                            {column.id === '#' &&
                                                                (row['#'] !== songSelected['#'] || !songSelected.isPlaying) &&
                                                                playingIconOnHover[index]
                                                                ? <PlayArrow onClick={() => handlePlaySong(row, index)} /> :
                                                                column.id === 'added_at' && playingIconOnHover[index] && !row.saved ?
                                                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                                        {value}
                                                                        <CustomButtonWrapper track_id={row.track_id} />
                                                                    </div> :
                                                                    column.id === 'added_at' && row.saved ?
                                                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                                            {value}
                                                                            <CustomButtonWrapper track_id={row.track_id} />
                                                                        </div>
                                                                        : value}



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