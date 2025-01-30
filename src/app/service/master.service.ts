import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiResponseModel } from '../model';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http: HttpClient) { }

  getDesignation(): Observable<ApiResponseModel> {
    const staticResponse: ApiResponseModel = {
      message: "",
      result: true,
      data: [
        { designationId: 1, designation: 'Developer' },
        { designationId: 2, designation: 'Tester' },
        { designationId: 3, designation: 'Manager' },
        // { designationId: 4, designation: 'TL'}
      ]
    };

    // Return the static data wrapped in an observable
    return of(staticResponse);
  }

  // getDesignationList(): Observable<ApiResponseModel> {
  //   return this.http.get<ApiResponseModel>("https://freeapi.miniprojectideas.com/api/ClientStrive/GetAllDesignation")
  // }
}
