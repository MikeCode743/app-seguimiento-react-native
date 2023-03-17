import React from 'react'
import { Toast } from 'react-native-toast-message/lib/src/Toast';

export const Notificacion = (
    type = 'success',
    text1 = 'Acción realizada con éxito.',
    text2 = '',
    position = 'top',
    offset
) => {


    return (
        Toast.show({
            type,
            text1,
            text2,
            position,
            ...offset
        });
  )
}
