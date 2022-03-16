using TableTop.Entities;
using TableTop.Entities.People;

namespace TableTop.Storage.DataEntities;

internal class Game : AuditableEntity
{
    public string Id { get; set; }
    public string Name { get; set; }
    public User Owner { get; set; }

    public List<Board> Boards { get; set; }
    public List<User> Players { get; set; }

    public static Game Map(Entities.Game source)
    {
        return new Game
        {
            Name = source.Name,
            Boards = source.Boards,
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
            Boards = Boards,
            Created = Created,
            CreatedBy = CreatedBy,
            Updated = Updated,
            UpdatedBy = UpdatedBy,
            Id = Id,
            Owner = Owner,
        };
    }
}