import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { calculatedData } from '../_interface/CalculatedData';
import { BehaviorSubject } from 'rxjs';
import { BirthYear, StartBalance, YearUntil } from '../env';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private years: number[] = [];
  private calculatedData: calculatedData[] = [];

  public $calculatedData = new BehaviorSubject<calculatedData[]>([]);

  //Assuming brith year is 1977
  private birthYear: number = BirthYear;

  //Assuming start balance is $300000
  private startBalance = StartBalance;

  constructor() {
    for(let i = 2020; i <= YearUntil; i++){
      this.years.push(i);
    }
  }

  /**
 * @param FormGroup
 * @usage Calculator the data from form group input
 */
  public calculateProjectionData(form: FormGroup){
    let salary = form.controls['salary'].value;
    if(!salary) {
      return;
    }
    //All Rates
    let contributionRate = form.controls['contributionRate'].value / 100;
    let inflationRate = form.controls['inflationRate'].value / 100;
    let earningsRate = form.controls['earningsRate'].value / 100;
    let feesRate = form.controls['feesRate'].value / 100;
    let taxRate = form.controls['taxRate'].value / 100;
    let withdrawalRate = form.controls['withdrawalRate'].value / 100;
    let ageStopContri = form.controls['ageStopContri'].value;
    let ageStartWithdrawals = form.controls['ageStartWithdrawals'].value;

    this.years.forEach((year,index) => {
      let calculatedDataElement: calculatedData = {
        year: 0,
        age: 0,
        startBalalce: 0,
        contribution: 0,
        earnings: 0,
        fees: 0,
        tax: 0,
        withdrawals: 0,
        endBalance: 0,
        ageStartWithdrawals: 0,
        ageStopContri: 0
      }
      calculatedDataElement.year = year;
      calculatedDataElement.age = year - this.birthYear;
      calculatedDataElement.startBalalce = this.startBalance;

      //If current age smaller then the agt stop contribution then add the contribution
      if(calculatedDataElement.age <= ageStopContri){
        if(index == 0){
          calculatedDataElement.contribution = Math.round(salary*(contributionRate));
        }else {
          let lastYearContribution: number = this.calculatedData[index - 1].contribution;
          calculatedDataElement.contribution = Math.round(lastYearContribution*(1 + inflationRate));
        }
      }
      calculatedDataElement.earnings = Math.round((calculatedDataElement.contribution + this.startBalance)*earningsRate);
      calculatedDataElement.tax = Math.round((calculatedDataElement.earnings + calculatedDataElement.contribution)*taxRate);
      calculatedDataElement.fees = Math.round((this.startBalance + calculatedDataElement.contribution + calculatedDataElement.earnings)*feesRate);

      //If current age bigger then the agt start withdrawal then add the withdrawal
      if(calculatedDataElement.age >= ageStartWithdrawals){
        calculatedDataElement.withdrawals = Math.round(calculatedDataElement.startBalalce*withdrawalRate);
      }

      calculatedDataElement.endBalance = Math.round(this.startBalance + ((calculatedDataElement.contribution + calculatedDataElement.earnings) - 
      calculatedDataElement.fees - calculatedDataElement.tax - calculatedDataElement.withdrawals));

      //Apply the current year's end balance to next year's start balance
      this.startBalance = calculatedDataElement.endBalance ;

      this.calculatedData.push(calculatedDataElement);
    })

    //Push data to subject
    this.$calculatedData.next(this.calculatedData);
  }

  public reset(){
    this.calculatedData = [];
    this.startBalance = StartBalance;
    this.$calculatedData.next([]);
  }

  

}


