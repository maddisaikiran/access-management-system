import { Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../../service/master.service';
import { ApiResponseModel, IDesignation } from '../../model';

@Component({
  selector: 'app-designation',
  imports: [],
  templateUrl: './designation.component.html',
  styleUrl: './designation.component.css'
})
export class DesignationComponent implements OnInit {
  designationList: IDesignation[] = [];
 ngOnInit(): void {
  this.getAllDesignations();
  // this.masterService.getDesignation().subscribe({
  //   next: (res: ApiResponseModel) => {
  //    this.designationList = res.data;
  //   },
  //   error: () => {
  //     alert("API Error");
  //   }
  // })
 }

 getAllDesignations() {
  this.masterService.getDesignation().subscribe({
    next: (res: ApiResponseModel) => {
      this.designationList = res.data;
    },
    error: () => {
      alert('Error while fetching designations');
    },
  });
}
 masterService = inject(MasterService);

}
