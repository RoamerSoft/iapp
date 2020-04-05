import {CUSTOM_ELEMENTS_SCHEMA, OnInit, ViewChild} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ConnectPage} from './connect.page';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientModule} from '@angular/common/http';
import {ToastService} from '../../services/toastService/toast.service';
import {ToastType} from '../../services/toastService/toast-type.enum';

describe('ConnectPage', () => {
    let component: ConnectPage;
    let toastService: ToastService;
    let fixture: ComponentFixture<ConnectPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ConnectPage],
            imports: [RouterTestingModule, HttpClientModule],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ConnectPage);
        component = fixture.componentInstance;
        toastService = TestBed.get(ToastService);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('Behaviour tests', () => {
        describe('As a participant I can', () => {

            /**
             * Test if there is an ion-input on the page.
             */
            it('put in a session code.', () => {
                const result = component.ionInput['nativeElement']['localName'];
                const expected = 'ion-input';

                expect(result).toEqual(expected);
            });

            /**
             * Test if the ion-input has the autofocus attribute.
             */
            it('immediately put in my session code.', () => {
                const result = component.ionInput['nativeElement']['attributes']['autofocus']['localName'];
                const expected = 'autofocus';

                expect(result).toEqual(expected);
            });

            /**
             * Test if the ion-button has an innerText with 'Verbinden' as value.
             */
            it('use a \'Verbinden\' button to make the connection.', () => {
                const result = component.ionButton['nativeElement']['innerText'];
                const expected = 'Verbinden';

                expect(result).toEqual(expected);
            });

            /**
             * Test if the ion-button has an maxlength with '5' as value.
             */
            it('use a session code which is always less then 6 characters.', () => {
                const result = component.ionInput['nativeElement']['attributes']['maxlength']['nodeValue'];
                const expected = '5';

                expect(result).toEqual(expected);
            });

            /**
             * Test if sessionCodeUnknownMessageText has a string 'Sessiecode onbekend'.
             */
            it('see a toast error message \'Sessiecode onbekend\' when the sessionCode is unknown.', () => {
                    const result = component.sessionCodeUnknownMessageText;
                    const expected = 'Sessiecode onbekend';

                    expect(result).toEqual(expected);
            });

            /**
             * Test if sessionCodeUnknownMessageType has a ToastType 'Danger'.
             */
            it('see that the toast error message is red colored.', () => {
                const result = 'danger';
                const expected = ToastType.Danger;

                expect(result).toEqual(expected);
            });

            /**
             * Test if connectedToSessionMessageText has a string 'Verbonden'.
             */
            it('see a toast success message \'Verbonden\' when the sessionCode is correct.', () => {
                const result = component.connectedToSessionMessageText;
                const expected = 'Verbonden';

                expect(result).toEqual(expected);
            });

            /**
             * Test if sessionCodeUnknownMessageType has a ToastType 'Success'.
             */
            it('see that the toast success message is green colored.', () => {
                const result = 'success';
                const expected = ToastType.Success;

                expect(result).toEqual(expected);
            });

            /**
             * Test if toastService.duration has a number '3000'.
             */
            it('see toast messages for 3 seconds maximum.', () => {
                const result = toastService.duration;
                const expected = 3000;

                expect(result).toEqual(expected);
            });

            /**
             * Test if toastService.closeButtonText has a string 'SLUITEN'
             * and test if toastService.showCloseButton has a boolean 'true'.
             */
            it('click the \'SLUITEN\' button to manuel close toast message.', () => {
                const closeButtonTextResult = toastService.closeButtonText;
                const closeButtonExpectedText = 'SLUITEN';

                const showCloseButtonActiveResult = toastService.showCloseButton;
                const expectedCloseButtonActiveResult = true;

                expect(showCloseButtonActiveResult).toEqual(expectedCloseButtonActiveResult);
                expect(closeButtonTextResult).toEqual(closeButtonExpectedText);
            });
        });
    });

    describe('Unit test', () => {
        describe('checkIfSessionCodeMeetRequirements()', () => {
            it('Should_ReturnFalse_When_NoSessionCodeIsgiven', () => {
                const result = component.checkIfSessionCodeMeetRequirements(undefined);
                const expected = false;

                expect(result).toEqual(expected);
                expect(component).toBeTruthy();
            });

            it('Should_NotReturnTrue_When_NoSessionCodeIsgiven', () => {
                const result = component.checkIfSessionCodeMeetRequirements(undefined);
                const NotExpected = true;

                expect(result).not.toEqual(NotExpected);
                expect(component).toBeTruthy();
            });

            it('Should_ReturnTrue_When_A5CharacterStringIsgiven', () => {
                const result = component.checkIfSessionCodeMeetRequirements('Test1');
                const expected = true;

                expect(result).toEqual(expected);
                expect(component).toBeTruthy();
            });

            it('Should_ReturnFalse_When_A4CharacterStringIsgiven', () => {
                const result = component.checkIfSessionCodeMeetRequirements('Test');
                const NotExpected = true;

                expect(result).not.toEqual(NotExpected);
                expect(component).toBeTruthy();
            });

            it('Should_ReturnTrue_When_A6CharacterStringIsgiven', () => {
                const result = component.checkIfSessionCodeMeetRequirements('Test01');
                const expected = true;

                expect(result).toEqual(expected);
                expect(component).toBeTruthy();
            });

            it('Should_NotReturnFalse_When_A6CharacterStringIsgiven', () => {
                const result = component.checkIfSessionCodeMeetRequirements('Test01');
                const notExpected = false;

                expect(result).not.toEqual(notExpected);
                expect(component).toBeTruthy();
            });

            it('Should_NotReturnTrue_When_A4CharacterStringIsgiven', () => {
                const result = component.checkIfSessionCodeMeetRequirements('Test');
                const notExpected = true;

                expect(result).not.toEqual(notExpected);
                expect(component).toBeTruthy();
            });

            it('Should_NotReturnFalse_When_A5CharacterStringIsgiven', () => {
                const result = component.checkIfSessionCodeMeetRequirements('Test1');
                const notExpected = false;

                expect(result).not.toEqual(notExpected);
                expect(component).toBeTruthy();
            });
        });
    });
});
