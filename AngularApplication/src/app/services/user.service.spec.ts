import { TestBed, inject } from '@angular/core/testing';

import { UserService } from './user.service';

import { Http, HttpModule, BaseRequestOptions } from '@angular/http';
import {MockBackend} from "@angular/http/testing";

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService, MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend, options) => new Http(backend, options),
          deps: [MockBackend, BaseRequestOptions]
        }]
    });
  });

  it('should be created', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));
});
