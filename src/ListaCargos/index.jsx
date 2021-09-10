import { getCargos } from "./_actions";
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Tag } from 'antd';

function ListaCargos (props) {
    useEffect(() => {
        getCargos(props.dispatch);
    }, [JSON.stringify(props.listaCargos)]);

    return (
        <div className="listCargoContent">
                {props.listaCargos.filter(cargo => props.fk_cargos.includes(cargo.id)).map((cargo) => (
                    <Tag key={cargo.id}>{cargo.nome_cargo}</Tag>
                ))}
        </div>
    );
}

const mapStateToProps = (state) => ({
    listaCargos: state.cargos ? state.cargos.cargos : [],
})
const mapDispatchToProps = dispatch => { 
    return { 
        dispatch, 
        ...bindActionCreators({getCargos}, dispatch) 
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ListaCargos);