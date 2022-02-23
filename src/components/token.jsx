import { useDrag } from 'react-dnd';
import DraggableItemTypes from "../entities/draggableTypes";

const Token = () => {
    const [, drag] = useDrag(() =>({
        type: DraggableItemTypes.TOKEN,
        item: "singleToken",
    }));

    return (
        <div className="token" ref={drag}></div>
    );
};

export default Token;