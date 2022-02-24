import { useDrag } from 'react-dnd';
import { useAtom } from 'jotai';
import DraggableItemTypes from "../entities/draggableTypes";

const Token = (props) => {
    const [tokenData] = useAtom(props.data);

    const [, drag] = useDrag(() =>({
        type: DraggableItemTypes.TOKEN,
        item: "singleToken",
    }));
    
    return (
        <div className="token" ref={drag}>
            {tokenData.imageSource ? <img src={tokenData.imageSource}/> : <span/>}
        </div>
    );
};

export default Token;