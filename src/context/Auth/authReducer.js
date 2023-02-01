// generaEstado
export const authReducer = (state, action) => {
  switch (action.type) {
    case 'signIn':
      return {
        ...state,
        isLoggedIn: true,
        username: 'USERNAME',
        token: 'TOKEN',
        // username: 'no-username-yet',,
      };

    case 'logout':
      return {
        ...state,
        isLoggedIn: false,
        username: undefined,
        token: undefined,

      };

    // case 'changeFavIcon':
    //   return {
    //     ...state,
    //     favoriteIcon: action.payload,,
    //   };;

    // case 'changeUsername':
    //   return {
    //     ...state,
    //     username: action.payload,,
    //   };;

    default:
      return state;
  }
};
