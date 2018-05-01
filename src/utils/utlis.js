const TOKEN = 'token';
const USER_NAME = 'username';

export const setToken = (token) => localStorage.setItem(TOKEN, token);

export const setUserName = (name) => localStorage.setItem(USER_NAME, name);

export const getToken = () => localStorage.getItem(TOKEN);

export const removeToken = () => localStorage.removeItem(TOKEN);