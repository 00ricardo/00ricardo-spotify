import React, { useEffect } from 'react'
import SpotifyControllers from './SpotifyControllers';

import { useDispatch, useSelector } from 'react-redux';
import { setSongPlaying, setSongSelected, setOpenSnackbar, setCheckPreview, setSpotifyMusicList } from '../redux/reducers/spotifyReducer';
import { useQuery } from '@tanstack/react-query';
import songEndpoints from '../services/endpoints/song';
import DataGridMusic from './DataGridMusic';
import { g_spotifyMusicList, previewURL } from '../signals';
function SpotifyMusicList({ audioRef }) {
    const dispatch = useDispatch()
    const { songSelected, spotifyMusicList, gradientColor, checkPreview } = useSelector((state) => state.spotify)
    const authenticationSettings = JSON.parse(localStorage.getItem('authentication'))

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

    const handlePauseSong = () => {
        const newData = g_spotifyMusicList.value.map((dt, i) => {
            const d = { ...dt }
            d.isPlaying = false
            return d
        })
        dispatch(setSpotifyMusicList(newData))
    }

    useQuery({
        queryKey: ['song', songSelected.track_id],
        enabled: checkPreview.check,
        queryFn: () => songEndpoints.getSongSelected(authenticationSettings, checkPreview.song.track_id),
        onSuccess: (data) => {
            const { preview_url } = data
            if (preview_url) {
                previewURL.value = preview_url
                const updateSongSelected = { ...checkPreview.song }
                if (!isObjectEmpty(updateSongSelected)) {
                    handlePauseSong()
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

    useEffect(() => {
        const _data = [...spotifyMusicList]
        const temp = _data.map((d) => {
            const obj = { ...d }
            obj.id = d['#']
            return obj

        })
        console.log(temp)
        g_spotifyMusicList.value = temp
    }, [spotifyMusicList])

    const handleAudioEnded = () => {
        console.log("stops")
    }

    return (
        <div className='spotify-container' style={{ color: 'white', background: `linear-gradient(180deg, ${gradientColor[1]} 0%, rgba(18, 18, 18, 1) 10%)` }}>
            <SpotifyControllers />
            <DataGridMusic />
            {previewURL.value &&
                <audio
                    ref={audioRef}
                    controls
                    id='audio-element-controller'
                    onEnded={() => handleAudioEnded()}
                    autoPlay key={previewURL.value}>
                    <source src={previewURL.value} type="audio/ogg" />
                </audio>}
        </div>
    )
}

export default SpotifyMusicList