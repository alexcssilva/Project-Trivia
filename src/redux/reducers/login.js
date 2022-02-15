const initialState = {
  rached: '',
  name: '',
  token: '',
  email: '',
  player: {
    name: '',
    assertions: 0,
    score: 0,
    gravatarEmail: '',
  },
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
  case 'SET_SCORE':
    return {
      ...state,
      score: action.payload,
    };
  case 'SET_PLAYER':
    return {
      ...state,
      player: { ...action.payload },
    };
  default:
    return state;
  }
};

export default login;
