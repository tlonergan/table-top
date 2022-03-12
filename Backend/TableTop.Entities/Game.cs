using TableTop.Entities.People;

namespace TableTop.Entities
{
    public class Game : AuditableEntity
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public User Owner { get; set; }

        public List<Board> Boards { get; set; }
    }

    public class Board
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public List<MapToken> MapTokens { get; set; }
        public int Height { get; set; }
        public int Width { get; set; }
    }
}