import React, { useEffect, useState, useRef } from 'react'
import { Avatar, } from '@mui/material';
import { PictureInPictureAlt } from '@mui/icons-material';
import SpotifyLike from '../public/lotties/spotify-like.json'
import { Player as LootieLikeButton } from '@lottiefiles/react-lottie-player';
function PlayerTrack() {
    const [end, setEnd] = useState(false)

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
        }
    };
    const handleEventPlayer = (e) => {
        if (lottieRef.current && e === 'complete') {
            setEnd(true)
        }
    };
    useEffect(() => {
        if (end) lottieRef.current.setSeeker(55);
    }, [end])
    return (
        <div className='pb1'>
            <Avatar
                style={{
                    height: '57px',
                    width: '57px',
                    borderRadius: '5px'
                }}
                variant='square'
                src="https://upload.wikimedia.org/wikipedia/commons/3/37/Music_Of_The_Spheres_%28Album%29_2021.jpg"
            />
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div className='song'>
                    <div style={{ fontWeight: '400', color: 'var(--spotify-white)' }}>Higher Power</div>
                    <div style={{ fontSize: 'small', color: 'var(--spotify-grey)' }}>Coldplay</div>
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