namespace TableTop.Entities;

public class Board
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public List<MapToken> MapTokens { get; set; }
    public int Height { get; set; }
    public int Width { get; set; }
}