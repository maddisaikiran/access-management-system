import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { CourseDialogComponent } from '../course-dialog/course-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Topic } from '../../model/interface/Topic';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-create-course-step-2',
  imports: [MaterialModule],
  templateUrl: './create-course-step-2.component.html',
  styleUrl: './create-course-step-2.component.css'
})
export class CreateCourseStep2Component implements OnInit {
  @Input() topics: Topic[] = [];
  @Output() topicsUpdated = new EventEmitter<Topic[]>();
  @Input() courseId!: string;
  dataSource: any;
  editId: string | null = null;
  empId!: string;
  displayedColumns: string[] = ["title", "action"];

  constructor(private dialog: MatDialog, private act: ActivatedRoute, private userService: UserService) {
    
  }
  ngOnInit(): void {
      this.editId = this.act.snapshot.paramMap.get('id');
      const userString = localStorage.getItem('userObject') ?? '';
    let user: { id: string } = {
      id: ''
    };
if (userString) {
    user = JSON.parse(userString);
    this.empId = user.id;
}
      if (this.editId) {
        this.loadTopics();
      }
  }

  loadTopics() {
    if(!this.editId) return;
    this.userService.getTopicsByCourseId(this.editId).subscribe({
      next:(topics: Topic[]) => {
        this.topics = topics;
        this.dataSource = new MatTableDataSource<Topic>(this.topics);
      }
    });
  }
 
  openPopup(add: boolean, id?: number) {
    this.dialog.open(CourseDialogComponent, {
      width: '30%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        add,
        topic: this.topics,
        id
      }
    }).afterClosed().subscribe({
      next: (res: any) => {
        if(res) {
             if(this.editId) {
              this.saveTopicFun(add, res, id);
             } else {
              this.editId = this.courseId;
              this.saveTopicFun(add, res, id);
             }
        this.dataSource = new MatTableDataSource<Topic>(this.topics);
        this.topicsUpdated.emit(this.topics);
      }
      }
    })
   }

   saveTopicFun(add: any, res: any, id: any) {
    if(add) {
      const obj = {
        ...res,
        courseId: this.editId,
        empId: this.empId
      }
     this.userService.saveTopics(obj).subscribe({
      next: (topic : any) => {
         this.loadTopics();
      }
     })
     } else {
      const topic = this.topics.find((topic: Topic) => topic.id === id);
                const obj = {
                  ...res,
                  id: topic?.id,
                  courseId: this.editId,
                  empId: this.empId
                }
               this.userService.updateTopic(obj).subscribe({
                  next: () => {
                    this.loadTopics();
                  }
               })
     }
   }

   deleteTopic(id: number) {
        this.userService.deleteTopic(id).subscribe({
          next: () => {
              this.loadTopics();
              this.topicsUpdated.emit(this.topics);
          }
        })
   }

   editTopic(id: number) {
      this.openPopup(false, id);
   }

  addTopic() {
    this.openPopup(true);
  }
}
