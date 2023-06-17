/* eslint-disable no-unused-vars */
import React, { useRef, useState } from 'react'
import { Layers, Add, ArrowForward, Search } from '@mui/icons-material';
import {
    Chip, ListItem, ListItemButton,
    TextField, InputAdornment,
    Select, FormControl, Avatar
} from '@mui/material';
import rutils from '00ricardo-utils'

function SideSpotify() {
    const [activateShadow, setActivateShadow] = useState(false)
    const [showSearchInput, setShowSearchInput] = useState(false)
    const filters = ['Recentes', 'Adicionados recentemente', 'Ordem alfabética', 'Criador']
    const trackListRef = useRef(null);
    const playlists = [{ name: 'Musicas curtidas', type: 'Playlist', owner: 'Ricardo' },
    { name: 'Runaljod', type: 'Album', owner: 'Wardruna' },
    { name: 'Spheres', type: 'Playlist', owner: 'Ricardo' },
    { name: 'Ed Steele', type: 'Artista', owner: '' },
    { name: 'Three Days Grace', type: 'Artista', owner: '' },
    { name: 'Progressive Techno V1', type: 'Playlist', owner: 'Ricardo' },
    { name: 'Progressive Techno V2', type: 'Playlist', owner: 'Ricardo' },]

    const handleShadowBox = (e) => {
        const tlRef = trackListRef.current;
        setActivateShadow(tlRef.scrollTop !== 0)
    }
    function renderSongs(song, index) {
        return (
            <ListItem component="div" disablePadding key={index}>
                {index === 0 ?
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                        {showSearchInput ? <TextField
                            size="small"
                            style={{ color: 'var(--spotify-grey)', background: 'var(--spotify-container4)' }}
                            placeholder='Buscar em sua Biblioteca'
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search />
                                    </InputAdornment>
                                ),
                            }}
                        /> : <Search />}

                        <FormControl size="small">
                            <Select
                                native
                                defaultValue="Recentes"
                                style={{
                                    color: 'var(--spotify-grey)',
                                    backgroundColor: 'var(--spotify-container1)'
                                }}>
                                <optgroup
                                    label="Classificado por"
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
                    : <>
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
                                    {rutils.hasValue(song.owner) ? `${song.type} • ${song.owner}` : ''}
                                </ListItem>
                            </div>

                        </ListItemButton>
                    </>
                }
            </ListItem >
        );
    }
    return (
        <div className='side-spotify container-1'>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div className='list-filters'>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Layers />
                        <span style={{ fontWeight: 'bold', paddingLeft: '10px' }}>Sua Biblioteca</span>
                    </div>
                    <div>
                        <Add style={{ paddingRight: '15px' }} />
                        <ArrowForward style={{ paddingRight: '25px' }} />
                    </div>
                </div>
                <div style={{
                    paddingTop: '20px',
                    paddingBottom: '10px',
                    boxShadow: activateShadow ?
                        'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px'
                        : ''
                }}>
                    <Chip label="Playlists" style={{ backgroundColor: 'var(--spotify-container3)', color: 'var(--spotify-white)', fontWeight: 'bold', marginRight: '7px' }} />
                    <Chip label="Artistas" style={{ backgroundColor: 'var(--spotify-container3)', color: 'var(--spotify-white)', fontWeight: 'bold', marginRight: '7px' }} />
                    <Chip label="Álbuns" style={{ backgroundColor: 'var(--spotify-container3)', color: 'var(--spotify-white)', fontWeight: 'bold' }} />
                </div>
            </div>
            <div ref={trackListRef} className='track-list' onScroll={(e) => handleShadowBox(e)}>
                {playlists.map((playlist, idx) => renderSongs(playlist, idx))}
            </div>
        </div>
    )
}

export default SideSpotify