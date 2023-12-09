import React from 'react'
import SpotifyControllers from './SpotifyControllers';
import { useQuery } from '@tanstack/react-query';
import songEndpoints from '../services/endpoints/song';
import DataGridMusic from './DataGridMusic';
import { batch } from '@preact/signals-react';
import {
    g_checkPreview, g_openSnackbar, g_songPlaying,
    g_songSelected, g_spotifyMusicList, previewURL,
    g_gradientColor
} from '../signals';

function SpotifyMusicList({ audioRef }) {
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
        g_spotifyMusicList.value = newData
        localStorage.setItem('spotifyMusicList', JSON.stringify(newData))
    }

    useQuery({
        queryKey: ['song', g_songSelected.value.track_id],
        enabled: g_checkPreview.value.check,
        queryFn: () => songEndpoints.getSongSelected(authenticationSettings, g_checkPreview.value.song.track_id),
        onSuccess: (data) => {
            const { preview_url } = data
            let newData = []
            const _data = [...g_spotifyMusicList.value]
            if (preview_url) {
                previewURL.value = preview_url
                const updateSongSelected = { ...g_checkPreview.value.song, isPlaying: true }
                if (!isObjectEmpty(updateSongSelected)) {
                    handlePauseSong()
                    const songIdx = updateSongSelected['#']
                    const _songIdx = _data.findIndex((d) => d['#'] === songIdx)
                    if (_songIdx !== -1) {
                        if (g_songSelected.value['#'] !== songIdx) {
                            _data[_songIdx - 1] = { ...g_songSelected.value, isPlaying: false }
                        }
                        _data[_songIdx] = { ...updateSongSelected }
                    }
                    newData = [..._data]
                    batch(() => {
                        g_songSelected.value = updateSongSelected;
                        g_songPlaying.value = true;
                        g_openSnackbar.value = false;
                        g_spotifyMusicList.value = newData
                        g_checkPreview.value = { song: null, check: false }
                    })
                }
            } else {
                batch(() => {
                    g_openSnackbar.value = true;
                })
                wait(() => {
                    let nextSong = _data.find((song) => song['#'] === g_checkPreview.value.song['#'] + 1)
                    if (nextSong) g_checkPreview.value = { song: nextSong, check: true }
                    else g_checkPreview.value = { song: null, check: false }
                }, 2000)
            }
        }
    });

    const handleAudioEnded = () => {
        console.log("stops")
    }

    return (
        <div 
            id='audio-parent' 
            className='spotify-container' 
            style={{ color: 'white', background: `linear-gradient(180deg, ${g_gradientColor.value[1]} 0%, rgba(18, 18, 18, 1) 50%)` }}>
            <SpotifyControllers />
            <DataGridMusic />
            {previewURL.value && <audio
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