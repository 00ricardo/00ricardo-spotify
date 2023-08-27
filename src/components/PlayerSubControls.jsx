/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Slider } from '@mui/material';
import {
    QueueMusic,
    Lyrics, VolumeUp, VolumeMute
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { setInitialVolume } from '../redux/reducers/spotifyReducer';
function PlayerSubControls() {
    const dispatch = useDispatch()
    const [value, setValue] = useState(30);

    const handleChange = (event, newValue) => {
        const audioVolume = document.getElementById('audio-element-controller')
        audioVolume.volume = newValue
        setValue(newValue);
        //dispatch(setInitialVolume(newValue))
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
                    min={0}
                    step={0.1}
                    max={1}
                    style={{ color: 'var(--spotify-white)' }} />
            </div>

        </div>
    )
}

export default PlayerSubControls