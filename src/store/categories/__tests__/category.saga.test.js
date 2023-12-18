import { call } from "typed-redux-saga/macro";
import { testSaga } from "redux-saga-test-plan";

import {
  fetchCategoriesAsync,
  onFetchCategories,
  categoriesSaga,
} from "../category.saga";

describe("category sagas", () => {
  test("categoriesSaga", () => {
    testSaga(categoriesSaga)
      .next()
      .all([call(onFetchCategories)])
      .next()
      .isDone();
  });
});
