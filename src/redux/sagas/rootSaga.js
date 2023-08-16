import { all } from 'redux-saga/effects';
import SpotifySaga from './spotifySaga'; // Import your dataSaga

export default function* rootSaga() {
    yield all([
        SpotifySaga(),
        // Add other sagas here
    ]);
}

