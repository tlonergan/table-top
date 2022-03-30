using Azure.Storage;
using Azure.Storage.Sas;
using TableTop.Entities.Authorization;
using TableTop.Entities.Configuration;
using TableTop.Entities.People;

namespace TableTop.Service.Implementation;

internal class TokenService : ITokenService
{
    private readonly Settings _settings;

    public TokenService(Settings settings)
    {
        _settings = settings;
    }

    public StorageToken GetStorageToken(User user)
    {
        var storageCredentials = new StorageSharedKeyCredential(_settings.AZURE_STORAGE_ACCOUNT_NAME, _settings.AZURE_STORAGE_ACCOUNT_KEY);

        var sasBuilder = new AccountSasBuilder
        {
            Services = AccountSasServices.Blobs,
            StartsOn = DateTime.UtcNow,
            ExpiresOn = DateTime.UtcNow.AddMinutes(5),
            Protocol = SasProtocol.Https,
            ResourceTypes = AccountSasResourceTypes.All
        };

        sasBuilder.SetPermissions(AccountSasPermissions.Create);
        sasBuilder.SetPermissions(AccountSasPermissions.List);
        sasBuilder.SetPermissions(AccountSasPermissions.Add);
        sasBuilder.SetPermissions(AccountSasPermissions.Read);

        SasQueryParameters parameters = sasBuilder.ToSasQueryParameters(storageCredentials);
        return new StorageToken { Token = parameters.ToString() };
    }
}