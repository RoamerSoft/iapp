import {Injectable} from '@angular/core';
import {ToastController} from '@ionic/angular';
import {ToastType} from './toast-type.enum';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  public duration = 3000;
  public showCloseButton = true;
  public closeButtonText = 'SLUITEN';

  constructor(
    private toastController: ToastController
  ) {
  }

  /**
   * Show a toast message with the given message.
   * @param message - The string to show.
   * @param toastType - ToastType enum value.
   * @param duration - Time to show toast in milliseconds.
   */
  public async showToast(message: string, toastType: ToastType, duration: number = this.duration): Promise<void> {
    const toast = await this.toastController.create({
      message: message,
      duration: duration,
      showCloseButton: this.showCloseButton,
      closeButtonText: this.closeButtonText,
      color: toastType
    });
    toast.present();
  }
}
