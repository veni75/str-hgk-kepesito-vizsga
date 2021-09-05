import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

import { StudentFormComponent } from './student-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudentListComponent } from '../student-list/student-list.component';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { StudentHttpService } from 'src/app/service/student-http.service';

describe('StudentFormComponent', () => {
  let component: StudentFormComponent;
  let fixture: ComponentFixture<StudentFormComponent>;
  window.onbeforeunload = jasmine.createSpy();


  beforeEach(async () => {
    const mockHttpService = jasmine.createSpyObj(['getById']);
    mockHttpService.getById.and.returnValue(of({
      _id: 1,
      firstName: '',
      lastName: 'MockLastName',
      email: 'mock@email.com'
    }));

    await TestBed.configureTestingModule({
      declarations: [ StudentFormComponent, StudentListComponent ],
      imports: [
        RouterTestingModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule.withRoutes(
          [{path: 'student-list', component: StudentListComponent}]
        )],providers: [
          {
            provide: ActivatedRoute,
            useValue: {
             params: of([{id: 1}]),
             snapshot: {params: ({id: 1})}
            }
          },
          {
            provide: StudentHttpService,
            useValue: mockHttpService
          }
        ]

    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('Létrejön a Student-form komponens', () => {
    expect(component).toBeTruthy();
  });

  it('Label elemek megfelelően létrejönnek', ()=> {
    const compiledComponent = fixture.debugElement.nativeElement;

    const firstNameLabel = compiledComponent.querySelector('label[for="firstName"]');
    const lastNameLabel = compiledComponent.querySelector('label[for="lastName"]');
    const emailLabel = compiledComponent.querySelector('label[for="email"]');

    /**
     * Elemek léteznek
     */
    expect(firstNameLabel).toBeTruthy();
    expect(lastNameLabel).toBeTruthy();
    expect(emailLabel).toBeTruthy();

    /**
     * Belső szöveges tartalma a cimkéknek
     */
     expect(firstNameLabel.innerHTML).toBe('FirstName:');
     expect(lastNameLabel.innerHTML).toBe('LastName:');
     expect(emailLabel.innerHTML).toBe('Email:')
  });

  it('Input elemek megfelelően létrejönnek', ()=> {
    const compiledComponent = fixture.debugElement.nativeElement;

    const firtsNameInput = compiledComponent.querySelector('#firstName');
    const lastNameInput = compiledComponent.querySelector('#lastName');
    const emailInput = compiledComponent.querySelector('#email');

    expect(firtsNameInput).toBeTruthy();
    expect(lastNameInput).toBeTruthy();
    expect(emailInput).toBeTruthy();
  });

  it('Form és Button gomb megjelenik', ()=> {
    const compiledComponent = fixture.debugElement.nativeElement;

    const buttomElement: HTMLButtonElement = compiledComponent.querySelector('#save-button');
    const formElement: HTMLFormElement = compiledComponent.querySelector('#studentForm');

    expect(buttomElement).toBeTruthy();
    expect(formElement).toBeTruthy();
  });

  it('A gomb kezdetben NEM kattintható', ()=> {
    const compiledComponent = fixture.debugElement.nativeElement;
    fixture.detectChanges();

    const saveButton: HTMLButtonElement = compiledComponent.querySelector('#save-button');
    expect(saveButton.disabled).toBeTruthy();
  })

  it('Ha minden mező érvényes kattintható a gomb',  ()=>{
    const compiledComponent = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    let studentForm;

    if(component.form){
      studentForm = component.form
    }else if(component.reactForm) {
      studentForm = component.reactForm
    }
    studentForm.controls['firstName'].setValue('John');
    studentForm.controls['lastName'].setValue('Doe');
    studentForm.controls['email'].setValue('email@email.com');

    fixture.detectChanges();

    const saveButton: HTMLButtonElement = compiledComponent.querySelector('#save-button');
    expect(saveButton.disabled).toBeFalsy();

    const mosckSaveFunction = spyOn(component, 'saveStudent');
    saveButton.click();

    });

    it('Ha rákkatintank a gombra akkor meghívódik a függvény', ()=>{
      const compiledComponent = fixture.debugElement.nativeElement;
      fixture.detectChanges();
      let studentForm;

      if(component.form){
        studentForm = component.form
      } else if(component.reactForm) {
        studentForm = component.reactForm
      }
      studentForm.controls['firstName'].setValue('John');
      studentForm.controls['lastName'].setValue('Doe');
      studentForm.controls['email'].setValue('email@email.com');
      fixture.detectChanges();

      const mosckSaveFunction = spyOn(component, 'saveStudent');

      const saveButton: HTMLButtonElement = compiledComponent.querySelector('#save-button');
      saveButton.click();
      expect(mosckSaveFunction).toHaveBeenCalled();
    })

    it('Bootsrap klasszok használata', ()=>{
      const compiledComponent = fixture.debugElement.nativeElement;
      fixture.detectChanges();

      const inputElements: Array<HTMLInputElement> = compiledComponent.querySelectorAll('.form-control');
      expect(inputElements.length).toBe(3);

      const labelElements: Array<HTMLLabelElement> = compiledComponent.querySelectorAll('.form-label')
      expect(labelElements.length).toBe(3);

      const buttonLabel: HTMLButtonElement = compiledComponent.querySelector('.btn btn-primary');
      expect(labelElements).toBeTruthy();
    })


});
