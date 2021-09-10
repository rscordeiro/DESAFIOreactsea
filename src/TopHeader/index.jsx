import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding } from "@fortawesome/free-solid-svg-icons";
import './index.css';
import { Layout } from 'antd';

const { Header } = Layout;

export default function TopHeader () {
    return (
        <Header>
            <div className="logoDiv">
                <FontAwesomeIcon icon={faBuilding} className="iconic"></FontAwesomeIcon>
                <p className="iconTitle">Setores</p>
            </div>
        </Header>
    );
}