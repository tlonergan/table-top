import { useState } from 'react';
import { useDrag } from 'react-dnd';
import { useAtom } from 'jotai';
import DraggableItemTypes from "../entities/draggableTypes";
import { useEffect } from 'react';

const Token = ({state, parentAtom}) => {
    const [tokenData, setTokenData] = useAtom(state);
    const [parent, setParent] = useAtom(parentAtom);

    const [position, setPosition] = useState(parent.position);

    useEffect(() => {
        console.log("In Token Use Effect", parent);
        var parentPostion = parent.postion
        if(!parentPostion)
            return;

        console.log("Token's Parent Position", parentPostion);
        if(parentPostion.x != position.x && parentPostion.y != position.y){
            console.log("Position changed");
            parent.tokenAtom = null;
            setParent(parent);
        }

        setPosition(parent.position)
    }, [parent]);

    const [, drag] = useDrag(() =>({
        type: DraggableItemTypes.TOKEN,
        item: state,
        options: { dropEffect: "move"},
    }));
    
    return (
        <div className="token" ref={drag}>
            {tokenData.imageSource ? <img src={tokenData.imageSource}/> : <span/>}
        </div>
    );
};

export default Token;