import {TestBed} from '@angular/core/testing';

import {QuoteService} from './quote.service';

describe('QuoteService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: QuoteService = TestBed.get(QuoteService);
        expect(service).toBeTruthy();
    });

    describe('Behaviour tests', () => {
        let service: QuoteService;

        beforeEach(() => {
            service = TestBed.get(QuoteService);
        });

        describe('As a participant', () => {
            it('I see a quote that changes after every question, there are two different quotes.', () => {
                const result = service.quotes.length;
                const expected = 2;

                // Test quote array has exactly two items;
                expect(result).toEqual(expected);
            });
        });
    });

    describe('Unit tests', () => {
        let service: QuoteService;

        beforeEach(() => {
            service = TestBed.get(QuoteService);
        });

        describe('getQuote()', () => {
            it('Should_ReturnADifferentQuoteThanTheFirstTime_When_FunctionRunsTwoTimes', () => {
                const resultOne = service.getQuote();
                const resultTwo = service.getQuote();

                // Test if results are different.
                expect(resultOne).not.toEqual(resultTwo);
            });
        });
    });
});
