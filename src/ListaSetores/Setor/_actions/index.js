import Axios from 'axios';

export function deleteSetor(dispatch, setorId, cargosIds) {
    Axios.delete(`http://localhost:3000/setores/${setorId}`)
        .then((response) => {
            dispatch(
                {
                    type: "DELETE_SETOR",
                    payload: setorId
                }
            ) 
        })
        .then(() => {
            cargosIds.forEach((cargoId) => {
            Axios.delete(`http://localhost:3000/cargos/${cargoId}`)
                .then(
                    (response) => {
                    dispatch(
                        {
                            type: "DELETE_CARGO_ASS",
                            payload: cargoId
                        }
                    )}
                )
            })
        }            
        )
}

export function getSelectedSetor(dispatch, setorSelectedId) {
    Axios.get(`http://localhost:3000/setores/${setorSelectedId}`)
        .then((response) => {
            dispatch(
                {
                    type: 'SELECT_SETOR',
                    payload: response.data
                }
            )
        })
}