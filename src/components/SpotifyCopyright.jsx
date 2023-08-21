import React from 'react'

function SpotifyCopyright() {
    const months = [
        "January", "February", "March",
        "April", "May", "June",
        "July", "August", "September",
        "October", "November", "December"
    ];

    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const monthName = months[month];
    const day = date.getDate();
    return (
        <div className='spotify-copyrights'>
            <div style={{ fontSize: '13px', paddingBottom: '5px' }}>{`${monthName} ${day}, ${year}`}</div>
            <div style={{ paddingBottom: '5px' }}>© Under exclusive licence to Parlophone Records Limited, © {new Date().getFullYear()} <a target='_blank' href='https://open.spotify.com/' rel="noreferrer">Spotify</a></div>
            <div>© Application created by <a target='_blank' rel="noreferrer" href='https://ricardobriceno.netlify.app/'>Ricardo Briceño </a>
                with <a target='_blank' href='https://developer.spotify.com/documentation/web-api' rel="noreferrer">Spotify API</a></div>
        </div>
    )
}

export default SpotifyCopyright