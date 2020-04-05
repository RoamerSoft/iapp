import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {QuoteComponent} from './quote.component';

describe('QuoteComponent', () => {
    let component: QuoteComponent;
    let fixture: ComponentFixture<QuoteComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [QuoteComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(QuoteComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('Unit tests', () => {
        describe('getQuote()', () => {
            it('Should_SetQuotePropertyWithANewQuote_When_Called', () => {
                const notExpected = component.quote;

                // Run function
                component.getQuote();

                const result = component.quote;

                // Test first quote to be different from new quote.
                expect(result).not.toEqual(notExpected);
            });
        });
    });
});
