const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const { userRouter } = require('./resources/users/user.router');
const { boardRouter } = require('./resources/boards/board.router');
const { taskRouter } = require('./resources/tasks/task.router');
const inputLogger = require('./middlewares/input-logger.middleware');
const errorHandler = require('./middlewares/error-handler.middleware');
const asyncHandler = require('./middlewares/async-handler.middleware');
const loginHandler = require('./middlewares/login.middleware');
const verifyToken = require('./middlewares/verify-token.middleware');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use(asyncHandler(inputLogger));
app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/login', asyncHandler(loginHandler));

app.use(asyncHandler(verifyToken));

app.use('/users', userRouter);
app.use('/boards', boardRouter);
boardRouter.use('/:boardId/tasks', taskRouter);

app.use(errorHandler);

// throw Error('Oops!');
// Promise.reject(Error('Oops!'));

module.exports = app;
