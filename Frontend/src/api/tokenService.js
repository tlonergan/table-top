
export const getTokens = () => {
    const copperDragonToken = {
        tokenId: 'bd325207-0cd4-462f-b544-cc38efb83d2f',
        imageSource: "/assets/CopperDragon.png",
        name: "Young Copper Dragon",
        size: {
            name: 'Large',
            gameHeight: 10,
            gameWidth: 10,
            height: 152,
            width: 152,
        }
    };
    
    const tombGuardianToken = {
        tokenId: '76d80d26-1c25-4e67-9c2e-09250cba7ff9',
        imageSource: "/assets/TombGuardian.png",
        name: "Tomb Guardian", 
        size: {
            name: 'Meduim',
            gameHeight: 5,
            gameWidth: 5,
            height: 76,
            width: 76,
        }
    };

    return [copperDragonToken, tombGuardianToken];
};
