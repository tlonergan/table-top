namespace TableTop.Storage.DataEntities;

public class Token
{
    public Guid TokenId { get; set; }
    public string Name { get; set; }
    public string ImageUrl { get; set; }

    public static T Map<T>(Entities.Token source) where T : Token, new()
    {
        return new T
        {
            ImageUrl = source.ImageUrl,
            Name = source.Name,
            TokenId = source.TokenId
        };
    }

    public Entities.Token Map()
    {
        return Map<Entities.Token>();
    }

    protected T Map<T>() where T : Entities.Token, new()
    {
        return new T
        {
            ImageUrl = ImageUrl,
            Name = Name,
            TokenId = TokenId
        };
    }
}