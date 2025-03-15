import {useState} from "react";
import {useDrop} from "react-dnd";
import { colors, interactive, combineClasses } from '../styles/styles';

const DropZone = ({ expectedNative, englishTransliteration, onDrop }) => {
    const [droppedLetter, setDroppedLetter] = useState(null);
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
        if (!expectedNative) return 'border-[#E34234]/20 bg-[#F4C7C7]/30';
        if (droppedLetter) return 'border-[#E34234] bg-[#E34234] shadow-md scale-100 animate-[pulse_2s_ease-in-out_1]';
        if (isOver && canDrop) return 'border-[#E34234] bg-[#F4C7C7] shadow-lg scale-105';
        if (isOver && !canDrop) return 'border-[#E34234] bg-[#F4C7C7]/50 shadow-lg scale-105';
        return 'border-[#E34234]/50 bg-[#F4C7C7]/80 hover:border-[#E34234] hover:shadow-md hover:bg-[#F4C7C7]';
    };
    
    return (
        <div
            ref={drop}
            className={combineClasses(
                'h-14 w-14 flex flex-col items-center justify-center border-2',
                getDropZoneStyle(),
                'rounded-lg',
                interactive.transition,
                expectedNative && !droppedLetter ? 'cursor-pointer' : ''
            )}
        >
            {expectedNative ? (
                <div className="flex flex-col items-center justify-center space-y-1">
                    {droppedLetter ? (
                        <span className={combineClasses('text-2xl font-bold', colors.lightText, 'select-none')}>
                            {droppedLetter}
                        </span>
                    ) : (
                        <span className={combineClasses('text-base font-semibold', colors.secondaryText, 'select-none tracking-wide')}>
                            {englishTransliteration}
                        </span>
                    )}
                </div>
            ) : null}
        </div>
    );
};

export default DropZone;
