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
  sortedBy: 'RECENTS'
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


const SpotifySlice = createSlice({
  name: 'spotify',
  initialState,
  reducers: {
    setPlaylists: setPlaylistsReducer,
    setFilterSelected: setFilterSelectedReducer,
    setSortdBy: setSortdByReducer,
    setSongPlaying: setSongPlayingReducer,
    setSongSelected: setSongSelectedReducer
  }
});

export const {
  setPlaylists,
  setFilterSelected,
  setSortdBy,
  setSongPlaying,
  setSongSelected
} = SpotifySlice.actions;

export default SpotifySlice.reducer;

