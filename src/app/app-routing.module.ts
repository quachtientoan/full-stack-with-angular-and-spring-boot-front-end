import { UploadFilesComponent } from './upload-files/upload-files.component';

import { RegisterComponent } from './register/register.component';
import { TodoComponent } from './todo/todo.component';
import { TodosComponent } from './todos/todos.component';
import { CustomerComponent } from './customer/customer.component';
import { RouteGuardService } from './service/route-guard.service';
import { LogoutComponent } from './logout/logout.component';
import { ListCustomersComponent } from './list-customers/list-customers.component';

import { ErrorComponent } from './error/error.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoneyTranferComponent } from './money-tranfer/money-tranfer.component';
import { MoneyTranferListComponent } from './money-tranfer-list/money-tranfer-list.component';

const routes: Routes = [
  {path : '', component : LoginComponent},
  {path : 'login', component : LoginComponent},
  {path : 'register', component : RegisterComponent},
  {path : 'document', component : UploadFilesComponent},
  {path : 'welcome/:name', component : WelcomeComponent, canActivate : [RouteGuardService]},
  {path : 'customer', component : ListCustomersComponent, canActivate : [RouteGuardService]},
  {path : 'customer/:id', component : CustomerComponent, canActivate : [RouteGuardService]},
  {path : 'todo', component : TodosComponent, canActivate : [RouteGuardService]},
  {path : 'todo/:id', component : TodoComponent, canActivate : [RouteGuardService]},
  {path : 'money-tranfer', component : MoneyTranferListComponent, canActivate : [RouteGuardService]},
  {path : 'money-tranfer/:id', component : MoneyTranferComponent, canActivate : [RouteGuardService]},
  {path : 'logout', component : LogoutComponent, canActivate : [RouteGuardService]},
  {path : '**', component : ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
