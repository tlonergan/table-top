import { useAtom } from 'jotai';
import { useDrag } from 'react-dnd';
import DraggableItemTypes from "../entities/draggableTypes";

const Token = ({state, mapTokenState}) => {
    const [token] = useAtom(state);
    console.log("Token => Render", token);

    const [, drag] = useDrag(() =>({
        type: DraggableItemTypes.TOKEN,
        item: {tokenAtom: state, mapTokenAtom: mapTokenState},
        options: { dropEffect: "move"},
    }));
    
    return (
        <div className="token" style={{height: `${token.size.height}px`, width: `${token.size.width}px`}} ref={drag}>
            {token.imageSource ? <img src={token.imageSource} style={{height: `${token.size.height - 1}px`, width: `${token.size.width - 1}px`}}/> : <span/>}
        </div>
    );
};

export default Token;