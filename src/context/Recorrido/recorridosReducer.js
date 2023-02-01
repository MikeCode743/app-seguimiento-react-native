// generaEstado
export const recorridosReducer = (state, action) => {
  switch (action.type) {
    case 'actualizar-recorrido':
      return {
        ...state,
        listado: action.recorrido,
        ultimaActualizacion: new Date(),
        // username: 'no-username-yet',,
      };

    case 'obtener':
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
