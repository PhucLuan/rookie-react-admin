import { call, put, takeLatest } from "@redux-saga/core/effects";
import brandApi from "src/api/brandApi";
import { onLoadbrand, onFetchdata, onUpdatebrand, onRefresh, onCreatebrand, onDeletebrand } from '../brandSlice';

const getAllBrand = () => {
  return (
    brandApi.getAll().then(res => res)
      .catch(error => { throw error }));
}

const update = (brand) => {
  console.log('update', brand)
  return (
    brandApi.put(brand).then(res => alert(res))
      .catch(error => { throw error }));
}

const post = (brand) => {
  return (
    brandApi.post(brand).then(res => alert(res))
      .catch(error => { throw error }));
}

const deleteBrandbyId = (id) => {
  return (
    brandApi.delete(id).then(res => alert(res))
      .catch(error => { throw error }));
}

function* fetchBrands() {
  try {
    const brands = yield call(getAllBrand);
    yield put(onLoadbrand(brands));
  } catch (error) {
    console.log(error)
  }

}

function* updateBrand(action) {

  try {

    yield call(update, action.payload);

    yield put(onRefresh());

  } catch (error) {
    console.log(error)
  }
}

function* postBrand(action){
  try {

    yield call(post, action.payload);

    yield put(onRefresh());

  } catch (error) {
    console.log(error)
  }
}

function* deleteBrand(action){
  try {

    yield call(deleteBrandbyId, action.payload);

    yield put(onRefresh());

  } catch (error) {
    console.log(error)
  }
}

function* brandSaga() {
  yield takeLatest(onFetchdata.type, fetchBrands);
  yield takeLatest(onUpdatebrand.type, updateBrand);
  yield takeLatest(onCreatebrand.type, postBrand);
  yield takeLatest(onDeletebrand.type, deleteBrand)
}

export default brandSaga;