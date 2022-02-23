import { useDrag } from 'react-dnd';
import DraggableItemTypes from "../entities/draggableTypes";

const Token = () => {
    const [isDragging, drag] = useDrag(() =>({
        type: DraggableItemTypes.TOKEN,
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    return (
        <div className="token"></div>
    );
};

export default Token;