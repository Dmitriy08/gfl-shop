import {LOGOUT_USER, SET_USER_IS_AUTH} from "./types";

export const setUser = (user) => ({
    type: SET_USER_IS_AUTH,
    payload: user
});

export const logOutUser = () => ({
    type: LOGOUT_USER,
});