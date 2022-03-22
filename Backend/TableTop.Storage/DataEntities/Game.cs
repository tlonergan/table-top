using TableTop.Entities;
using TableTop.Entities.People;

namespace TableTop.Storage.DataEntities;

internal class Game : AuditableEntity
{
    public Game()
    {
        Boards = new Dictionary<Guid, Board>();
        Players = new List<User>();
    }

    public string Id { get; set; }
    public string Name { get; set; }
    public User Owner { get; set; }

    public Dictionary<Guid, Board> Boards { get; set; }
    public List<User> Players { get; set; }

    public static Game Map(Entities.Game source)
    {
        return new Game
        {
            Name = source.Name,
            Boards = source.Boards.ToDictionary(b => b.Id, Board.Map),
            Id = source.Id,
            Owner = source.Owner,
            Players = source.Players,
            Created = source.Created,
            CreatedBy = source.CreatedBy,
            Updated = source.Updated,
            UpdatedBy = source.UpdatedBy,
        };
    }

    public Entities.Game Map()
    {
        return new Entities.Game
        {
            Name = Name,
            Players = Players,
            Boards = Boards.Select(b => b.Value.Map())
                           .ToList(),
            Created = Created,
            CreatedBy = CreatedBy,
            Updated = Updated,
            UpdatedBy = UpdatedBy,
            Id = Id,
            Owner = Owner,
        };
    }
}