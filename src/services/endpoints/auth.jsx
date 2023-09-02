import env from 'react-dotenv';
const authEndoints = {
    authenticate: () => {
        const headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        const body = new URLSearchParams();
        body.append('grant_type', 'client_credentials');
        body.append('client_id', env.CLIENT_ID);
        body.append('client_secret', env.CLIENT_SECRET);


        const result = fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers,
            body: body.toString(), // Convert the URLSearchParams to a string
        }).then(response => response.json());

        return result
    }

}

export default authEndoints
