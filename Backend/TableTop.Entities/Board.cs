namespace TableTop.Entities;

public class Board
{
    public Board()
    {
        MapTokens = new List<MapToken>();
    }

    public Guid Id { get; set; }
    public string Name { get; set; }
    public bool IsActive { get; set; }
    public List<MapToken> MapTokens { get; set; }
    public int Height { get; set; }
    public int Width { get; set; }
}