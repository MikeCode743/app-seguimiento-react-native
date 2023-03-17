import { Icon } from '@rneui/base'
import React, { useState } from 'react'
import { Text, TouchableHighlight, View } from 'react-native'
import { TooltipComponent } from '../components/TooltipComponent'
import { styles } from '../styles/style'

export const Registrarse = ({navigation}) => {


    const touchInvestigator = (perfil) => {
        navigation.navigate( 'FormularioRegistro', {perfil})
    }

    const infoGeneral = [
        { key: '• Cada usuario tiene funcionalidades distintas' },
        { key: '• Tendrás diferentes experiencias con cada perfil' },
        { key: '• Puedes acceder al sitio web con estos usuarios' },
        { key: '• Si eres estudiante te sugerimos ser participante' },
        { key: '• Si estás interesado en los datos te sugerimos ser investigador' },
    ]

    const infoInvestigador = [
        { key: '• Este perfil pasara por una previa aprobación' },
        { key: '• Como investigador podre ver datos de los desplazamientos generales' },
    ]

    const infoParticipante = [
        { key: '• Como participante podre registrar mis desplazamientos' },
        { key: '• Como participante podre seleccionar mis medios de desplazamientos' },
    ]

    const investigador = { type: 'investigador', id: 3 }
    const participante = { type: 'participante', id: 2 }

    return (
        <View style={styles.container}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignContent: 'center',
                marginTop: 100,
            }}>
                <Text style={styles.titleText}>
                    Elige el tipo de usuario configurar
                </Text>
                <TooltipComponent
                    text={infoGeneral}
                    icon={{
                        name: 'information',
                        type: 'material-community',
                        color: 'black',
                        size: 25,
                        style: {
                            marginTop: 12
                        }
                    }}
                    tooltip={{
                        width: 400,
                        height: 160,
                        color: 'white',
                        colorText: 'black'
                    }}
                />
            </View>

            <TouchableHighlight style={{
                ...styles.body,
                flex: 2,
                justifyContent: 'center',
                borderWidth: 2,
                borderRadius: 20,
                marginHorizontal: "20%",
                marginBottom: "20%",
                marginTop: "20%",
                backgroundColor: '#A31621',
                paddingHorizontal: 0,
                paddingTop: 0,

            }}
                onPress={() => touchInvestigator(investigador)}
            >
                <View style={{
                    flex: 1,
                    width: '100%'

                }}>
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Icon
                            name='account-hard-hat'
                            type='material-community'
                            size={50}
                            color='white'
                        />
                        <Text style={{
                            color: 'white',
                            fontSize: 30,
                        }}>
                            Investigador
                        </Text>
                    </View>
                    <View style={{
                        width: '100%',
                        position: 'absolute',
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        alignContent: 'flex-start',
                    }}>
                        <TooltipComponent
                            text={infoInvestigador}
                            icon={{
                                name: 'information',
                                type: 'material-community',
                                color: 'white',
                                size: 35,
                                style: {
                                    marginTop: 5,
                                    marginRight: 5,
                                }

                            }}
                            tooltip={{
                                width: 400,
                                height: 95,
                                color: 'white',
                                colorText: 'black'
                            }}
                        />
                    </View>

                </View>

            </TouchableHighlight>
            <TouchableHighlight style={{
                ...styles.body,
                flex: 2,
                justifyContent: 'center',
                borderWidth: 2,
                borderRadius: 20,
                marginHorizontal: "20%",
                marginBottom: "20%",
                backgroundColor: '#111d4a',
                paddingTop: 0,
                paddingHorizontal: 0,


            }}
                onPress={() => touchInvestigator(participante)}
            >
                <View style={{
                    flex: 1,
                    width: '100%',
                }}>
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }} >
                        <Icon
                            name='map-marker-distance'
                            type='material-community'
                            size={50}
                            color='white'
                        />

                        <Text style={{
                            color: 'white',
                            fontSize: 30,
                        }}>
                            Participante
                        </Text>
                    </View>
                    <View style={{
                        width: '100%',
                        position: 'absolute',
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        alignContent: 'flex-start',
                    }}>
                        <TooltipComponent
                            text={infoParticipante}
                            icon={{
                                name: 'information',
                                type: 'material-community',
                                color: 'white',
                                size: 25,
                                style: {
                                    marginTop: 5,
                                    marginRight: 5,
                                }

                            }}
                            tooltip={{
                                width: 400,
                                height: 110,
                                color: 'white',
                                colorText: 'black'
                            }}
                        />
                    </View>
                </View>


            </TouchableHighlight>

        </View >
    )
}

