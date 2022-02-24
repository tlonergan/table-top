import { useMemo, useEffect } from 'react';
import { atom, useAtom } from 'jotai';
import Token from "./token"
import { getTokens } from '../api/tokenService';
import { allTokenAtoms } from '../state/token';

const TokenBox = () => {
    const [tokenAtoms, setTokenAtoms] = useAtom(allTokenAtoms);

    console.log(tokenAtoms);

    useEffect(() => {
            let newTokenAttoms = getTokens().map(token => atom(token));
            setTokenAtoms([...newTokenAttoms]);
        }, []);
        
    return (
        <div>
            {tokenAtoms.map(tokenAtom => {
                return (<Token key={tokenAtom} data={tokenAtom}/>)
            })}
        </div>
    );
};

export default TokenBox;