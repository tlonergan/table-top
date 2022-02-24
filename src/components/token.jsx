import { useDrag } from 'react-dnd';
import { useAtom } from 'jotai';
import DraggableItemTypes from "../entities/draggableTypes";

const Token = ({data}) => {
    const [tokenData] = useAtom(data);

    const [, drag] = useDrag(() =>({
        type: DraggableItemTypes.TOKEN,
        item: data,
        options: { dropEffect: "move"},
    }));
    
    return (
        <div className="token" ref={drag}>
            {tokenData.imageSource ? <img src={tokenData.imageSource}/> : <span/>}
        </div>
    );
};

export default Token;