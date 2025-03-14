import {useNavigate} from "react-router-dom";
import AlphabetBoard from "../components/AlphabetBoard.jsx";

const GameBoard = () => {
    const navigate = useNavigate();
    return <AlphabetBoard onStartPractice={() => navigate('/game')} />;
};

export default GameBoard;