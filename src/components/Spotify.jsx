import React, { useState } from 'react'
import SpotifyHeader from './SpotifyHeader';
import SpotifyControllers from './SpotifyControllers';
import {
    TableBody, Table,
    TableRow, TableHead, TableCell
} from '@mui/material';
import { AccessTime } from '@mui/icons-material';
import { Audio } from 'react-loader-spinner'
const columns = [
    { id: '#', label: '#' },
    { id: 'titulo', label: 'Título' },
    { id: 'reproducoes', label: 'Reproduções' },
    { id: 'time', label: <AccessTime />, minWidth: 100 },
];

function createData(name, code, population) {
    return { '#': 1, titulo: name, reproducoes: code, time: population };
}

const rows = [
    createData('India', 'IN', 1324171354, 3287263),
    createData('China', 'CN', 1403500365, 9596961),
    createData('Italy', 'IT', 60483973, 301340),
    createData('United States', 'US', 327167434, 9833520),
    createData('Canada', 'CA', 37602103, 9984670),
    createData('Australia', 'AU', 25475400, 7692024),
    createData('Germany', 'DE', 83019200, 357578),
    createData('Ireland', 'IE', 4857000, 70273),
    createData('Mexico', 'MX', 126577691, 1972550),
    createData('Japan', 'JP', 126317000, 377973),
    createData('France', 'FR', 67022000, 640679),
    createData('United Kingdom', 'GB', 67545757, 242495),
    createData('Russia', 'RU', 146793744, 17098246),
    createData('Nigeria', 'NG', 200962417, 923768),
    createData('Brazil', 'BR', 210147125, 8515767),
    createData('France', 'FR', 67022000, 640679),
    createData('United Kingdom', 'GB', 67545757, 242495),
    createData('Russia', 'RU', 146793744, 17098246),
    createData('Nigeria', 'NG', 200962417, 923768),
    createData('Brazil', 'BR', 210147125, 8515767),
    createData('France', 'FR', 67022000, 640679),
    createData('United Kingdom', 'GB', 67545757, 242495),
    createData('Russia', 'RU', 146793744, 17098246),
    createData('Nigeria', 'NG', 200962417, 923768),
    createData('Brazil', 'BR', 210147125, 8515767),
    createData('France', 'FR', 67022000, 640679),
    createData('United Kingdom', 'GB', 67545757, 242495),
    createData('Russia', 'RU', 146793744, 17098246),
    createData('Nigeria', 'NG', 200962417, 923768),
    createData('Brazil', 'BR', 210147125, 8515767),
];

function Spotify() {
    const [playingIconOnHover, setPlayingIconOnHover] = useState(false)
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

    return (
        <div className='spotify container-1'>
            <SpotifyHeader />
            <div className='spotify-container' style={{ color: 'white' }}>
                <SpotifyControllers />
                <Table
                    stickyHeader
                    style={{ paddingLeft: '23px' }}
                    sx={{
                        '& .MuiTableRow-root:hover': {
                            backgroundColor: 'var(--spotify-container3)'

                        }
                    }}
                >
                    <TableHead>
                        <TableRow>
                            {columns.map((column, idx) => (
                                <TableCell
                                    key={idx}
                                    align={column.align}
                                    style={{
                                        padding: 0,
                                        width: idx === 1 ? '600px' : idx === 2 ? '-webkit-fill-available' : '0px',
                                        background: 'transparent',
                                        color: 'var(--spotify-grey)'

                                    }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody >
                        {rows.map((row, index) => {
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
                                                        index === 0 &&
                                                        !playingIconOnHover[index] ?
                                                        <Audio
                                                            height='20'
                                                            width='20'
                                                            color='var(--spotify-green)'
                                                            ariaLabel='audio-loading'
                                                            wrapperClass='wrapper-class'
                                                            visible={true}
                                                        /> : value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default Spotify