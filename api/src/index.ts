import { app } from './app';
import config from './config/config';
import logger from './utils/logger';

// Start the server
const port = config.server.port;
app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
