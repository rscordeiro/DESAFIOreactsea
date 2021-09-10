const initialState = {
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

export default function cargosReducer(state = initialState, action) {
    switch(action.type) {
        case 'READ_CARGOS':
            return {
                ...state, cargos: [...action.payload]
            }
        case 'CREATE_CARGOS':
            return {
              ...state, 
              cargos: [...state.cargos, action.payload]
            }
        case 'DELETE_CARGO_ASS' :
            return {
              ...state,
              cargos : [
                ...state.cargos.filter(cargo => cargo.id !== action.payload.fk_cargos)
              ]
            }
        default:
            return state;
    }
}