//Import Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule }   from '@angular/forms';

// Import Components
import { AppComponent } from './app.component';
import { UsersComponent } from './components/users/users.component';

//Import Services
import { UserService } from './services/user.service';

//Import Filters
import { FilterPipe } from './pipes/filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
