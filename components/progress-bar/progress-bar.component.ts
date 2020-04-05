import {Component, Input, OnInit} from '@angular/core';
import {ProgressBarHostComponent} from '../../interfaces/progress-bar-host-component';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
})
export class ProgressBarComponent implements OnInit {
  // Start and full value for the progressbar.
  public progressBarValue = 0.0;
  public progressBarFullValue = 1.0;

  // Interval timeout.
  private intervalTimeout = 50;

  // Reference to the interval.
  private interval;

  // Reference to the ProgressBarHostComponent.
  @Input() hostComponent: ProgressBarHostComponent;

  constructor() {
  }

  ngOnInit() {
  }

  /**
   * Starts the progressbar by setting an interval.
   * @param progressBarTime - The time that the progressbar should take to fill up in milliseconds.
   */
  public startProgressBar(progressBarTime: number): void {
    // Reference to the sender.
    const intervalSender = this;
    // Calculate the value to add each interval.
    const progressBarValueToAdd = (this.progressBarFullValue / (progressBarTime / this.intervalTimeout));
    // Set the interval with the function to run and the progress bar host.
    this.interval = setInterval(function () {
      intervalSender.addProgressBarValue(progressBarValueToAdd);
    }, this.intervalTimeout);
  }

  /**
   * Adds the given value to the progressbar each time the function is called.
   * @param progressBarValueToAdd - The value to add every interval.
   */
  public addProgressBarValue(progressBarValueToAdd: number): void {
    // Run as long the progress bar is not full.
    if (this.progressBarValue <= this.progressBarFullValue) {
      // Add progress bar value.
      this.progressBarValue += progressBarValueToAdd;
    } else {
      // Stop the interval.
      clearInterval(this.interval);
      // Run progressbar host function.
      this.hostComponent.runWhenProgressBarIsFull();
    }
  }

}
