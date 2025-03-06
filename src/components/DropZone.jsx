import React from "react";
import { useDrop } from "react-dnd";

const DropZone = ({ correctLetter, onDrop, index }) => {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: "LETTER",
        drop: (item) => onDrop(item, index),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    return (
        <div
            ref={drop}
            className={`w-16 h-16 flex items-center justify-center border-2 border-gray-400 rounded-lg text-xl font-bold ${
                isOver ? "bg-green-300" : "bg-gray-200"
            }`}
        >
            {correctLetter}
        </div>
    );
};

export default DropZone;
