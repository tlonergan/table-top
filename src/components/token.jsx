import { useAtom } from 'jotai';
import { useDrag } from 'react-dnd';
import DraggableItemTypes from "../entities/draggableTypes";
import { useEffect } from 'react';

const Token = ({state, mapTokenState}) => {
    const [token] = useAtom(state);

    const [, drag] = useDrag(() =>({
        type: DraggableItemTypes.TOKEN,
        item: {item: state, mapTokenState},
        options: { dropEffect: "move"},
    }));
    
    return (
        <div className="token" ref={drag}>
            {token.imageSource ? <img src={token.imageSource}/> : <span/>}
        </div>
    );
};

export default Token;