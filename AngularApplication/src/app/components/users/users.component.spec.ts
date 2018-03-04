import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersComponent } from './users.component';
import { UserService } from '../../services/user.service'

import { FormsModule } from '@angular/forms';
import { Pipe, PipeTransform } from '@angular/core';
import { FilterPipe } from '../../pipes/filter.pipe';

import { ReactiveFormsModule } from '@angular/forms';

import { Http, HttpModule, BaseRequestOptions } from '@angular/http';

import {MockBackend} from "@angular/http/testing";

class UserServiceMock {
  public getAllUsers () {
    return undefined;
  }
  public getUserByID () {
    return undefined;
  }
  public updateUser () {
    return undefined;
  }
}

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let backend: MockBackend;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersComponent, FilterPipe ],
      imports: [ FormsModule, HttpModule, ReactiveFormsModule ],
      providers:[ UserService, MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend, options) => new Http(backend, options),
          deps: [MockBackend, BaseRequestOptions]
        }]
    })

    // Configure the component with another set of Providers
    TestBed.overrideComponent(
      UsersComponent,
      {set: {providers: [{provide: UserService, useClass: UserServiceMock}]}}
    );
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
