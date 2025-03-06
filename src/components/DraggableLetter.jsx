import React from "react";
import { useDrag } from "react-dnd";

const DraggableLetter = ({ letter, id }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "LETTER",
        item: { id, letter },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    return (
        <div
            ref={drag}
            className={`p-4 m-2 bg-blue-500 text-white text-xl font-bold rounded-lg cursor-pointer ${
                isDragging ? "opacity-50" : ""
            }`}
        >
            {letter}
        </div>
    );
};

export default DraggableLetter;
