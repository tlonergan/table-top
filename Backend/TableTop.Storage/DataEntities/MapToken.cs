using TableTop.Entities;

namespace TableTop.Storage.DataEntities;

internal class MapToken : Token
{
    public Guid MapTokenId { get; set; }
    public Position Position { get; set; }

    public static MapToken Map(Entities.MapToken source)
    {
        MapToken mapToken = Map<MapToken>(source);
        mapToken.Position = source.Position;
        mapToken.MapTokenId = source.MapTokenId;

        return mapToken;
    }

    public new Entities.MapToken Map()
    {
        Entities.MapToken mapToken = base.Map<Entities.MapToken>();
        mapToken.MapTokenId = MapTokenId;
        mapToken.Position = Position;

        return mapToken;
    }
}