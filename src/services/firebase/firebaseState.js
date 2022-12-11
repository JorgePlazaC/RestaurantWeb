import React, { useReducer } from 'react';

import firebase from '../../firebase';
import FirebaseReducer from './firebaseReducer';
import FirebaseContext from './firebaseContext';

import { OBTENER_PRODUCTOS_EXITO } from '../../types';
import _ from 'lodash';

const FirebaseState = props => {

    // Crear state inicial
    const initialState = {
        pedidos: []
    }

    // useReducer con dispatch  para ejecutar las funciones
    const [ state, dispatch ] = useReducer(FirebaseReducer, initialState);

    // Función que se ejecuta para traer los productos
    const obtenerPedidos = () => {
  

        // consultar firebase
        firebase.db
            .collection('productos')
            .where('existencia', '==', true) // traer solo los que esten en existencia
            .onSnapshot(manejarSnapshot);

        function manejarSnapshot(snapshot) {
            let platillos = snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            });


            // Tenemos resultados de la base de datos
            dispatch({
                type: OBTENER_PRODUCTOS_EXITO,
                payload: platillos
            });
        }
    }


    return (
        <FirebaseContext.Provider
            value={{
                pedidos: state.pedidos,
                firebase,
                obtenerPedidos
            }}
        >
            {props.children}
        </FirebaseContext.Provider>
    )
}

export default FirebaseState;