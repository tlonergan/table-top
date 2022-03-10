namespace TableTop.Entities;

public class MapToken
{
    public MapToken()
    {
        Position = new Position { X = -1, Y = -1 };
    }

    public Guid Id { get; set; }
    public Position Position { get; set; }
}