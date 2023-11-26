import React, { useRef, useEffect } from 'react';
import { Player as LootieLikeButton } from '@lottiefiles/react-lottie-player';
import SpotifyLike from '../public/lotties/spotify-like.json';
import { useSignal } from "@preact/signals-react";
import { g_songSelected, g_spotifyMusicList } from './../signals/index';
function CustomButtonWrapper({ track_id }) {
    const lottieRef = useRef(null);
    const end = useSignal(false)

    const startLikeAnimation = () => {
        end.value = false
        const song = g_spotifyMusicList.value.find((s, i) => s.track_id === track_id)
        if (lottieRef.current) {
            if (!end) {
                lottieRef.current.setSeeker(0);
                lottieRef.current.play();
            } else {
                lottieRef.current.setSeeker(0);
            }
            if (track_id === g_songSelected.value.track_id) {
                g_songSelected.value = { ...g_songSelected.value, saved: !g_songSelected.value.saved }
            }
            const tempArray = [...g_spotifyMusicList.value]
            const songIdx = tempArray.findIndex((s, i) => s.track_id === track_id)

            if (songIdx !== -1) {
                tempArray[songIdx] = { ...tempArray[songIdx], saved: !song.saved };
            }
            g_spotifyMusicList.value = [...tempArray]
            localStorage.setItem('spotifyMusicList', JSON.stringify([...tempArray]))
        }
    };

    useEffect(() => {
        if (lottieRef.current) lottieRef.current.setSeeker(end ? 55 : 0);
    }, [end]);

    const handleEventPlayer = (e) => {
        const song = (g_spotifyMusicList.value).find((s, i) => s.track_id === track_id)

        //Check if the song is saved
        // If it is, then lottie should be animated (seeker 55)
        if (song && song.saved && e === 'load') lottieRef.current.setSeeker(55);

        // Normal animation
        if (lottieRef.current && e === 'play') end.value = true;
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
