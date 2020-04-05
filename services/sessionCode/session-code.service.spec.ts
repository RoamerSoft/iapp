import { TestBed } from '@angular/core/testing';

import { SessionCodeService } from './session-code.service';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientModule} from '@angular/common/http';

describe('SessionCodeService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule, HttpClientModule],
  }));

  it('should be created', () => {
    const service: SessionCodeService = TestBed.get(SessionCodeService);
    expect(service).toBeTruthy();
  });
});
