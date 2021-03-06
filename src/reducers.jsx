import { combineReducers } from "redux"
import setorReducer from "./ListaSetores/_reducers"
import cargosReducer from "./ListaCargos/_reducers"

export const initialState = {
  "setores": [
    {
      "id": 0,
      "nome_setor": "Financeiro",
      "fk_cargos": [0, 1]
    },
    {
      "id": 1,
      "nome_setor": "RH",
      "fk_cargos": [2, 3]
    }
  ],
  "cargos": [
    {
      "id": 0,
      "nome_cargo": "contador(a)"
    },
    {
      "id": 1,
      "nome_cargo": "estagiário(a) do financeiro"
    },
    {
      "id": 2,
      "nome_cargo": "psicólogo(a)"
    },
    {
      "id": 3,
      "nome_cargo": "estagiário(a) do RH"
    }
  ]
}

const reducers = combineReducers({
  setores: setorReducer,
  cargos: cargosReducer,
});

export default reducers;