import { useDrag } from 'react-dnd';
import DraggableItemTypes from "../entities/draggableTypes";

const Token = (props) => {
    const [, drag] = useDrag(() =>({
        type: DraggableItemTypes.TOKEN,
        item: {imageSource: props.imageSource, name: "some bloody token"},
    }));
    
    return (
        <div className="token" ref={drag}>
            {props.imageSource ? <img src={props.imageSource}/> : <span/>}
        </div>
    );
};

export default Token;