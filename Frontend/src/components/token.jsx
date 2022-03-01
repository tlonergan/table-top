import { useAtom } from 'jotai';
import { useDrag } from 'react-dnd';
import DraggableItemTypes from "../entities/draggableTypes";

const Token = ({state, mapTokenState}) => {
    console.log("Render token");
    
    const [token] = useAtom(state);

    const [, drag] = useDrag(() =>({
        type: DraggableItemTypes.TOKEN,
        item: {tokenAtom: state, mapTokenAtom: mapTokenState},
        options: { dropEffect: "move"},
    }));
    
    return (
        <div className="token" ref={drag}>
            {token.imageSource ? <img src={token.imageSource}/> : <span/>}
        </div>
    );
};

export default Token;