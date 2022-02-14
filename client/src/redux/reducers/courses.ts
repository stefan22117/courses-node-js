const initialState = {
  };
  
  type Action = {
    type: string,
    payload?: {name:string}
  }
  
  type State = {
  }
  
  export default (
    state : State = initialState,
    action: Action
  ): State => {
    switch (action.type) {
      default:
        return state;
    }
  };
  