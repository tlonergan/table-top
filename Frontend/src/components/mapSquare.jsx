import { useDrop } from 'react-dnd';
import { atom, useAtom } from 'jotai';
import DraggableItemTypes from '../entities/draggableTypes';

import MapToken from './mapToken';

const MapSquare = ({state}) => {
    const [square, setSquare] = useAtom(state);

    const [,thisMapSquare] = useDrop(() => ({
        accept: DraggableItemTypes.TOKEN,
        drop: ({item, mapTokenState}) => {
            setSquare(prev => {
                let newSquare = ({...prev});
                newSquare.tokenAtom = item;
                newSquare.mapTokenAtom = mapTokenState;
                
                return newSquare;
            });
        },
    }));
 
    const onSquaredClicked = () => {
        setSquare(prev => {
            let newSquare = ({...prev});
            newSquare.isSelected = !prev.isSelected;
            return newSquare;
        });
    };

    const renderSquareContents = () => {
        let tokenAtom = square.tokenAtom;
        if(!tokenAtom)
            return;

        let mapTokenAtom = square.mapTokenAtom;
        if(!mapTokenAtom)
            mapTokenAtom = atom({tokenAtom, position: square.postition});
            
        return (<MapToken state={mapTokenAtom} parentState={state} />)
    };

    return (
        <div className={"mapSquare " + (square.isSelected ? "mapSquareSelected": "")} ref={thisMapSquare} onClick={onSquaredClicked}>
            {renderSquareContents()}
        </div>
    );
};

export default MapSquare;