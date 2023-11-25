import { signal } from '@preact/signals-react';
export const playingIconOnHover = signal({})
export const datagridData = signal([]);
export const songTimeProgress = signal(0)
export const songTime = signal(0)
export const songTimeParser = signal('00:00')
export const timerRef = signal(null)
export const _songSelected = signal({})
export const volumeValue = signal(30)
export const end = signal(false)
export const controllerEnd = signal(false)
export const anchorEl = signal(null)
export const activateShadow = signal(false)
export const showSearchInput = signal(false)
export const searchInput = signal('')
export const gradientColor = signal('');
export const previewURL = signal(null)

// Next step: Separate things... Global and local states... Global states should have extra care...

//Local


//Global
export const g_playlists = signal({
    base: [],
    filtered: []
})
export const g_playlistSelected = signal({
    "id": "7pXeVKxejYk69erPcNpRrZ",
    "name": "Spheres",
    "description": "",
    "owner": "Ricardo",
    "ownerid": "21zkb2ejrdp43tlqeirufqjrq",
    "tracksReference": {
        "ref": "https://api.spotify.com/v1/playlists/7pXeVKxejYk69erPcNpRrZ/tracks",
        "total": 5
    },
    "type": {
        "label": "Playlist",
        "value": "PLAYLIST"
    },
    "src": "https://images-ak.spotifycdn.com/image/ab67706c0000bebbfdaefa70d021302582cca486"
})
export const g_songSelected = signal({
    "#": null,
    "track_id": '',
    "title": {},
    "name": '',
    "album": '',
    "artists": [],
    "added_at": '',
    "time": null,
    "formatedTime": '',
    "isPlaying": false,
    "src": {
        "height": null,
        "url": '',
        "width": null
    }, "saved": false
})
export const g_songPlaying = signal(false)
export const g_filterSelected = signal(null)
export const g_sortedBy = signal('RECENTS')
export const g_spotifyMusicList = signal([])
export const g_gradientColor = signal(['#1A1919', '#1A1919', '#1A1919'])
export const g_openSnackbar = signal(false)
export const g_checkPreview = signal({ song: null, check: false })
export const g_initialVolume = signal(1)

