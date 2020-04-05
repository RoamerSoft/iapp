import {Injectable} from '@angular/core';
import {Platform} from '@ionic/angular';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BackButtonService {

  constructor(
    private platform: Platform,
    private router: Router
  ) {
  }

  /**
   * Subscribes to backButton event and closes the app when fired on start page.
   * @param pageName - Name of the start page.
   */
  public closeAppWhenBackButtonIsPressedOnPage(pageName: string): void {
    try {
      // Try to subscribe
      this.platform.backButton.subscribe(() => {
        if (this.router.url === '/' + pageName) {
          navigator['app'].exitApp();
        }
      });
    } catch (e) {
      // Write to log when subscribe fails.
      console.log(e);
    }
  }
}
