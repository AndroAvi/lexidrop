import {useLocation, useNavigate} from "react-router-dom";
import logo from "../assets/logo.svg";

const NavHeader = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <header className="fixed top-0 left-0 right-0 bg-[#DB5375]/90 backdrop-blur-lg shadow-lg transition-all duration-300 z-50">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex-shrink-0 cursor-pointer" onClick={() => navigate('/')}>
                        <div className="flex items-center space-x-4 group transition-all duration-300 ease-in-out">
                            <div className="relative">
                                <img src={logo} alt="DrLingua Logo" className="w-10 h-10 transition-all duration-700 ease-in-out transform group-hover:scale-110 group-hover:rotate-[360deg] drop-shadow-lg" />
                                <div className="absolute inset-0 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out blur-lg group-hover:blur-xl"></div>
                            </div>
                            <div className="flex flex-col transition-all duration-300 ease-in-out transform group-hover:translate-x-0.5">
                                <span className="text-2xl font-bold text-white tracking-wider transition-all duration-300 ease-in-out drop-shadow-lg">LexiDrop</span>
                                {/*<span className="text-sm text-white/90 font-medium -mt-1 tracking-wide transition-all duration-300 ease-in-out">ಕನ್ನಡ</span>*/}
                            </div>
                        </div>
                    </div>
                    <div className="hidden sm:flex sm:space-x-8">
                        <button
                            onClick={() => navigate('/')}
                            className={`${location.pathname === '/' ? 'text-[#F4C7C7] border-[#F4C7C7]' : 'text-[#F4C7C7]/70 border-transparent'}
                         hover:text-[#F4C7C7] px-3 py-2 text-sm font-medium border-b-2 transition-all duration-200`}
                        >
                            Home
                        </button>
                        <button
                            onClick={() => navigate('/game_board')}
                            className={`${location.pathname === '/game_board' ? 'text-[#F4C7C7] border-[#F4C7C7]' : 'text-[#F4C7C7]/70 border-transparent'}
                         hover:text-[#F4C7C7] px-3 py-2 text-sm font-medium border-b-2 transition-all duration-200`}
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