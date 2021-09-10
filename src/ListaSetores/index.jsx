import Setor from "./Setor";
import "./index.css";
import { getData } from "./_actions";
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

function ListaSetores(props) {
    const [listaSetores, setListaSetores] = useState([]);


    useEffect(() => {
        getData(props.dispatch);
        setListaSetores(props.listaSetores);
    }, [JSON.stringify(props.listaSetores)]);

    return (
        <div className="listContent">
            <h2 className="setoresTitle">Setores</h2>
            <ul>
                <li key={listaSetores.id}>
                    <div className="setorItem">
                        <Setor listaSetores={listaSetores}/>
                    </div>
                </li>
            </ul>
        </div>
    );
}

const mapStateToProps = (state) => ({
    listaSetores: state.setores ? state.setores.setores : [],
})
const mapDispatchToProps = dispatch => { 
    return { 
        dispatch, 
        ...bindActionCreators({getData}, dispatch) 
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ListaSetores);