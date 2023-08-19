/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react';
import { LinearProgress } from '@mui/material';
import {
    PlayCircle, SkipPrevious, SkipNext,
    Shuffle, Repeat, Pause
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { setSongPlaying, setSongSelected, setSpotifyMusicList } from '../redux/reducers/spotifyReducer';

export default function Player() {
    const dispatch = useDispatch()
    const songTimeMax = 250 // dummy example 03:23
    const { songPlaying, songSelected, spotifyMusicList } = useSelector((state) => state.spotify)
    const [songTimeProgress, setSongTimeProgress] = useState(0);
    const [songTime, setSongTime] = useState(0);
    const [songTimeParser, setSongTimeParser] = useState('00:00');
    const [timerRef, setTimerRef] = useState(null);
    const [_songSelected, _setSongSelected] = useState(songSelected)

    const prevSongSelected = useRef(null); // Store the previous songSelected value

    function updateObjectInArray(array, conditionFunction, updateFunction) {
        let tempArray = array.map((d) => {
            const temp = { ...d }
            temp.isPlaying = false
            return temp
        })
        const targetIndex = tempArray.findIndex(conditionFunction);

        if (targetIndex !== -1) {
            tempArray[targetIndex] = updateFunction(tempArray[targetIndex]);
        }
        return tempArray
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

                    //Jump to next song
                    const dummySong = { ...songSelected }
                    dummySong['#'] = dummySong['#'] + 1
                    dispatch(setSongSelected(dummySong))
                    dispatch(setSongPlaying(true)); // Pause the song


                    const condition = song => song['#'] === dummySong['#'];
                    const jumpToNext = song => ({ ...song, isPlaying: true });
                    const musicListUpdated = updateObjectInArray([...spotifyMusicList], condition, jumpToNext);
                    dispatch(setSpotifyMusicList([...musicListUpdated]))
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
        const _data = [...spotifyMusicList]
        let newData = null
        if (songSelected.isPlaying) {
            newData = _data.map((d, i) => {
                const obj = { ...d, isPlaying: false }
                return obj
            })

        } else {
            const songIdx = songSelected['#']
            const _songIdx = _data.findIndex((d, i) => d['#'] === songIdx)
            if (_songIdx !== -1) {
                _data[_songIdx] = { ...songSelected, isPlaying: true }
            }
            newData = [..._data]
        }
        dispatch(setSpotifyMusicList([...newData]))
        const updateSongSelected = { ...songSelected, isPlaying: !songSelected.isPlaying }
        dispatch(setSongSelected(updateSongSelected))
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
                {songTimeParser}
                <span style={{ width: '500px', margin: '0px 10px' }}>
                    <LinearProgress color="inherit" variant="determinate" value={songTimeProgress} style={{ color: 'var(--spotify-white)' }} />
                </span>
                {formatTime(songTimeMax)}
            </div>
        </div>
    );
}