

const songEndpoints = {
    getSongSelected: (authenticationSettings, track_id) => {
        const { access_token, token_type } = authenticationSettings

        // Headers with the Bearer token
        const headers = new Headers();
        headers.append('Authorization', `${token_type} ${access_token}`);
        headers.append('Content-Type', 'application/json');

        const result = fetch(`https://api.spotify.com/v1/tracks/${track_id}`, {
            method: 'GET',
            headers: headers

        }).then(response => response.json());

        return result
    }
}

export default songEndpoints
