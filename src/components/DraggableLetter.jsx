import React from "react";
import { useDrag } from "react-dnd";

const DraggableLetter = ({ letter, id, isKannada = true }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "LETTER",
        item: { id, letter },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            if (!dropResult) {
                // If not dropped on a valid target, add a shake animation
                const el = drag.current;
                if (el) {
                    el.style.animation = 'shake 0.5s';
                    setTimeout(() => {
                        el.style.animation = '';
                    }, 500);
                }
            }
        },
    }));

    const dragPreviewStyle = {
        transform: isDragging ? 'rotate(-5deg)' : 'rotate(0)',
        transition: 'transform 0.2s ease-in-out',
    };

    return (
        <div
            ref={drag}
            style={dragPreviewStyle}
            className={`w-14 h-14 flex items-center justify-center bg-purple-50 border-2 border-purple-300 
                       ${isKannada ? 'text-3xl' : 'text-xl'} font-bold text-purple-700 rounded-lg cursor-move
                       transition-all duration-200 select-none
                       hover:bg-purple-100 hover:border-purple-400 hover:shadow-md
                       ${isDragging ? 'opacity-75 scale-110 ring-2 ring-purple-400 shadow-lg z-50' : 'hover:scale-105'}`}
        >
            {letter}
        </div>
    );
};

export default DraggableLetter;
