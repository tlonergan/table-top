import { useEffect } from 'react';
import { atom, useAtom } from 'jotai';
import Token from "./token"
import { getTokens } from '../api/tokenService';
import { allTokenAtoms } from '../state/token';

const tokenBoxAtom = atom({});

const TokenBox = () => {
    const [tokenAtoms, setTokenAtoms] = useAtom(allTokenAtoms);

    useEffect(() => {
            let newTokenAttoms = getTokens().map(token => {
                const tokenAtom = atom(token);
                tokenAtom.debugLabel = new Date();
                return tokenAtom;
            });
            setTokenAtoms([...newTokenAttoms]);
        }, []);
        
    return (
        <div>
            {tokenAtoms.map(tokenAtom => {
                return (<Token key={tokenAtom} state={tokenAtom} parentAtom={tokenBoxAtom} />)
            })}
        </div>
    );
};

export default TokenBox;