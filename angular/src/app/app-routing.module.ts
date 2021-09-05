import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassroomListComponent } from './components/classroom-list/classroom-list.component';
import { ClassroomComponent } from './components/classroom/classroom.component';
import { SchoolFormComponent } from './components/school-form/school-form.component';
import { SchoolListComponent } from './components/school-list/school-list.component';
import { StudentFormComponent } from './components/student-form/student-form.component';
import { StudentListComponent } from './components/student-list/student-list.component';

const routes: Routes = [
  {path:'student-list', component: StudentListComponent},
  {path: 'student', component: StudentFormComponent},
  {path: 'student/edit/:id', component: StudentFormComponent},
  {path: 'school-list', component: SchoolListComponent},
  {path: 'school', component: SchoolFormComponent},
  {path:'school/edit/:id', component: SchoolFormComponent},
  {path: 'classroom-list', component: ClassroomListComponent},
  {path: 'classroom/:id', component: ClassroomComponent},
  {path:'', component: StudentListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
