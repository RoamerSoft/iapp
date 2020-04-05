import {InteractionQuestion} from './interfaces/interactionQuestion';
import {MultipleChoiceQuestion} from './concreteClasses/multipleChoiceQuestion/multiple-choice-question';

export class InteractionQuestionFactory {

  /**
   * Checks question type and returns corresponding object.
   * @param dataObject - JavaScript object with the needed data.
   */
  public getInteractionQuestion(javaScriptQuestionObject: any): InteractionQuestion {
    // Return MultipleChoiceQuestion
    if (javaScriptQuestionObject.type === 'MultipleChoiceQuestion') {
      return this.getMultipleChoiceQuestion(javaScriptQuestionObject.question, javaScriptQuestionObject.answers,
        javaScriptQuestionObject.correctAnswer, javaScriptQuestionObject.responseTime, javaScriptQuestionObject.senderId);
    }

    // Return undefined when there is no corresponding type.
    return undefined;
  }

  /**
   * Creates and returns the multiple choice question.
   * @param question - The question to ask.
   * @param answers - An string array with the possible answers.
   * @param responseTime - The time to response in milliseconds.
   * @param type - The name of the type.
   */
  private getMultipleChoiceQuestion(question: string, answers: string[], correctAnswer: number, responseTime: number,
                                    senderId: string, type: string = 'MultipleChoiceQuestion'): MultipleChoiceQuestion {
    return new MultipleChoiceQuestion(type, question, answers, correctAnswer, responseTime, senderId);
  }
}
