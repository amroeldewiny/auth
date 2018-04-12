import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servies/auth-service/auth.service';

import { ICustomer } from '../../interface/customer.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  customers: ICustomer[];

  constructor(public auth: AuthService) { }

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.getCustomers();
    } else {
      console.log('something wrong here');
    }
  }

  getCustomers() {
    this.auth.getData('/api/customers')
      .subscribe((res: ICustomer[]) => {
        console.log(res);
        this.customers = res;
      })
  }

  editCustomer(id) {
    console.log(id);
  }

  deleteCustomer(id) {
    console.log(id);
  }

}
