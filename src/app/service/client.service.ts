import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { Client } from '../model/class/Client';
import { ApiResponseModel } from '../model';
import { Employee } from '../model/class/Employee';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private clientList: Client[] = [
    {
      clientId: 1,
      contactPersonName: 'John Doe',
      companyName: 'TechCorp',
      address: '123 Main St',
      city: 'Metropolis',
      pincode: '123456',
      state: 'NY',
      employeeStrength: 50,
      gstNo: '12345GST123',
      contactNo: '9876543210',
      regNo: 'TC12345',
    },
    {
      clientId: 2,
      contactPersonName: 'Jane Smith',
      companyName: 'Innovatech',
      address: '456 Elm St',
      city: 'Gotham',
      pincode: '654321',
      state: 'CA',
      employeeStrength: 150,
      gstNo: '67890GST456',
      contactNo: '8765432109',
      regNo: 'IT67890',
    },
  ];

  private empList: Employee[] = [
    {
      empId: 1,
      empName: "maras",
      empDesignation: "marasdesignation",
      empEmailId:"sasss",
      role: "admin"
    }
  ]

  

  constructor(private http: HttpClient) { 
  }
  getAllClients(): Observable<ApiResponseModel> {
      const staticResponse: ApiResponseModel = {
        message: "",
        result: true,
        data: this.clientList
      };
  
      // Return the static data wrapped in an observable
      return of(staticResponse);
    }

    getAllEmployees(): Observable<ApiResponseModel> {
      const staticResponse: ApiResponseModel = {
        message: "",
        result: true,
        data: this.empList
      };
  
      // Return the static data wrapped in an observable
      return of(staticResponse);
    }

  // getAllClients ():Observable<ApiResponseModel> {
  //     return this.http.get<ApiResponseModel>("http://localhost:3000/getAllClients");
  // }
//   addUpdate (obj: Client):Observable<ApiResponseModel> {
//     return this.http.post<ApiResponseModel>("URL",obj);
// }
// deleteClientById (id: number):Observable<ApiResponseModel> {
//   return this.http.delete<ApiResponseModel>(`http://localhost:9000/api/client/${id}`);
// }

deleteClientById(id: number): Observable<ApiResponseModel> {
  const index = this.clientList.findIndex((c) => c.clientId === id);
  if (index > -1) {
    this.clientList.splice(index, 1);
    return of({
      message: 'Client deleted successfully',
      result: true,
      data: null,
    });
  } else {
    return of({
      message: 'Client not found',
      result: false,
      data: null,
    });
  }
}

addUpdate(obj: Client):Observable<ApiResponseModel> {
  if (!obj.clientId) {
    obj.clientId = this.clientList.length + 1;
    this.clientList.push(obj);
  } else {
    const index = this.clientList.findIndex((c) => c.clientId === obj.clientId);
    if (index > -1) {
      this.clientList[index] = obj;
    }
  }
  const response: ApiResponseModel = {
    message: 'Client saved successfully',
    result: true,
    data: obj,
  };
  return of(response);
}

addEmployeeUpdate(obj: Client):Observable<ApiResponseModel> {
  if (!obj.clientId) {
    obj.clientId = this.clientList.length + 1;
    this.clientList.push(obj);
  } else {
    const index = this.clientList.findIndex((c) => c.clientId === obj.clientId);
    if (index > -1) {
      this.clientList[index] = obj;
    }
  }
  const response: ApiResponseModel = {
    message: 'Client saved successfully',
    result: true,
    data: obj,
  };
  return of(response);
}

// addUpdate(obj: Client): Observable<ApiResponseModel> {
//   if (!obj.clientId) {
//     obj.clientId = this.clientList.length + 1;
//     return this.http.post<ApiResponseModel>('http://localhost:3000/getAllClients', obj);
//   } else {
//     return this.http.put<ApiResponseModel>(`http://localhost:9000/api/client/${obj.clientId}`, obj);
//   }
// }
// }

// addUpdate(obj: any) {
//   if (!obj.clientId) {
//     // Assigning a new clientId
//     obj.clientId = this.clientList.length + 1;

//     // Make a POST request to add the new client to the server
//     return this.http.post<ApiResponseModel>('http://localhost:3000/clients', obj).pipe(
//       map(response => {
//         console.log(response);
//         if (response.result) {
//           // Successfully added the client, handle response
//           this.clientList.push(obj); // Optionally add it to the clientList in memory
//           return response;
//         } else {
//           throw new Error(response.message); // Handle any errors returned by the server
//         }
//       }),
//       catchError(error => {
//         console.error('Error adding client:', error);
//         throw error; // Rethrow or handle error appropriately
//       })
//     );
//   } else {
//     // If it's an update, you would need a PUT request instead of POST
//     return this.http.put<ApiResponseModel>(`http://localhost:3000/clients/${obj.clientId}`, obj).pipe(
//       map(response => {
//         if (response.result) {
//           // Successfully updated the client, handle response
//           const index = this.clientList.findIndex(client => client.clientId === obj.clientId);
//           if (index !== -1) {
//             this.clientList[index] = obj; // Update the client in memory
//           }
//           return response;
//         } else {
//           throw new Error(response.message); // Handle any errors returned by the server
//         }
//       }),
//       catchError(error => {
//         console.error('Error updating client:', error);
//         throw error; // Rethrow or handle error appropriately
//       })
//     );
//   }
// }

}
