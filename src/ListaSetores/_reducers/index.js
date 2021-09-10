const initialState = {
    "setores": [
        {
          "id": 0,
          "nome": "Financeiro",
          "fk_cargos": [0, 1]
        },
        {
          "id": 1,
          "nome": "RH",
          "fk_cargos": [2, 3]
        }
      ],
      "setorSelected": []
}
export default function setorReducer(state = initialState, action) {
    switch(action.type) {
        case 'READ_SETORES':
            return {
                ...state, 
                setores: [...action.payload],
            }
        case 'CREATE_SETOR':
            return {
                ...state, 
                setores: [...state.setores, action.payload]
            }
        case 'SELECT_SETOR' :
            return {
                ...state, 
                setorSelected: [action.payload]
            }
        case 'EDIT_SETOR' :
            return {
                ...state,
                setores: [...state.setores, action.payload],
                setorSelected: []
            }
        case 'DELETE_SETOR':
            return {
                 ...state,
                setores : [
                     ...state.setores.filter(setor => setor.id !== action.payload)
                ]
            }
        default:
            return state;
    }
}