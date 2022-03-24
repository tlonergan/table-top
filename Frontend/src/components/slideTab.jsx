
const SlideTab = ({panel, isOpen, onClick}) => {
    return (
        <div className={`tab ${isOpen ? 'currentTab' : ''}`} onClick={() => onClick(panel)}>
            {panel.name}
        </div>
    );
};

export default SlideTab;