namespace TableTop.Entities;

public class MapToken
{
    public MapToken()
    {
        Position = new Position { X = -1, Y = -1 };
    }

    public Guid Id { get; set; }
    public Guid TokenId { get; set; }
    public Guid BoardId { get; set; }
    public Position Position { get; set; }
}