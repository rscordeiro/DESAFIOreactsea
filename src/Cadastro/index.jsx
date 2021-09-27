import { Form, Button, Input, Tag, Modal } from 'antd';
import { useState } from 'react';
import './index.css';
import { addSetor, editSetor } from './_actions';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteCargoObj } from '../ListaCargos/_actions';


function Edicao (props) {
    const [form] = Form.useForm();
    const [ cargos, setCargos] = useState([]);
    const [ cargo, setCargo ] = useState("");
    const [ novosCargos, setNovosCargos ] = useState([]); 
    const [ cargosDeletados, setCargosDeletados ] = useState([]); 

    const [ setorSelected, setSetorSelected ] = useState([]);

    const [ isModalVisible, setIsModalVisible ] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    }

    const modalOkHandler = () => {
        setIsModalVisible(false);
    }

    const modalCancelHandler = () => {
        setIsModalVisible(false);
    }

    //  const refreshScreen = () => {
    //      setSetorSelected([]);  
    //  }

    useEffect(() => {
        setSetorSelected(props.setorSelected);
        if(props.setorSelected.length > 0) {
            form.setFieldsValue({"nome_setor": props.setorSelected[0].nome_setor});
            setCargos(props.cargos.filter(cargos => props.setorSelected[0].fk_cargos.includes(cargos.id)).map(cargo => cargo.nome_cargo));
        }
    }, [JSON.stringify(props.setorSelected)]);
    
    const handleInput = (cargo) => {
        setCargo(cargo.target.value);
    }

    const sendData = (data) => {
        if(setorSelected.length > 0) {
            editSetor(props.dispatch, data.nome_setor, novosCargos, "patch", setorSelected, cargosDeletados);
        } else {
            addSetor(props.dispatch, data.nome_setor, cargos, data.nome_setor, "post");
        }
        form.setFieldsValue({"cargos": ""});
        form.setFieldsValue({"nome_setor": ""});
        setCargos([]);
        setCargo('');
        setSetorSelected([]);
    }

    const addCargo = (cargo) => {
        if(props.cargos.some(uniqueCargo => uniqueCargo.nome_cargo === cargo) || cargos.includes(cargo)) {
            showModal();
        } else {
            if (setorSelected.length > 0) {
                console.log("getting here");
                setNovosCargos([...novosCargos, cargo])
            }
            setCargos([...cargos, cargo]);
            setCargo('');
            form.setFieldsValue({"cargos": ""});
        }
    }

    const deleteCargo = (cargoD) => {
        if(setorSelected.length > 0){
            setCargosDeletados(props.cargos.filter(cargo => cargo.nome_cargo === cargoD));
        } else {
            setCargos(props.cargos.filter((cargoItem) => cargoItem !== cargoD));
        }
    }

    return (
        <div className="edicaoContent">
        <h2 className="criarTitle">{setorSelected.length > 0 ? `Editar ${setorSelected[0].nome_setor}` : `Adicionar setor`}</h2>
                <Form onFinish={sendData} form={form}>
                    <Form.Item
                        label="Nome:"
                        name="nome_setor" 
                        className="nomeLabel"
                        rules={[{ required: true, message: 'Insira o nome do setor.' }]}
                    >
                        <Input placeholder="Nome do setor" className="inputSetor"/>
                    </Form.Item>
                    <div className="cargoGroup">
                    <Form.Item
                        label="Cargo(s)" 
                        name="cargos"
                        className="cargoLabel"
                    >
                        <Input placeholder="Cargo" className="inputCargo" onChange={handleInput} id="cargoInput"/>
                    </Form.Item>
                    <Button 
                        type="primary" 
                        className="adicionarButton" 
                        onClick={() => addCargo(cargo)}
                        disabled={cargo === ""}
                    >
                        Adicionar
                    </Button>
                    <Modal title="Cargo Repetido" visible={isModalVisible} onOk={modalOkHandler} onCancel={modalCancelHandler}>
                        <p>Por favor insira apenas cargos novos no cadastro.</p>
                    </Modal>
                    </div>
           
                    {                        
                        cargos.map((cargo) => (
                            <Tag closable key={cargo} onClose={() => deleteCargo(cargo)}>{cargo}</Tag>
                        ))
                    }

                    <div className="saveDiv">
                        <Form.Item>
                            <Button type="primary" htmlType="submit"className="salvarButton">Salvar</Button>
                        </Form.Item>
                    </div>
                </Form>
            </div>
    );
}

const mapStateToProps = (state) => ({
    setorSelected: state.setores.setorSelected ? state.setores.setorSelected : [],
    cargos: state.cargos ? state.cargos.cargos : [],
})

const mapDispatchToProps = dispatch => { 
    return { 
        dispatch, 
        ...bindActionCreators({addSetor}, dispatch) 
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Edicao);