/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, Fragment } from 'react';
import { LinearProgress } from '@mui/material';
import {
    PlayCircle, SkipPrevious, SkipNext,
    Shuffle, Repeat, Pause
} from '@mui/icons-material';

export default function Player() {
    const [songTimeProgress, setSongTimeProgress] = useState(0);
    const [songTime, setSongTime] = useState(0);
    const [songTimeMax, setSongTimeMax] = useState(150); // dummy example 03:23
    const [songTimeParser, setSongTimeParser] = useState('00:00');
    const [playing, setPlaying] = useState(false);
    const [timerRef, setTimerRef] = useState(null);

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
                    setPlaying(false); // Automatically pause when song ends
                    return 0;
                }
                // Update song time and progress
                setSongTimeParser(formatTime(oldTimer + 1));
                setSongTimeProgress((oldProgress) => oldProgress + stepper);
                return oldTimer + 1;
            });
        }, 1000);
        setTimerRef(timer);
    };
    // Format time in MM:SS format
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(remainingSeconds).padStart(2, '0');

        return `${formattedMinutes}:${formattedSeconds}`;
    };

    // Function to play or pause the song
    const playOrPause = () => {
        if (playing) {
            clearInterval(timerRef);
            setTimerRef(null);
        } else {
            runSongTimer();
        }
        setPlaying(!playing);
    };
    // listener to handle pausing when playing state changes to false
    useEffect(() => {
        if (!playing) {
            clearInterval(timerRef);
            setTimerRef(null);
        }
    }, [playing]);

    useEffect(() => {
        runSongTimer();
        setPlaying(true);
    }, []);
    return (
        <div>
            <div className='player-controls'>
                <Shuffle fontSize='small' style={{ color: 'var(--spotify-white)', paddingRight: '15px' }} />
                <SkipPrevious fontSize='medium' style={{ color: 'var(--spotify-white)', paddingRight: '15px' }} />

                <div onClick={() => playOrPause()}>
                    {!playing ?
                        <PlayCircle fontSize='large' style={{ color: 'var(--spotify-white)', paddingRight: '15px' }} /> :
                        <Pause fontSize='large' style={{ color: 'var(--spotify-white)', paddingRight: '15px' }} />}
                </div>
                <SkipNext fontSize='medium' style={{ color: 'var(--spotify-white)', paddingRight: '15px' }} />
                <Repeat fontSize='small' style={{ color: 'var(--spotify-white)' }} />
            </div>
            <div className='pb2'>
                {songTimeParser}
                <span style={{ width: '500px', margin: '0px 10px' }}>
                    <LinearProgress color="inherit" variant="determinate" value={songTimeProgress} style={{ color: 'var(--spotify-white)' }} />
                </span>
                {formatTime(songTimeMax)}
            </div>
        </div>
    );
}