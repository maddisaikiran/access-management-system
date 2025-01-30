import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Menu } from '../model/interface/Menu';
import { environment } from '../../environments/environment';
import { forkJoin, map, Observable } from 'rxjs';
import { MenuPermission } from '../model/interface/Menupermission';
import { User } from '../model/interface/User';
import { Roles } from '../model/interface/Roles';
import { Course } from '../model/interface/Course';
import { Topic } from '../model/interface/Topic';
import { AssignUser } from '../model/interface/AssignUser';
import { DoubtForm } from '../model/interface/DoubtForm';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { 
  }

  loadMenuByRole(role: string): Observable<Menu[]> {
    return this.http.get<Menu[]>(`${this.baseUrl + 'getAllMenuByRole'}?role=${role}`);
  }

  getMenuPermission(role: string, menuName: string) : Observable<MenuPermission> {
    return this.http.get<MenuPermission>(`${this.baseUrl + 'menuPermission'}?userRole=${role}&menuCode=${menuName}`);
  }

  getUsersByRole(role: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl+'users'}?userRole=${role}`);
  }

  createEmployee(data: User): Observable<User> {
    return this.http.post<User>(this.baseUrl + 'users',data);
  }
    updateEmployee(data: User): Observable<User> {
      return this.http.put<User>(`${this.baseUrl+'users'}/${data.id}`, data);
    }

  deleteEmployee(id: number): Observable<User> {
    return this.http.delete<User>(`${this.baseUrl + 'users'}/${id}`);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl + 'users'}`);
  }

  getAllRoles() :Observable<Roles[]> {
    return this.http.get<Roles[]>(`${this.baseUrl + 'getAllRoles'}`)
  }

  getUserById(id: string) : Observable<User> {
    return this.http.get<User>(`${this.baseUrl + 'users'}/${id}`);
  }

  getAllMenus() :Observable<Roles[]> {
    return this.http.get<Roles[]>(`${this.baseUrl + 'getAllMenus'}`)
  }

  assignRolePermission(data: MenuPermission): Observable<MenuPermission> {
    return this.http.put<MenuPermission>(`${this.baseUrl + 'menuPermission'}/${data.id}`, data);
  }

  getMenusByUserRole(role: string) : Observable<MenuPermission> {
    return this.http.get<MenuPermission>(`${this.baseUrl + 'menuPermission'}?userRole=${role}`);
  }

  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.baseUrl + 'courses'}`);
  }

  getCoursesById(empId: number): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.baseUrl + 'courses'}?empId=${empId}`);
  }

  deleteCourse(id: number): Observable<Course> {
    return this.http.delete<Course>(`${this.baseUrl + 'courses'}/${id}`);
  }

  createCourse(obj: Course): Observable<Course> {
    return this.http.post<Course>(`${this.baseUrl + 'courses'}`, obj);
  }

  updateCourse(obj: Course): Observable<Course> {
    return this.http.put<Course>(`${this.baseUrl + 'courses'}/${obj.id}`, obj);
  }

  saveTopics(topics: Topic): Observable<Topic> {
    return this.http.post<Topic>(`${this.baseUrl +'topics'}`, topics);
  }

  updateTopic(topic: Topic): Observable<Topic> {
    return this.http.put<Topic>(`${this.baseUrl + 'topics'}/${topic.id}`, topic);
  }

  deleteTopics(ids: string[]): Observable<void[]> {
    const deleteRequests = ids.map((id) =>
      this.http.delete<void>(`${this.baseUrl}topics/${id}`)
    );
    return forkJoin(deleteRequests);
  }

  deleteTopic(id: number): Observable<Topic> {
    return this.http.delete<Topic>(`${this.baseUrl + 'topics'}/${id}`);
  }

  getTopicsByCourseId(courseId: string) : Observable<Topic[]> {
    return this.http.get<Topic[]>(`${this.baseUrl + 'topics'}?courseId=${courseId}`);
  }

  assignUser(obj: AssignUser): Observable<AssignUser> {
    return this.http.post<AssignUser>(`${this.baseUrl + 'assign'}`, obj);
  }

  getAllAssign(): Observable<AssignUser[]> {
    return this.http.get<AssignUser[]>(`${this.baseUrl + 'assign'}`);
  }

  getAssignUsers(id: string): Observable<AssignUser[]> {
    return this.http.get<AssignUser[]>(`${this.baseUrl + 'assign'}?empId=${id}`);
  }
  getAssignEmployees(id: number): Observable<AssignUser> {
    return this.http.get<AssignUser>(`${this.baseUrl + 'assign'}?userId=${id}`);
  }

  doubtForm(obj: DoubtForm): Observable<DoubtForm> {
    return this.http.post<DoubtForm>(`${this.baseUrl + 'form'}`, obj);
  }
}
