import { createContext, useState, useReducer } from 'react';

export const AuthContext = createContext();

const initialState = {
	token: '',
	isLogin: false,
};
const reducer = (state, action) => {
	switch (action.type) {
		case 'LOGIN_SUCCESS':
			return {
				token: action.payload.token,
				isLogin: true,
			};
		case 'LOGIN_FAILED':
			return {
				token: action.payload.token,
				isLogin: true,
			};
		default:
			break;
	}
};

export default function AuthContextProvider({ children }) {
	const [state, dispatch] = useReducer(reducer, initialState);
	return <AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>;
}
