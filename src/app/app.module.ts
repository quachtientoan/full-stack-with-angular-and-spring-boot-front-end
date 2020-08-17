import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { HttpIntercepteBasicAuthService } from './service/http/http-intercepte-basic-auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ErrorComponent } from './error/error.component';
import { ListCustomersComponent } from './list-customers/list-customers.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { LogoutComponent } from './logout/logout.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CustomerComponent } from './customer/customer.component';
import { TodosComponent } from './todos/todos.component';
import { TodoComponent } from './todo/todo.component';
import { RegisterComponent } from './register/register.component';
import { UploadFilesComponent } from './upload-files/upload-files.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MoneyTranferComponent } from './money-tranfer/money-tranfer.component';
import { CalendarModule } from 'primeng/calendar';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {DropdownModule} from 'primeng/dropdown';
import {RadioButtonModule} from 'primeng/radiobutton';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {ButtonModule} from 'primeng/button';
import {SplitButtonModule} from 'primeng/splitbutton';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import { ToastComponent } from './toast/toast.component';
import {DialogModule} from 'primeng/dialog';
import { MoneyTranferListComponent } from './money-tranfer-list/money-tranfer-list.component';
import {TableModule} from 'primeng/table';
import {SliderModule} from 'primeng/slider';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {InputTextModule} from 'primeng/inputtext';
import {ProgressBarModule} from 'primeng/progressbar';
// import { ConfirmDialogModule } from 'primeng/confirmdialog';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    WelcomeComponent,
    ErrorComponent,
    ListCustomersComponent,
    MenuComponent,
    FooterComponent,
    LogoutComponent,
    CustomerComponent,
    TodosComponent,
    TodoComponent,
    RegisterComponent,
    UploadFilesComponent,
    MoneyTranferComponent,
    ToastComponent,
    MoneyTranferListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    CalendarModule,
    BrowserAnimationsModule,
    DropdownModule,
    RadioButtonModule,
    InputNumberModule,
    InputTextareaModule,
    ButtonModule,
    SplitButtonModule,
    AutoCompleteModule,
    ToastModule,
    DialogModule,
    TableModule,
    SliderModule,
    MultiSelectModule,
    ContextMenuModule,
    InputTextModule,
    ProgressBarModule,
    ConfirmDialogModule
   
  ],
  providers: [
    {provide : HTTP_INTERCEPTORS, useClass : HttpIntercepteBasicAuthService, multi :true},
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
