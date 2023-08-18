import React, { useEffect, useState, useRef } from 'react'
import {
    PlayCircle,
    DownloadForOfflineOutlined,
    MoreHorizOutlined
} from '@mui/icons-material';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { Player as LootieLikeButton } from '@lottiefiles/react-lottie-player';
import SpotifyLike from "../lotties/spotify-like.json";
function SpotifyControllers() {
    const [end, setEnd] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);
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


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    useEffect(() => {
        if (end) lottieRef.current.setSeeker(55);
    }, [end])


    return (
        <div className='spotify-main-controlers'>
            <PlayCircle sx={{ fontSize: 70 }} fontSize='large' style={{ color: 'var(--spotify-green)', paddingRight: '15px' }} />
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