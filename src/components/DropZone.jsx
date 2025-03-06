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
                ${!expectedKannada ? 'border-gray-200 bg-gray-50/60' : 
                  droppedLetter ? 'border-green-500 bg-green-50 shadow-md scale-100' :
                  isOver && canDrop ? 'border-green-400 bg-green-50 shadow-lg scale-105' :
                  isOver && !canDrop ? 'border-red-400 bg-red-50 shadow-lg scale-105' :
                  'border-purple-300 bg-purple-50/90 hover:border-purple-400 hover:shadow-md hover:bg-purple-100'}
                rounded-lg transition-all duration-200 ${expectedKannada && !droppedLetter ? 'cursor-pointer' : ''}`}
        >
            {expectedKannada ? (
                <div className="flex flex-col items-center justify-center space-y-1">
                    {droppedLetter ? (
                        <span className="text-2xl font-bold text-green-700 select-none">
                            {droppedLetter}
                        </span>
                    ) : (
                        <span className="text-base font-semibold text-gray-700 select-none tracking-wide">
                            {englishTransliteration}
                        </span>
                    )}
                </div>
            ) : null}
        </div>
    );
};

export default DropZone;
