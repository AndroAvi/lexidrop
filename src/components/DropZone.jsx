import React, { useState } from "react";
import { useDrop } from "react-dnd";

const DropZone = ({ expectedKannada, englishTransliteration, onDrop }) => {
    const [droppedLetter, setDroppedLetter] = useState(null);
    const [{ isOver, canDrop }, drop] = useDrop(() => ({
        accept: "LETTER",
        canDrop: (item) => item.letter === expectedKannada,
        drop: (item) => {
            if (item.letter === expectedKannada) {
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

    return (
        <div
            ref={drop}
            className={`h-14 w-14 flex flex-col items-center justify-center border-2 
                ${!expectedKannada ? 'border-[#E34234]/20 bg-[#F4C7C7]/30' : 
                  droppedLetter ? 'border-[#E34234] bg-[#E34234] shadow-md scale-100 animate-[pulse_2s_ease-in-out_1]' :
                  isOver && canDrop ? 'border-[#E34234] bg-[#F4C7C7] shadow-lg scale-105' :
                  isOver && !canDrop ? 'border-[#E34234] bg-[#F4C7C7]/50 shadow-lg scale-105' :
                  'border-[#E34234]/50 bg-[#F4C7C7]/80 hover:border-[#E34234] hover:shadow-md hover:bg-[#F4C7C7]'}
                rounded-lg transition-all duration-200 ${expectedKannada && !droppedLetter ? 'cursor-pointer' : ''}`}
        >
            {expectedKannada ? (
                <div className="flex flex-col items-center justify-center space-y-1">
                    {droppedLetter ? (
                        <span className="text-2xl font-bold text-[#F4C7C7] select-none">
                            {droppedLetter}
                        </span>
                    ) : (
                        <span className="text-base font-semibold text-[#E34234] select-none tracking-wide">
                            {englishTransliteration}
                        </span>
                    )}
                </div>
            ) : null}
        </div>
    );
};

export default DropZone;
