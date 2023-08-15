/* eslint-disable no-unused-vars */
import React, { Fragment, useRef, useState } from 'react'
import { Layers, Add, ArrowForward, Search } from '@mui/icons-material';
import {
    Chip, ListItem, ListItemButton,
    TextField, InputAdornment,
    Select, FormControl, Avatar
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
function SideSpotify() {
    const [activateShadow, setActivateShadow] = useState(false)
    const [showSearchInput, setShowSearchInput] = useState(false)
    const [filteringBy, setFiltering] = useState(undefined)
    const playlistBase = [
        { name: 'Musicas curtidas', type: 'Playlist', owner: 'Ricardo' },
        { name: 'Runaljod', type: 'Album', owner: 'Wardruna' },
        { name: 'Spheres', type: 'Playlist', owner: 'Ricardo' },
        { name: 'Ed Steele', type: 'Artist', owner: '' },
        { name: 'Three Days Grace', type: 'Artist', owner: '' },
        { name: 'Progressive Techno V1', type: 'Playlist', owner: 'Ricardo' },
        { name: 'Progressive Techno V2', type: 'Playlist', owner: 'Ricardo' }
    ]
    const [playlists, setPlaylists] = useState(playlistBase)
    const filters = ['Recents', 'Recently added recentemente', 'Alphabetical', 'Creator']
    const trackListRef = useRef(null);

    const handleShadowBox = (e) => {
        const tlRef = trackListRef.current;
        setActivateShadow(tlRef.scrollTop !== 0)
    }

    const handleFiltering = (filter) => {
        setFiltering(filter)
        const res = filterBy(playlistBase, filter)
        setPlaylists([...res])
    }

    const handleDelete = () => {
        setFiltering(undefined)
        setPlaylists([...playlistBase])
    };

    const filterBy = (playlistBase, filter) => playlistBase.filter((p) => p.type === filter)

    function renderSongs(song, index) {
        return (
            <Fragment key={index}>
                <ListItem component="div" disablePadding key={index}>
                    <ListItemButton
                        className='playlist-item'
                        style={{
                            flexDirection: 'row',
                            padding: 0,
                        }}>
                        <Avatar
                            style={{
                                height: '57px',
                                width: '57px',
                                borderRadius: '5px'
                            }}
                            variant='square'
                            src="https://upload.wikimedia.org/wikipedia/commons/3/37/Music_Of_The_Spheres_%28Album%29_2021.jpg"
                        />
                        <div
                            className='playlist-item'
                            style={{
                                flexDirection: 'column',
                                justifyContent: 'center',
                                paddingLeft: '15px'
                            }}
                        >
                            {song.name}
                            <ListItem
                                style={{
                                    padding: '0px',
                                    color: 'var(--spotify-grey)',
                                    fontWeight: 'initial'
                                }}>
                                {`${song?.type} ${song.owner ? '•' : ''} ${song?.owner}`}
                            </ListItem>
                        </div>
                    </ListItemButton>
                </ListItem >
            </Fragment >
        )
    }

    return (
        <div className='side-spotify container-1'>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div className='list-filters'>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Layers />
                        <span style={{ fontWeight: 'bold', paddingLeft: '10px' }}>Your Library</span>
                    </div>
                    <div>
                        <Tooltip title="Create playlist or folder">
                            <IconButton style={{ color: 'var(--spotify-grey)' }}>
                                <Add style={{ paddingRight: '15px' }} />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Enlarge Your Library">
                            <IconButton style={{ color: 'var(--spotify-grey)' }}>
                                <ArrowForward style={{ paddingRight: '25px' }} />
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>
                <div style={{
                    paddingTop: '20px',
                    paddingBottom: '10px',
                    boxShadow: activateShadow ?
                        'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px'
                        : ''
                }}>

                    <Chip label="Playlists"
                        className='filter-badges'
                        onDelete={filteringBy === 'Playlist' ? handleDelete : undefined}
                        onClick={() => handleFiltering('Playlist')} />
                    <Chip label="Artists"
                        className='filter-badges'
                        onDelete={filteringBy === 'Artist' ? handleDelete : undefined}
                        onClick={() => handleFiltering('Artist')} />
                    <Chip label="Albums"
                        className='filter-badges'
                        onDelete={filteringBy === 'Album' ? handleDelete : undefined}
                        onClick={() => handleFiltering('Album')} />
                </div>
            </div>
            <div ref={trackListRef} className='track-list' onScroll={(e) => handleShadowBox(e)}>
                <div style={{ display: 'flex' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                        {showSearchInput ? <TextField
                            size="small"
                            style={{ color: 'var(--spotify-grey)', background: 'var(--spotify-container4)' }}
                            placeholder='Search in Your Library'
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search />
                                    </InputAdornment>
                                ),
                            }}
                        /> : <Search />}
                    </div>
                    <FormControl size="small">
                        <Select
                            native
                            defaultValue="Recentes"
                            style={{
                                color: 'var(--spotify-grey)',
                                backgroundColor: 'var(--spotify-container1)'
                            }}>
                            <optgroup
                                label="Sorted by"
                                style={{
                                    color: 'var(--spotify-grey)',
                                    backgroundColor: 'var(--spotify-container3)',
                                    fontSize: 'small'
                                }}>
                                {filters.map((f, i) => (
                                    <option
                                        key={i}
                                        value={f}
                                        style={{
                                            color: 'var(--spotify-white)',
                                            backgroundColor: 'var(--spotify-container3)',
                                        }}>{f} </option>
                                ))}
                            </optgroup>
                        </Select>
                    </FormControl>
                </div>

                {playlists.map((playlist, idx) => renderSongs(playlist, idx))}
            </div>
        </div>
    )
}

export default SideSpotify