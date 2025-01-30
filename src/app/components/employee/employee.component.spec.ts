import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { By } from '@angular/platform-browser';
import { EmployeeComponent } from './employee.component';
import { of } from 'rxjs';
import { UserService } from '../../service/user.service';
import { ToastrModule } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

describe('EmployeeComponent', () => {
  let component: EmployeeComponent;
  let fixture: ComponentFixture<EmployeeComponent>;
  class MockUserService {
    getUsers() {
      return of([]);
    }

    getMenuPermission() {
      return of({ canAdd: true, canEdit: true, canDelete: true, canView: true });
    }

    getUsersByRole(role: string) {
      if (role === 'staff') {
        return of([{ id: 1, name: 'John Doe', role: 'staff' }]); 
      }
      return of([]);
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        EmployeeComponent,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatButtonModule,
        MatCardModule,
        CommonModule,
        ToastrModule.forRoot(),
      ],
      providers: [
        provideAnimations(),
        { provide: UserService, useClass: MockUserService }, // Provide the mock service
      ],
    }).compileComponents();

    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      if (key === 'userObject') {
        return JSON.stringify({ userRole: 'admin' }); // Mock valid data
      }
      return null;
    });

    fixture = TestBed.createComponent(EmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct listing title', () => {
    component.listingTitle = 'Employee';
    fixture.detectChanges();
    const title = fixture.debugElement.query(By.css('h1')).nativeElement;
    expect(title.textContent.trim()).toBe('Employee Listing');
  });

  it('should display the add button with the correct title', () => {
    component.title = 'Add Employee';
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(button.textContent.trim()).toBe('Add Employee');
  });

  it('should call addEmployee() when the add button is clicked', () => {
    spyOn(component, 'addEmployee');
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    expect(component.addEmployee).toHaveBeenCalled();
  });

  it('should display "No Customer Found" message if no data is available', () => {
    component.dataSource = { filteredData: [] };
    fixture.detectChanges();
    const message = fixture.debugElement.query(By.css('h2')).nativeElement;
    expect(message.textContent.trim()).toBe('No Customer Found. click the Add Button to Add the Customer');
  });

  it('should display the table when dataSource has filteredData', () => {
    const data = [{ code: 'EMP001', name: 'John Doe' }];
  component.dataSource = new MatTableDataSource(data);
  fixture.detectChanges();

  const table = fixture.debugElement.query(By.css('table'));
  expect(table).toBeTruthy();
  });  


  it('should call editEmployee() when Edit button is clicked', () => {
    component.dataSource = new MatTableDataSource([
      { id: 1, code: 'EMP001', name: 'John Doe' }
    ]);
    fixture.detectChanges();
  
    spyOn(component, 'editEmployee');
    const editButton = fixture.debugElement.query(By.css('.gap-10'));
    editButton.triggerEventHandler('click', null);
    expect(component.editEmployee).toHaveBeenCalledWith(component.dataSource.data[0]);
  });

  it('should call deleteEmployee() when Delete button is clicked', () => {
    component.dataSource = new MatTableDataSource([
      { id: 1, code: 'EMP001', name: 'John Doe' }
    ]);
    fixture.detectChanges();
  
    const deleteEmployeeSpy = spyOn(component, 'deleteEmployee').and.callThrough();
  
    const deleteButton = fixture.debugElement.query(By.css('button[color="accent"]'));
  
    deleteButton.triggerEventHandler('click', null);
  
    expect(deleteEmployeeSpy).toHaveBeenCalledWith(1);
  });
  
});

