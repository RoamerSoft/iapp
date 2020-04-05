import {Component, Input, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-answer-feedback',
  templateUrl: './answer-feedback.component.html',
  styleUrls: ['./answer-feedback.component.scss'],
})
export class AnswerFeedbackComponent implements OnInit {

  // Boolean to check which feedback has to be showed.
  @Input() public givenAnswerIsCorrect: boolean;

  // The correct answer to show in de feedback.
  @Input() public correctAnswer: string;

  // Used for testing.
  @ViewChild('checkmarkIcon') public checkmarkIcon: string;
  @ViewChild('closeIcon') public closeIcon: string;

  // feedback text properties
  private correctAnswerTitle = 'Correct';
  private correctAnswerText = 'Het juiste antwoord was';
  private wrongAnswerTitle = 'Helaas';
  private wrongAnswerText = 'Het juiste antwoord was';

  constructor() { }

  ngOnInit() {
  }
}
