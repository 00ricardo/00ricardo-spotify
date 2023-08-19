
import Sidebar from './Sidebar';
import PlayBar from './PlayBar';
import Spotify from './Spotify';
import { useQuery } from '@tanstack/react-query';
import authEndpoints from '../services/endpoints/auth'
import { TailSpin } from 'react-loader-spinner'
import { Avatar, } from '@mui/material';
import spotifyLogo from '../public/img/spotify-logo.png'
import Alert from '@mui/material/Alert';
function Application() {

  function wait(callback, milliseconds) {
    return new Promise((resolve, reject) => {
      const startTime = Date.now();

      const interval = setInterval(() => {
        const currentTime = Date.now();
        const elapsedTime = currentTime - startTime;

        if (elapsedTime >= milliseconds) {
          clearInterval(interval);
          // Run the provided function
          const result = callback()
          return resolve(result)
        }

      }, 100); // Run every 100 milliseconds
    });
  }

  const { data, error, isLoading } = useQuery({
    queryKey: ['spotify-auth'],
    enabled: true, // Enable the query immediately
    queryFn: () => wait(authEndpoints.authenticate, 1500),
    onSuccess: (data) => {
      localStorage.setItem('authentication', JSON.stringify(data))
    }
  });

  if (isLoading) return (
    <div className='spotify-loading'>
      <h3 style={{ color: 'white' }} >00ricardo Spotify Clone Application</h3>
      <Avatar
        style={{
          height: '100px',
          width: '100px',
          borderRadius: '5px'
        }}
        variant='square'
        src={spotifyLogo}
      />
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h3 style={{ color: 'white', marginRight: '50px' }}>
          Loading...
        </h3>
        <TailSpin
          height="40"
          width="40"
          color="#4fa94d"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    </div>
  )

  if (data) return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '97vh' }}>
      <div style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
        <Sidebar />
        <Spotify />
      </div>
      <PlayBar />
    </div>
  )

  if (error) return (
    <div className='spotify-error'>
      <h3 style={{ color: 'white' }} >00ricardo Spotify Clone Application</h3>
      <Avatar
        style={{
          height: '100px',
          width: '100px',
          borderRadius: '5px'
        }}
        variant='square'
        src={spotifyLogo}
      />
      <Alert variant="filled" severity="error">
        Something went wrong. Try reloading the page!
      </Alert>
    </div>
  )

}

export default Application;
