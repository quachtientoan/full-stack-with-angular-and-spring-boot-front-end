import { MoneyTranferView } from '../Model/money-tranfer-view';
import { MoneyTranferService } from './../service/money-tranfer.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-money-tranfer-list',
  templateUrl: './money-tranfer-list.component.html',
  styleUrls: ['./money-tranfer-list.component.css']
})


export class MoneyTranferListComponent implements OnInit {

  
  constructor(
    private moneyTranferService : MoneyTranferService,
  ) { }

  moneyTranfers : MoneyTranferView[]

  ngOnInit(): void {
    this.listALl()
  }

  listALl(){
    this.moneyTranferService.getList('admin').subscribe(
      response => {
        this.moneyTranfers = response
      }
    )
  }
  
}
