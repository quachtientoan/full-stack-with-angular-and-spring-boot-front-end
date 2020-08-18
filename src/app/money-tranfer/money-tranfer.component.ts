import { RecipientAccount } from './../Model/recipient-account';
import { MoneyTranferView } from './../Model/money-tranfer-view';
import { Component, OnInit } from '@angular/core';
import { SourceAccount } from '../Model/source-account';
import { Bank } from '../Model/bank';
import { SourceAccountService } from '../service/source-account.service';
import { BankService } from '../service/bank.service';
import { RecipientAccountService } from '../service/recipient-account.service';
import { MoneyTranfer } from '../Model/money-tranfer';
import { MoneyTranferService } from '../service/money-tranfer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService, SortEvent } from 'primeng/api';
import { ToastComponent } from '../toast/toast.component';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';




@Component({
  selector: 'app-money-tranfer',
  templateUrl: './money-tranfer.component.html',
  styleUrls: ['./money-tranfer.component.css'],
  providers: [ToastComponent]
})
export class MoneyTranferComponent implements OnInit {

  tranferDate: Date;
  sourceAccounts: SourceAccount[];
  selectedSourceAccount: SourceAccount;
  recipientAccounts: RecipientAccount[];
  selectedRecipientAccount: RecipientAccount;
  recipientBanks: Bank[];
  selectedRecipientBank: Bank;
  moneyTranfer: MoneyTranfer;
  selectedValue: string;
  moneyTranferView: MoneyTranferView;
  results: Bank[];

  display: boolean = false;
  message: string;
  id: number;
  submitted: boolean = false
  isMaxAmount: boolean = false

  constructor(
    private sourceAccountService: SourceAccountService,
    private bankService: BankService,
    private recipientAccountService: RecipientAccountService,
    private moneyTranferService: MoneyTranferService,
    private router: Router,
    private toast: ToastComponent,
    private activatedRouter: ActivatedRoute
  ) { }


  ngOnInit(): void {

    this.sourceAccountService.getAll(`admin`).subscribe(
      response => {
        this.sourceAccounts = response
      }
    )

    this.bankService.getAll(`admin`).subscribe(
      response => {
        this.recipientBanks = response
      }
    )

    this.recipientAccountService.getAll(`admin`).subscribe(
      response => {
        this.recipientAccounts = response
      }
    )

    this.id = this.activatedRouter.snapshot.params['id']
    this.moneyTranferView = { id: null, moneyTranferDate: new Date, amount: null, content: '', payer: 'Sender', recipientAccountEntity: null, sourceAccountEntity: null, bankEntity: null, moneyTranferDateStr: '',status : 'Khởi tạo' }
    if (this.id != -1) {
      this.moneyTranferService.getOne(`admin`, this.id).subscribe(
        response => {
          this.moneyTranferView = response
          this.moneyTranferView.moneyTranferDate = new Date(this.moneyTranferView.moneyTranferDate)
          this.selectedSourceAccount = this.moneyTranferView.sourceAccountEntity;
          this.selectedRecipientAccount = this.moneyTranferView.recipientAccountEntity;
          this.selectedRecipientBank = this.moneyTranferView.bankEntity;

        }
      )
    }
  }


  save() {
    this.submitted = true
    this.moneyTranferView.sourceAccountEntity = this.selectedSourceAccount;
    this.moneyTranferView.bankEntity = this.selectedRecipientBank;
    this.moneyTranferView.recipientAccountEntity = this.selectedRecipientAccount;
    console.log(`save : ` + JSON.stringify(this.moneyTranferView))

    if (this.moneyTranferView.sourceAccountEntity != null
      && this.moneyTranferView.bankEntity != null
      && this.moneyTranferView.recipientAccountEntity != null
      && this.moneyTranferView.amount > 0
    ) {
      console.log(this.moneyTranferView.amount)
      if (this.moneyTranferView.amount > 50000000) {
        console.log(`go here`)
        this.isMaxAmount = true
        this.message = 'Số tiền trong một lần chuyển phải lớn hơn 0 và không vượt quá 50 triệu';
        // this.showDialog();
      } else {
        this.moneyTranferService.create(`admin`, this.moneyTranferView).subscribe(
          response => {
            this.router.navigate([`money-tranfer`]).then(
              () => {
                this.toast.showSuccess();
              }
            )
          }
        )
      }
    }
  }

  searchBanks($event) {
    this.bankService.searchBanksContaining('admin', $event.query).subscribe(

      data => {

        this.results = data;
      }
    )
  }

  showDialog() {
    this.display = true;
    console.log(this.display)
  }

  sort(event: SortEvent) {
    event.data.sort((data1, data2) => {
      let value1 = data1[event.field];
      let value2 = data2[event.field];
      let result = null;

      if (value1 == null && value2 != null)
        result = -1;
      else if (value1 != null && value2 == null)
        result = 1;
      else if (value1 == null && value2 == null)
        result = 0;
      else if (typeof value1 === 'string' && typeof value2 === 'string')
        result = value1.localeCompare(value2);
      else
        result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;

      return (event.order * result);
    });
  }
}
