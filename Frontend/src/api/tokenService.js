
export const getTokens = () => {
    const copperDragonToken = {
        tokenId: 'bd325207-0cd4-462f-b544-cc38efb83d2f',
        imageSource: "/assets/CopperDragon.png",
        name: "Young Copper Dragon",
        size: {
            name: 'Large',
            height: 10,
            width: 10,
        }
    };
    
    const tombGuardianToken = {
        tokenId: '76d80d26-1c25-4e67-9c2e-09250cba7ff9',
        imageSource: "/assets/TombGuardian.png",
        name: "Tomb Guardian", 
        size: {
            name: 'Meduim',
            height: 5,
            width: 5,
        }
    };

    return [copperDragonToken, tombGuardianToken];
};
