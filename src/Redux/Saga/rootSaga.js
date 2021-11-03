import { all,takeEvery } from 'redux-saga/effects';
//import brandApi from 'src/api/brandApi';
import { onEditbrand } from '../brandSlice';

// const getApi = () => {
//     return (
//         brandApi.getAll().then(res => res)
//         .catch(error => {throw error}));
// }

function* helloSaga() { console.log('Hello Saga') }
function* testAction(action) { console.log('Log',action) }
function* testSaga() {
    console.log('testSaga Saga');
    yield takeEvery(onEditbrand().type,testAction)
}

export default function* rootSaga() {
    console.log('Root Saga');
    yield all([helloSaga(), testSaga()]);
}