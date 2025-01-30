import { RouterModule, Routes } from '@angular/router';
import { MasterComponent } from './components/master/master.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { ClientComponent } from './components/client/client.component';
import { ClientProjectComponent } from './client-project/client-project.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ResetpasswordComponent } from './component/resetpassword/resetpassword.component';
import { authGuard } from './guard/auth.guard';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { UserComponent } from './components/user/user.component';
import { UserRoleComponent } from './components/user-role/user-role.component';
import { ProductsComponent } from './components/products/products.component';
import { CreateCourseComponent } from './components/create-course/create-course.component';
import { NgModule } from '@angular/core';
import { ViewCourseComponent } from './components/view-course/view-course.component';
import { AssignCourseComponent } from './components/assign-course/assign-course.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo: 'sign-in',
        pathMatch:'full'
    },
    { 
        path:'sign-in',
        component: SignInComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [authGuard],
        children: [
            { 
                path:'profile',
                component: ProfileComponent
            },
            {
                path: 'contact-us',
                component: ContactUsComponent
            },
            {
                path:'employee',
                component:EmployeeComponent,
            },
            {
                path: 'employee/add',
                component: AddEmployeeComponent
            },
            {
                path:'employee/edit/:code',
                component: AddEmployeeComponent
            },
            {
                path:'users',
                component: UserComponent
            },
            {
                path: 'userRole',
                component: UserRoleComponent
            },
            {
                path: 'courses',
                component: ProductsComponent,
            },
            {
                path: 'course/add-new-course',
                component: CreateCourseComponent
            },
            {
                path: 'course/edit/:id',
                component: CreateCourseComponent
            },
            {
                path: 'course/view/:id',
                component: ViewCourseComponent
            },
            {
                path: 'assign-course',
                component: AssignCourseComponent
            }
        ]
    },
    {
        path: 'reset-password',
        component: ResetpasswordComponent,
        canActivate: [authGuard]
    },
    {
        path:'master',
        component:MasterComponent
    },
    {
        path:'employee',
        component:EmployeeComponent
    },
    {
        path:'client',
        component:ClientComponent
    },
    {
        path:'client-project',
        component:ClientProjectComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [],
  })

export class AppRoutes { }  
