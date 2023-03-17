import {format} from 'date-fns';

export const catalogosReducer = (state, action) => {
  switch (action.type) {
    case 'medios_desplazamientos':
      return {
        ...state,
        ctl_medios_desplazamientos: {
          data: action.payload.data,
          lastUpdated: format(new Date(), 'dd-MM-yyyy HH:mm:ss'),
        },
      };
    case 'ctl_incidentes':
      return {
        ...state,
        ctl_incidentes: {
          data: action.payload.data,
          lastUpdated: format(new Date(), 'dd-MM-yyyy HH:mm:ss'),
        },
      };
    default:
      return state;
  }
};
