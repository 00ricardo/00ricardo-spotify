import settings from '../spotify/api'
const authEndoints = {
    authenticate: () => {
        const { client_id, client_secret } = settings

        const headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        const body = new URLSearchParams();
        body.append('grant_type', 'client_credentials');
        body.append('client_id', client_id);
        body.append('client_secret', client_secret);


        const result = fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers,
            body: body.toString(), // Convert the URLSearchParams to a string
        }).then(response => response.json());

        return result
    }

}

export default authEndoints
