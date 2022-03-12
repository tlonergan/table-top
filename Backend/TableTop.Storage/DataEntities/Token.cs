namespace TableTop.Storage.DataEntities;

public class Token
{
    public string Name { get; set; }
    public string ImageUrl { get; set; }

    public static Token Map(Entities.Token token)
    {
        return new Token { ImageUrl = token.ImageUrl, Name = token.Name };
    }

    public Entities.Token Map()
    {
        return new Entities.Token { ImageUrl = ImageUrl, Name = Name };
    }
}