import { CustomerDataService } from './../service/customer-data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

export class Customer {
  constructor(
    public id: number,
    public name: string,
    public age: number,
    public branch: string,
    public createdDate: Date
  ) {
  }
}

@Component({
  selector: 'app-list-customers',
  templateUrl: './list-customers.component.html',
  styleUrls: ['./list-customers.component.css']
})
export class ListCustomersComponent implements OnInit {
  customers: Customer[]
  message: string
  constructor(
    private customerService: CustomerDataService,
    private router : Router
  ) { }

  ngOnInit() {
    this.refreshCustomer()
  }

  refreshCustomer() {
    this.customerService.retrieveAllCustomers('admin').subscribe(
      response => {
        this.customers = response
      }
    )
  }

  deleteCustomer(id) {
    this.customerService.deleteCustomer('admin', id).subscribe(
      response => {
        this.message = `Delete of Customer ${id} Successful`
        console.log(this.message)
        this.refreshCustomer()
      }
    )
  }

  updateCustomer(id) {
   this.router.navigate(['customer',id])
  }

  addCustomer() {
    this.router.navigate(['customer',-1])
   }



}
