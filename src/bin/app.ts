import * as  _express from "express";
import * as _http from "http";
import * as _bodyParser from "body-parser";
import { config } from "../config/config";
import { routesCore } from './core/routesCore';

const app: _express.Express = _express();

// Automatic body parsing for Json
app.use(_bodyParser.json());
app.use(_bodyParser.urlencoded({ extended: false }));

// Set the port
const port: number = config.port;
app.set('port', port);

const server: _http.Server = _http.createServer(app);

routesCore.initRoutes(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: NodeJS.ErrnoException) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind: string = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  const addr: { port: number; family: string; address: string; } = server.address();
  const bind: string = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.debug('Listening on ' + bind);
}
