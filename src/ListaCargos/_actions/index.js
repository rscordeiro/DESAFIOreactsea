import Axios from 'axios';

export function getCargos(dispatch) {
    Axios.get("http://localhost:3000/cargos")
        .then((response) => {
            dispatch({
                type: "READ_CARGOS",
                payload: response.data
            })
        });

}

export function postCargos (dispatch, data) {
    Axios.post("http://localhost:3000/cargos", data)
    .then((response) => {
        dispatch({
            type: "CREATE_CARGOS",
            payload: response.data
        })
    });
}