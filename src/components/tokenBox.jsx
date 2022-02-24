import { useMemo } from 'react';
import { atom, useAtom } from 'jotai';
import Token from "./token"
import { TokenService } from '../api/tokenService';

const TokenBox = () => {
    const tokenService = new TokenService();
    const tokensAtom = useMemo(() => tokenService.getTokens(), [])
    const [tokens, setTokens] = useAtom(tokensAtom);

    const onClick = () => {
        setTokens((t) => {
            return [atom({
                id: 'bd325207-0cd4-462f-b544-cc38efb83d2q',
                imageSource: "../assets/CopperDragon.png",
            })];
        });
    };

    console.log(tokens);

    return (
        <div>
            <button onClick={onClick}>Moar</button>
            {tokens.map(token => {
                return (<Token key={token} data={token}/>)
            })}
        </div>
    );
};

export default TokenBox;