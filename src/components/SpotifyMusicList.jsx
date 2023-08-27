import React, { useEffect, useState, useCallback, memo } from 'react'
import SpotifyControllers from './SpotifyControllers';
import {
    TableBody, Table,
    TableRow, TableHead, TableCell
} from '@mui/material';

import { AccessTime, Pause, PlayArrow } from '@mui/icons-material';
import { Audio } from 'react-loader-spinner'
import { useDispatch, useSelector } from 'react-redux';
import { setSongPlaying, setSongSelected, setOpenSnackbar, setCheckPreview } from '../redux/reducers/spotifyReducer';
import CustomButtonWrapper from './CustomSpotifyLikeWrapper';
import { useQuery } from '@tanstack/react-query';
import songEndpoints from '../services/endpoints/song';
function SpotifyMusicList({ headerRef, headerStyle }) {
    const dispatch = useDispatch()
    // eslint-disable-next-line no-unused-vars
    const { songSelected, spotifyMusicList, gradientColor, checkPreview, initialVolume } = useSelector((state) => state.spotify)
    const [playingIconOnHover, setPlayingIconOnHover] = useState(false)
    const [data, setData] = useState(spotifyMusicList)
    const authenticationSettings = JSON.parse(localStorage.getItem('authentication'))
    const [previewURL, setPreviewURL] = useState(null)
    const MemoizedTable = memo(Table);

    function isObjectEmpty(obj) {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                return false; // Object has at least one property
            }
        }
        return true; // Object has no properties
    }

    function wait(callback, milliseconds) {
        return new Promise((resolve, reject) => {
            const startTime = Date.now();

            const interval = setInterval(() => {
                const currentTime = Date.now();
                const elapsedTime = currentTime - startTime;

                if (elapsedTime >= milliseconds) {
                    clearInterval(interval);
                    // Run the provided function
                    const result = callback()
                    return resolve(result)
                }

            }, 100); // Run every 100 milliseconds
        });
    }


    useQuery({
        queryKey: ['song', songSelected.track_id],
        enabled: checkPreview.check,
        queryFn: () => songEndpoints.getSongSelected(authenticationSettings, checkPreview.song.track_id),
        onSuccess: (data) => {
            const { preview_url } = data
            if (preview_url) {
                setPreviewURL(preview_url)
                const updateSongSelected = { ...checkPreview.song }
                if (!isObjectEmpty(updateSongSelected)) {
                    dispatch(setSongSelected(updateSongSelected))
                    dispatch(setSongPlaying(true))
                    dispatch(setOpenSnackbar(false));
                    dispatch(setCheckPreview({ song: null, check: false }))
                }

            } else {
                dispatch(setOpenSnackbar(true));
                dispatch(setCheckPreview({ song: null, check: false }))

                wait(() => {
                    const availableSongs = [...spotifyMusicList]
                    let nextSong = availableSongs.find((song) => song['#'] === checkPreview.song['#'] + 1)
                    if (nextSong) dispatch(setCheckPreview({ song: nextSong, check: true }))
                    else dispatch(setCheckPreview({ song: null, check: false }))
                }, 2000)


            }
        }
    });

    const handleHover = useCallback((index) => {
        if (!playingIconOnHover[index]) {
            setPlayingIconOnHover(prevState => ({
                ...prevState,
                [index]: true
            }));
        }
    }, [playingIconOnHover])

    const handleUnHover = useCallback((index) => {

        setPlayingIconOnHover(prevState => ({
            ...prevState,
            [index]: false
        }));

    }, [])

    const handlePlaySong = (songObj, songIdx) => {
        const _data = [...data]
        const newData = _data.map((dt, i) => {
            const d = { ...dt }
            if (d.isPlaying && i !== songIdx) d.isPlaying = false
            if (i === songIdx) d.isPlaying = true
            return d
        })
        setData([...newData])
        const updateSongSelected = { ...songObj }
        dispatch(setCheckPreview({ song: updateSongSelected, check: true }))
    }

    const handlePauseSong = (songObj, songIdx) => {
        const _data = [...data]
        const newData = _data.map((dt, i) => {
            const d = { ...dt }
            d.isPlaying = false
            return d
        })
        setData([...newData])
        dispatch(setSongPlaying(false))
    }

    useEffect(() => {
        const _data = [...spotifyMusicList]
        setData(_data)
    }, [spotifyMusicList])

    const handleAudioEnded = () => {
        console.log("stops")
    }

    const columns = [
        { id: '#', label: '#' },
        { id: 'title', label: 'Title' },
        { id: 'album', label: 'Album' },
        { id: 'added_at', label: 'Date added' },
        { id: 'spotifyLike', label: '' },
        { id: 'formatedTime', label: <AccessTime />, minWidth: 100 },
    ];

    /*useEffect(() => {
        const audioVolume = document.getElementById('audio-element-controller')
        if (audioVolume) audioVolume.volume = initialVolume
    }, [])*/


    return (
        <div className='spotify-container' style={{ color: 'white', background: `linear-gradient(180deg, ${gradientColor[1]} 0%, rgba(18, 18, 18, 1) 10%)` }}>
            <SpotifyControllers />
            <MemoizedTable
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
                                onMouseEnter={() => handleHover(index)}
                                onMouseLeave={() => handleUnHover(index)}
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
                                            }}
                                        >
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
                                                    />
                                                    : column.id === '#' &&
                                                        (row['#'] === songSelected['#'] && songSelected.isPlaying) ?
                                                        <Pause onClick={() => handlePauseSong(row, index)} />
                                                        : (
                                                            <div style={{
                                                                color: column.id === '#' &&
                                                                    songSelected['#'] === row['#'] ?
                                                                    'var(--spotify-green)' : 'inherit'
                                                            }}>
                                                                {column.id === '#' &&
                                                                    (row['#'] !== songSelected['#'] || !songSelected.isPlaying) &&
                                                                    playingIconOnHover[index] ?
                                                                    <PlayArrow onClick={() => handlePlaySong(row, index)} />
                                                                    : column.id === 'added_at' && playingIconOnHover[index] && !row.saved ?
                                                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                                            {value}
                                                                            <CustomButtonWrapper track_id={row.track_id} />
                                                                        </div>
                                                                        : column.id === 'added_at' && row.saved ?
                                                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                                                {value}
                                                                                {console.log("XD")}
                                                                                <CustomButtonWrapper track_id={row.track_id} />
                                                                            </div>
                                                                            : value}
                                                            </div>
                                                        )
                                            }
                                        </TableCell>

                                    );
                                })}
                            </TableRow>
                        );
                    })}
                </TableBody>
            </MemoizedTable>
            {previewURL &&
                <audio
                    id='audio-element-controller'
                    onEnded={() => handleAudioEnded()}
                    autoPlay key={previewURL}>
                    <source src={previewURL} type="audio/ogg" />
                </audio>}
        </div>
    )
}

export default SpotifyMusicList