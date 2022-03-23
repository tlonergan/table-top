import React, { useState, useEffect } from 'react';

const Tab = ({collapsable, name, children, buttons}) => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    useEffect(()=> {
        if(!collapsable)
            setIsCollapsed(false);
    }, [collapsable]);

    const onHeaderCliced = () => {
        if(!collapsable)
            return;

        setIsCollapsed(!isCollapsed);
    };

    const getButtons = () => {
        if(!buttons || buttons.length === 0)
            return;

        return (
            <div className='cardButtons'>
                {buttons.map(button => <a key={button.display} onClick={button.onClick}>{button.display}</a>)}
            </div>
        );
    };

    return (
        <div className='card'>
            <div className={"cardHeader" + (isCollapsed ? " contentCollapsed": "")} onClick={onHeaderCliced}>
                {name}
            </div>
            <div className={'cardBody' + (isCollapsed? " collapsed": "")}>
                {children}
            </div>
            {getButtons()}
        </div>
    );
}

export default Tab;