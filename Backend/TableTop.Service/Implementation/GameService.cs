﻿using TableTop.Entities;
using TableTop.Entities.People;
using TableTop.Storage;

namespace TableTop.Service.Implementation;

internal class GameService : IGameService
{
    private readonly IGameDataRepository _gameDataRepository;

    public GameService(IGameDataRepository gameDataRepository)
    {
        _gameDataRepository = gameDataRepository;
    }

    public async Task<Game?> Get(string id, User user)
    {
        Game? game = await _gameDataRepository.Get(id, user);
        return game;
    }

    public async Task<Game> Create(Game game)
    {
        Game createdGame = await _gameDataRepository.Create(game);
        return createdGame;
    }

    public async Task<List<Game>> GetAll(User userIdentity)
    {
        List<Game> games = await _gameDataRepository.GetAll(userIdentity);
        return games;
    }
}