import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';

const Widget = styled('div')(() => ({
    padding: 16,
    borderRadius: 16,
    width: 343,
    maxWidth: '100%',
    margin: 'auto',
    position: 'relative',
    zIndex: 1,
}));

const TinyText = styled(Typography)({
    fontSize: '0.75rem',
    fontWeight: 500,
    letterSpacing: 0.2,
});

const cssRules = {
    color: '#fff',
    height: 4,
    ':hover': {
        color: 'var(--spotify-green)'
    },
    ':hover .MuiSlider-thumb': {
        display: 'block',
        color: 'var(--spotify-white)'
    },
    '& .MuiSlider-thumb': {
        width: 8,
        height: 8,
        display: 'none',
        transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
        '&:before': {
            boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
        },
        '&:hover': {
            color: 'var(--spotify-white)'
        },
    },
    '& .MuiSlider-rail': {
        opacity: 1,
        color: 'var(--spotify-container3)'
    },
}


export default function MusicSliderProgress({ songTimeParser, songTimeMax, value,
    stepper, handleSliderChange, setSongTimeProgress,
    formatTime, setSongTime }) {
    //const [sliderValue, setSliderValue] = useState(value)
    const handleMouseUp = (e, val) => {
        console.log(val)
        const minValue = 100 * 29 / songTimeMax
        console.log(minValue)
        if (val >= minValue) {
            handleSliderChange(val)
            setSongTimeProgress(val)
            //setSliderValue(val)
            const newSontTime = 29 * value / 100
            setSongTime(parseInt(newSontTime))
        } else {
            handleSliderChange(0)
            setSongTimeProgress(0)
            setSongTime(0)
            // setSliderValue(0)
        }

    }

    const handleOnChange = (e) => {
        const newTime = e.target.value;
        setSongTimeProgress(newTime)
    }

    useEffect(() => {

    }, [])

    return (
        <Widget style={{ display: 'flex', padding: 0, width: '100%', alignItems: 'center' }}>
            <TinyText style={{ paddingRight: '10px' }}>{songTimeParser}</TinyText>
            <Slider
                size="small"
                value={value}
                min={0}
                step={stepper}
                max={100}
                onChangeCommitted={handleMouseUp}
                onChange={handleOnChange}
                sx={cssRules}
            />
            <TinyText style={{ paddingLeft: '10px' }}>{formatTime(songTimeMax)}</TinyText>
        </Widget>
    );
}