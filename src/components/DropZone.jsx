import {useState, useEffect} from "react";
import {useDrop} from "react-dnd";
import { colors, interactive, combineClasses } from '../styles/styles';

const DropZone = ({ expectedNative, englishTransliteration, onDrop, reset, isAutoPlaced }) => {
    const [droppedLetter, setDroppedLetter] = useState(null);

    // Reset the dropped letter when reset prop changes
    useEffect(() => {
        if (reset) {
            setDroppedLetter(null);
        }
    }, [reset]);

    // Update droppedLetter when auto-placed
    useEffect(() => {
        if (isAutoPlaced && expectedNative) {
            setDroppedLetter(expectedNative);
        }
    }, [isAutoPlaced, expectedNative]);

    const [{ isOver, canDrop }, drop] = useDrop(() => ({
        accept: "LETTER",
        canDrop: (item) => item.letter === expectedNative,
        drop: (item) => {
            if (item.letter === expectedNative) {
                setDroppedLetter(item.letter);
                onDrop(item);
                return { dropped: true };
            }
            return { dropped: false };
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop(),
        }),
    }));

    // Determine the appropriate style based on the state
    const getDropZoneStyle = () => {
        if (!expectedNative) return 'bg-transparent';
        if (droppedLetter) return 'bg-[#E34234] shadow-sm animate-[pulse_1.5s_ease-in-out_1]';
        if (isOver && canDrop) return 'bg-[#F4C7C7] shadow-sm';
        if (isOver && !canDrop) return 'bg-[#F4C7C7]/40';
        return 'bg-[#F4C7C7] hover:bg-[#F4C7C7]/80';
    };
    
    return (
        <div
            ref={drop}
            className={combineClasses(
                'h-9 w-9 sm:h-10 sm:w-10 md:h-12 md:w-12 flex items-center justify-center',
                getDropZoneStyle(),
                'rounded-md',
                interactive.transition,
                expectedNative && !droppedLetter ? 'cursor-pointer' : ''
            )}
        >
            {expectedNative ? (
                <div className="flex items-center justify-center">
                    {droppedLetter ? (
                        <span className={combineClasses('text-lg sm:text-xl md:text-2xl font-bold text-white select-none')}>
                            {droppedLetter}
                        </span>
                    ) : (
                        <span className={combineClasses('text-xs sm:text-sm md:text-base font-medium text-[#E34234]/90 select-none')}>
                            {englishTransliteration}
                        </span>
                    )}
                </div>
            ) : null}
        </div>
    );
};

export default DropZone;
