const initialState = {
  rached: '',
  name: '',
  token: '',
};

const login = (state = initialState, action) => {
  switch (action.type) {
  case 'RACHED':
    return {
      ...state,
      rached: action.payload,
    };
  case 'SET_NAME':
    return {
      ...state,
      name: action.payload,
    };
  case 'SET_TOKEN':
    return {
      ...state,
      token: action.payload,
    };
  default:
    return state;
  }
};

export default login;
