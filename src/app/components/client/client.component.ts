import { Component, inject, OnInit } from '@angular/core';
import { Client } from '../../model/class/Client';
import { FormsModule } from '@angular/forms';
import { ClientService } from '../../service/client.service';
import { ApiResponseModel } from '../../model';
import { DatePipe, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-client',
  imports: [FormsModule, UpperCasePipe, DatePipe],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent implements OnInit{
  clientObj : Client = new Client();
 clientList: Client[] = [];
 currentDate: Date = new Date();
 clientService = inject(ClientService);
  ngOnInit(): void {
    this.loadClient();
  }
saveClient() {
  this.clientService.addUpdate(this.clientObj).subscribe({
    next: (res: ApiResponseModel) => {
        
        alert('Client Created Successfully');
        this.clientObj = new Client();
        this.loadClient();
    },
    error: () => {
      alert('Error saving client');
    },
  });
}

onDelete(id: number) {
  const isDelete = confirm("Are you sure want to delete");
  if(isDelete) {
    this.clientService.deleteClientById(id).subscribe({
      next: (res: ApiResponseModel) => {
          alert('Client Deleted Successfully');
          this.loadClient();
          alert(res.message);
      },
      error: () => {
        alert('Error saving client');
      },
    });
  }
}

onEdit(data: Client) {
this.clientObj = data;
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
}
