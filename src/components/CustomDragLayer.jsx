import { useDragLayer } from 'react-dnd';
import { combineClasses } from '../styles/styles';

const CustomDragLayer = () => {
  const { itemType, isDragging, item, initialOffset, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }));

  if (!isDragging || !currentOffset) {
    return null;
  }

  // Only show preview for letters
  if (itemType !== 'LETTER') {
    return null;
  }

  const { x, y } = currentOffset;
  const transform = `translate(${x}px, ${y}px)`;

  return (
    <div className="fixed left-0 top-0 pointer-events-none z-50" style={{ transform }}>
      {item && (
        <div
          className={combineClasses(
            'w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center',
            'bg-[#E34234]/90',
            'text-lg sm:text-xl md:text-2xl font-bold',
            'text-white',
            'rounded-md',
            'select-none shadow-md'
          )}
        >
          {item.letter}
        </div>
      )}
    </div>
  );
};

export default CustomDragLayer;
