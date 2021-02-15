import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ethers } from "ethers";
import { LendingContract } from 'app/core/services/contracts/lending/lending-contract.injectable';
import { LendingWebSocketContract } from 'app/core/services/contracts/lending/lending-websocket.injectable';
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
    private lendingContractService: LendingContractService,
    private lendingContract: LendingContract,
    private lendingSocketProvider: LendingWebSocketContract,
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
        Validators.min(0),
        Validators.max(1000)
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


    this.lendingSocketProvider.on("Deposit", (_totalDeposit, _interest) => {
      alert(`Your ETH submission has been confirmed for ${_totalDeposit.toString()} at a donation rate ${_interest.toString()}`)
    })
  }

  deposit() {
    // Get all the values from the Form
    let crypto  = this.lendingForm.controls['token'].value;
    let percent = this.lendingForm.controls['percent'].value;
    let amount  = this.lendingForm.controls['amount'].value;

    // Call the Lending Contract Deposit function.
    this.lendingContractService.deposit(percent, amount);

  }

  formatLabel(value: number) {
    return value + '%';
  }

}
