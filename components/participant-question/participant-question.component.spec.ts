import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ParticipantQuestionComponent} from './participant-question.component';

describe('ParticipantQuestionComponent', () => {
  let component: ParticipantQuestionComponent;
  let fixture: ComponentFixture<ParticipantQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ParticipantQuestionComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Behaviour tests', () => {
    describe('As a participant I', () => {

      /**
       * Test if ionInputName has the required attribute.
       */
      it('have to give up my name when asking a question.', () => {
        const result = component.ionInputName['nativeElement']['attributes']['required']['localName'];
        const expected = 'required';

        expect(result).toEqual(expected);
      });

      /**
       * Test if ionInputRole has not the required attribute.
       */
      it('can give up my role/function when asking a question (optional).', () => {
        const result = component.ionInputRole['nativeElement']['attributes']['required'];
        const expected = undefined;

        expect(result).toEqual(expected);
      });

      /**
       * Test if the ionButtonSend has an innerText with 'Versturen' as value.
       */
      it('See a button named \'Versturen\'.', () => {
        const result = component.ionButtonSend['nativeElement']['innerText'];
        const expected = 'Versturen';

        expect(result).toEqual(expected);
      });
    });
  });

  describe('Unit tests', () => {
    describe('checkIfStringInputIsSet()', () => {
      it('Should_ReturnFalse_When_EmptyStringIsGiven', () => {
        const result = component.checkIfStringInputIsSet('');
        const expected = false;

        expect(result).toEqual(expected);
      });

      it('Should_NotReturnTrue_When_EmptyStringIsGiven', () => {
        const result = component.checkIfStringInputIsSet('');
        const expected = true;

        expect(result).not.toEqual(expected);
      });

      it('Should_ReturnFalse_When_UndefinedIsGiven', () => {
        const result = component.checkIfStringInputIsSet(undefined);
        const expected = false;

        expect(result).toEqual(expected);
      });

      it('Should_NotReturnTrue_When_UndefinedIsGiven', () => {
        const result = component.checkIfStringInputIsSet(undefined);
        const expected = true;

        expect(result).not.toEqual(expected);
      });
    });
  });
});
