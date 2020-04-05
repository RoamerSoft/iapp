import {TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';

import {BackButtonService} from './back-button.service';

describe('BackButtonService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [ RouterTestingModule ]
    }));

    it('should be created', () => {
        const service: BackButtonService = TestBed.get(BackButtonService);
        expect(service).toBeTruthy();
    });
});
