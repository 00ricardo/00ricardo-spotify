
import Sidebar from './Sidebar';
import PlayBar from './PlayBar';
import Spotify from './Spotify';
function Application() {
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <Sidebar />
          <Spotify />
        </div>
        <PlayBar />
      </div>
    </>
  );
}

export default Application;
