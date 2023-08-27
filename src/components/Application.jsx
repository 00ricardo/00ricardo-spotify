
import Sidebar from './Sidebar';
import PlayBar from './PlayBar';
import Spotify from './Spotify';
import { useQuery } from '@tanstack/react-query';
import authEndpoints from '../services/endpoints/auth'
import { TailSpin } from 'react-loader-spinner'
import { Avatar, Alert, Snackbar } from '@mui/material';
import spotifyLogo from '../public/img/spotify-logo.png'
import { useDispatch, useSelector } from 'react-redux';
import { setOpenSnackbar } from '../redux/reducers/spotifyReducer';
function Application() {

  const dispatch = useDispatch()
  const { openSnackbar } = useSelector((state) => state.spotify)

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

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(setOpenSnackbar(false));
  };

  const SnackbarPreviewURLNull = () => (
    <Snackbar
      open={openSnackbar}
      autoHideDuration={10000}
      onClose={handleCloseSnackbar}>
      <Alert
        severity='error'
        onClose={handleCloseSnackbar}
        sx={{ width: '100%', color: 'var(--spotify-red)' }}>
        This song doesn't have a preview. Please try another song.
      </Alert>
    </Snackbar>
  )

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
      {openSnackbar && <SnackbarPreviewURLNull />}
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
