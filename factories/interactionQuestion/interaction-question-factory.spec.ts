import {InteractionQuestionFactory} from './interaction-question-factory';
import {MultipleChoiceQuestion} from './concreteClasses/multipleChoiceQuestion/multiple-choice-question';
import {InteractionQuestion} from './interfaces/interactionQuestion';

describe('InteractionQuestionFactory', () => {
    let interactionQuestionFactory: InteractionQuestionFactory;

    it('should create an instance', () => {
        expect(new InteractionQuestionFactory()).toBeTruthy();
    });

    beforeEach(() => {
        interactionQuestionFactory = new InteractionQuestionFactory();
    });

    describe('Unit test', () => {
        describe('getInteractionQuestion()', () => {
            it('Should_ReturnMultipleChoiceQuestion_When_MultipleChoiceQuestionIsGiven', () => {

                // Mock dataObject
                const dataObject = {
                    type: 'MultipleChoiceQuestion',
                    senderId: 'TestSender123',
                    question: 'Test vraag?',
                    answers: ['Antwoord A', 'Antwoord B', 'Antwoord C', 'Antwoord A'],
                    responseTime: (1000)
                };

                const result = interactionQuestionFactory.getInteractionQuestion(dataObject);
                const expected = MultipleChoiceQuestion;

                // Check if result is from type MultipleChoiceQuestion
                expect(result).toEqual(jasmine.any(expected));
            });

            it('Should_ReturnMultipleChoiceQuestion_When_MultipleChoiceQuestionIsGiven(NegativeTest)', () => {

                // Mock dataObject
                const dataObject = {
                    type: 'MultipleChoiceQuestion',
                    senderId: 'TestSender123',
                    question: 'Test vraag?',
                    answers: ['Antwoord A', 'Antwoord B', 'Antwoord C', 'Antwoord A'],
                    responseTime: (1000)
                };

                    // Create a test class
                class Test implements InteractionQuestion {
                    type: string;
                    senderId: string;
                    question: string;
                    answer: number;
                    responseTime: number;
                }

                const result = interactionQuestionFactory.getInteractionQuestion(dataObject);
                const expected = Test;

                // Check if result is NOT from type MultipleChoiceQuestion
                expect(result).not.toEqual(jasmine.any(expected));
            });
        });
    });

});
