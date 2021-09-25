import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding } from "@fortawesome/free-solid-svg-icons";
import './index.css';
import { Layout, Switch } from 'antd';
import '../utils';
import { toggleTheme } from '../utils';

const { Header } = Layout;

export default function TopHeader () {
    return (
        <Header>
            <div className="logoDiv">
                <FontAwesomeIcon icon={faBuilding} className="iconic"></FontAwesomeIcon>
                <p className="iconTitle">Setores</p>
            </div>

            <div className="switchButton">
                <Switch onChange={(checked) => toggleTheme(checked)}></Switch>
            </div>
        </Header>
    );
}