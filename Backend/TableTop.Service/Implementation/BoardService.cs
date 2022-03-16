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

    public async Task<Board> CreateBoard(string gameId, Board board)
    {
        if (string.IsNullOrWhiteSpace(board.Name))
            board.Name = "Unnamed";

        if (board.Height == default)
            board.Height = 25;
        if (board.Width == default)
            board.Width = 25;

        Board createdBoard = await _gameDataRepository.AddBoardToGame(gameId, board);
        return createdBoard;
    }

    public async Task<List<Board>> GetAll(string gameId, User user)
    {
        Game? game = await _gameDataRepository.Get(gameId, user);
        if (game == null)
            return new List<Board>();

        return game.Boards;
    }
}