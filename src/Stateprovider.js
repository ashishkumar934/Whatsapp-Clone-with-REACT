import React, { createContext, useContext, useReducer } from "react";

const initialState = {
  user: null,
};

const actionTypes = {
  SET_USER: "SET_USER",
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
      };

    default:
      return state;
  }
};

const StateContext = createContext(); // preparing the data layer where everything actually lives

const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

const useStateValue = () => useContext(StateContext);

export { useStateValue, StateProvider, StateContext };
