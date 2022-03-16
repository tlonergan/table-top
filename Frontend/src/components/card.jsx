import React, { useState, useEffect } from 'react';

const Tab = ({collapsable, name, children}) => {
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

    return (
        <div className='card'>
            <div className={"cardHeader" + (isCollapsed ? " contentCollapsed": "")} onClick={onHeaderCliced}>
                {name}
            </div>
            <div className={isCollapsed? " collapsed": ""}>
                {children}
            </div>
        </div>
    );
}

export default Tab;