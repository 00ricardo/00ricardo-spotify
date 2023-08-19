import { takeLatest } from 'redux-saga/effects';
import { setPlaylistsFiltered, setFilterSelected } from '../reducers/spotifyReducer';

function* SpotifySagaHandler(action) {
    try {
        // eslint-disable-next-line no-unused-vars
        const data = yield action.payload
        //console.log(data)
    } catch (error) {
        console.error(error)
    }
}

function* SpotifySaga() {
    yield takeLatest([setPlaylistsFiltered, setFilterSelected], SpotifySagaHandler);
}

export default SpotifySaga;