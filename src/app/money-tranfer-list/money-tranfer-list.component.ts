import { Router } from '@angular/router';
import { MoneyTranferView } from '../Model/money-tranfer-view';
import { MoneyTranferService } from './../service/money-tranfer.service';
import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent, ConfirmationService, Message } from 'primeng/api';
import { ViewEncapsulation } from '@angular/core';
import { stringify } from '@angular/compiler/src/util';
import { HttpHeaders } from '@angular/common/http';


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
    private confirmationService: ConfirmationService
  ) { }

  moneyTranfers: MoneyTranferView[];
  selectedMoneyTranfer: MoneyTranferView;
  totalRecords: number;
  loading: boolean;
  columns: any[];
  msgs: Message[] = [];
  ids : number[] = [];

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
            this.listALl()
          }
        )
      },
      reject: () => {
        this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
      }
    })
  }

  deleteSelectedTrans(moneyTranfers: MoneyTranferView[]) {
    

    const data = {'ids' : this.ids};
		// const url = `${this.productUrl}/delete/products`;
		const options = {
			headers: new HttpHeaders({
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}),
			responseType: 'text' as 'json'
		};
		
		// const resp = this.http.post<any>(url, data, options);//.map(resp => {return resp;}).catch(err => {console.log(err);});
		
		//console.log('resp: ' + resp);
		
		// return resp;

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
            }
          )
          // this.ids.push(element.id);
        });
        // this.moneyTranferService.deleteTrans(`admin`, this.ids).subscribe(
        //   response => {
        //     this.listALl()
        //   }
        // )
      },
      reject: () => {
        this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
      }
    })


  }

}
