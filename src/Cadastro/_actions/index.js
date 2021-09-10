import Axios from 'axios';

let cargosIds = [];

export async function addSetor(dispatch, setorName, cargoData, setorData, httpRequest, setorSelected, cargosDeletados = []) {
    let cargosIdPromise;
    try {
        cargosIdPromise = await cargoData.map(cargo => postCargos(cargo));
    } catch (err) {
        console.log(err);
    }
    return getCargosIds(cargosIdPromise, dispatch, setorName, setorData, httpRequest, setorSelected, cargosDeletados);
}

async function getCargosIds(cargosIdPromise, dispatch, setorName, setorData, httpRequest, setorSelected, cargosDeletados) {
    Promise.all(cargosIdPromise).then(results => {
        results.forEach(result => {
            if(result) {
                cargosIds.push(result.data.id);
                dispatch({
                    type: "CREATE_CARGOS",
                    payload: result.data
                })
            }
        });
        if (httpRequest === "post") {
            return postSetor(dispatch, cargosIds, setorData);
        } else if (httpRequest === "patch") {
            return patchSetor(dispatch, cargosIds, setorSelected, setorName, cargosDeletados);
        }
    })
}

function postSetor(dispatch, cargosIds, setorData) {
    Axios.post("http://localhost:3000/setores", dataHandlePost(cargosIds, setorData))
        .then((response) => {
            dispatch({
                type: "CREATE_SETOR",
                payload: response.data
            })
        })
}

function postCargos(cargo) {
    return Axios.post("http://localhost:3000/cargos", {"nome_cargo": cargo});
}

function patchSetor(dispatch, novosCargosIds, setorSelected, setorName, cargosDeletados) {
    Axios.patch(`http://localhost:3000/setores/${setorSelected[0].id}`, dataHandlePatch(setorName, setorSelected, novosCargosIds, cargosDeletados))
    .then((response) => {
        dispatch({
            type: "EDIT_SETOR",
            payload: response.data
        })
    })
}

export function editSetor(dispatch, setorName, novosCargos, httpRequest, setorSelected, cargosDeletados) {
    if (novosCargos.length > 0) {
       addSetor(dispatch, setorName, novosCargos, setorSelected, httpRequest, setorSelected);
    }
    if (cargosDeletados.length > 0) {
       addSetor(dispatch, setorName, novosCargos, setorSelected, httpRequest, setorSelected, cargosDeletados);
    }
    console.log(cargosDeletados);
}

function dataHandlePost (cargoData, setorData) {
    return {
        nome_setor: setorData,
        fk_cargos: cargoData
    };
}

function dataHandlePatch (setorName, setorSelected, novosCargosIds, cargosDeletados) {
    if(cargosDeletados.length > 0) {
        let cargosDeletadosIds = cargosDeletados.map(cargo => cargo.id);
        let newCargos = setorSelected[0].fk_cargos.filter(cargo => !cargosDeletadosIds.includes(cargo));
        return {
            nome_setor: setorName,
            fk_cargos: [...novosCargosIds, ...newCargos]
        }
    } else {
        return {
            nome_setor: setorName,
            fk_cargos: [...novosCargosIds, ...setorSelected[0].fk_cargos]
        };
    }
}