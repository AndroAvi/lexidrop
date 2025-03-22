import {useDrag} from "react-dnd";
import { colors, interactive, combineClasses } from '../styles/styles';

const DraggableLetter = ({ letter, id, progress, setProgress }) => {
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

    const handleInteraction = () => {
        if (progress === "stopped") {
            setProgress("started");
        }
    };

    const dragPreviewStyle = {
        transform: isDragging ? 'rotate(-5deg) scale(1.1)' : 'rotate(0)',
        transition: 'transform 0.15s ease-in-out',
    };

    return (
        <div
            ref={drag}
            style={dragPreviewStyle}
            onMouseDown={handleInteraction}
            onTouchStart={handleInteraction}
            className={combineClasses(
                'w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center',
                isDragging ? 'bg-[#E34234]/90' : 'bg-[#F4C7C7]',
                'text-lg sm:text-xl md:text-2xl font-bold',
                isDragging ? 'text-white' : colors.secondaryText,
                'rounded-md cursor-move',
                interactive.transition,
                'select-none shadow-sm',
                isDragging ? 'shadow-md z-50' : 'hover:bg-[#F4C7C7]/80 hover:text-[#E34234] hover:shadow'
            )}
        >
            {letter}
        </div>
    );
};

export default DraggableLetter;
