
export const getToken = async (getAccessTokenSilently, scopes) => {
    if(!getAccessTokenSilently){
        console.error("getAccessTokenSilently was not set", getAccessTokenSilently);
        return "";
    }

    const token = await getAccessTokenSilently({
        audience: "https://table-top-map.azurewebsites.net/",
        scope: scopes,
    })
    .catch(console.error);

    return token;
};

export const getRequestHeaders = (token) => {
    return {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
    };
};