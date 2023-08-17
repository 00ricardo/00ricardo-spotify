import React, { useEffect, useState } from 'react'
import SpotifyControllers from './SpotifyControllers';
import {
    TableBody, Table,
    TableRow, TableHead, TableCell, Avatar
} from '@mui/material';
import { AccessTime, Pause, PlayArrow } from '@mui/icons-material';
import { Audio } from 'react-loader-spinner'
import { useDispatch, useSelector } from 'react-redux';
import { setSongPlaying, setSongSelected } from '../redux/reducers/spotifyReducer';

function SpotifyMusicList({ headerRef, headerStyle }) {
    const dispatch = useDispatch()
    const { songSelected } = useSelector((state) => state)
    const [playingIconOnHover, setPlayingIconOnHover] = useState(false)
    const [data, setData] = useState([])

    const handleHover = (index) => {
        let newObj = { ...playingIconOnHover }
        for (let key in newObj) {
            newObj[key] = false;
        }
        newObj[index] = true
        setPlayingIconOnHover({ ...newObj })
    }
    const handleUnHover = (index) => {
        let newObj = { ...playingIconOnHover }
        newObj[index] = false
        setPlayingIconOnHover({ ...newObj })
    }
    const handlePlaySong = (songObj, songIdx) => {
        const _data = [...data]
        _data.map((d, i) => {
            if (d.isPlaying && i !== songIdx) d.isPlaying = false
            if (i === songIdx) d.isPlaying = true
            return d
        })
        setData([..._data])
        dispatch(setSongSelected({ ...songObj }))
        dispatch(setSongPlaying(true))
    }

    const handlePauseSong = (songObj, songIdx) => {
        const _data = [...data]
        _data.map((d, i) => {
            d.isPlaying = false
            return d
        })
        setData([..._data])
        dispatch(setSongSelected({ ...songObj }))
        dispatch(setSongPlaying(false))

    }

    function createData(id, name, code, population, isPlaying) {
        return {
            '#': id,
            title:
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar
                        style={{
                            height: '40px',
                            width: '40px',
                        }}
                        variant='square'
                        src="https://upload.wikimedia.org/wikipedia/commons/3/37/Music_Of_The_Spheres_%28Album%29_2021.jpg"
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
                            Coldplay
                        </div>
                    </div>
                </div>,
            plays: code,
            time: population,
            isPlaying: isPlaying ?? false
        };
    }

    const columns = [
        { id: '#', label: '#' },
        { id: 'title', label: 'Title' },
        { id: 'plays', label: 'Plays' },
        { id: 'time', label: <AccessTime />, minWidth: 100 },
    ];

    useEffect(() => {
        const rows = [
            createData(1, 'India', 'IN', 1324171354),
            createData(2, 'China', 'CN', 1403500365),
            createData(3, 'Italy', 'IT', 60483973),
            createData(4, 'United States', 'US', 327167434),
            createData(5, 'Canada', 'CA', 37602103),
            createData(6, 'Australia', 'AU', 25475400),
            createData(7, 'Germany', 'DE', 83019200),
            createData(8, 'Ireland', 'IE', 4857000),
            createData(9, 'Mexico', 'MX', 126577691),
            createData(10, 'Japan', 'JP', 126317000),
            createData(11, 'France', 'FR', 67022000),
            createData(12, 'United Kingdom', 'GB', 67545757),
            createData(13, 'Russia', 'RU', 146793744),
            createData(14, 'Nigeria', 'NG', 200962417),
            createData(15, 'Brazil', 'BR', 210147125),
        ];
        setData([...rows])
    }, [])
    return (
        <div className='spotify-container' style={{ color: 'white' }}>
            <SpotifyControllers />
            <Table
                stickyHeader
                style={{ paddingLeft: '23px' }}
                ref={headerRef}
            >
                <TableHead>
                    <TableRow >
                        {columns.map((column, idx) => (
                            <TableCell

                                key={idx}
                                align={column.align}
                                style={{
                                    padding: 0,
                                    minWidth: idx === 2 ? '185px' : 'auto',
                                    width: idx === 1 ? '600px' : idx === 2 ? '-webkit-fill-available' : '0px',
                                    backgroundColor: headerStyle ? 'var(--spotify-container3)' : 'transparent',
                                    color: 'var(--spotify-grey)'
                                }}
                            >
                                {column.label}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody
                    sx={{
                        '& .MuiTableRow-root:hover': {
                            backgroundColor: 'var(--spotify-container3)'
                        }
                    }}
                >
                    {data.map((row, index) => {
                        return (
                            <TableRow
                                hover
                                role="checkbox"
                                key={index}
                                onMouseEnter={() => { handleHover(index) }}
                                onMouseLeave={() => { handleUnHover(index) }}
                            >
                                {columns.map((column, idx) => {
                                    const value = row[column.id];
                                    return (
                                        <TableCell key={idx} align={column.align} style={{ color: 'white', borderBottom: 'none' }}>
                                            {column.format && typeof value === 'number'
                                                ? column.format(value)
                                                : column.id === '#' &&
                                                    row.isPlaying &&
                                                    !playingIconOnHover[index] ?
                                                    <Audio
                                                        height='20'
                                                        width='20'
                                                        color='var(--spotify-green)'
                                                        ariaLabel='audio-loading'
                                                        wrapperClass='wrapper-class'
                                                        visible={true}
                                                    /> : column.id === '#' &&
                                                        row.isPlaying ? <Pause onClick={() => handlePauseSong(row, index)} /> :
                                                        <div style={{
                                                            fontWeight: 'bold',
                                                            color: column.id === '#' &&
                                                                songSelected['#'] === row['#'] ?
                                                                'var(--spotify-green)' : 'inherit'
                                                        }}>
                                                            {column.id === '#' &&
                                                                !row.isPlaying &&
                                                                playingIconOnHover[index]
                                                                ? <PlayArrow onClick={() => handlePlaySong(row, index)} /> :
                                                                value}
                                                        </div>
                                            }
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    )
}

export default SpotifyMusicList