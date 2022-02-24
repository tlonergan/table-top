import { v4 as uuid } from 'uuid';
import { atom } from 'jotai'

export class TokenService {
    getTokens() {
        const copperDragonToken = {
            id: 'bd325207-0cd4-462f-b544-cc38efb83d2f',
            imageSource: "../assets/CopperDragon.png",
        };
        
        const tombGuardianToken = {
            id: '76d80d26-1c25-4e67-9c2e-09250cba7ff9',
            imageSource: "../assets/TombGuardian.png",
        };

        const tokens = [
            atom(copperDragonToken),
            atom(tombGuardianToken),
        ];

        return atom(tokens);
    };
}