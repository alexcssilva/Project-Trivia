const initialState = {
  rached: '',
  name: '',
  token: '',
  email: '',
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
  case 'SET_EMAIL':
    return {
      ...state,
      email: action.payload,
    };
  default:
    return state;
  }
};

export default login;
