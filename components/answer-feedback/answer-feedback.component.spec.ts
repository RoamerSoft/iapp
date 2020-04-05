import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {AnswerFeedbackComponent} from './answer-feedback.component';

describe('AnswerFeedbackComponent', () => {
  let component: AnswerFeedbackComponent;
  let fixture: ComponentFixture<AnswerFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnswerFeedbackComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Behaviour tests', () => {
    describe('As a participant', () => {

      /**
       * Test if close-circle icon is showed.
       */
      it('I see a cross icon when my answer was wrong.', () => {
        // Show given answer wrong feedback
        component.givenAnswerIsCorrect = false;

        // Update view
        fixture.detectChanges();

        // Get icon type
        const result = component.closeIcon['nativeElement']['attributes']['name']['nodeValue'];
        const expected = 'close-circle';

        // Check icon type with expected
        expect(result).toEqual(expected);
      });

      /**
       * Test if close-circle icon has the 'danger' color.
       */
      it('I see the cross icon in \'danger\'.', () => {
        // Show given answer wrong feedback
        component.givenAnswerIsCorrect = false;

        // Update view
        fixture.detectChanges();

        // Get icon color type
        const result = component.closeIcon['nativeElement']['attributes']['color']['nodeValue'];
        const expected = 'danger';

        // Check icon color with expected
        expect(result).toEqual(expected);
      });

      /**
       * Test if checkmark-circle icon is showed.
       */
      it('I see a checkmark icon when my answer was correct.', () => {
        // Show given answer correct feedback
        component.givenAnswerIsCorrect = true;

        // Update view
        fixture.detectChanges();

        // Get icon type
        const result = component.checkmarkIcon['nativeElement']['attributes']['name']['nodeValue'];
        const expected = 'checkmark-circle';

        // Check icon type with expected
        expect(result).toEqual(expected);
      });

      /**
       * Test if checkmark-circle icon has the 'success' color.
       */
      it('I see the checkmark icon in \'success\' color.', () => {
        // Show given answer correct feedback
        component.givenAnswerIsCorrect = true;

        // Update view
        fixture.detectChanges();

        // Get icon color type
        const result = component.checkmarkIcon['nativeElement']['attributes']['color']['nodeValue'];
        const expected = 'success';

        // Check icon color with expected
        expect(result).toEqual(expected);
      });

      /**
       * Test if the wrongAnswer text is showed.
       */
      it('I see the correct answer when I gave the wrong answer', () => {
        // Show given answer wrong feedback
        component.givenAnswerIsCorrect = false;

        // Set the correct answer
        component.correctAnswer = 'wrongAnswer';

        // Update view
        fixture.detectChanges();

        // Get showed answer from view
        const result = fixture.debugElement.nativeElement.querySelector('.correctAnswer').innerText;
        const expected = 'wrongAnswer';

        // Check icon color with expected
        expect(result).toEqual(expected);
      });

      /**
       * Test if the correctAnswer text is showed.
       */
      it('I see the correct answer when I gave the correct answer', () => {
        // Show given answer correct feedback
        component.givenAnswerIsCorrect = true;

        // Set the correct answer
        component.correctAnswer = 'correctAnswer';

        // Update view
        fixture.detectChanges();

        // Get showed answer from view
        const result = fixture.debugElement.nativeElement.querySelector('.correctAnswer').innerText;
        const expected = 'correctAnswer';

        // Check icon color with expected
        expect(result).toEqual(expected);
      });
    });
  });
});
