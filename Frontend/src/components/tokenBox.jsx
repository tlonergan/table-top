import { useAtom } from 'jotai';
import Token from "./token"
import { allTokenAtoms } from '../state/token';

const TokenBox = () => {
    const [tokenAtoms] = useAtom(allTokenAtoms);

    return (
        <div className="tokenToolbox">
            {tokenAtoms.map(tokenAtom => {
                return (<Token key={tokenAtom} state={tokenAtom} />)
            })}
        </div>
    );
};

export default TokenBox;