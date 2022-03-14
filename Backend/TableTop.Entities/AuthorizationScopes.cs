namespace TableTop.Entities
{
    public static class AuthorizationScopes
    {
        public const string ReadGames = "read:games";
        public const string WriteGames = "write:games";

        public static readonly List<string> AllScopes = new() { ReadGames, WriteGames };
    }
}