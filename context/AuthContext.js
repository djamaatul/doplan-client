import { createContext, useState, useReducer } from 'react';

export const AuthContext = createContext();

const initialState = {
	token: null,
	isLogin: false,
	profile: null,
};
const reducer = (state, action) => {
	switch (action.type) {
		case 'LOGIN_SUCCESS':
			return {
				token: action.payload.token,
				isLogin: true,
				profile: action.payload.profile,
			};
		case 'LOGOUT':
		case 'LOGIN_FAILED':
			return {
				token: null,
				isLogin: false,
				profile: null,
			};
		default:
			break;
	}
};

export default function AuthContextProvider({ children }) {
	const [state, dispatch] = useReducer(reducer, initialState);
	return <AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>;
}
