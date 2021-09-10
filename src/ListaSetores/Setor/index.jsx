import ListaCargos from "../../ListaCargos";
import { Collapse } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useState, useEffect } from "react";
import { deleteSetor, getSelectedSetor} from "./_actions";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './index.css';

const { Panel } = Collapse;

function Setor(props) {  
    const [listaSetores, setListaSetores] = useState([]);

    useEffect(() => {
        setListaSetores(props.listaSetores);
    }, [JSON.stringify(props.listaSetores)]);

    return (
        <div className="setorContent">
            {
                listaSetores.map((setor) => (
                    <Collapse
                        expandIconPosition={"right"}
                        expandIcon={({ isActive}) => <LeftOutlined rotate={isActive ? 90 : 270} />}
                        key={setor.id}
                    >
                        <Panel header={setor.nome_setor} key={setor.id}>
                            <div className="cargosDiv">
                                <ListaCargos {...setor}/>
                            </div>
                            <div className="buttonsDiv">
                                <Button type="primary" className="antiButton editarButton" onClick={() => getSelectedSetor(props.dispatch, setor.id)}>Editar</Button>
                                <Button type="primary" className="antiButton excluirButton" danger onClick={() => {deleteSetor(props.dispatch, setor.id, setor.fk_cargos)}}>Excluir</Button>
                            </div>
                        </Panel>
                    </Collapse>
                ))
            }
        </div>
    );
}

const mapStateToProps = (state) => ({
    listaSetores: state.setores ? state.setores.setores : [],
})

const mapDispatchToProps = dispatch => { 
    return { 
        dispatch, 
        ...bindActionCreators({deleteSetor, getSelectedSetor}, dispatch) 
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Setor);