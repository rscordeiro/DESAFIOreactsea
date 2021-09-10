import Axios from 'axios';

export function getData(dispatch) {
    Axios.get("http://localhost:3000/setores")
        .then((response) => {
            dispatch({
                type: "READ_SETORES",
                payload: response.data
            })
        });
}