import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MultipleChoiceQuestionComponent} from './multiple-choice-question.component';
import {MultipleChoiceQuestion} from '../../factories/interactionQuestion/concreteClasses/multipleChoiceQuestion/multiple-choice-question';
import {ProgressBarComponent} from '../progress-bar/progress-bar.component';

describe('MultipleChoiceQuestionPage', () => {
  let component: MultipleChoiceQuestionComponent;
  let fixture: ComponentFixture<MultipleChoiceQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MultipleChoiceQuestionComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleChoiceQuestionComponent);
    component = fixture.componentInstance;
    component.multipleChoiceQuestion = new MultipleChoiceQuestion(
      'MultipleChoiceQuestion',
      'Test vraag?',
      ['Antwoord A', 'Antwoord B', 'Antwoord C', 'Antwoord D'],
      1,
      10000,
      'TestSender123');

    component.progressBar = new ProgressBarComponent();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Behaviour tests', () => {
    describe('As a participant', () => {
      it('can see the question.', () => {
        const result = component.multipleChoiceQuestion.question;
        const expected = 'Test vraag?';

        // Test if the question is in the correct property.
        expect(result).toEqual(expected);
      });

      it('I can see the answers.', () => {
        const result = component.multipleChoiceQuestion.answers;
        const expected = ['Antwoord A', 'Antwoord B', 'Antwoord C', 'Antwoord D'];

        // Test if the answers are in the correct property.
        expect(result).toEqual(expected);
      });

      it('I can see a progressbar which is showing how much response time I have left.', () => {
        const result = component.progressBar;
        const expected = {progressBarValue: 0};

        // Test if a progressbar is initialized by checking for a progressBarValue property.
        expect(result).toEqual(jasmine.objectContaining(expected));
      });
    });
  });
});
