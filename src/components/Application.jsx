
import Sidebar from './Sidebar';
import PlayBar from './PlayBar';
import Spotify from './Spotify';
function Application() {
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '97vh' }}>
        <div style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
          <Sidebar />
          <Spotify />
        </div>
        <PlayBar />
      </div>
    </>
  );
}

export default Application;
