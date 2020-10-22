const PrototypeService = require('../../common/prototype.service');

const Board = require('./board.model');
const BoardMysqlRepository = require('./board.mysql.repository');

const boardsService = new PrototypeService(BoardMysqlRepository, Board.model);

module.exports = boardsService;
