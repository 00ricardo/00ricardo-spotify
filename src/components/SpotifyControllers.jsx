import React, { useEffect, useRef } from 'react'
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
import { controllerEnd, anchorEl, g_songPlaying, g_songSelected, g_spotifyMusicList, previewURL, g_openSnackbar } from '../signals';
import { effect, batch } from '@preact/signals-react';
import songEndpoints from '../services/endpoints/song';
function SpotifyControllers() {
    const lottieRef = useRef(null);
    const authenticationSettings = JSON.parse(localStorage.getItem('authentication'))
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

    const handlePlaySong = async () => {
        const audio = document.getElementById('audio-element-controller')
        let newData = []
        const _songSelected = g_songSelected.value['#'] !== null ? { ...g_songSelected.value } : { ...g_spotifyMusicList.value[0] }
        const updateSongSelected = { ..._songSelected, isPlaying: true }

        batch(() => {
            g_songPlaying.value = true
            g_songSelected.value = updateSongSelected
        })

        const _data = [...g_spotifyMusicList.value]
        const songIdx = g_songSelected.value['#']
        const _songIdx = _data.findIndex((d) => d['#'] === songIdx)
        if (_songIdx !== -1) {
            _data[_songIdx] = { ...g_songSelected.value, isPlaying: true }
        }

        newData = [..._data]
        g_spotifyMusicList.value = newData

        localStorage.setItem('spotifyMusicList', JSON.stringify(newData))
        localStorage.setItem('songPlaying', JSON.stringify(true))

        while (!previewURL.value) {
            const temp = [...g_spotifyMusicList.value]
            const firstPlay = await songEndpoints.getSongSelected(authenticationSettings, g_songSelected.value.track_id)
            if (firstPlay.preview_url) {
                previewURL.value = firstPlay.preview_url
            } else {
                const nextSongIdx = g_spotifyMusicList.value.findIndex((song) => song['#'] === g_songSelected.value['#'] + 1)
                if (nextSongIdx === -1) {
                    const stopMusicList = temp.map((music) => {
                        let mTemp = { ...music }
                        mTemp.isPlaying = false
                        return mTemp
                    })
                    g_spotifyMusicList.value = stopMusicList
                    g_songPlaying.value = false
                    g_openSnackbar.value = true
                    g_songSelected.value = {
                        "#": null,
                        "track_id": '',
                        "title": {},
                        "name": '',
                        "album": '',
                        "artists": [],
                        "added_at": '',
                        "time": null,
                        "formatedTime": '',
                        "isPlaying": false,
                        "src": {
                            "height": null,
                            "url": '',
                            "width": null
                        },
                        "saved": false
                    }
                    return
                } else {

                    const currentSongIdx = g_spotifyMusicList.value.findIndex((song) => song['#'] === g_songSelected.value['#'])
                    temp[currentSongIdx] = { ...temp[currentSongIdx], isPlaying: false }
                    temp[nextSongIdx] = { ...temp[nextSongIdx], isPlaying: true }

                    batch(() => {
                        g_spotifyMusicList.value = temp
                        g_songSelected.value = { ...temp[nextSongIdx], isPlaying: true }
                    })
                }
            }
        }
        g_spotifyMusicList.value = newData
        if (audio) audio.play()
    }

    const handlePauseSong = () => {
        const audio = document.getElementById('audio-element-controller')
        let newData = []
        const _data = [...g_spotifyMusicList.value]

        newData = _data.map((d, i) => {
            const obj = { ...d, isPlaying: false }
            return obj
        })

        const _songSelected = Object.keys(g_songSelected.value).length !== 0 ? { ...g_songSelected.value } : { ...g_spotifyMusicList.value[0] }
        const updateSongSelected = { ..._songSelected, isPlaying: false }

        batch(() => {
            g_songSelected.value = updateSongSelected
            g_songPlaying.value = false
            g_spotifyMusicList.value = newData
        })
        localStorage.setItem('spotifyMusicList', JSON.stringify(newData))
        localStorage.setItem('songPlaying', JSON.stringify(false))
        if (audio) audio.pause()
    }

    const handleSong = (is_playing) => {
        if (is_playing) handlePauseSong()
        if (!is_playing) handlePlaySong()
    }

    const open = Boolean(anchorEl.value);
    const id = open ? 'simple-popover' : undefined;

    effect(() => {
        if (controllerEnd.value) lottieRef.current.setSeeker(55);
    })

    useEffect(()=> {
        if(g_songSelected.saved)  lottieRef.current.setSeeker(55)
    },[])

    return (
        <div className='spotify-main-controlers'>
            <IconButton onClick={() => handleSong(g_songPlaying.value)}>
            <div className='control-main-btn'>
                {g_songPlaying.value ?
                    <PauseCircle
                        className='spotify-controller-icon'
                        sx={{ fontSize: 70 }}
                        fontSize='large'
                        style={{
                            position:'absolute',
                            bottom:'-15px',
                            left:'-15px',
                            color: 'var(--spotify-green)'
                        }}/>:
                      
                    <PlayCircle
                        className='spotify-controller-icon'
                        sx={{ fontSize: 70 }}
                        fontSize='large'
                        style={{
                            position:'absolute',
                            bottom:'-15px',
                            left:'-15px',
                            color: 'var(--spotify-green)'
                        }}/>
                    }
                     </div>
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