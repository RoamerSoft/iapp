import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SessionCodeService {
  // The http url to use on the server.
  private url = 'connection/checkconnectionname/';

  constructor(
    private http: HttpClient,
  ) {
  }

  /**
   * Does a http request for a boolean and returns a Observable
   * @param sessionCode - The session code.
   */
  public checkIfSessionCodeExists(sessionCode: string): Observable<Object> {
    return this.http.get(environment.backendServerUrl + this.url + sessionCode);
  }
}
