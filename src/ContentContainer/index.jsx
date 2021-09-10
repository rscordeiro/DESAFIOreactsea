import ListaSetores from "../ListaSetores";
import Edicao from "../Cadastro";
import { Row, Col } from 'antd';
import "./index.css";
import { Layout } from 'antd';

const { Content } = Layout;

export default function ContentContainer () {
    return (
        <div className="majorContainer">
            <Content>
                <Row>
                <div>
                    <Col span={8}>
                        <div className="lista">
                            <ListaSetores />
                        </div>
                    </Col>
                    <Col span={16}>
                        <div className="edicao">
                            <Edicao />
                        </div>
                    </Col>
                </div>
                </Row>
            </Content>
        </div>
    );
}