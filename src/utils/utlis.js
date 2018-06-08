const TOKEN = 'token';
const USER_NAME = 'username';
const ADMIN = 'admin';

export const setToken = (token) => localStorage.setItem(TOKEN, token);

export const setUserName = (name) => localStorage.setItem(USER_NAME, name);

export const setAdminPermission = () => localStorage.setItem(ADMIN, 'true');

export const getToken = () => localStorage.getItem(TOKEN);

export const getUserName = () => localStorage.getItem(USER_NAME);

export const getAdminPermission = () => localStorage.getItem(ADMIN);

export const removeToken = () => localStorage.removeItem(TOKEN);

export const removeUserName = () => localStorage.removeItem(USER_NAME);

export const removeAdminPermission = () => localStorage.removeItem(ADMIN);

