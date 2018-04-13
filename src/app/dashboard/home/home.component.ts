import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { AuthService } from '../../servies/auth-service/auth.service';

import { ICustomer } from '../../interface/customer.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  customers: ICustomer[];
  modalRef: BsModalRef;
  error: boolean = false;


  customerForm = new FormGroup({
    "name": new FormControl('', Validators.required),
    "email": new FormControl('', Validators.required),
    "address": new FormControl('', Validators.required),
    "job": new FormControl('', Validators.required),
    "user_id": new FormControl(localStorage.getItem('userID')),
  });

  constructor(public auth: AuthService, private modalService: BsModalService) { }

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.getCustomers();
    } else {
      console.log('something wrong here');
    }
  }

  openModal(template: any) {
    this.modalRef = this.modalService.show(template);
  }

  getCustomers() {
    this.auth.getData('/api/customers')
      .subscribe((res: any) => {
        console.log(res);
        this.customers = res;
      })
  }

  submitBtn() {
    this.auth.postData('/api/customers', this.customerForm.value)
      .subscribe((res: ICustomer[]) => {
        console.log(res);
        if (res) {
          this.modalRef.hide();
          this.getCustomers();
        }

      }, (err) => {
        this.error = true;
        setTimeout(() => {
          this.error = false;
        }, 4000);
        console.log(err);
      });
    console.log(this.customerForm.value);
  }

  editCustomer(id) {
    console.log(id);
  }

  deleteCustomer(id) {
    console.log(id);
  }

}
