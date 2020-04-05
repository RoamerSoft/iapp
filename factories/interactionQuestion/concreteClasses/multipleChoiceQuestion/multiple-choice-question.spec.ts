import { MultipleChoiceQuestion } from './multiple-choice-question';

describe('MultipleChoiceQuestion', () => {
  it('should create an instance', () => {
    expect(new MultipleChoiceQuestion(
        'MultipleChoiceQuestion',
        'Test vraag?',
        ['Antwoord A', 'Antwoord B', 'Antwoord C', 'Antwoord D'],
        1,
        10000,
        'TestSender123')).toBeTruthy();
  });
});
