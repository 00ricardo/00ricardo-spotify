/* eslint-disable no-unused-vars */
import React from 'react'
import { Slider } from '@mui/material';
import {
    QueueMusic,
    Lyrics, VolumeUp, VolumeMute
} from '@mui/icons-material';
import { volumeValue } from '../signals';
function PlayerSubControls() {
    const handleChange = (event, newValue) => {
        const audioVolume = document.getElementById('audio-element-controller')
        console.log(newValue)
        audioVolume.volume = newValue
        volumeValue.value = newValue;
    };

    return (
        <div className='pb3'>
            <Lyrics fontSize='small' style={{ color: 'var(--spotify-white)', paddingRight: '15px' }} />
            <QueueMusic fontSize='small' style={{ color: 'var(--spotify-white)', paddingRight: '15px' }} />
            {volumeValue > 1 ? <VolumeUp fontSize='small' style={{ color: 'var(--spotify-white)', paddingRight: '15px' }} /> :
                <VolumeMute fontSize='small' style={{ color: 'var(--spotify-white)', paddingRight: '15px' }} />}
            <div style={{ width: '100px' }}>
                <Slider
                    value={volumeValue.value}
                    onChange={handleChange}
                    size="small"
                    min={0}
                    step={0.1}
                    max={1}
                    style={{ color: 'var(--spotify-white)' }} />
            </div>

        </div>
    )
}

export default PlayerSubControls