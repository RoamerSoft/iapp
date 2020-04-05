import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProgressBarComponent} from './progress-bar.component';
import {ProgressBarHostComponent} from '../../interfaces/progress-bar-host-component';

describe('ProgressBarPage', () => {
    let component: ProgressBarComponent;
    let fixture: ComponentFixture<ProgressBarComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ProgressBarComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProgressBarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('Unit tests', () => {
        describe('addProgressBarValue()', () => {
            it('Should_Add0.5ToTheProgressbar_When_0.5IsGiven', () => {
                // Run the function
                component.addProgressBarValue(0.5);

                const expected = 0.5;
                const result = component.progressBarValue;

                // Check if result is NOT from type MultipleChoiceQuestion
                expect(result).toEqual(expected);

            });

            it('Should_NotAdd0.5ToTheProgressbar_When_0.7IsGiven', () => {
                // Run the function
                component.addProgressBarValue(0.7);

                const notExpected = 0.5;
                const result = component.progressBarValue;

                // Check if result is NOT from type MultipleChoiceQuestion
                expect(result).not.toEqual(notExpected);

            });
        });
    });

});
