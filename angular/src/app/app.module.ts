import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SchoolListComponent } from './components/school-list/school-list.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { StudentFormComponent } from './components/student-form/student-form.component';
import { SchoolFormComponent } from './components/school-form/school-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ClassroomComponent } from './components/classroom/classroom.component';
import { ClassroomListComponent } from './components/classroom-list/classroom-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SchoolListComponent,
    StudentListComponent,
    StudentFormComponent,
    SchoolFormComponent,
    ClassroomComponent,
    ClassroomListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
