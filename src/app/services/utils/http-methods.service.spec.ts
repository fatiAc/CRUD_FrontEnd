import { TestBed } from '@angular/core/testing';

import { HttpMethodsService } from './http-methods.service';

describe('HttpMethodsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpMethodsService = TestBed.get(HttpMethodsService);
    expect(service).toBeTruthy();
  });
});
