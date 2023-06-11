/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { LinearProgress } from '@mui/material';
import {
    PlayCircle, SkipPrevious, SkipNext,
    Shuffle, Repeat
} from '@mui/icons-material';

export default function Player() {
    const [songTimeProgress, setSongTimeProgress] = useState(0);
    const [songTime, setSongTime] = useState(0);
    const [songTimeMax, setSongTimeMax] = useState(3); // dummy example 03:23
    const [songTimeParser, setSongTimeParser] = useState('00:00')

    const runSongTimer = () => {
        const stepper = 100 / songTimeMax
        const timer = setInterval(() => {
            setSongTime((oldTimer) => {
                if (oldTimer === songTimeMax) {
                    setSongTimeParser('00:00')
                    clearInterval(timer); // Stop the interval
                    return 0;
                }
                if (oldTimer !== songTimeMax) {
                    setSongTimeParser(formatTime(oldTimer + 1))
                    setSongTimeProgress((oldProgress) => {
                        return oldProgress + stepper
                    })
                }
                return oldTimer + 1
            });
        }, 1000);
        return () => {
            clearInterval(timer);
        };
    }

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(remainingSeconds).padStart(2, '0');

        return `${formattedMinutes}:${formattedSeconds}`;
    };


    useEffect(() => {
        runSongTimer()
    }, []);

    return (
        <div>
            <div className='player-controls'>
                <Shuffle fontSize='small' style={{ color: 'var(--spotify-white)', paddingRight: '15px' }} />
                <SkipPrevious fontSize='medium' style={{ color: 'var(--spotify-white)', paddingRight: '15px' }} />
                <PlayCircle fontSize='large' style={{ color: 'var(--spotify-white)', paddingRight: '15px' }} />
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