import React, { useEffect, useState, useRef, Fragment } from 'react'
import { Avatar, } from '@mui/material';
import { PictureInPictureAlt } from '@mui/icons-material';
import SpotifyLike from '../public/lotties/spotify-like.json'
import { Player as LootieLikeButton } from '@lottiefiles/react-lottie-player';
import { useDispatch, useSelector } from 'react-redux';
import { setSongSelected, setSpotifyMusicList } from '../redux/reducers/spotifyReducer';
function PlayerTrack() {
    const { songSelected, spotifyMusicList } = useSelector((state) => state.spotify)
    const [end, setEnd] = useState(false)
    const dispatch = useDispatch()
    const lottieRef = useRef(null);
    const startLikeAnimation = () => {
        setEnd(false)
        if (lottieRef.current) {
            if (!end) {
                lottieRef.current.setSeeker(0);
                lottieRef.current.play();
            } else {
                lottieRef.current.setSeeker(0);
            }
            const _songSelected = { ...songSelected }
            dispatch(setSongSelected({ ..._songSelected, saved: !_songSelected.saved }))
            const tempArray = [...spotifyMusicList]
            const songIdx = tempArray.findIndex((s, i) => s.track_id === _songSelected.track_id)
            if (songIdx !== -1) {
                tempArray[songIdx] = { ...tempArray[songIdx], saved: !tempArray[songIdx].saved };
                dispatch(setSpotifyMusicList([...tempArray]))
            }
        }
    };
    const handleEventPlayer = (e) => {
        //Check if the song is saved
        // If it is, then lottie should be animated (seeker 55)
        if (songSelected && songSelected.saved && e === 'load') lottieRef.current.setSeeker(55);
        if (lottieRef.current && e === 'play') setEnd(true)
    };

    const transformArtistsData = (artists) => {
        console.log(artists)
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
        if (lottieRef.current) lottieRef.current.setSeeker(songSelected.saved ? 55 : 0);
    }, [songSelected.saved])


    return (
        Object.keys(songSelected).length !== 0
        && spotifyMusicList.length !== 0
        && <div className='pb1'>
            <Avatar
                style={{
                    height: '57px',
                    width: '57px',
                    borderRadius: '5px'
                }}
                variant='square'
                src={songSelected.src.url}
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
                            {songSelected.name}
                        </a>
                    </div>
                    <div style={{ fontSize: 'small', color: 'var(--spotify-grey)' }}>
                        {songSelected.artists && transformArtistsData(songSelected.artists)}
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