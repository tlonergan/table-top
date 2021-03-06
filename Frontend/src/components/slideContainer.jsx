import { useState } from "react";
import SlideTab from "./slideTab";

const SlideContainer = ({panels, children}) => {
    console.log("SlideContainer => Render", panels);
    const [currentPanel, setCurrentPanel] = useState(null);

    const onTabClicked = (panel) => {
        if(currentPanel === panel){
            setCurrentPanel(null);
            return;
        }

        setCurrentPanel(panel);
    };

    const getSlidePanel = () => {
        if(!currentPanel)
            return (<></>);

        return (
            <div style={{transform: 'translate(-180px, 28.7px)', backgroundColor: '#346751', padding: '36px 72px', minHeight: '500px', maxHeight: '1000px'}}>
                {currentPanel.panel}
            </div>
        );
    };

    return (
        <div className="slideContainer">
            <div style={{display: 'flex', alignContent: "flex-start", transform: 'rotate(90deg) translate(100px, 72px)'}}>
                {panels.map(panel => <SlideTab panel={panel} isOpen={panel === currentPanel} onClick={onTabClicked}/>)}
            </div>
            {getSlidePanel()}
            {children}
        </div>
    );
};

export default SlideContainer;