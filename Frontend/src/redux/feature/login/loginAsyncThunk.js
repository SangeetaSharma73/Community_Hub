import { createAsyncThunk } from "@reduxjs/toolkit";
import { getData } from "../../../services/httpMethods";
import { USER_LOGIN_API } from "../../../utils/endpoint";
import { FETCH_USER } from "./constant";
export const fetchUserDetails = createAsyncThunk(FETCH_USER, async () => {
  const response = await getData(USER_LOGIN_API);
  return response;
});
