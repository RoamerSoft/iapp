import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {ToastService} from '../../services/toastService/toast.service';
import {ToastType} from '../../services/toastService/toast-type.enum';
import {SessionCodeService} from '../../services/sessionCode/session-code.service';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.page.html',
  styleUrls: ['./connect.page.scss'],
})
export class ConnectPage implements OnInit {
  // Used for setting autofocus.
  @ViewChild('ionInput') public ionInput;

  // Used for testing.
  @ViewChild('ionButton') public ionButton;

  // User input.
  public sessionCode: string;

  // Used for showing spinner
  public showSpinner = false;

  // Error and success messages.
  public sessionCodeUnknownMessageText = 'Sessiecode onbekend';
  public connectedToSessionMessageText = 'Verbonden';
  public connectionTimedOutMessageText = 'Verbinden mislukt, controleer uw internet verbinding.';

  // Event identifiers.
  private connectionTimeoutIdentifier;
  public checkIfSessionCodeExists;

  public constructor(
    public router: Router,
    private toastService: ToastService,
    private sessionCodeService: SessionCodeService
  ) {
  }

  public ngOnInit() {
    this.setAutoFocus();
  }

  /**
   * Workaround for not working autofocus on io-input in ion-item.
   */
  private setAutoFocus(): void {
    setTimeout(() => {
      this.ionInput.setFocus();
    }, 1000);
  }

  /**
   * Checks if the given session code meets requirements.
   */
  public checkIfSessionCodeMeetRequirements(sessionCode: string): boolean {
    return !(sessionCode === undefined || sessionCode.length < 5);
  }

  /**
   * Forwards user to home page when session code is known by the server.
   */
  public connectToSession(): void {
    // Show process spinner.
    this.showSpinner = true;
    // Check requirements of session code.
    if (this.checkIfSessionCodeMeetRequirements(this.sessionCode)) {
      // Ask sessionCodeService if session code exists.
      this.checkIfSessionCodeExists = this.sessionCodeService.checkIfSessionCodeExists(this.sessionCode).subscribe(response => {
        if (response) {
          // Cancel showConnectionTimeoutMessage
          clearTimeout(this.connectionTimeoutIdentifier);
          this.showSpinner = false;

          // Show success toast when session code exists and navigate to home page.
          this.toastService.showToast(this.connectedToSessionMessageText, ToastType.Success);
          this.router.navigateByUrl('/home/' + this.sessionCode);
        } else {
          // Cancel showConnectionTimeoutMessage
          clearTimeout(this.connectionTimeoutIdentifier);
          this.showSpinner = false;

          // Show danger toast when session code does not exists.
          this.toastService.showToast(this.sessionCodeUnknownMessageText, ToastType.Danger);
        }
      });
      this.connectionTimeoutIdentifier = setTimeout(() => {
        this.checkIfSessionCodeExists.unsubscribe();
        // Hide process spinner.
        this.showSpinner = false;

        // Show connection timeout message.
        this.toastService.showToast(this.connectionTimedOutMessageText, ToastType.Danger, 5000);
      }, 3000);
    } else {
      // Cancel showConnectionTimeoutMessage
      clearTimeout(this.connectionTimeoutIdentifier);

      // Hide process spinner.
      this.showSpinner = false;

      // Show danger toast if sessionCode does not meet requirements.
      this.toastService.showToast(this.sessionCodeUnknownMessageText, ToastType.Danger);
    }
  }
}
