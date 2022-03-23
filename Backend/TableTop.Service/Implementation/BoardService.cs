﻿using TableTop.Entities;
using TableTop.Entities.People;
using TableTop.Storage;

namespace TableTop.Service.Implementation;

internal class BoardService : IBoardService
{
    private readonly IGameDataRepository _gameDataRepository;

    public BoardService(IGameDataRepository gameDataRepository)
    {
        _gameDataRepository = gameDataRepository;
    }

    public async Task<Board> Create(string gameId, Board board, User user)
    {
        if (string.IsNullOrWhiteSpace(board.Name))
            board.Name = "Unnamed";

        if (board.Height == default)
            board.Height = 25;
        if (board.Width == default)
            board.Width = 25;

        Board createdBoard = await _gameDataRepository.SaveBoard(gameId, board, user);
        return createdBoard;
    }

    public async Task<List<Board>> GetAll(string gameId, User user)
    {
        Game? game = await _gameDataRepository.Get(gameId, user);
        if (game == null)
            return new List<Board>();

        return game.Boards;
    }

    public async Task<Board?> Get(string gameId, Guid boardId, User user)
    {
        Game? game = await _gameDataRepository.Get(gameId, user);
        Board? board = game?.Boards.FirstOrDefault(b => b.Id == boardId);

        return board;
    }

    public async Task SaveMapToken(MapToken mapToken, User user)
    {
        await _gameDataRepository.SaveMapToken(mapToken, user);
    }

    public async Task DeleteMapToken(MapToken mapToken, User user)
    {
        await _gameDataRepository.DeleteMapToken(mapToken, user);
    }

    public async Task<Board> Save(string gameId, Board board, User user)
    {
        Game? game = await _gameDataRepository.Get(gameId, user);
        if (game == null)
            return board;

        List<Board> activeGameBoards = game.Boards.Where(b => b.IsActive)
                                           .ToList();
        foreach (Board activeGameBoard in activeGameBoards)
        {
            if (activeGameBoard.Id == board.Id)
                continue;

            activeGameBoard.IsActive = false;
            await _gameDataRepository.SaveBoard(gameId, activeGameBoard, user);
        }

        Board savedBoard = await _gameDataRepository.SaveBoard(gameId, board, user);
        return savedBoard;
    }
}