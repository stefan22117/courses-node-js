const initialState = {
  user: {},
  isLoggedIn:false
};

type Action = {
  type: string,
  payload?: {name:string}
}

type State = {
  user: any,
  isLoggedIn: boolean
}

export default (
  state : State = initialState,
  action: Action
): State => {
  switch (action.type) {
    case "register":
    case "login":
      return { ...state, user: action.payload, isLoggedIn:true };
    case "logout":
      return {...state, isLoggedIn:false};

    default:
      return state;
  }
};
