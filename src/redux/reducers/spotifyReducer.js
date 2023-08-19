import { createSlice } from '@reduxjs/toolkit';
import likedSongsImg from '../../public/img/spotify-liked-songs.png'
const initialState = {
  spotify: {
    playlists: {
      base: [
        { name: 'Liked Songs', type: { label: 'Playlist', value: 'PLAYLIST' }, owner: 'Ricardo', src: likedSongsImg },
        { name: 'Runaljod', type: { label: 'Album', value: 'ALBUM' }, owner: 'Wardruna' },
        { name: 'Spheres', type: { label: 'Playlist', value: 'PLAYLIST' }, owner: 'Ricardo' },
        { name: 'Ed Steele', type: { label: 'Artist', value: 'ARTIST' }, owner: '' },
        { name: 'Three Days Grace', type: { label: 'Artist', value: 'ARTIST' }, owner: '' },
        { name: 'Progressive Techno V1', type: { label: 'Playlist', value: 'PLAYLIST' }, owner: 'Ricardo' },
        { name: 'Progressive Techno V2', type: { label: 'Playlist', value: 'PLAYLIST' }, owner: 'Ricardo' }
      ],
      filtered: [
        { name: 'Liked Songs', type: { label: 'Playlist', value: 'PLAYLIST' }, owner: 'Ricardo', src: likedSongsImg },
        { name: 'Runaljod', type: { label: 'Album', value: 'ALBUM' }, owner: 'Wardruna' },
        { name: 'Spheres', type: { label: 'Playlist', value: 'PLAYLIST' }, owner: 'Ricardo' },
        { name: 'Ed Steele', type: { label: 'Artist', value: 'ARTIST' }, owner: '' },
        { name: 'Three Days Grace', type: { label: 'Artist', value: 'ARTIST' }, owner: '' },
        { name: 'Progressive Techno V1', type: { label: 'Playlist', value: 'PLAYLIST' }, owner: 'Ricardo' },
        { name: 'Progressive Techno V2', type: { label: 'Playlist', value: 'PLAYLIST' }, owner: 'Ricardo' }
      ]
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
    ],
    gradientColor: {
      header: ['#1A1919', '#1A1919', '#1A1919'],
      list: ['#1A1919', '#1A1919', '#1A1919']
    }
  },

};

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
  const value = action.payload ?? false;
  const _state = state.spotify
  _state.songPlaying = value
}

const setSongSelectedReducer = (state, action) => {
  const value = action.payload ? { ...action.payload } : {};
  const _state = state.spotify
  _state.songSelected = value
}

const setSpotifyMusicListReducer = (state, action) => {
  const value = action.payload ? [...action.payload] : [];
  const _state = state.spotify
  _state.spotifyMusicList = value
}

const setPlaylistSelectedReducer = (state, action) => {
  const value = action.payload ? { ...action.payload } : {};
  const _state = state.spotify
  _state.playlistSelected = value
}

const setGradientColorReducer = (state, action) => {
  const value = action.payload ? [...action.payload] : [];
  const _state = state.spotify
  _state.gradientColor = value
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
    setGradientColor: setGradientColorReducer
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
  setGradientColor
} = SpotifySlice.actions;

export default SpotifySlice.reducer;

