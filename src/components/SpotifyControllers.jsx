import React, { useEffect, useState, useRef } from 'react'
import {
    PlayCircle,
    DownloadForOfflineOutlined,
    MoreHorizOutlined
} from '@mui/icons-material';
import { Player as LootieLikeButton } from '@lottiefiles/react-lottie-player';
import SpotifyLike from "../lotties/spotify-like.json";
function SpotifyControllers() {
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
        <div className='spotify-main-controlers'>
            <PlayCircle sx={{ fontSize: 70 }} fontSize='large' style={{ color: 'var(--spotify-green)', paddingRight: '15px' }} />
            <button
                className='like-btn'
                onClick={startLikeAnimation}>
                <LootieLikeButton
                    ref={lottieRef}
                    src={SpotifyLike}
                    style={{ height: 70, color: 'var(--spotify-grey)' }}
                    onEvent={handleEventPlayer} />
            </button>
            <DownloadForOfflineOutlined sx={{ fontSize: 40 }} fontSize='large' style={{ color: 'var(--spotify-grey)', paddingRight: '15px' }} />
            <MoreHorizOutlined sx={{ fontSize: 40 }} fontSize='small' style={{ color: 'var(--spotify-white)', paddingRight: '15px' }} />
        </div>
    )
}

export default SpotifyControllers