import { useDrop } from 'react-dnd';
import { useAtom } from 'jotai';
import DraggableItemTypes from '../entities/draggableTypes';

import Token from './token';

const MapSquare = ({state}) => {
    const [square, setSquare] = useAtom(state);

    const [,thisMapSquare] = useDrop(() => ({
        accept: DraggableItemTypes.TOKEN,
        drop: (item) => {
            setSquare(prev => {
                let newSquare = ({...prev});
                newSquare.tokenAtom = item;
                return newSquare;
            });
        },
    }));
 
    const onSquaredClicked = () => {
        setSquare(prev => {
            let newSquare = ({...prev});
            newSquare = !prev.isSelected;
            return newSquare;
        });
    };

    const renderSquareContents = () => {
        let tokenAtom = square.tokenAtom;
        console.log("render square contents", square, tokenAtom);
        if(tokenAtom)
            return (<Token state={tokenAtom} parentAtom={state} />)
    };

    return (
        <div className={"mapSquare " + (square && square.isSelected ? "mapSquareSelected": "")} ref={thisMapSquare} onClick={onSquaredClicked}>
            {renderSquareContents()}
        </div>
    );
};

export default MapSquare;