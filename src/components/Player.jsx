/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { LinearProgress } from '@mui/material';
import {
    PlayCircle, SkipPrevious, SkipNext,
    Shuffle, Repeat, Pause
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { setSongPlaying, setSongSelected, setCheckPreview } from '../redux/reducers/spotifyReducer';
import MusicSliderProgress from './MusicSliderProgress';
export default function Player({ handleSliderChange }) {
    const dispatch = useDispatch()
    const { songPlaying, songSelected, spotifyMusicList } = useSelector((state) => state.spotify)
    const songTimeMax = Math.floor(songSelected.time) // dummy example 03:23
    const [songTimeProgress, setSongTimeProgress] = useState(0);
    const [songTime, setSongTime] = useState(0);
    const [songTimeParser, setSongTimeParser] = useState('00:00');
    const [timerRef, setTimerRef] = useState(null);
    const [_songSelected, _setSongSelected] = useState(songSelected)
    const prevSongSelected = useRef(null); // Store the previous songSelected value


    const jumpToNextSong = () => {
        const currentSong = { ...songSelected }
        const availableSongs = [...spotifyMusicList]
        let nextSong = availableSongs.find((song) => song['#'] === currentSong['#'] + 1)
        if (!nextSong) {
            nextSong = availableSongs.find((song) => song['#'] === 1)
            dispatch(setSongPlaying(false))
        }
        dispatch(setCheckPreview({ song: nextSong, check: true }))
    }

    const runSongTimer = () => {
        const stepper = 100 / songTimeMax;
        const timer = setInterval(() => {

            // When song ends
            setSongTime((oldTimer) => {
                if (oldTimer === songTimeMax) {
                    clearInterval(timer);
                    setTimerRef(null);
                    setSongTimeParser('00:00');
                    setSongTimeProgress(0); // Reset progress
                    jumpToNextSong()
                    return 0;
                }

                // Update song time and progress
                const _oldTimer = oldTimer + (songTimeMax - 29) === songTimeMax - 29 ? songTimeMax - 29 : oldTimer + (songTimeMax - 29)

                setSongTimeParser((oldTimeParser) => {
                    if (oldTimeParser === formatTime(songTimeMax)) {
                        jumpToNextSong()
                        return formatTime(0);
                    }
                    return formatTime(_oldTimer + 1)
                });

                setSongTimeProgress((oldProgress) => {
                    //Jump to next Song
                    if (oldProgress >= 100 || songTimeParser === formatTime(songTimeMax)) {
                        jumpToNextSong()
                        return 0
                    } else {

                        const _oldTimer = oldProgress + stepper === stepper ? ((songTimeMax - 29) * 100) / songTimeMax : oldProgress
                        //console.log(_oldTimer + stepper)
                        return _oldTimer + stepper
                    }

                });

                return oldTimer + 1;
            });
        }, 1000);
        setTimerRef(timer);
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
        const _data = [...spotifyMusicList]
        const audio = document.getElementById('audio-element-controller')
        let newData = null
        if (songSelected.isPlaying) {
            newData = _data.map((d, i) => {
                const obj = { ...d, isPlaying: false }
                return obj
            })
            if (audio) audio.pause()

        } else {
            const songIdx = songSelected['#']
            const _songIdx = _data.findIndex((d, i) => d['#'] === songIdx)
            if (_songIdx !== -1) {
                _data[_songIdx] = { ...songSelected, isPlaying: true }
            }
            newData = [..._data]
            if (audio) audio.play()
        }

        dispatch(setSongPlaying(!songSelected.isPlaying)); // Play the song
    };

    useEffect(() => {
        // useSelector takes priority
        const prevSong = prevSongSelected.current ? prevSongSelected.current['#'] : null;
        const newSong = songSelected ? songSelected['#'] : null;
        // only reset if we selected a different song to play
        if (prevSong !== newSong) {
            if (songPlaying) {
                // Reset timer progress
                clearInterval(timerRef);
                setTimerRef(null);
                setSongTimeParser('00:00');
                setSongTime(0)
                setSongTimeProgress(0);
                runSongTimer();
            }
        } else {
            if (songPlaying
                && songSelected.isPlaying
                && songTimeProgress === 0) runSongTimer();
        }

    }, [songPlaying, songSelected]);


    useEffect(() => {
        if (!songSelected.isPlaying && timerRef) {
            // Resume... continue progress timer
            clearInterval(timerRef);
        } else {
            if (timerRef) {
                runSongTimer();
            }
        }
    }, [songSelected.isPlaying]);

    useEffect(() => {
        // Store the current songSelected value in the ref
        prevSongSelected.current = songSelected;
    }, [songSelected]);

    return (
        <div>
            <div className='player-controls'>
                <Shuffle fontSize='small' style={{ color: 'var(--spotify-white)', paddingRight: '15px' }} />
                <SkipPrevious fontSize='medium' style={{ color: 'var(--spotify-white)', paddingRight: '15px' }} />

                <div onClick={() => playOrPause()}>
                    {!songSelected.isPlaying ?
                        <PlayCircle fontSize='large' style={{ color: 'var(--spotify-white)', paddingRight: '15px' }} /> :
                        <Pause fontSize='large' style={{ color: 'var(--spotify-white)', paddingRight: '15px' }} />}
                </div>
                <SkipNext fontSize='medium' style={{ color: 'var(--spotify-white)', paddingRight: '15px' }} />
                <Repeat fontSize='small' style={{ color: 'var(--spotify-white)' }} />
            </div>
            <div className='pb2'>
                <span style={{ width: '500px' }}>
                    {/*<LinearProgress color="inherit" variant="determinate" value={songTimeProgress} style={{ color: 'var(--spotify-white)' }} />*/}
                    <MusicSliderProgress
                        songTimeParser={songTimeParser}
                        songTimeMax={songTimeMax}
                        value={songTimeProgress}
                        stepper={100 / songTimeMax}
                        handleSliderChange={handleSliderChange}
                        setSongTimeProgress={setSongTimeProgress}
                        formatTime={formatTime}
                        setSongTime={setSongTime}
                    />
                </span>
            </div>

        </div>
    );
}