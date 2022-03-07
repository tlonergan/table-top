import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrosshairs } from '@fortawesome/free-solid-svg-icons';

const Loading = () => {
    return (
        <div className="center">
            <div><FontAwesomeIcon icon={faCrosshairs} size='4x' spin /></div>
            <div>Loading...</div>
        </div>
    );
}

export default Loading;