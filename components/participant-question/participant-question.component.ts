import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ParticipantQuestion} from '../../entities/ParticipantQuestion/participant-question';
import {ParticipantQuestionHostComponent} from '../../interfaces/participant-question-host-component';
import {ToastService} from '../../services/toastService/toast.service';
import {ToastType} from '../../services/toastService/toast-type.enum';


@Component({
  selector: 'app-participant-question',
  templateUrl: './participant-question.component.html',
  styleUrls: ['./participant-question.component.scss'],
})
export class ParticipantQuestionComponent implements OnInit {

  // Reference to the host.
  @Input() participantQuestionHost: ParticipantQuestionHostComponent;

  // User input.
  public participantName: string;
  public participantFunction: string;
  public participantQuestion: string;

  // Toast message text.
  public noParticipantNameGivenMessageText = 'Voer uw naam in';
  public noParticipantQuestionGivenMessageText = 'Voer uw vraag in';

  // Used for testing.
  @ViewChild('ionInputName') public ionInputName;
  @ViewChild('ionInputRole') public ionInputRole;
  @ViewChild('ionTextAreaQuestion') public ionTextAreaQuestion;
  @ViewChild('ionButtonSend') public ionButtonSend;

  constructor(
    private toastService: ToastService
  ) {
  }

  ngOnInit() {
  }

  /**
   * Checks if input string is not empty or undefined.
   * @param inputString - The string to check.
   */
  public checkIfStringInputIsSet(inputString: string): boolean {
    return (inputString !== '' && inputString !== undefined);
  }

  /**
   * Checks required input fields and shows toast messages when not valid.
   * It sends the questionObject to the host when input is valid.
   */
  public onSendButtonClick(): void {
    if (!this.checkIfStringInputIsSet(this.participantName)) {
      // Show toast when name input not valid.
      this.toastService.showToast(this.noParticipantNameGivenMessageText, ToastType.Danger);
    } else if (!this.checkIfStringInputIsSet(this.participantQuestion)) {
      // Show toast when question input not valid.
      this.toastService.showToast(this.noParticipantQuestionGivenMessageText, ToastType.Danger);
    } else {
      // Create a participant question object and send it to the host.
      const participantQuestionObject = new ParticipantQuestion(this.participantName, this.participantFunction, this.participantQuestion);
      this.participantQuestionHost.runOnParticipantQuestionSubmit(participantQuestionObject);
    }
  }

}
