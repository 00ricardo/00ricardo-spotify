import { signal } from '@preact/signals-react';

//Local
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
export const previewURL = signal(null)

//Global
export const g_songPlaying = signal(false)
export const g_filterSelected = signal(null)
export const g_sortedBy = signal('RECENTS')
export const g_spotifyMusicList = signal([])
export const g_gradientColor = signal(['#1A1919', '#1A1919', '#1A1919'])
export const g_openSnackbar = signal(false)
export const g_checkPreview = signal({ song: null, check: false })
export const g_initialVolume = signal(1)
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


// When song ends
/*songTime.value = (() => {
    if (songTime.value === songTimeMax) {
        console.log("1")
        clearInterval(timer);
        batch(() => {
            timerRef.value = null;
            songTimeParser.value = '00:00';
            songTimeProgress.value = 0; // Reset progress
        })
        jumpToNextSong()
        return 0;
    }

    // Update song time and progress
    const _oldTimer = songTime.value + (songTimeMax - 29) === songTimeMax - 29 ? songTimeMax - 29 : songTime.value + (songTimeMax - 29)
    console.log("_oldTimer", _oldTimer)
    songTimeParser.value = (() => {
        if (songTimeParser.value === formatTime(songTimeMax)) {
            jumpToNextSong()
            return formatTime(0);
        }
        return formatTime(_oldTimer + 1)
    });
    console.log(" songTimeParser.value", songTimeParser.value)
    songTimeProgress.value = (() => {
        //Jump to next Song
        if (songTimeProgress.value >= 100 || songTimeParser === formatTime(songTimeMax)) {
            jumpToNextSong()
            return 0
        } else {

            const _oldTimer = songTimeProgress.value + stepper === stepper ? ((songTimeMax - 29) * 100) / songTimeMax : songTimeProgress.value
            return _oldTimer + stepper
        }

    });
    console.log("aa")
    return songTime.value + 1;
});*/