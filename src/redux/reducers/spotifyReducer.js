import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  playlists: {
    base: [
      { name: 'Musicas curtidas', type: { label: 'Playlist', value: 'PLAYLIST' }, owner: 'Ricardo' },
      { name: 'Runaljod', type: { label: 'Album', value: 'ALBUM' }, owner: 'Wardruna' },
      { name: 'Spheres', type: { label: 'Playlist', value: 'PLAYLIST' }, owner: 'Ricardo' },
      { name: 'Ed Steele', type: { label: 'Artist', value: 'ARTIST' }, owner: '' },
      { name: 'Three Days Grace', type: { label: 'Artist', value: 'ARTIST' }, owner: '' },
      { name: 'Progressive Techno V1', type: { label: 'Playlist', value: 'PLAYLIST' }, owner: 'Ricardo' },
      { name: 'Progressive Techno V2', type: { label: 'Playlist', value: 'PLAYLIST' }, owner: 'Ricardo' }
    ],
    filtered: [
      { name: 'Musicas curtidas', type: { label: 'Playlist', value: 'PLAYLIST' }, owner: 'Ricardo' },
      { name: 'Runaljod', type: { label: 'Album', value: 'ALBUM' }, owner: 'Wardruna' },
      { name: 'Spheres', type: { label: 'Playlist', value: 'PLAYLIST' }, owner: 'Ricardo' },
      { name: 'Ed Steele', type: { label: 'Artist', value: 'ARTIST' }, owner: '' },
      { name: 'Three Days Grace', type: { label: 'Artist', value: 'ARTIST' }, owner: '' },
      { name: 'Progressive Techno V1', type: { label: 'Playlist', value: 'PLAYLIST' }, owner: 'Ricardo' },
      { name: 'Progressive Techno V2', type: { label: 'Playlist', value: 'PLAYLIST' }, owner: 'Ricardo' }
    ]
  },
  playlistSelected: {
    title: 'Music Of The Spheres',
    author: 'Coldplay'
  },
  songSelected: {
    "#": 1,
    title: null,
    plays: "IN",
    time: 1324171354,
    isPlaying: false
  },
  songPlaying: false,
  filterSelected: null,
  sortedBy: 'RECENTS',
  spotifyMusicList: [
    {
      "#": 1,
      "title": null, "name": "Dummy Music Name",
      "plays": "IN",
      "time": 1324171354,
      "isPlaying": false
    },
    {
      "#": 2,
      "title": null, "name": "Dummy Music Name",
      "plays": "CN",
      "time": 1403500365,
      "isPlaying": false
    },
    {
      "#": 3,
      "title": null, "name": "Dummy Music Name",
      "plays": "IT",
      "time": 60483973,
      "isPlaying": false
    },
    {
      "#": 4,
      "title": null, "name": "Dummy Music Name",
      "plays": "US",
      "time": 327167434,
      "isPlaying": false
    },
    {
      "#": 5,
      "title": null, "name": "Dummy Music Name",
      "plays": "CA",
      "time": 37602103,
      "isPlaying": false
    },
    {
      "#": 6,
      "title": null, "name": "Dummy Music Name",
      "plays": "AU",
      "time": 25475400,
      "isPlaying": false
    },
    {
      "#": 7,
      "title": null, "name": "Dummy Music Name",
      "plays": "DE",
      "time": 83019200,
      "isPlaying": false
    },
    {
      "#": 8,
      "title": null, "name": "Dummy Music Name",
      "plays": "IE",
      "time": 4857000,
      "isPlaying": false
    },
    {
      "#": 9,
      "title": null, "name": "Dummy Music Name",
      "plays": "MX",
      "time": 126577691,
      "isPlaying": false
    },
    {
      "#": 10,
      "title": null, "name": "Dummy Music Name",
      "plays": "JP",
      "time": 126317000,
      "isPlaying": false
    },
    {
      "#": 11,
      "title": null, "name": "Dummy Music Name",
      "plays": "FR",
      "time": 67022000,
      "isPlaying": false
    },
    {
      "#": 12,
      "title": null, "name": "Dummy Music Name",
      "plays": "GB",
      "time": 67545757,
      "isPlaying": false
    },
    {
      "#": 13,
      "title": null, "name": "Dummy Music Name",
      "plays": "RU",
      "time": 146793744,
      "isPlaying": false
    },
    {
      "#": 14,
      "title": null, "name": "Dummy Music Name",
      "plays": "NG",
      "time": 200962417,
      "isPlaying": false
    },
    {
      "#": 15,
      "title": null, "name": "Dummy Music Name",
      "plays": "BR",
      "time": 210147125,
      "isPlaying": false
    }
  ]
};

const setPlaylistsReducer = (state, action) => {
  const value = action.payload ? [...action.payload] : [];
  state.playlists.filtered = value
  localStorage.setItem('playlists', JSON.stringify(value))
}
const setFilterSelectedReducer = (state, action) => {
  const value = action.payload ? (action.payload).toUpperCase() : null;
  state.filterSelected = value
  localStorage.setItem('filterSelected', value)
}
const setSortdByReducer = (state, action) => {
  const value = action.payload ? (action.payload).toUpperCase() : null;
  state.sortedBy = value
  localStorage.setItem('sortedBy', value)
}
const setSongPlayingReducer = (state, action) => {
  const value = action.payload ?? false;
  state.songPlaying = value
}

const setSongSelectedReducer = (state, action) => {
  const value = action.payload ? { ...action.payload } : {};
  state.songSelected = value
}

const setSpotifyMusicListReducer = (state, action) => {
  const value = action.payload ? [...action.payload] : [];
  state.spotifyMusicList = value
}

const SpotifySlice = createSlice({
  name: 'spotify',
  initialState,
  reducers: {
    setPlaylists: setPlaylistsReducer,
    setFilterSelected: setFilterSelectedReducer,
    setSortdBy: setSortdByReducer,
    setSongPlaying: setSongPlayingReducer,
    setSongSelected: setSongSelectedReducer,
    setSpotifyMusicList: setSpotifyMusicListReducer
  }
});

export const {
  setPlaylists,
  setFilterSelected,
  setSortdBy,
  setSongPlaying,
  setSongSelected,
  setSpotifyMusicList
} = SpotifySlice.actions;

export default SpotifySlice.reducer;

