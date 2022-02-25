import { useDrag } from 'react-dnd';
import { useAtom } from 'jotai';
import DraggableItemTypes from "../entities/draggableTypes";
import { useEffect } from 'react';

const Token = ({data, parentAtom}) => {
    const [tokenData, setTokenData] = useAtom(data);
    const [parent, setParent] = useAtom(parentAtom);

    // useEffect(() => {
    //     console.log("token effect");
    //     parent.tokenAtom = data;
    //     setParent(parent)
    // }, [parentAtom]);

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