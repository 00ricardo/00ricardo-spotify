import React, { useRef, useState, useEffect } from 'react';
import { Player as LootieLikeButton } from '@lottiefiles/react-lottie-player';
import SpotifyLike from '../public/lotties/spotify-like.json';
import { useDispatch, useSelector } from 'react-redux';
import { setSongSelected, setSpotifyMusicList } from '../redux/reducers/spotifyReducer';

function CustomButtonWrapper({ track_id }) {
    const { songSelected, spotifyMusicList } = useSelector((state) => state.spotify)
    const lottieRef = useRef(null);
    const dispatch = useDispatch()
    const [end, setEnd] = useState(false);

    const startLikeAnimation = () => {
        setEnd(false)
        const song = spotifyMusicList.find((s, i) => s.track_id === track_id)
        if (lottieRef.current) {
            if (!end) {
                lottieRef.current.setSeeker(0);
                lottieRef.current.play();
            } else {
                lottieRef.current.setSeeker(0);
            }
            const _songSelected = { ...songSelected }
            if (track_id === _songSelected.track_id) {
                dispatch(setSongSelected({ ..._songSelected, saved: !_songSelected.saved }))
            }
            const tempArray = [...spotifyMusicList]
            const songIdx = tempArray.findIndex((s, i) => s.track_id === track_id)

            if (songIdx !== -1) {
                tempArray[songIdx] = { ...tempArray[songIdx], saved: !song.saved };
            }
            dispatch(setSpotifyMusicList([...tempArray]))
        }
    };

    useEffect(() => {
        if (lottieRef.current) lottieRef.current.setSeeker(end ? 55 : 0);
    }, [end]);

    const handleEventPlayer = (e) => {
        const song = spotifyMusicList.find((s, i) => s.track_id === track_id)

        //Check if the song is saved
        // If it is, then lottie should be animated (seeker 55)
        if (song && song.saved && e === 'load') lottieRef.current.setSeeker(55);

        // Normal animation
        if (lottieRef.current && e === 'play') setEnd(true);
    };

    return (
        <div onClick={startLikeAnimation} style={{ cursor: 'pointer' }}>
            <LootieLikeButton
                ref={lottieRef}
                src={SpotifyLike}
                style={{ height: 35, color: 'var(--spotify-grey)' }}
                onEvent={handleEventPlayer}
            />
        </div>
    );
};

export default CustomButtonWrapper;
