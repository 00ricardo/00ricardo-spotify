import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  spotify: {
    playlists: {
      base: [],
      filtered: []
    },
    playlistSelected: {
      "id": "1pGyuBcZrhHvJfUXLg2gmu",
      "name": "Progressive Techno v7",
      "description": "",
      "owner": "Ricardo",
      "ownerid": "21zkb2ejrdp43tlqeirufqjrq",
      "tracksReference": {
        "ref": "https://api.spotify.com/v1/playlists/1pGyuBcZrhHvJfUXLg2gmu/tracks",
        "total": 7
      },
      "type": {
        "label": "Playlist",
        "value": "PLAYLIST"
      },
      "src": "https://images-ak.spotifycdn.com/image/ab67706c0000bebbf209a817ae2e41704c3cf988"
    },
    songSelected: {
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
      },
      "saved": false
    },
    songPlaying: false,
    filterSelected: null,
    sortedBy: 'RECENTS',
    spotifyMusicList: [],
    gradientColor: ['#1A1919', '#1A1919', '#1A1919'],
    openSnackbar: false,
    checkPreview: { song: null, check: false },
    initialVolume: 1
  },
};

const setInitialVolumeReducer = (state, action) => {
  const value = action.payload ? action.payload : 1;
  const _state = state.spotify
  _state.initialVolume = value
}

const setPlaylistsBaseReducer = (state, action) => {
  const value = action.payload ? [...action.payload] : [];
  const _state = state.spotify
  _state.playlists.base = value
  localStorage.setItem('playlists', JSON.stringify(value))
}

const setPlaylistsFilteredReducer = (state, action) => {
  const value = action.payload ? [...action.payload] : [];
  const _state = state.spotify
  _state.playlists.filtered = value
}

const setFilterSelectedReducer = (state, action) => {
  const value = action.payload ? (action.payload).toUpperCase() : null;
  const _state = state.spotify
  _state.filterSelected = value
  localStorage.setItem('filterSelected', value)
}
const setSortdByReducer = (state, action) => {
  const value = action.payload ? (action.payload).toUpperCase() : null;
  const _state = state.spotify
  _state.sortedBy = value
  localStorage.setItem('sortedBy', value)
}
const setSongPlayingReducer = (state, action) => {
  try {
    let newData = []
    const value = action.payload ?? false;
    const _state = state.spotify
    const spotifyMusicList = [..._state.spotifyMusicList]
    const songSelected = { ..._state.songSelected }

    if (!value) {
      newData = spotifyMusicList.map((d, i) => {
        const obj = { ...d, isPlaying: value }
        return obj
      })
    } else {
      const songIdx = songSelected['#']
      const _songIdx = spotifyMusicList.findIndex((d, i) => d['#'] === songIdx)
      if (_songIdx !== -1) {
        spotifyMusicList[_songIdx] = { ...songSelected, isPlaying: value }
      }
      newData = [...spotifyMusicList]
    }

    _state.songPlaying = value
    _state.songSelected = { ...songSelected, isPlaying: value }
    _state.spotifyMusicList = [...newData]

    localStorage.setItem('songPlaying', JSON.stringify(value))
  } catch (error) {
    console.log(error)
  }

}

const setSongSelectedReducer = (state, action) => {
  const value = action.payload ? { ...action.payload } : {};
  const _state = state.spotify
  _state.songSelected = value
  //localStorage.setItem('songSelected', JSON.stringify(value))
}

const setSpotifyMusicListReducer = (state, action) => {
  const value = action.payload ? [...action.payload] : [];
  const _state = state.spotify
  _state.spotifyMusicList = value
  localStorage.setItem('spotifyMusicList', JSON.stringify(value))
}

const setPlaylistSelectedReducer = (state, action) => {
  const value = action.payload ? { ...action.payload } : {};
  const _state = state.spotify
  _state.playlistSelected = value
  localStorage.setItem('playlistSelected', JSON.stringify(value))
}

const setGradientColorReducer = (state, action) => {
  const value = action.payload ? [...action.payload] : [];
  const _state = state.spotify
  _state.gradientColor = value
}

const setOpenSnackbarReducer = (state, action) => {
  const value = action.payload ? action.payload : false;
  const _state = state.spotify
  _state.openSnackbar = value
}

const setCheckPreviewReducer = (state, action) => {
  const value = action.payload ? { ...action.payload } : { song: null, check: false };
  const _state = state.spotify
  _state.checkPreview = value
}

const SpotifySlice = createSlice({
  name: 'spotify',
  initialState,
  reducers: {
    setPlaylistsBase: setPlaylistsBaseReducer,
    setPlaylistsFiltered: setPlaylistsFilteredReducer,
    setFilterSelected: setFilterSelectedReducer,
    setSortdBy: setSortdByReducer,
    setSongPlaying: setSongPlayingReducer,
    setSongSelected: setSongSelectedReducer,
    setSpotifyMusicList: setSpotifyMusicListReducer,
    setPlaylistSelected: setPlaylistSelectedReducer,
    setGradientColor: setGradientColorReducer,
    setOpenSnackbar: setOpenSnackbarReducer,
    setCheckPreview: setCheckPreviewReducer,
    setInitialVolume: setInitialVolumeReducer
  }
});

export const {
  setPlaylistsBase,
  setPlaylistsFiltered,
  setFilterSelected,
  setSortdBy,
  setSongPlaying,
  setSongSelected,
  setSpotifyMusicList,
  setPlaylistSelected,
  setGradientColor,
  setOpenSnackbar,
  setCheckPreview,
  setInitialVolume
} = SpotifySlice.actions;

export default SpotifySlice.reducer;

