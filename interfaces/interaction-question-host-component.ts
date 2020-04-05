import {InteractionQuestion} from '../factories/interactionQuestion/interfaces/interactionQuestion';

export interface InteractionQuestionHostComponent {
  interactionQuestionHost: Object;

  runOnInteractionQuestionSubmit(interactionQuestion: InteractionQuestion);
}
