/* eslint-disable prettier/prettier */
export const authReducer = (state, action) => {
  switch (action.type) {
    case 'signIn':
      return {
        ...state,
        autenticado: 'autenticado',
        token: action.payload.token,
        mensajeError: '',
      };

    case 'logout':
      return {
        ...state,
        autenticado: 'no-autenticado',
        usuario: undefined,
        token: undefined,
        mensajeError: '',
      };

    case 'error':
      return {
        ...state,
        autenticado: false,
        token: null,
        mensajeError: action.payload.mensaje,
      };
    case 'cleanError':
    return {
        ...state,
        mensajeError: '',
      };

    default:
      return state;
  }
};
