/* eslint-disable no-unused-vars */
import React, { useRef, useState } from 'react'
import { Layers, Add, ArrowForward, Search } from '@mui/icons-material';
import {
    Chip, ListItem, ListItemButton, ListItemText,
    TextField, InputAdornment,
    Select, FormControl
} from '@mui/material';
import { FixedSizeList } from 'react-window';
function SideSpotify() {
    const [activateShadow, setActivateShadow] = useState(false)
    const [showSearchInput, setShowSearchInput] = useState(false)
    const filters = ['Recentes', 'Adicionados recentemente', 'Ordem alfabética', 'Criador']
    const trackListRef = useRef(null);
    const handleShadowBox = (e) => {
        const tlRef = trackListRef.current;
        setActivateShadow(!(tlRef.scrollTop === 0))
    }
    function renderSongs(props) {
        const { data, index } = props
        console.log(data)
        return (
            <ListItem component="div" disablePadding >
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
                            <Select native defaultValue="Recentes" style={{ color: 'var(--spotify-grey)', backgroundColor: 'var(--spotify-container1)' }}>
                                <optgroup label="Classificado por" style={{ color: 'var(--spotify-grey)', backgroundColor: 'var(--spotify-container3)' }}>
                                    {filters.map((f, i) => (
                                        <option
                                            key={i}
                                            value={f}
                                            style={{
                                                color: 'var(--spotify-grey)',
                                                backgroundColor: 'var(--spotify-container3)'
                                            }}>{f} </option>
                                    ))}
                                </optgroup>
                            </Select>
                        </FormControl>
                    </div>
                    : <>
                        <ListItemButton style={{ height: '70px' }}>
                            sss
                            <ListItemText primary={`Item `} />
                            s
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
                <FixedSizeList
                    height={400}
                    itemSize={80}
                    itemCount={2000000000}
                    itemData={[]}
                >
                    {renderSongs}
                </FixedSizeList>

            </div>
        </div>
    )
}

export default SideSpotify