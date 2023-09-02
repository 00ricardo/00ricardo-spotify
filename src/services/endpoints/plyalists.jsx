import env from 'react-dotenv';
const playlistEndpoints = {
    getMyPlaylists: (authenticationSettings) => {
        const { access_token, token_type } = authenticationSettings

        // Headers with the Bearer token
        const headers = new Headers();
        headers.append('Authorization', `${token_type} ${access_token}`);
        headers.append('Content-Type', 'application/json');

        // Query Params
        const queryParams = new URLSearchParams()
        queryParams.append('offset', 0)
        queryParams.append('limit', 25)

        const result = fetch(`https://api.spotify.com/v1/users/${env.USERID}/playlists?${queryParams}`, {
            method: 'GET',
            headers: headers

        }).then(response => response.json());

        return result
    },
    getSelectedPlaylist: (authenticationSettings, playlist_id) => {
        const { access_token, token_type } = authenticationSettings

        // Headers with the Bearer token
        const headers = new Headers();
        headers.append('Authorization', `${token_type} ${access_token}`);
        headers.append('Content-Type', 'application/json');

        const result = fetch(`
         https://api.spotify.com/v1/playlists/${playlist_id}`, {
            method: 'GET',
            headers: headers

        }).then(response => response.json());

        return result
    }

}

export default playlistEndpoints
