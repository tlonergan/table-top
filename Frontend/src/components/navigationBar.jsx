import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHamburger, faDiceD20 } from '@fortawesome/free-solid-svg-icons';
import { useCallback, useMemo, useState } from 'react';
import { useAtomCallback } from 'jotai/utils';
import { getActiveGameAtom } from '../state/game';
import { useAtom } from 'jotai';

const NavigationBar = () => {
    const { logout } = useAuth0();
    const navigate = useNavigate();
    const activeGameAtom = useMemo(() => getActiveGameAtom(), []);

    const [ game ] = useAtom(activeGameAtom);
    const [ isCollapsed, setIsCollapsed ] = useState(true);

    const menuItemClicked = (action) => {
        setIsCollapsed(true);
        action();
    };
    
    const getActiveGameMenuItem = () => {
        if(!game)
            return (<></>);

        return (
            <div className='menuItem' onClick={() => menuItemClicked(() => navigate(`/game/${game.id}`))}>
                <span>{game.name} Home</span>
            </div>
        );
    }

    return (        
        <>
            <div className="navigationBar">
                <div>
                    <FontAwesomeIcon icon={faDiceD20} />&nbsp;
                    <span>Table Top</span>
                </div>
                <div>
                    <button className="menuButton" onClick={() => setIsCollapsed(!isCollapsed)}>
                        <FontAwesomeIcon icon={faHamburger}/>
                    </button>
                </div>
            </div>
            <div className='menuContainer'>
                <div className={`menu ${isCollapsed ? 'collapsed' : ''}`}>
                    <div className='menuItem' onClick={() => menuItemClicked(() => navigate('/'))}>
                        <span>Games</span>
                    </div>
                    {getActiveGameMenuItem()}
                    <div className='menuItem' onClick={() => menuItemClicked(logout)}>
                        <span>Logout</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NavigationBar;