import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SessionService} from '../../services/session/session.service';
import {InteractionQuestion} from '../../factories/interactionQuestion/interfaces/interactionQuestion';
import {InteractionQuestionFactory} from '../../factories/interactionQuestion/interaction-question-factory';
import {MultipleChoiceQuestion} from '../../factories/interactionQuestion/concreteClasses/multipleChoiceQuestion/multiple-choice-question';
import {InteractionQuestionHostComponent} from '../../interfaces/interaction-question-host-component';
import {ParticipantQuestion} from '../../entities/ParticipantQuestion/participant-question';
import {ParticipantQuestionHostComponent} from '../../interfaces/participant-question-host-component';
import {ToastService} from '../../services/toastService/toast.service';
import {ToastType} from '../../services/toastService/toast-type.enum';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, InteractionQuestionHostComponent, ParticipantQuestionHostComponent {
  // Session properties.
  private sessionService: SessionService;
  private sessionKey: string;

  // Used for testing.
  @ViewChild('ionButton') public ionButton;

  // Interaction question properties.
  private interactionQuestionFactory: InteractionQuestionFactory;
  private interactionQuestion: InteractionQuestion;

  // Socket.io event names.
  private receiveInteractionQuestionEventName = 'interactionQuestion';
  private responseInteractionQuestionEventName = 'interactionResponse';
  private sendParticipantQuestionEventName = 'participantQuestion';
  private sessionClosedEventName = 'disconnect';

  // Component view properties.
  public showMultipleChoiceQuestionComponent = false;
  public showParticipantQuestionComponent = false;
  public showAnswerFeedbackComponent = false;

  // AnswerFeedbackComponent properties.
  public interactionQuestionAnswerIsCorrect: boolean;
  public correctAnswer: string;
  private timeToShowFeedbackInMilliseconds = 5000;

  // References to this for use in child components
  public participantQuestionHost = this;
  public interactionQuestionHost = this;

  // Text to show when the participantQuestion is sent.
  public participantQuestionIsSentMessageText = 'Vraag verstuurd';
  public sessionClosedEvent = 'Verbinding verbroken, u bent uitgelogd.';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastService
  ) {
  }

  ngOnInit() {
    // Create interaction question factory.
    this.interactionQuestionFactory = new InteractionQuestionFactory();

    // Get the session key from the url.
    this.sessionKey = this.route.params['value']['sessionKey'];

    // Start webSocketService listener
    this.startSessionListener(this.sessionKey);
  }

  /**
   * Creates a session service and starts listening for messages.
   * @param sessionCode - The session key string.
   */
  private startSessionListener(sessionCode: string): void {
    // Create a new sessionService.
    this.sessionService = new SessionService(sessionCode);

    // Subscribe to the session message event.
    this.sessionService.on(this.receiveInteractionQuestionEventName, (javaScriptQuestionObject) => {

      // Get the correct interaction question.
      const interactionQuestion: InteractionQuestion =
        this.interactionQuestionFactory.getInteractionQuestion(javaScriptQuestionObject);

      // Check interaction question type
      if (interactionQuestion.type === 'MultipleChoiceQuestion') {
        // Show question in view
        this.showMultipleChoiceQuestion(interactionQuestion);
      }
    });

    this.sessionService.on(this.sessionClosedEventName, x => {
      this.toastService.showToast(this.sessionClosedEvent, ToastType.Danger);
      this.router.navigateByUrl('/connect');
    });

    this.sessionService.on('error', x => {
      console.log(x);
    });
  }

  /**
   * Sets the interaction question with the given object and shows the correct view.
   * @param multipleChoiceQuestion - Object created by InteractionQuestionFactory.
   */
  private showMultipleChoiceQuestion(multipleChoiceQuestion: InteractionQuestion): void {
    // Send question to multiple choice question component.
    this.interactionQuestion = multipleChoiceQuestion;

    // Hide participant question component.
    this.showParticipantQuestionComponent = false;

    // Show the question component view.
    this.showMultipleChoiceQuestionComponent = true;
  }

  /**
   * Checks if the given answer is identical to the correct answer.
   * @param givenAnswer - The given answer to check.
   * @param correctAnswer - The correct answer.
   */
  private checkAnswer(givenAnswer: number, correctAnswer: number): boolean {
    return (givenAnswer === correctAnswer);
  }

  /**
   * Checks the type of the question response, does the correct up cast
   * and calls the corresponding sending function.
   * @param interactionQuestion - InteractionQuestion object with the given answer.
   */
  public runOnInteractionQuestionSubmit(interactionQuestion: InteractionQuestion): void {
    if (interactionQuestion.type === 'MultipleChoiceQuestion') {
      // Up cast interactionQuestion to MultipleChoiceQuestion
      const multipleChoiceQuestion = interactionQuestion as MultipleChoiceQuestion;

      // Show answer feedback component.
      this.showAnswerFeedbackComponent = true;

      // Check if the given answer is correct.
      if (this.checkAnswer(multipleChoiceQuestion.answer, multipleChoiceQuestion.correctAnswer)) {
        // Show answer correct feedback.
        this.correctAnswer = multipleChoiceQuestion.answers[multipleChoiceQuestion.correctAnswer];
        this.interactionQuestionAnswerIsCorrect = true;
      } else {
        // Show wrong answer feedback.
        this.correctAnswer = multipleChoiceQuestion.answers[multipleChoiceQuestion.correctAnswer];
        this.interactionQuestionAnswerIsCorrect = false;
      }

      // Hide answer feedback after 5 seconds.
      setTimeout(() => {
        this.showAnswerFeedbackComponent = false;
      }, this.timeToShowFeedbackInMilliseconds);

      // Send the response to the server.
      this.sendMultipleChoiceQuestionAnswer(multipleChoiceQuestion);
    }
  }

  /**
   * Shows participant question component.
   */
  public onParticipantQuestionButtonClick(): void {
    this.showParticipantQuestionComponent = true;
  }

  /**
   * Hides participant question component.
   */
  public onBackArrowClick(): void {
    this.showParticipantQuestionComponent = false;
  }

  /**
   * Sends back the InteractionQuestion as MultipleChoiceQuestion with the given answer to the server.
   * @param multipleChoiceQuestion - The upcasted InteractionQuestion with answer.
   */
  private sendMultipleChoiceQuestionAnswer(multipleChoiceQuestion: MultipleChoiceQuestion): void {
    // Send the response to the server.
    this.sessionService.emit(this.responseInteractionQuestionEventName, multipleChoiceQuestion);

    // Hide the question component view.
    this.showMultipleChoiceQuestionComponent = false;
  }

  /**
   * Sends the participant question to the websocket server,
   * hides participant question component and shows a success toast.
   * @param participantQuestion - The participantQuestion object
   */
  public runOnParticipantQuestionSubmit(participantQuestion: ParticipantQuestion): void {
    // Send the question to the server.
    this.sessionService.emit(this.sendParticipantQuestionEventName, participantQuestion);

    // Hide the ParticipantQuestionComponent.
    this.showParticipantQuestionComponent = false;

    // Show a success toast after 200 milliseconds (because it looks better than showing immediately).
    setTimeout(() => {
      this.toastService.showToast(this.participantQuestionIsSentMessageText, ToastType.Success);
    }, 200);
  }
}
