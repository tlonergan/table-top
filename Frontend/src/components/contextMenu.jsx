import { useCallback, useEffect, useState } from "react";

const ContextMenu = ({state}) => {
    const [anchorPoint, setAnchorPoint] = useState({x: 0, y:0});
    const [show, setShow] = useState(false);

    const handleContextMenu = useCallback(
        (event) => {
            event.preventDefault();
            console.log(`Handling event: ${event.pageX}`)
            setAnchorPoint({x: event.pageX, y: event.pageY});
            setShow(true);
        },
        [setAnchorPoint]
    );

    const handleClick = useCallback(() => (show ? setShow(false): null), [show]);

    useEffect(() => {
        console.log("Adding event")
        document.addEventListener("click", handleClick);
        document.addEventListener("contextmenu", handleContextMenu);
        return () => {
            document.removeEventListener("click", handleClick);
            document.removeEventListener("contextmenu", handleContextMenu);
        };
    });

    return (
        <div className="contextMenu">
            {show ? (
                <ul className="menu" style={{
                    top: anchorPoint.y,
                    left: anchorPoint.x
                }}>
                <li>Delete</li>
                </ul>
            ) : <></>}
        </div>
    )
}

export default ContextMenu;