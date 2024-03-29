/* eslint-disable no-unused-vars */
import React, { Fragment, useEffect, useRef } from 'react'
import { Layers, Add, ArrowForward, Search } from '@mui/icons-material';
import {
    Chip, ListItem, ListItemButton,
    TextField, InputAdornment,
    Select, FormControl, Avatar, MenuItem
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import {
    activateShadow, showSearchInput, searchInput,
    g_filterSelected, g_playlists, g_playlistSelected, g_sortedBy
} from '../signals';

function SideSpotify() {

    const filters = [
        { label: 'Recents', value: 'RECENTS' },
        { label: 'Recently added', value: 'RECENTLY_ADDED' },
        { label: 'Alphabetical', value: 'ALPHABETICAL' },
        { label: 'Creator', value: 'CREATOR' }]
    const trackListRef = useRef(null);

    const handleShadowBox = (e) => {
        const tlRef = trackListRef.current;
        //setActivateShadow(tlRef.scrollTop !== 0)
        activateShadow.value = tlRef.scrollTop !== 0
    }

    const handleFiltering = (filter) => {
        g_filterSelected.value = filter
        const res = filterBy(g_playlists.value.base, filter)
        g_playlists.value = { ...g_playlists.value, filtered: res }
    }

    const handleSortedByFilter = (e) => {
        const value = e.target.value
        g_sortedBy.value = value
        let sorted = [...g_playlists.value.filtered]
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
        g_playlists.value = { ...g_playlists.value, filtered: sorted }
    }

    const handleDelete = () => {
        g_filterSelected.value = null
        g_playlists.value = { ...g_playlists.value, filtered: g_playlists.value.base }
    };

    const filterBy = (playlistBase, filter) => playlistBase.filter((p) => p.type.value === filter)

    const handleSelectPlaylist = (playlist) => {
        g_playlistSelected.value = playlist
        localStorage.setItem('playlistSelected', JSON.stringify(playlist))
    }

    const renderPlaylists = (song, index) => {
        return (
            <Fragment key={index}>
                <ListItem component="div" disablePadding key={index} onClick={() => handleSelectPlaylist(song)}>
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
                                    fontWeight: 'bold'
                                }}>
                                {`${song?.type.label} ${song.owner ? '•' : ''} ${song?.owner}`}
                            </ListItem>
                        </div>
                    </ListItemButton>
                </ListItem >
            </Fragment >
        )
    }

    const renderKeywordWarning = () => {
        return (
            <div className='search-keyword-warning'>
                <h3 style={{ maxWidth: '365px', wordWrap: 'break-word' }}>
                    Couldn't find "{`${searchInput}`}"
                </h3>
                <small>
                    Try searching again using a
                    different spelling or keyworkd.
                </small>
            </div>
        )
    }

    useEffect(() => {
        let res = []
        // Filter by Chip
        const lsFilteredBy = localStorage.getItem('filterSelected')
        if (lsFilteredBy !== 'null' && lsFilteredBy && g_playlists.value.base) {
            res = filterBy(g_playlists.value.base, lsFilteredBy)
            g_playlists.value = { ...g_playlists.value, filtered: res }
        }
        // Filter by Search
        const _playlists = res.length > 0 ? [...res] : [...g_playlists.value.base]
        res = _playlists.filter(pl => {
            const songName = pl.name.toUpperCase()
            const _searchInput = (searchInput.value).toUpperCase()
            return songName.includes(_searchInput)
        })
        g_playlists.value = { ...g_playlists.value, filtered: res }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [g_playlists.value.base, searchInput.value])

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
                        onDelete={g_filterSelected.value === 'PLAYLIST' || localStorage.getItem('filterSelected') === 'PLAYLIST' ? handleDelete : undefined}
                        onClick={() => handleFiltering('PLAYLIST')} />
                    <Chip label="Artists"
                        className='filter-badges'
                        onDelete={g_filterSelected.value === 'ARTIST' || localStorage.getItem('filterSelected') === 'ARTIST' ? handleDelete : undefined}
                        onClick={() => handleFiltering('ARTIST')} />
                    <Chip label="Albums"
                        className='filter-badges'
                        onDelete={g_filterSelected.value === 'ALBUM' || localStorage.getItem('filterSelected') === 'ALBUM' ? handleDelete : undefined}
                        onClick={() => handleFiltering('ALBUM')} />
                </div>
            </div>
            <div ref={trackListRef} className='track-list' onScroll={(e) => handleShadowBox(e)}>
                <div style={{ display: 'flex' }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '60%'
                    }}>
                        {showSearchInput ?
                            <TextField
                                value={searchInput}
                                onChange={(e) => searchInput.value = e.target.value}
                                className='search-input'
                                onBlur={() => showSearchInput.value = false}
                                size="small"
                                style={{
                                    color: 'red',
                                    borderRadius: '5px',
                                    background: 'var(--spotify-container3)'
                                }}
                                placeholder='Search in Your Library'
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment
                                            style={{ color: 'red' }}
                                            position="start">
                                            <IconButton
                                                style={{ paddingLeft: '0px', color: 'var(--spotify-grey)' }}
                                            >
                                                <Search />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            /> :
                            <Tooltip title="Search in Your Library">
                                <IconButton
                                    onClick={() => showSearchInput.value = true}
                                    size="medium"
                                    style={{ color: 'var(--spotify-grey)' }}
                                >
                                    <Search fontSize="inherit" />
                                </IconButton>
                            </Tooltip>
                        }
                    </div>
                    <FormControl size="small">
                        <Select
                            className='select-sorted-filter'
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
                {g_playlists.value.filtered.length > 0 ? g_playlists.value.filtered.map((playlist, idx) => renderPlaylists(playlist, idx)) : renderKeywordWarning()}
            </div>
        </div>
    )
}

export default SideSpotify