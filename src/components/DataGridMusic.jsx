import React, { Fragment } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { AccessTime, Pause, PlayArrow } from '@mui/icons-material';
import { Box, Avatar } from '@mui/material'
import { Audio } from 'react-loader-spinner'
import CustomButtonWrapper from './CustomSpotifyLikeWrapper';
import { playingIconOnHover, g_spotifyMusicList, g_checkPreview, g_songPlaying } from '../signals';
import { batch } from '@preact/signals-react';

export default function DataGridMusic() {

    const createDurationContent = (row) => {
        const temp = { ...row?.row }
        const { formatedTime, track_id, saved } = temp
        return (
            <Fragment>
                {playingIconOnHover.value[track_id] || saved ? <CustomButtonWrapper track_id={track_id} /> : <></>}
                {formatedTime}
            </Fragment>
        )
    }

    const transformArtistsData = (artists) => {
        return (
            <Fragment >
                {artists && artists.map((art, i) => (
                    <Fragment key={i}>
                        <a
                            key={i}
                            className='playlist-owner'
                            target='_blank'
                            rel="noreferrer"
                            href='https://ricardobriceno.netlify.app/'
                        >
                            {art.name}
                        </a>
                        {i + 1 !== artists.length ? ', ' : ''}
                    </Fragment>
                ))}
            </Fragment>
        )
    }

    const createTitleContent = (row) => {
        const temp = { ...row?.row }
        const { src, name, isPlaying, artists } = temp
        return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Avatar
                    style={{
                        height: '40px',
                        width: '40px',
                    }}
                    variant='square'
                    src={src?.url}
                />
                <div style={{ paddingLeft: '20px' }}>
                    <div style={{
                        paddingBottom: '5px',
                        color: isPlaying ?
                            'var(--spotify-green)' :
                            'var(--spotify-white)'
                    }}>
                        {name}
                    </div>
                    <div style={{
                        color: isPlaying ? 'var(--spotify-white)' : 'var(--spotify-grey)'
                    }}>
                        {transformArtistsData(artists)}
                    </div>
                </div>
            </div>

        )
    }

    const createIdContent = (row) => {
        const songObj = { ...row?.row }
        const { id, track_id, isPlaying } = songObj

        return (
            <Box style={{ cursor: 'pointer' }}>
                {!isPlaying && !playingIconOnHover.value[track_id] ? id
                    : !isPlaying && playingIconOnHover.value[track_id] ? <PlayArrow onClick={() => handlePlaySong(songObj)} />
                        : isPlaying && !playingIconOnHover.value[track_id] ? <Audio height='20' width='20' color='var(--spotify-green)' ariaLabel='audio-loading' wrapperClass='wrapper-class' visible={true} />
                            : <Pause onClick={() => handlePauseSong()} />}
            </Box>
        )
    }
    const handleHover = (event) => {
        const track_id = event.currentTarget.dataset.id
        const row = (g_spotifyMusicList.value).find((r) => r.id === parseFloat(track_id));
        if (row && !playingIconOnHover.value[track_id]) {
            playingIconOnHover.value = { ...playingIconOnHover.value, [row.track_id]: true }
        }
    };

    const handleUnHover = (event) => {
        const track_id = event.currentTarget.dataset.id
        const row = (g_spotifyMusicList.value).find((r) => r.id === parseFloat(track_id));
        playingIconOnHover.value = { ...playingIconOnHover.value, [row.track_id]: false }
    };

    const handlePlaySong = (songObj) => {
        const _data = [...g_spotifyMusicList.value]
        const newData = _data.map((dt) => {
            const d = { ...dt }
            if (d.isPlaying && songObj.track_id !== d.track_id) d.isPlaying = false
            if (songObj.track_id === d.track_id) d.isPlaying = true
            return d
        })
        const updateSongSelected = { ...songObj }
        batch(() => {
            g_checkPreview.value = { song: updateSongSelected, check: true }
            g_spotifyMusicList.value = newData
        })

        g_spotifyMusicList.value = [...newData]

        const audio = document.getElementById('audio-element-controller')
        if (audio) audio.play()
    }

    const handlePauseSong = () => {
        const _data = [...g_spotifyMusicList.value]
        const newData = _data.map((dt, i) => {
            const d = { ...dt }
            d.isPlaying = false
            return d
        })
        g_spotifyMusicList.value = [...newData]
        batch(() => {
            g_songPlaying.value = false
            g_spotifyMusicList.value = newData
        })
        const audio = document.getElementById('audio-element-controller')
        if (audio) audio.pause()
    }

    const columns = [
        {
            field: 'id',
            headerName: '#',
            editable: false,
            sortable: false,
            width: 45,
            renderCell: createIdContent,
            borderColor: 'red'
        },
        {
            field: 'title',
            headerName: 'Title',
            editable: false,
            sortable: false,
            renderCell: createTitleContent,
            width: 580
        },
        {
            field: 'album',
            headerName: 'Album',
            editable: false,
            sortable: false,
            width: 385
        },
        {
            field: 'added_at',
            headerName: 'Date added',
            editable: false,
            sortable: false,
            width: 290
        },
        {
            field: 'formatedTime',
            renderHeader: () => (
                <Fragment>
                    <AccessTime />
                </Fragment>
            ),
            type: 'number',
            description: 'Duration',
            renderCell: createDurationContent,
            editable: false,
            sortable: false,
            width: 100,
        },
    ];

    const cssRules = {
        '& .MuiDataGrid-withBorderColor': {
            borderColor: 'transparent'
        },
        '& .MuiDataGrid-row.Mui-selected, & .MuiDataGrid-row.Mui-selected:hover': {
            backgroundColor: 'rgb(90 90 90)',
            borderRadius: '4px'
        },
        '& .MuiDataGrid-row:hover': {
            backgroundColor: 'rgb(42 42 42)',
            borderRadius: '4px'
        },
        '& .MuiDataGrid-iconSeparator': {
            display: 'none'
        },
        '& .MuiDataGrid-cell:focus, & .MuiDataGrid-columnHeader:focus-within, & .MuiDataGrid-cell:focus-within': {
            outline: 'transparent'
        }
    }

    return (
        <Fragment>
            <Box sx={{ height: '100%', width: '100%' }}>
                <DataGrid
                    getRowId={(row) => row['#']}
                    sx={cssRules}
                    style={{ marginLeft: '40px', color: 'white', borderColor: 'transparent' }}
                    rows={g_spotifyMusicList.value}
                    columns={columns}
                    //disableRowSelectionOnClick
                    disableColumnMenu
                    slotProps={{
                        row: {
                            onMouseEnter: handleHover,
                            onMouseLeave: handleUnHover
                        }
                    }}
                />
            </Box>
        </Fragment>
    );
}