import React from 'react'
import SideNavigation from './SideNavigation'
import SideSpotify from './SideSpotify'
import { useQuery } from '@tanstack/react-query';
import playlistEndpoints from '../services/endpoints/plyalists'
import { g_playlists } from '../signals';
function Sidebar() {
    const authenticationSettings = JSON.parse(localStorage.getItem('authentication'))

    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const prepareData = (playlists) => {
        const ready = playlists.map((p, idx) => {
            const playlist = {
                id: p.id,
                name: p.name,
                description: p.description,
                owner: p.owner.display_name,
                ownerid: p.owner.id,
                tracksReference: {
                    ref: p.tracks.href,
                    total: p.tracks.total
                },
                type: {
                    label: capitalizeFirstLetter(p.type),
                    value: p.type.toUpperCase()
                },
                src: p.images[0].url
            }
            return playlist
        });
        g_playlists.value = { base: ready, filtered: ready }
        localStorage.setItem('playlists', JSON.stringify(ready))
    }

    useQuery({
        queryKey: ['spotify-playlists'],
        enabled: true, // Enable the query immediately
        queryFn: () => playlistEndpoints.getMyPlaylists(authenticationSettings),
        onSuccess: (data) => {
            const _data = [...data.items]
            prepareData(_data)
        }
    });
    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '90vh' }}>
            <SideNavigation />
            <SideSpotify />
        </div>
    )
}



export default Sidebar