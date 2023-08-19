import React, { useEffect, useState, useRef } from 'react'
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
import { setSongPlaying, setSongSelected, setSpotifyMusicList } from '../redux/reducers/spotifyReducer';

function SpotifyControllers() {
    const { songPlaying, songSelected, spotifyMusicList } = useSelector((state) => state.spotify)
    const [end, setEnd] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);
    const lottieRef = useRef(null);
    const dispatch = useDispatch()

    const startLikeAnimation = () => {
        setEnd(false)
        if (lottieRef.current) {
            if (!end) {
                lottieRef.current.setSeeker(0);
                lottieRef.current.play();
            } else {
                lottieRef.current.setSeeker(0);
            }
        }
    };
    const handleEventPlayer = (e) => {
        if (lottieRef.current && e === 'complete') {
            setEnd(true)
        }
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handlePlaySong = () => {
        const _data = [...spotifyMusicList]
        const songIdx = songSelected['#']
        const _songIdx = _data.findIndex((d, i) => d['#'] === songIdx)
        if (_songIdx !== -1) {
            _data[_songIdx] = { ...songSelected, isPlaying: true }
        }

        dispatch(setSpotifyMusicList([..._data]))
        const updateSongSelected = { ...songSelected, isPlaying: true }
        dispatch(setSongSelected(updateSongSelected))
        dispatch(setSongPlaying(true))
    }

    const handlePauseSong = () => {
        const _data = [...spotifyMusicList]
        const newData = _data.map((d, i) => {
            const obj = { ...d, isPlaying: false }
            return obj
        })
        dispatch(setSpotifyMusicList([...newData]))
        const updateSongSelected = { ...songSelected, isPlaying: false }
        dispatch(setSongSelected(updateSongSelected))
        dispatch(setSongPlaying(false))
    }

    const handleSong = (songPlaying) => {
        if (songPlaying) handlePauseSong()
        if (!songPlaying) handlePlaySong()
    }

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    useEffect(() => {
        if (end) lottieRef.current.setSeeker(55);
    }, [end])


    return (
        <div className='spotify-main-controlers'>
            <IconButton onClick={() => handleSong(songPlaying)}>
                {songPlaying ?
                    <PauseCircle
                        className='spotify-controller-icon'
                        sx={{ fontSize: 70 }}
                        fontSize='large'
                        style={{
                            color: 'var(--spotify-green)',
                            paddingRight: '15px'
                        }} /> :
                    <PlayCircle
                        className='spotify-controller-icon'
                        sx={{ fontSize: 70 }}
                        fontSize='large'
                        style={{
                            color: 'var(--spotify-green)',
                            paddingRight: '15px'
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
                anchorEl={anchorEl}
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