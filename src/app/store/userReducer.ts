import { Action, createReducer, on } from "@ngrx/store";
import { updateEmail, updateName } from "./userAction";

interface CustomAction extends Action {
    payload?: any;
  }

let initialState = {
    name: '',
    email: '',
    mobile: ''
}

export const userReducer = createReducer(initialState, on(updateName, (state, data) => ({...state, name: data.name})),
on(updateEmail, (state, data) => ({...state, email: data.email})))