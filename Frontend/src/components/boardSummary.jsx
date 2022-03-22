import { Link } from "react-router-dom";
import Card from './card';

const BoardSummary = ({board}) => {
    return (
        <Card key={board.id} name={board.name}>
            <Link to={`board/${board.id}`}>Go To Game Board</Link>
        </Card>
    );
};

export default BoardSummary;