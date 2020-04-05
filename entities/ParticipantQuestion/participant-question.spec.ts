import { ParticipantQuestion } from './participant-question';

describe('ParticipantQuestion', () => {
  it('should create an instance', () => {
    expect(new ParticipantQuestion('testName', 'testRole', 'test question?')).toBeTruthy();
  });
});
