import {Socket} from 'ngx-socket-io';
import {environment} from '../../../environments/environment';

export class SessionService extends Socket {
  /**
   * The constructor makes the websocket connection using the constructor of Socket.
   * @param namespaceName - The namespace name.
   */
  constructor(namespaceName: string) {
    // Make websocket connection.
    super({url: environment.socketServerUrl + namespaceName, options: {}});
  }
}
