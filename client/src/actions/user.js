import {LOGOUT_USER, SET_USER_IS_AUTH} from "./types";

export const setUser = (user) => ({
    type: SET_USER_IS_AUTH,
    payload: user.isAuth
});

export const logout = () => ({
    type: LOGOUT_USER,
});