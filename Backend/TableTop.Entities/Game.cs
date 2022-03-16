using TableTop.Entities.People;

namespace TableTop.Entities
{
    public class Game : AuditableEntity
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public User Owner { get; set; }
        public bool IsGameMaster { get; set; }

        public List<Board> Boards { get; set; }
        public List<User> Players { get; set; }
    }
}