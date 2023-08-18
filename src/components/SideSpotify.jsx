/* eslint-disable no-unused-vars */
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { Layers, Add, ArrowForward, Search } from '@mui/icons-material';
import {
    Chip, ListItem, ListItemButton,
    TextField, InputAdornment,
    Select, FormControl, Avatar, MenuItem
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useDispatch, useSelector } from 'react-redux';
import { setFilterSelected, setSortdBy, setPlaylists } from '../redux/reducers/spotifyReducer';
function SideSpotify() {
    const dispatch = useDispatch()
    const { filterSelected, playlists } = useSelector(state => state)
    const [activateShadow, setActivateShadow] = useState(false)
    const [showSearchInput, setShowSearchInput] = useState(false)
    const filters = [
        { label: 'Recents', value: 'RECENTS' },
        { label: 'Recently added', value: 'RECENTLY_ADDED' },
        { label: 'Alphabetical', value: 'ALPHABETICAL' },
        { label: 'Creator', value: 'CREATOR' }]
    const trackListRef = useRef(null);

    const handleShadowBox = (e) => {
        const tlRef = trackListRef.current;
        setActivateShadow(tlRef.scrollTop !== 0)
    }

    const handleFiltering = (filter) => {
        dispatch(setFilterSelected(filter))
        const res = filterBy(playlists.base, filter)
        dispatch(setPlaylists([...res]))
    }


    const handleSortedByFilter = (e) => {
        const value = e.target.value
        dispatch(setSortdBy(value))
        let sorted = [...playlists.filtered]
        switch (value) {
            case 'RECENTS':
                break;
            case 'RECENTLY_ADDED':
                break;
            case 'ALPHABETICAL':
                sorted = sorted.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'CREATOR':
                sorted = sorted.sort((a, b) => a.owner.localeCompare(b.owner));
                break;
            default:
                break;
        }
        dispatch(setPlaylists([...sorted]))
    }

    const handleDelete = () => {
        dispatch(setFilterSelected(null))
        dispatch(setPlaylists([...playlists.base]))
    };

    const filterBy = (playlistBase, filter) => playlistBase.filter((p) => p.type.value === filter)


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
                            src={song.src ? song.src : "https://upload.wikimedia.org/wikipedia/commons/3/37/Music_Of_The_Spheres_%28Album%29_2021.jpg"}
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
                                {`${song?.type.label} ${song.owner ? '•' : ''} ${song?.owner}`}
                            </ListItem>
                        </div>
                    </ListItemButton>
                </ListItem >
            </Fragment >
        )
    }


    useEffect(() => {
        const lsFilteredBy = localStorage.getItem('filterSelected')
        if (lsFilteredBy !== 'null' && lsFilteredBy && playlists.base) {
            console.log(lsFilteredBy)
            console.log(playlists.base)
            const res = filterBy(playlists.base, lsFilteredBy)
            dispatch(setPlaylists([...res]))
        }
    }, [dispatch, playlists.base])
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
                        onDelete={filterSelected === 'PLAYLIST' || localStorage.getItem('filterSelected') === 'PLAYLIST' ? handleDelete : undefined}
                        onClick={() => handleFiltering('PLAYLIST')} />
                    <Chip label="Artists"
                        className='filter-badges'
                        onDelete={filterSelected === 'ARTIST' || localStorage.getItem('filterSelected') === 'ARTIST' ? handleDelete : undefined}
                        onClick={() => handleFiltering('ARTIST')} />
                    <Chip label="Albums"
                        className='filter-badges'
                        onDelete={filterSelected === 'ALBUM' || localStorage.getItem('filterSelected') === 'ALBUM' ? handleDelete : undefined}
                        onClick={() => handleFiltering('ALBUM')} />
                </div>
            </div>
            <div ref={trackListRef} className='track-list' onScroll={(e) => handleShadowBox(e)}>
                <div style={{ display: 'flex' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '50%' }}>
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
                            onChange={(e) => handleSortedByFilter(e)}
                            defaultValue="RECENTS"
                            style={{
                                color: 'var(--spotify-grey)',
                                backgroundColor: 'var(--spotify-container1)'
                            }}>
                            <MenuItem disabled value="" style={{ fontWeight: 'bold', fontSize: '10px', color: 'var(--spotify-white)' }}>
                                <em>Sort by</em>
                            </MenuItem>
                            {filters.map((f, i) => (
                                <MenuItem
                                    style={{
                                        color: 'var(--spotify-white)',
                                        backgroundColor: 'var(--spotify-container3)',
                                    }}
                                    key={i} value={f.value} >
                                    {f.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                {playlists.filtered.map((playlist, idx) => renderSongs(playlist, idx))}
            </div>
        </div>
    )
}

export default SideSpotify