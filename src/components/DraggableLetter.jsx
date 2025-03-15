import {useDrag} from "react-dnd";

const DraggableLetter = ({ letter, id }) => {
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
            className={`w-14 h-14 flex items-center justify-center bg-[#F4C7C7] border-2 border-[#E34234] 
                       text-3xl font-bold text-[#E34234] rounded-lg cursor-move
                       transition-all duration-200 select-none
                       hover:bg-[#f0baba] hover:border-[#c93a2e] hover:shadow-md
                       ${isDragging ? 'opacity-90 scale-110 ring-2 ring-[#E34234] shadow-lg z-50' : 'hover:scale-105'}`}
        >
            {letter}
        </div>
    );
};

export default DraggableLetter;
