import React, { useRef } from 'react'
import {
    PlayCircle,
    DownloadForOfflineOutlined,
    MoreHorizOutlined, PauseCircle
} from '@mui/icons-material';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { Player as LootieLikeButton } from '@lottiefiles/react-lottie-player';
import SpotifyLike from '../public/lotties/spotify-like.json'
import { useDispatch, useSelector } from 'react-redux';
import { setSongPlaying, setSongSelected } from '../redux/reducers/spotifyReducer';
import { controllerEnd, anchorEl } from '../signals';
import { effect } from '@preact/signals-react';
function SpotifyControllers() {
    const { songPlaying, songSelected, spotifyMusicList } = useSelector((state) => state.spotify)
    const lottieRef = useRef(null);
    const dispatch = useDispatch()

    const startLikeAnimation = () => {
        controllerEnd.value = false
        if (lottieRef.current) {
            if (!controllerEnd.value) {
                lottieRef.current.setSeeker(0);
                lottieRef.current.play();
            } else {
                lottieRef.current.setSeeker(0);
            }
        }
    };
    const handleEventPlayer = (e) => {
        if (lottieRef.current && e === 'complete') {
            controllerEnd.value = true
        }
    };

    const handleClick = (event) => {
        anchorEl.value = event.currentTarget;
    };

    const handleClose = () => {
        anchorEl.value = null;
    };

    const handlePlaySong = () => {
        const audio = document.getElementById('audio-element-controller')
        const _data = [...spotifyMusicList]
        const songIdx = songSelected['#']
        const _songIdx = _data.findIndex((d, i) => d['#'] === songIdx)
        if (_songIdx !== -1) {
            _data[_songIdx] = { ...songSelected, isPlaying: true }
        }

        const _songSelected = Object.keys(songSelected).length !== 0 ? { ...songSelected } : { ...spotifyMusicList[0] }
        const updateSongSelected = { ..._songSelected }
        dispatch(setSongSelected(updateSongSelected))
        dispatch(setSongPlaying(true))
        if (audio) audio.play()
    }

    const handlePauseSong = () => {
        const audio = document.getElementById('audio-element-controller')
        const _songSelected = Object.keys(songSelected).length !== 0 ? { ...songSelected } : { ...spotifyMusicList[0] }
        const updateSongSelected = { ..._songSelected }
        dispatch(setSongSelected(updateSongSelected))
        dispatch(setSongPlaying(false))
        if (audio) audio.pause()
    }

    const handleSong = (songPlaying) => {
        if (songPlaying) handlePauseSong()
        if (!songPlaying) handlePlaySong()
    }

    const open = Boolean(anchorEl.value);
    const id = open ? 'simple-popover' : undefined;

    effect(() => {
        if (controllerEnd.value) lottieRef.current.setSeeker(55);
    })

    return (
        <div className='spotify-main-controlers'>
            <IconButton onClick={() => handleSong(songPlaying)}>
                {songPlaying ?
                    <PauseCircle
                        className='spotify-controller-icon'
                        sx={{ fontSize: 70 }}
                        fontSize='large'
                        style={{
                            color: 'var(--spotify-green)'
                        }} /> :
                    <PlayCircle
                        className='spotify-controller-icon'
                        sx={{ fontSize: 70 }}
                        fontSize='large'
                        style={{
                            color: 'var(--spotify-green)'
                        }} />}
            </IconButton>
            <Tooltip title="Save to Your Library">
                <IconButton className='like-btn' onClick={startLikeAnimation}>
                    <LootieLikeButton
                        ref={lottieRef}
                        src={SpotifyLike}
                        style={{ height: 70, color: 'var(--spotify-grey)' }}
                        onEvent={handleEventPlayer} />
                </IconButton>
            </Tooltip>
            <Tooltip title="Download">
                <IconButton onClick={handleClick}>
                    <DownloadForOfflineOutlined
                        sx={{ fontSize: 40 }}
                        fontSize='large'
                        style={{ color: 'var(--spotify-grey)', paddingRight: '15px' }}
                    />
                </IconButton>

            </Tooltip>
            <Tooltip title="More options to playlist">
                <IconButton>
                    <MoreHorizOutlined sx={{ fontSize: 40 }} fontSize='small' style={{ color: 'var(--spotify-white)', paddingRight: '15px' }} />
                </IconButton>
            </Tooltip>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl.value}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <Typography style={{ backgroundColor: 'var(--spotify-blue)', color: 'var(--spotify-white)' }}
                    sx={{ p: 2 }}>
                    Unlock downloads and other features with Premium
                </Typography>
            </Popover>
        </div >
    )
}

export default SpotifyControllers