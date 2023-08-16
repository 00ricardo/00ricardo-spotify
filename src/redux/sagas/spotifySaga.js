import { takeLatest } from 'redux-saga/effects';
import { setPlaylists, setFilterSelected } from '../reducers/spotifyReducer';

function* SpotifySagaHandler(action) {
    try {
        const data = yield action.payload
        console.log(data)
    } catch (error) {
        console.error(error)
    }
}

function* SpotifySaga() {
    yield takeLatest([setPlaylists, setFilterSelected], SpotifySagaHandler);
}

export default SpotifySaga;