import {useLocation, useNavigate} from "react-router-dom";
import logo from "../assets/logo.svg";
import { colors, buttons, interactive, combineClasses } from '../styles/styles';

const NavHeader = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <header className={combineClasses(
            "fixed top-0 left-0 right-0", 
            colors.primary + "/90 backdrop-blur-lg shadow-lg", 
            interactive.transition, 
            "z-50"
        )}>
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex-shrink-0 cursor-pointer" onClick={() => navigate('/')}>
                        <div className={combineClasses(
                            "flex items-center space-x-4 group", 
                            interactive.transition, 
                            "ease-in-out"
                        )}>
                            <div className="relative">
                                <img src={logo} alt="LexiDrop Logo" className="w-10 h-10 transition-all duration-700 ease-in-out transform group-hover:scale-110 group-hover:rotate-[360deg] drop-shadow-lg" />
                                <div className="absolute inset-0 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out blur-lg group-hover:blur-xl"></div>
                            </div>
                            <div className="flex flex-col transition-all duration-300 ease-in-out transform group-hover:translate-x-0.5">
                                <span className="text-2xl font-bold text-white tracking-wider transition-all duration-300 ease-in-out drop-shadow-lg">LexiDrop</span>
                            </div>
                        </div>
                    </div>
                    <div className="hidden sm:flex sm:space-x-8">
                        <button
                            onClick={() => navigate('/')}
                            className={combineClasses(
                                location.pathname === '/' ? buttons.navButtonActive : buttons.navButtonInactive,
                                colors.lightTextHover,
                                buttons.navButton
                            )}
                        >
                            Home
                        </button>
                        <button
                            onClick={() => navigate('/game_board')}
                            className={combineClasses(
                                location.pathname === '/game_board' ? buttons.navButtonActive : buttons.navButtonInactive,
                                colors.lightTextHover,
                                buttons.navButton
                            )}
                        >
                            Game Board
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default NavHeader;
