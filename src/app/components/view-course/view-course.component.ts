import { Component, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { UserService } from '../../service/user.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Topic } from '../../model/interface/Topic';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-view-course',
  imports: [MaterialModule, RouterLink],
  templateUrl: './view-course.component.html',
  styleUrl: './view-course.component.css'
})
export class ViewCourseComponent implements OnInit {
   displayedColumns: string[] = ["Topic Title", "Topic Content"];
     dataSource: any;
     topicList! : Topic[];
     courseId!: string;
     @ViewChild(MatPaginator) paginator!: MatPaginator;
      @ViewChild(MatSort) sort!: MatSort;
  
     constructor(private userService: UserService, private toaster: ToastrService, private router: Router,
      private act: ActivatedRoute
     ) {}
  ngOnInit(): void {
    this.courseId = this.act.snapshot.paramMap.get('id') as string;
    if(this.courseId) {
      this.userService.getTopicsByCourseId(this.courseId).subscribe({
        next: (res: any) => {
           this.dataSource = new MatTableDataSource<Topic>(res);
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
        }
      })
    }
  }
}
