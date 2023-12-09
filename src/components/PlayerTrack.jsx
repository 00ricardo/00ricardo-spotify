import React, { useEffect, useRef, Fragment } from 'react'
import { Avatar, } from '@mui/material';
import { PictureInPictureAlt } from '@mui/icons-material';
import SpotifyLike from '../public/lotties/spotify-like.json'
import { Player as LootieLikeButton } from '@lottiefiles/react-lottie-player';
import { end, g_songSelected, g_spotifyMusicList } from '../signals';
function PlayerTrack() {
    const lottieRef = useRef(null);
    const startLikeAnimation = () => {
        end.value = false
        if (lottieRef.current) {
            if (!end) {
                lottieRef.current.setSeeker(0);
                lottieRef.current.play();
            } else {
                lottieRef.current.setSeeker(0);
            }
            g_songSelected.value = { ...g_songSelected.value, saved: !g_songSelected.value.saved }
            console.log( g_songSelected.value)
            const tempArray = [...g_spotifyMusicList.value]
            const songIdx = tempArray.findIndex((s, i) => s.track_id === g_songSelected.value.track_id)
            if (songIdx !== -1) {
                tempArray[songIdx] = { ...tempArray[songIdx], saved: !tempArray[songIdx].saved };
                g_spotifyMusicList.value = tempArray
            }
            
        }
    };
    const handleEventPlayer = (e) => {
        //Check if the song is saved
        // If it is, then lottie should be animated (seeker 55)
        if (g_songSelected.value && g_songSelected.value.saved && e === 'load') lottieRef.current.setSeeker(55);
        if (lottieRef.current && e === 'play') end.value = true
    };

    const transformArtistsData = (artists) => {
        return (
            <Fragment >
                {artists.map((art, i) => (
                    <a
                        key={i}
                        className='playlist-owner'
                        target='_blank'
                        rel="noreferrer"
                        href='https://ricardobriceno.netlify.app/'
                    >
                        {`${art.name}${i + 1 !== artists.length ? ', ' : ''}`}
                    </a>
                ))}
            </Fragment>
        )
    }


    useEffect(() => {
        if (lottieRef.current) lottieRef.current.setSeeker(g_songSelected.value.saved ? 55 : 0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [g_songSelected.value.saved])

    useEffect(() => {
        if (!g_songSelected.value['#'] === null) {
            g_songSelected.value = g_spotifyMusicList.value[0]
        }
    }, [])


    return (
        Object.keys(g_songSelected.value).length !== 0
        && g_spotifyMusicList.value.length !== 0
        && <div className='pb1'>
            <Avatar
                style={{
                    height: '57px',
                    width: '57px',
                    borderRadius: '5px'
                }}
                variant='square'
                src={g_songSelected.value.src?.url}
            />
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div className='song'>
                    <div style={{ fontWeight: '400', color: 'var(--spotify-white)' }}>
                        <a
                            className='playlist-owner'
                            target='_blank'
                            rel="noreferrer"
                            href='https://ricardobriceno.netlify.app/'
                        >
                            {g_songSelected.value.name}
                        </a>
                    </div>
                    <div style={{ fontSize: 'small', color: 'var(--spotify-grey)' }}>
                        {g_songSelected.value.artists && transformArtistsData(g_songSelected.value.artists)}
                    </div>
                </div>
                <div className='song-like'>
                    <button
                        className='like-btn'
                        onClick={startLikeAnimation}>
                        <LootieLikeButton
                            ref={lottieRef}
                            src={SpotifyLike}
                            style={{ height: 35, color: 'var(--spotify-grey)' }}
                            onEvent={handleEventPlayer} />
                    </button>
                    <PictureInPictureAlt style={{ color: 'var(--spotify-grey)', height: '18px', marginLeft: '5px' }} />
                </div>
            </div>
        </div>
    )
}

export default PlayerTrack