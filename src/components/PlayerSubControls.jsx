/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Slider } from '@mui/material';
import {
    QueueMusic,
    Lyrics, VolumeUp, VolumeMute
} from '@mui/icons-material';
function PlayerSubControls() {
    const [value, setValue] = useState(30);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div className='pb3'>
            <Lyrics fontSize='small' style={{ color: 'var(--spotify-white)', paddingRight: '15px' }} />
            <QueueMusic fontSize='small' style={{ color: 'var(--spotify-white)', paddingRight: '15px' }} />
            {value > 1 ? <VolumeUp fontSize='small' style={{ color: 'var(--spotify-white)', paddingRight: '15px' }} /> :
                <VolumeMute fontSize='small' style={{ color: 'var(--spotify-white)', paddingRight: '15px' }} />}
            <div style={{ width: '100px' }}>
                <Slider
                    value={value}
                    onChange={handleChange}
                    size="small"
                    min={1}
                    step={1}
                    max={100}
                    style={{ color: 'var(--spotify-white)' }} />
            </div>

        </div>
    )
}

export default PlayerSubControls