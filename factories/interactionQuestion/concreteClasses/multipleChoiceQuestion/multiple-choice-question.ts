import {InteractionQuestion} from '../../interfaces/interactionQuestion';

export class MultipleChoiceQuestion implements InteractionQuestion {
  public type: string;
  public question: string;
  public answers: string[];
  public correctAnswer: number;
  public responseTime: number;
  public senderId: string;
  public answer: number;

  constructor(type: string, question: string, answers: string[], correctAnswer: number, responseTime: number, senderId: string) {
    this.type = type;
    this.question = question;
    this.answers = answers;
    this.correctAnswer = correctAnswer;
    this.responseTime = responseTime;
    this.senderId = senderId;
  }
}
