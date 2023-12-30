import { useReducer, useContext, createContext } from "react";

export const BetContext = createContext();
// initail state which will be passed to the whole component tree using the context api and we will use only single hook for whole project...

const initialState = {
  isLogin: false,
  isPlane: false,
  gameStarted: false,
  isBet1: false,
  isBet2: false,
  extraBetAmount1: 10.0,
  extraBetAmount2: 10.0,
  withdrawn1: false,
  withdrawn2: false,
  caseOut1:1.0,
  caseOut2:1.0,
  
};

// Reducer Function ....
const betReducer = (state, action) => {
  // console.log(state, action);
  switch (action.type) {
    case "incExtra1":
      return {
        ...state,
        extraBetAmount1: !action.payload
          ? state.extraBetAmount1 + 10.0
          : action.payload,
      };
    case "decExtra1":
      return {
        ...state,
        extraBetAmount1: !action.payload
          ? state.extraBetAmount1 - 10.0
          : action.payload,
      };

    case "incExtra2":
      return {
        ...state,
        extraBetAmount2: !action.payload
          ? state.extraBetAmount2 + 10.0
          : action.payload,
      };
    case "decExtra2":
      return {
        ...state,
        extraBetAmount2: !action.payload
          ? state.extraBetAmount2 - 10.0
          : action.payload,
      };
    case "withdrawn1":
      return { ...state, withdrawn1: true };
    case "withdrawn2":
      return { ...state, withdrawn2: true };
    case "isPlane":
      return { ...state, isPlane: !state.isPlane };
    case "isBet1":
      return { ...state, isBet1: !action.payload ? true : action.payload };
    case "isBet2":
      return { ...state, isBet2: !action.payload ? true : action.payload };
    case "setLogin":
      return { ...state, isLogin: !action.payload ? false : action.payload };
    default:
      console.error(
        "Unknown action. Please check your action type in the dispatch function."
      );
      return state; // Return the current state in case of an unknown action
  }
};

const BetProvider = ({ children }) => {
  const [state, dispatch] = useReducer(betReducer, initialState);

  return (
    <BetContext.Provider value={{ state, dispatch }}>
      {children}
    </BetContext.Provider>
  );
};

const useBetContext = () => {
  const context = useContext(BetContext);
  if (!context) {
    throw new Error("useBetContext must be used within an BetProvider");
  }
  return context;
};

export { BetProvider, useBetContext };
