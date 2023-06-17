import React from 'react'
import {
    Avatar
} from '@mui/material';
function SpotifyHeader() {
    return (
        <div className='header'>
            <Avatar
                style={{
                    height: '230px',
                    width: '230px'
                }}
                variant='square'
                src="https://upload.wikimedia.org/wikipedia/commons/3/37/Music_Of_The_Spheres_%28Album%29_2021.jpg"
            />
            <div style={{ paddingLeft: '25px' }}>
                <p style={{ margin: 0 }}>Álbum</p>
                <h1 style={{ fontSize: '65px', marginBottom: '10px', marginTop: '10px' }}>Music Of The Spheres</h1>
                <div style={{ display: 'flex' }}>
                    <Avatar
                        style={{
                            height: '27px',
                            width: '27px'
                        }}
                        variant='circular'
                        src="https://upload.wikimedia.org/wikipedia/commons/3/37/Music_Of_The_Spheres_%28Album%29_2021.jpg"
                    />
                    <span style={{ marginLeft: '5px' }}>Coldpay • 2021 • 12 músicas, 41min 50s</span>
                </div>
            </div>
        </div>
    )
}

export default SpotifyHeader