using TableTop.Entities;

namespace TableTop.Storage.DataEntities;

internal class Board : AuditableEntity
{
    public Board()
    {
        MapTokens = new Dictionary<Guid, MapToken>();
    }

    public Guid Id { get; set; }
    public string Name { get; set; }
    public Dictionary<Guid, MapToken> MapTokens { get; set; }
    public int Height { get; set; }
    public int Width { get; set; }

    public static Board Map(Entities.Board source)
    {
        return new Board
        {
            Height = source.Height,
            Id = source.Id,
            MapTokens = source.MapTokens.ToDictionary(mt => mt.MapTokenId, MapToken.Map),
            Name = source.Name,
            Width = source.Width,
        };
    }

    public Entities.Board Map()
    {
        return new Entities.Board
        {
            Name = Name,
            Width = Width,
            Height = Height,
            Id = Id,
            MapTokens = MapTokens.Select(mt => mt.Value.Map())
                                 .ToList()
        };
    }
}