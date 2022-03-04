using TableTop.Entities.People;

namespace TableTop.Entities
{
    public class Game : AuditableEntity
    {
        public string Name { get; set; }
        public User Owner { get; set; }
    }
}