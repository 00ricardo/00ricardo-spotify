import settings from '../spotify/api'

const playlistEndpoints = {
    getMyPlaylists: (authenticationSettings) => {
        const { userid } = settings;
        const { access_token, token_type } = authenticationSettings

        // Headers with the Bearer token
        const headers = new Headers();
        headers.append('Authorization', `${token_type} ${access_token}`);
        headers.append('Content-Type', 'application/json');

        const queryParams = new URLSearchParams()
        queryParams.append('offset', 0)
        queryParams.append('limit', 25)

        const result = fetch(`https://api.spotify.com/v1/users/${userid}/playlists?${queryParams}`, {
            method: 'GET',
            headers: headers

        }).then(response => response.json());

        return result
    }

}

export default playlistEndpoints
