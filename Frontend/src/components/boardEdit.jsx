import { useAtom } from "jotai";
import { useState } from "react";
import Card from './card';

const BoardEdit = ({state, onEditComplete}) => {
    const [board, setBoard] = useAtom(state);

    const onChange = (e) => {
        const target = e.target;
        const updatedBoard = {...board};
        updatedBoard[target.name] = target.value;

        setBoard(updatedBoard);
    };

    const saveClicked = () => {
        onEditComplete(false);
    };

    const cancelClicked = () => {
        onEditComplete(true);
    };

    return (
        <Card name={`${board.name} ${board.isActive ? '(Active)' : ''} - Editing`} buttons={[{display: "Save", onClick: saveClicked}, {display: "Cancel", onClick: cancelClicked}]}>
            <div className="form">
                <div>
                    <label>Name</label>
                    <input type="text" name="name" value={board.name} onChange={onChange} />
                </div>
                <div>
                    <label>Width </label>
                    <input type="text" name="width" value={board.width} onChange={onChange} />
                </div>
                <div>
                    <label>Height </label>
                    <input type="text" name="height" value={board.height} onChange={onChange} />
                </div>
            </div>
        </Card>
    );
};

export default BoardEdit;