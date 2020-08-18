import { Router } from '@angular/router';
import { MoneyTranferView } from '../Model/money-tranfer-view';
import { MoneyTranferService } from './../service/money-tranfer.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent, ConfirmationService, Message, MessageService } from 'primeng/api';
import { ViewEncapsulation } from '@angular/core';
import { BasicAuthenticationService } from '../service/basic-authentication.service';
import { ROLE_ADMIN, ROLE_USER } from '../app.constant';
import { Table } from 'primeng/table';


@Component({
  selector: 'app-money-tranfer-list',
  templateUrl: './money-tranfer-list.component.html',
  styleUrls: ['./money-tranfer-list.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [ConfirmationService]
})


export class MoneyTranferListComponent implements OnInit {


  constructor(
    private moneyTranferService: MoneyTranferService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private basicAuthenticationService: BasicAuthenticationService,
    private messageService: MessageService
  ) { }

  moneyTranfers: MoneyTranferView[];
  selectedMoneyTranfer: MoneyTranferView;
  totalRecords: number;
  loading: boolean;
  columns: any[];
  msgs: Message[] = [];
  ids: number[] = [];
  roles: string;
  first = 0;
  rows = 10;
  @ViewChild(Table) dt: Table;

  ngOnInit(): void {
    this.moneyTranferService.getList('admin').subscribe(
      response => {
        this.moneyTranfers = response
        this.totalRecords = this.moneyTranfers.length
      }
    )
    this.loading = true;
  }

  listALl() {
    this.moneyTranferService.getList('admin').subscribe(
      response => {
        this.moneyTranfers = response
        this.totalRecords = this.moneyTranfers.length
      }
    )
  }

  createNew() {
    this.router.navigate(['money-tranfer', -1])
  }

  loadTrans(event: LazyLoadEvent) {
    this.listALl();
    this.loading = true;
    setTimeout(() => {
      if (this.moneyTranfers) {
        this.moneyTranfers = this.moneyTranfers.slice(event.first, (event.first + event.rows));
        this.loading = false;

      }
    }, 1000);
  }

  editTrans(moneyTranfer: MoneyTranferView) {

    this.router.navigate(['money-tranfer', moneyTranfer.id])
  }

  deleteTrans(moneyTranfer: MoneyTranferView) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' }];
        
        this.moneyTranferService.deleteOne(`admin`, moneyTranfer.id).subscribe(
          response => {
            this.listALl();
          }
        )
      },
      reject: () => {
        this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
      }
    })
  }

  deleteSelectedTrans(moneyTranfers: MoneyTranferView[]) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this records?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' }];
        moneyTranfers.forEach(element => {
          this.moneyTranferService.deleteOne(`admin`, element.id).subscribe(
            response => {
              this.listALl()
              this.selectedMoneyTranfer = null
              this.dt.reset();
            }
          )
        });
      },
      reject: () => {
        this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
      }
    })
  }
  approveSelectedTrans(moneyTranfers: MoneyTranferView[]) {
    this.confirmationService.confirm({
      message: 'Do you want to approve this records?',
      header: 'Approve Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        moneyTranfers.forEach(element => {
          element.status = "Phê Duyệt";
          this.moneyTranferService.create(`admin`, element).subscribe(
            response => {
              this.listALl();
              this.selectedMoneyTranfer = null
              this.dt.reset();
            }
          )
        });
        this.messageService.add({ severity: 'success', summary: 'Confirm', detail: 'Transactions are approved' })
      },
      reject: () => {
      }
    })
  }

  rejectSelectedTrans(moneyTranfers: MoneyTranferView[]) {
    this.confirmationService.confirm({
      message: 'Do you want to reject this records?',
      header: 'Approve Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' }];
        moneyTranfers.forEach(element => {
          element.status = "Từ Chối";
          this.moneyTranferService.create(`admin`, element).subscribe(
            response => {
              this.listALl()
              this.selectedMoneyTranfer = null
              this.dt.reset();
            }
          )
        });
      },
      reject: () => {
        this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
      }
    })

  }

  isRoleAdmin() {
    this.roles = this.basicAuthenticationService.getAuthenticateRole()
    if (this.roles.includes(ROLE_ADMIN)) {
      return true;
    } else {
      return false
    }
  }

  isRoleUser() {
    this.roles = this.basicAuthenticationService.getAuthenticateRole()
    if (this.roles.includes(ROLE_USER)) {
      return true;
    } else {
      return false
    }
  }

}
