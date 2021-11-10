import { all } from 'redux-saga/effects';
import brandSaga from './brandSaga';

export default function* rootSaga() {

    yield all([brandSaga()]);
}