import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientService } from '../service/client.service';
import { ApiResponseModel } from '../model';
import { Employee } from '../model/class/Employee';
import { Client } from '../model/class/Client';

@Component({
  selector: 'app-client-project',
  imports: [ReactiveFormsModule],
  templateUrl: './client-project.component.html',
  styleUrl: './client-project.component.css'
})
export class ClientProjectComponent implements OnInit {

  projectForm: FormGroup = new FormGroup({
    clientProjectId: new FormControl(0),
    projectName: new FormControl("", [Validators.required, Validators.minLength(4)]),
    startDate: new FormControl(""),
    expectedEndDate: new FormControl(""),
    leadByEmpId: new FormControl(""),
    completedDate: new FormControl(""),
    contactPerson: new FormControl(""),
    contactPersonContactNo: new FormControl(""),
    contactPersonEmailId: new FormControl(""),
    totalEmpWorking: new FormControl(""),
    projectCost: new FormControl(""),
    projectDetails: new FormControl(""),
    clientId: new FormControl("")
  })

  clientService = inject(ClientService);
  empList: Employee[] = [];
  clientList: Client[] = [];

  ngOnInit(): void {
   this.loadClient();
   this.loadEmployees();
  }

  loadClient() {
    this.clientService.getAllClients().subscribe({
      next: (res: ApiResponseModel) => {
        this.clientList = res.data;
      },
      error: () => {
        alert('Error loading client data');
      },
    });
  }

  loadEmployees() {
    this.clientService.getAllEmployees().subscribe({
      next: (res: ApiResponseModel) => {
        this.empList = res.data;
      },
      error: () => {
        alert('Error loading client data');
      },
    });
  }

  onSave() {
    const formValue = this.projectForm.value;
    debugger;
  }

}
