import { useAtom } from 'jotai';
import { useDrag } from 'react-dnd';
import DraggableItemTypes from "../entities/draggableTypes";
import { useEffect } from 'react';

const Token = ({state, parentAtom}) => {
    const [token, setToken] = useAtom(state);
    const [parent, setParent] = useAtom(parentAtom);

    useEffect(() => {
        setToken(prev => {
            let newToken = ({...prev});
            newToken.position = parent.position;
            return newToken;
        });
    }, [parent]);

    useEffect(() => {
        updatePreviousParent();
    }, [token]);

    const [, drag] = useDrag(() =>({
        type: DraggableItemTypes.TOKEN,
        item: state,
        options: { dropEffect: "move"},
    }));

    const updatePreviousParent = () => {
        var parentPostion = parent.position
        let tokenPosition = token.position;
        
        console.log("In Token Update Parent", parentPostion, tokenPosition);

        if(!parentPostion || !tokenPosition)
            return;
        if(parentPostion.x != tokenPosition.x || parentPostion.y != tokenPosition.y){
            console.log("Position changed");

            // parent.tokenAtom = null;
            setParent(prev => {
                let newParent = ({...prev});
                newParent.tokenAtom = null;
                return newParent;
            });
        }
    };
    
    return (
        <div className="token" ref={drag}>
            {token.imageSource ? <img src={token.imageSource}/> : <span/>}
        </div>
    );
};

export default Token;