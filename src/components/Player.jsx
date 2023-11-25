/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useCallback } from 'react';
import {
    PlayCircle, SkipPrevious, SkipNext,
    Shuffle, Repeat, Pause
} from '@mui/icons-material';
import MusicSliderProgress from './MusicSliderProgress';
import {
    songTimeProgress, songTime, songTimeParser, timerRef,
    g_songPlaying, g_songSelected, g_spotifyMusicList, g_checkPreview
} from '../signals';
import { batch } from '@preact/signals-react';

export default function Player({ handleSliderChange }) {
    const songTimeMax = Math.floor(g_songSelected.value.time) // dummy example 03:23
    const prevSongSelected = useRef(null); // Store the previous songSelected value

    const jumpToNextSong = () => {
        const currentSong = { ...g_songSelected.value }
        let nextSong = g_spotifyMusicList.value.find((song) => song['#'] === currentSong['#'] + 1)
        if (!nextSong) {
            nextSong = g_spotifyMusicList.value.find((song) => song['#'] === 1)
            g_songPlaying.value = false
        }
        g_checkPreview.value = { song: nextSong, check: true }

    }

    const runSongTimer = () => {
        const stepper = 100 / songTimeMax;
        const timer = setInterval(() => {

            // When song ends
            songTime.value = (() => {
                if (songTime.value === songTimeMax) {
                    clearInterval(timer);
                    batch(() => {
                        timerRef.value = null;
                        songTimeParser.value = '00:00';
                        songTimeProgress.value = 0; // Reset progress
                    })
                    jumpToNextSong()
                    return 0;
                }

                // Update song time and progress
                const _oldTimer = songTime.value + (songTimeMax - 29) === songTimeMax - 29 ? songTimeMax - 29 : songTime.value + (songTimeMax - 29)

                songTimeParser.value = (() => {
                    if (songTimeParser.value === formatTime(songTimeMax)) {
                        jumpToNextSong()
                        return formatTime(0);
                    }
                    return formatTime(_oldTimer + 1)
                });

                songTimeProgress.value = (() => {
                    //Jump to next Song
                    if (songTimeProgress.value >= 100 || songTimeParser === formatTime(songTimeMax)) {
                        jumpToNextSong()
                        return 0
                    } else {

                        const _oldTimer = songTimeProgress.value + stepper === stepper ? ((songTimeMax - 29) * 100) / songTimeMax : songTimeProgress.value
                        //console.log(_oldTimer + stepper)
                        return _oldTimer + stepper
                    }

                });

                return songTime.value + 1;
            });
        }, 1000);
        timerRef.value = timer;
    };
    // Format time in MM:SS format
    const formatTime = useCallback((seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(remainingSeconds).padStart(2, '0');

        return `${formattedMinutes}:${formattedSeconds}`;
    }, []);

    // Function to play or pause the song
    const playOrPause = () => {
        const _data = [...g_spotifyMusicList.value]
        const audio = document.getElementById('audio-element-controller')
        let newData = null
        if (g_songSelected.value.isPlaying) {
            newData = _data.map((d, i) => {
                const obj = { ...d, isPlaying: false }
                return obj
            })
            if (audio) audio.pause()

        } else {
            const songIdx = g_songSelected.value['#']
            const _songIdx = _data.findIndex((d, i) => d['#'] === songIdx)
            if (_songIdx !== -1) {
                _data[_songIdx] = { ...g_songSelected.value, isPlaying: true }
            }
            newData = [..._data]
            if (audio) audio.play()
        }
        g_songPlaying.value = !g_songSelected.value.isPlaying  // Play the song
    };

    useEffect(() => {
        // useSelector takes priority
        const prevSong = prevSongSelected.current ? prevSongSelected.current['#'] : null;
        const newSong = g_songSelected.value ? g_songSelected.value['#'] : null;
        // only reset if we selected a different song to play
        if (prevSong !== newSong) {
            if (g_songPlaying.value) {
                // Reset timer progress
                clearInterval(timerRef);
                batch(() => {
                    timerRef.value = null;
                    songTimeParser.value = '00:00';
                    songTime.value = 0;
                    songTimeProgress.value = 0;
                })
                runSongTimer();
            }
        } else {
            if (g_songPlaying.value
                && g_songSelected.value.isPlaying
                && songTimeProgress === 0) runSongTimer();
        }

    }, [g_songPlaying.value, g_songSelected.value]);


    useEffect(() => {
        if (!g_songSelected.value.isPlaying && timerRef) {
            // Resume... continue progress timer
            clearInterval(timerRef);
        } else {
            if (timerRef) {
                runSongTimer();
            }
        }
    }, [g_songSelected.value.isPlaying]);

    useEffect(() => {
        // Store the current songSelected value in the ref
        prevSongSelected.current = g_songSelected.value;
    }, [g_songSelected.value]);

    return (
        <div>
            <div className='player-controls'>
                <Shuffle fontSize='small' style={{ color: 'var(--spotify-white)', paddingRight: '15px' }} />
                <SkipPrevious fontSize='medium' style={{ color: 'var(--spotify-white)', paddingRight: '15px' }} />

                <div onClick={() => playOrPause()}>
                    {!g_songSelected.value.isPlaying ?
                        <PlayCircle fontSize='large' style={{ color: 'var(--spotify-white)', paddingRight: '15px' }} /> :
                        <Pause fontSize='large' style={{ color: 'var(--spotify-white)', paddingRight: '15px' }} />}
                </div>
                <SkipNext fontSize='medium' style={{ color: 'var(--spotify-white)', paddingRight: '15px' }} />
                <Repeat fontSize='small' style={{ color: 'var(--spotify-white)' }} />
            </div>
            <div className='pb2'>
                <span style={{ width: '500px' }}>
                    <MusicSliderProgress
                        songTimeMax={songTimeMax}
                        stepper={100 / songTimeMax}
                        handleSliderChange={handleSliderChange}
                        formatTime={formatTime}
                    />
                </span>
            </div>

        </div>
    );
}