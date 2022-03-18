namespace TableTop.Entities;

public class MapToken : Token
{
    public MapToken()
    {
        Position = new Position { X = -1, Y = -1 };
    }
    
    public Guid MapTokenId { get; set; }
    public Guid BoardId { get; set; }
    public Position Position { get; set; }

    public Game Game { get; set; }
}