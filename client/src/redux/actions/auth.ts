import axios from "axios";
import { Dispatch } from "react";

type TDispatch = Dispatch<{
  type: string;
  payload?: any;
}>;
type TFunction = (dispatch: TDispatch) => void;

type TLogin = {
  email: string;
  password: string;
};
type TRegister = {
  name: string;
  email: string;
  password: string;
};

export const register: (credentials: TRegister) => TFunction =
  (credentials): TFunction =>
  (dispatch: TDispatch): void => {
    axios.post("/auth/register", credentials).then((res) => {
      dispatch({
        type: "login",
        payload: res.data,
      });
    });
  };

export const login: (credentials: TLogin) => TFunction =
  (credentials): TFunction =>
  (dispatch: TDispatch): void => {
    dispatch({
      type: "login",
      payload: credentials,
    });
  };

export const checkAuth: () => TFunction =
  (): TFunction =>
  (dispatch: TDispatch): void => {
    axios.get("/auth/get-logged-user").then((res) => {
      dispatch({
        type: "login",
        payload: res.data,
      });
    });
  };

export const logout: () => TFunction =
  (): TFunction =>
  (dispatch: TDispatch): void => {
    axios.get("/auth/logout").then((res) => {
      dispatch({
        type: "logout",
      });
    });
  };
