using TableTop.Entities;

namespace TableTop.Storage.DataEntities;

internal class MapToken
{
    public Token Token { get; set; }

    public static MapToken Map(Entities.MapToken mapToken)
    {
        return new MapToken { Token = Token.Map(mapToken) };
    }
}