import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LendingContractService } from 'app/core/services/contracts/lending/lending-contract.service';

@Component({
  selector: 'app-lending',
  templateUrl: './lending.component.html',
  styleUrls: ['./lending.component.scss']
})
export class LendingComponent implements OnInit {
  
  account: string = 'first';
  comeback: string;

  // --- Form Information ---
  lendingForm: FormGroup;
  cyrptoList: string[] = ['Ether', 'Link'];

  constructor(
    private lendingContract: LendingContractService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {

    /*
      If you get the amout a user has of each coin, then
      that number can be passed in as the maximum value
      allowed in the Angular Form.
    */

    this.lendingForm = this.formBuilder.group({
      amount: ['', [
        Validators.required,
        Validators.min(0.1),
        Validators.max(100)
      ]],
      percent: ['50',[
        Validators.required,
        Validators.min(0),
        Validators.max(100)
      ]],
      token: ['Ether',[
        Validators.required
      ]]
    })

    // this.lendingContract.deposit('50', '0.1')
    //   .then(comeback => {
    //     this.comeback = comeback;
    //   })
  }

  deposit() {
    // Get all the values from the Form
    let crypto  = this.lendingForm.controls['token'].value;
    let percent = this.lendingForm.controls['percent'].value;
    let amount  = this.lendingForm.controls['amount'].value;

    alert(`The values you selected are: ${crypto}, ${percent}, ${amount}`)


    // Call the Lending Contract Deposit function.
    this.lendingContract.deposit(percent, amount);

  }

  formatLabel(value: number) {
    return value + '%';
  }

}
