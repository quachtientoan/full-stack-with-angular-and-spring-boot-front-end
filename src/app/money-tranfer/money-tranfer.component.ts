import { Component, OnInit } from '@angular/core';
import { SourceAccount } from '../Model/source-account';
import { RecipientAccount } from '../Model/recipient-account';
import { Bank } from '../Model/bank';
import { SourceAccountService } from '../service/source-account.service';
import { BankService } from '../service/bank.service';
import { RecipientAccountService } from '../service/recipient-account.service';
import { MoneyTranfer } from '../Model/money-tranfer';
import { MoneyTranferService } from '../service/money-tranfer.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastComponent } from '../toast/toast.component';




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

  results: Bank[];

  display: boolean = false;
  message: string;



  constructor(
    private sourceAccountService: SourceAccountService,
    private bankService: BankService,
    private recipientAccountService: RecipientAccountService,
    private moneyTranferService: MoneyTranferService,
    private router: Router,
    private messageService: MessageService,
    private toast: ToastComponent
  ) { }


  ngOnInit(): void {
    this.moneyTranfer = { id: null, moneyTranferDate: new Date, amount: null, content: '', payer: '', receivingBank: null, recipientAccountId: null, sourceAccountId: null }

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
  }


  save() {
    this.moneyTranfer.sourceAccountId = this.selectedSourceAccount.id;
    this.moneyTranfer.receivingBank = this.selectedRecipientBank.id;
    this.moneyTranfer.recipientAccountId = this.selectedRecipientAccount.id
    console.log(`save : ` + JSON.stringify(this.moneyTranfer))

    if (this.moneyTranfer.amount.valueOf() > 50000000) {
      this.message = 'Số tiền trong một lần chuyển không vượt quá 50 triệu';
      this.showDialog();
    } else {
      this.moneyTranferService.create(`admin`, this.moneyTranfer).subscribe(
        response => {

          this.router.navigate([`todo`]).then(
            () => {
              this.toast.showSuccess();
            }
          )

        }
      )
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
  }
}
