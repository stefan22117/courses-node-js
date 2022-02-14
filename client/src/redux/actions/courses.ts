import axios from "axios";
import { Dispatch } from "react";

type TDispatch = Dispatch<{
  type: string;
  payload?: any;
}>;
type TFunction = (dispatch: TDispatch) => void;

type TCourse = {
  title: string;
  description?: string;
};
// type TRegister = {
//   name: string;
//   email: string;
//   password: string;
// };


export const fetch: (course: TCourse) => TFunction =
  (course): TFunction =>
  (dispatch: TDispatch): void => {
    axios.post("/courses/create-course", course).then((res) => {
    //   dispatch({
    //     type: "create", //course
    //     payload: res.data,
    //   });
        //treba da vraca promis, jer ja ne znam u komponentama sta je uradio ????

    });
  };



export const create: (course: TCourse) => TFunction =
  (course): TFunction =>
  (dispatch: TDispatch): void => {
    axios.post("/courses/create-course", course).then((res) => {
    //   dispatch({
    //     type: "create", //course
    //     payload: res.data,
    //   });
        //treba da vraca promis, jer ja ne znam u komponentama sta je uradio ????

    });
  };
