import {ParticipantQuestion} from '../entities/ParticipantQuestion/participant-question';

export interface ParticipantQuestionHostComponent {
  participantQuestionHost: Object;
  runOnParticipantQuestionSubmit(participantQuestion: ParticipantQuestion);
}
