import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {HomePage} from './home.page';
import {RouterTestingModule} from '@angular/router/testing';
import {ParticipantQuestion} from '../../entities/ParticipantQuestion/participant-question';
import {MultipleChoiceQuestion} from '../../factories/interactionQuestion/concreteClasses/multipleChoiceQuestion/multiple-choice-question';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let originalTimeout;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Behaviour tests', () => {
    describe('As a participant I can', () => {

      /**
       * Test if the ion-button has an innerText with 'Stel een vraag aan de presentator' as value.
       */
      it('see a button named \'Stel een vraag aan de presentator\' on the main screen.', () => {
        const result = component.ionButton['nativeElement']['innerText'];
        const expected = 'Stel een vraag aan de presentator';

        expect(result).toEqual(expected);
      });

      /**
       * Test if participantQuestionIsSentMessageText has a string 'Vraag verstuurd'.
       */
      it('see a toast success message \'Vraag verstuurd\' when the question is sent.', () => {
        const result = component.participantQuestionIsSentMessageText;
        const expected = 'Vraag verstuurd';

        expect(result).toEqual(expected);
      });

      /**
       * Test if showParticipantQuestionComponent is set to false after running runOnParticipantQuestionSubmit();
       */
      it('am automatically forwarded to the main screen when I submitted my question.', () => {
        component.showParticipantQuestionComponent = true;
        component.runOnParticipantQuestionSubmit(new ParticipantQuestion('TestName', 'TestRole', 'Test quesiton?'));

        const result = component.showParticipantQuestionComponent;
        const expected = false;

        expect(result).toEqual(expected);
      });

      /**
       * Test if showAnswerFeedbackComponent boolean value is true on start and false after 5 seconds.
       */
      it('see the feedback for 5 seconds, after that is disappears automatically.', function (done) {
        // Run function which shows feedback component.
        component.runOnInteractionQuestionSubmit(
          new MultipleChoiceQuestion(
            'MultipleChoiceQuestion',
            'Test vraag?',
            ['Antwoord A', 'Antwoord B', 'Antwoord C', 'Antwoord D'],
            1,
            10000,
            'TestSender123')
        );

        // Get showAnswerFeedbackComponent boolean value.
        let result = component.showAnswerFeedbackComponent;

        // Check if value is true.
        expect(result).toEqual(true);

        setTimeout(function () {
          // Get showAnswerFeedbackComponent boolean value.
          result = component.showAnswerFeedbackComponent;

          // Check if value is false after 5 seconds.
          expect(result).toEqual(false);

          done();
        }, 5000);
      });
    });
  });
  afterEach(function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  describe('unit tests', () => {
    describe('showAnswerFeedbackComponent', () => {
      it('Should_BeFalse_When_OnInteractionQuestionSubmit()HasRun_and_5SecondsHasBeenPast', function (done) {
        // Run function which shows feedback component.
        component.runOnInteractionQuestionSubmit(
          new MultipleChoiceQuestion(
            'MultipleChoiceQuestion',
            'Test vraag?',
            ['Antwoord A', 'Antwoord B', 'Antwoord C', 'Antwoord D'],
            1,
            10000,
            'TestSender123')
        );

        // Get showAnswerFeedbackComponent boolean value.
        let result = component.showAnswerFeedbackComponent;

        // Check if value is true.
        expect(result).toEqual(true);

        setTimeout(function () {
          // Get showAnswerFeedbackComponent boolean value.
          result = component.showAnswerFeedbackComponent;

          // Check if value is false after 5 seconds.
          expect(result).toEqual(false);

          done();
        }, 5000);
      });

      it('Should_BeTrue_When_OnInteractionQuestionSubmit()HasRun_and_4SecondsHasBeenPast', function (done) {
        // Run function which shows feedback component.
        component.runOnInteractionQuestionSubmit(
          new MultipleChoiceQuestion(
            'MultipleChoiceQuestion',
            'Test vraag?',
            ['Antwoord A', 'Antwoord B', 'Antwoord C', 'Antwoord D'],
            1,
            10000,
            'TestSender123')
        );

        // Get showAnswerFeedbackComponent boolean value.
        let result = component.showAnswerFeedbackComponent;

        // Check if value is true.
        expect(result).toEqual(true);

        setTimeout(function () {
          // Get showAnswerFeedbackComponent boolean value.
          result = component.showAnswerFeedbackComponent;

          // Check if value is false after 4 seconds.
          expect(result).toEqual(true);

          done();
        }, 4000);
      });

      it('Should_BeTrue_When_OnInteractionQuestionSubmit()HasRun_and_1SecondsHasBeenPast', function (done) {
        // Run function which shows feedback component.
        component.runOnInteractionQuestionSubmit(
          new MultipleChoiceQuestion(
            'MultipleChoiceQuestion',
            'Test vraag?',
            ['Antwoord A', 'Antwoord B', 'Antwoord C', 'Antwoord D'],
            1,
            10000,
            'TestSender123')
        );

        // Get showAnswerFeedbackComponent boolean value.
        let result = component.showAnswerFeedbackComponent;

        // Check if value is true.
        expect(result).toEqual(true);

        setTimeout(function () {
          // Get showAnswerFeedbackComponent boolean value.
          result = component.showAnswerFeedbackComponent;

          // Check if value is false after 1 seconds.
          expect(result).toEqual(true);

          done();
        }, 1000);
      });

      it('Should_BeFalse_When_OnInteractionQuestionSubmit()HasRun_and_6SecondsHasBeenPast', function (done) {
        // Run function which shows feedback component.
        component.runOnInteractionQuestionSubmit(
          new MultipleChoiceQuestion(
            'MultipleChoiceQuestion',
            'Test vraag?',
            ['Antwoord A', 'Antwoord B', 'Antwoord C', 'Antwoord D'],
            1,
            10000,
            'TestSender123')
        );

        // Get showAnswerFeedbackComponent boolean value.
        let result = component.showAnswerFeedbackComponent;

        // Check if value is true.
        expect(result).toEqual(true);

        setTimeout(function () {
          // Get showAnswerFeedbackComponent boolean value.
          result = component.showAnswerFeedbackComponent;

          // Check if value is false after 6 seconds.
          expect(result).toEqual(false);

          done();
        }, 5000);
      });
    });
  });
});

