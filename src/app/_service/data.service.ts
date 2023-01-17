import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { calculatedData } from '../_interface/CalculatedData';
import { CapitalGrowForm } from '../_interface/CapitalGrowForm';
import { ChartConfiguration } from 'chart.js';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  years: number[] = [];
  age: number[] = [];
  calculatedData: calculatedData[] = [];

  //Assuming brith year is 1977
  private birthYear: number = 1977

  //Assuming start balance is $300000
  private startBalance = 300000;

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: 'Start Balance',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      }
    ],
    labels: []
  };

  constructor() {
    for(let i = 2022; i <= 2070; i++){
      this.years.push(i);
    }
  }

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
    console.log(ageStopContri);
    let ageStartWithdrawals = form.controls['ageStartWithdrawals'].value;
    console.log(ageStartWithdrawals);

    
    this.years.forEach(year => {
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
      if(calculatedDataElement.age < ageStopContri){
        calculatedDataElement.contribution = Math.round((salary*(contributionRate)*(1 + inflationRate)));
      }
      calculatedDataElement.earnings = Math.round((calculatedDataElement.contribution + this.startBalance)*earningsRate);
      calculatedDataElement.tax = Math.round(calculatedDataElement.earnings + calculatedDataElement.contribution)*taxRate;
      calculatedDataElement.fees = Math.round(this.startBalance*feesRate);

      //If current age bigger then the agt start withdrawal then add the withdrawal
      if(calculatedDataElement.age > ageStartWithdrawals){
        calculatedDataElement.withdrawals = Math.round(calculatedDataElement.startBalalce*withdrawalRate);
      }

      calculatedDataElement.endBalance = Math.round(this.startBalance + ((calculatedDataElement.contribution + calculatedDataElement.earnings) - 
      calculatedDataElement.fees - calculatedDataElement.tax - calculatedDataElement.withdrawals));

      //Apply the current year's end balance to next year's start balance
      this.startBalance = calculatedDataElement.endBalance ;

      this.calculatedData.push(calculatedDataElement);
    })

    this.lineChartData = {
      datasets: [
        {
          data: this.getYData(),
          label: 'Start Balance',
          backgroundColor: 'rgba(148,159,177,0.2)',
          borderColor: 'rgba(148,159,177,1)',
          pointBackgroundColor: 'rgba(148,159,177,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(148,159,177,0.8)',
          fill: 'origin',
        }
      ],
      labels: this.getXData()
    };
  }

  getYData(){
    return this.calculatedData.map(ele => ele.startBalalce);
  }

  getXData(){
    return this.calculatedData.map(ele => ele.year);
  }

  reset(){
    this.calculatedData = [];
    this.startBalance = 300000;
    this.lineChartData = {
      datasets: [
        {
          data: [],
          label: 'Start Balance',
          backgroundColor: 'rgba(148,159,177,0.2)',
          borderColor: 'rgba(148,159,177,1)',
          pointBackgroundColor: 'rgba(148,159,177,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(148,159,177,0.8)',
          fill: 'origin',
        }
      ],
      labels: []
    };
  }

  

}


