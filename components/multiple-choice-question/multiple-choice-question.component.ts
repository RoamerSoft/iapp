import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MultipleChoiceQuestion} from '../../factories/interactionQuestion/concreteClasses/multipleChoiceQuestion/multiple-choice-question';
import {ProgressBarHostComponent} from '../../interfaces/progress-bar-host-component';
import {InteractionQuestionHostComponent} from '../../interfaces/interaction-question-host-component';
import {ProgressBarComponent} from '../progress-bar/progress-bar.component';

@Component({
  selector: 'app-multiple-choice-question',
  templateUrl: './multiple-choice-question.component.html',
  styleUrls: ['./multiple-choice-question.component.scss'],
})
export class MultipleChoiceQuestionComponent implements OnInit, ProgressBarHostComponent {
  // The multiple choice question.
  @Input() public multipleChoiceQuestion: MultipleChoiceQuestion;

  // Reference to the host.
  @Input() public interactionQuestionHost: InteractionQuestionHostComponent;

  // Reference to the progressbar component.
  @ViewChild('progressBar') public progressBar: ProgressBarComponent;

  // Property to add a reference from this to the progressbar.
  public progressBarHost: ProgressBarHostComponent = this;

  constructor() {
  }

  ngOnInit() {
    // Start the progressbar
    this.progressBar.startProgressBar(this.multipleChoiceQuestion.responseTime);
  }

  /**
   * Runs when the radio button changes and sets the chosen answer.
   * @param value - The ionChange event
   */
  public setAnswer(value: any): void {
    this.multipleChoiceQuestion.answer = parseInt(value.detail.value, 10);
  }

  /**
   * Function to run when the progressbar is full.
   */
  public runWhenProgressBarIsFull(): void {
    this.interactionQuestionHost.runOnInteractionQuestionSubmit(this.multipleChoiceQuestion);
  }
}
