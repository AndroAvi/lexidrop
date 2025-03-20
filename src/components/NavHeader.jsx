import {useLocation, useNavigate} from "react-router-dom";
import { useState } from "react";
import logo from "../assets/logo.svg";
import { colors, buttons, interactive, combineClasses } from '../styles/styles';

const NavHeader = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const navigateTo = (path) => {
        navigate(path);
        setMobileMenuOpen(false);
    };

    return (
        <header className={combineClasses(
            "fixed top-0 left-0 right-0", 
            colors.primary + "/90 backdrop-blur-lg shadow-lg", 
            interactive.transition, 
            "z-50"
        )}>
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex-shrink-0 cursor-pointer" onClick={() => navigateTo('/')}>
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

                    {/* Desktop Navigation */}
                    <div className="hidden sm:flex sm:space-x-8">
                        <button
                            onClick={() => navigateTo('/')}
                            className={combineClasses(
                                location.pathname === '/' ? buttons.navButtonActive : buttons.navButtonInactive,
                                colors.lightTextHover,
                                buttons.navButton
                            )}
                        >
                            Home
                        </button>
                        <button
                            onClick={() => navigateTo('/game_board')}
                            className={combineClasses(
                                location.pathname === '/game_board' ? buttons.navButtonActive : buttons.navButtonInactive,
                                colors.lightTextHover,
                                buttons.navButton
                            )}
                        >
                            Game Board
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="sm:hidden">
                        <button 
                            onClick={toggleMobileMenu}
                            className="text-white p-2 focus:outline-none"
                            aria-label="Toggle mobile menu"
                        >
                            <svg 
                                className="h-6 w-6" 
                                xmlns="http://www.w3.org/2000/svg" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                            >
                                {mobileMenuOpen ? (
                                    <path 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        strokeWidth={2} 
                                        d="M6 18L18 6M6 6l12 12" 
                                    />
                                ) : (
                                    <path 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        strokeWidth={2} 
                                        d="M4 6h16M4 12h16M4 18h16" 
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="sm:hidden bg-[#DB5375] border-t border-[#F4C7C7]/20 py-2 animate-fadeIn">
                        <div className="flex flex-col space-y-2 px-2 pt-2 pb-3">
                            <button
                                onClick={() => navigateTo('/')}
                                className={combineClasses(
                                    "block px-3 py-2 rounded-md text-base font-medium",
                                    location.pathname === '/' 
                                        ? "bg-[#E34234] text-white" 
                                        : "text-[#F4C7C7] hover:bg-[#E34234]/40"
                                )}
                            >
                                Home
                            </button>
                            <button
                                onClick={() => navigateTo('/game_board')}
                                className={combineClasses(
                                    "block px-3 py-2 rounded-md text-base font-medium",
                                    location.pathname === '/game_board' 
                                        ? "bg-[#E34234] text-white" 
                                        : "text-[#F4C7C7] hover:bg-[#E34234]/40"
                                )}
                            >
                                Game Board
                            </button>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default NavHeader;
