namespace TableTop.Entities.Authorization
{
    public static class AuthorizationScopes
    {
        public const string ReadGames = "read:games";
        public const string WriteGames = "write:games";
        public const string ReadBoards = "read:boards";
        public const string WriteBoards = "write:boards";

        public static readonly List<string> AllScopes = new() { ReadGames, WriteGames, ReadBoards, WriteBoards };
    }
}