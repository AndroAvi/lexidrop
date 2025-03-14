import {useNavigate} from "react-router-dom";
import TitlePage from "../components/TitlePage";

const Home = () => {
    const navigate = useNavigate();
    return <TitlePage onStartGame={() => navigate('/game_board')} />;
};

export default Home;