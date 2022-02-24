import { useDrag } from 'react-dnd';
import { useAtom } from 'jotai';
import DraggableItemTypes from "../entities/draggableTypes";

const Token = ({data}) => {
    const [tokenData] = useAtom(data);

    const [, drag] = useDrag(() =>({
        type: DraggableItemTypes.TOKEN,
        item: {imageSource: props.imageSource, name: "some bloody token"},
        options: { dropEffect: "move"},
        end: (item, monitor) => {
            console.log(item);
            console.log(monitor.didDrop())
        },
    }));
    
    return (
        <div className="token" ref={drag}>
            {tokenData.imageSource ? <img src={tokenData.imageSource}/> : <span/>}
        </div>
    );
};

export default Token;