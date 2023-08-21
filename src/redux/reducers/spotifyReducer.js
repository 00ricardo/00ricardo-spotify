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
      "#": 1,
      "track_id": "4b2rlKIqyLxpxoIaG7sZ5K",
      "title": {
        "type": "div",
        "key": null,
        "ref": null,
        "props": {
          "style": {
            "display": "flex",
            "alignItems": "center"
          },
          "children": [
            {
              "type": {
                "propTypes": {}
              },
              "key": null,
              "ref": null,
              "props": {
                "style": {
                  "height": "40px",
                  "width": "40px"
                },
                "variant": "square",
                "src": "https://i.scdn.co/image/ab67616d0000b2732f952feea610a910c7daf561"
              },
              "_owner": null,
              "_store": {}
            },
            {
              "type": "div",
              "key": null,
              "ref": null,
              "props": {
                "style": {
                  "paddingLeft": "20px"
                },
                "children": [
                  {
                    "type": "div",
                    "key": null,
                    "ref": null,
                    "props": {
                      "style": {
                        "paddingBottom": "5px",
                        "color": "var(--spotify-white)"
                      },
                      "children": "Save Me"
                    },
                    "_owner": null,
                    "_store": {}
                  },
                  {
                    "type": "div",
                    "key": null,
                    "ref": null,
                    "props": {
                      "style": {
                        "color": "var(--spotify-grey)"
                      },
                      "children": "Anyma, Cassian, Poppy Baskcomb"
                    },
                    "_owner": null,
                    "_store": {}
                  }
                ]
              },
              "_owner": null,
              "_store": {}
            }
          ]
        },
        "_owner": null,
        "_store": {}
      },
      "name": "Save Me",
      "album": "Genesys",
      "artists": ["Anyma", "Cassian", "Poppy Baskcomb"],
      "added_at": "Aug 11, 2023",
      "time": 189.783,
      "formatedTime": "03:09",
      "isPlaying": false,
      "src": {
        "height": 640,
        "url": "https://i.scdn.co/image/ab67616d0000b2732f952feea610a910c7daf561",
        "width": 640
      },
      "saved": false
    },
    songPlaying: false,
    filterSelected: null,
    sortedBy: 'RECENTS',
    spotifyMusicList: [],
    gradientColor: ['#1A1919', '#1A1919', '#1A1919']
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
  localStorage.setItem('songPlaying', JSON.stringify(value))
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

