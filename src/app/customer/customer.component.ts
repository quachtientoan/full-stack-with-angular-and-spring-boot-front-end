import { ActivatedRoute, Router } from '@angular/router';
import { CustomerDataService } from './../service/customer-data.service';
import { Component, OnInit } from '@angular/core';

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
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  id: number
  customer: Customer
  constructor(
    private service: CustomerDataService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.customer = new Customer(this.id,'',null,'',new Date);
    this.service.retrieveCustomer('admin', this.id).subscribe(
      response => {
        this.customer = response
      }
    )
  }

  saveCustomer(){
    if(this.id == -1){
      this.service.createCustomer('admin',this.customer).subscribe(
        data => {
          this.router.navigate(['customer'])
        }
      )
    }else{
      console.log("update");
      this.service.updateCustomer('admin',this.id,this.customer).subscribe(
        
        data => {
          this.router.navigate(['customer'])
        }
      )
    }
    
  }

}
