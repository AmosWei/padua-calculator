import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CapitalGrowForm } from 'src/app/_interface/CapitalGrowForm';
import { DataService } from 'src/app/_service/data.service'

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent {

  public form: FormGroup;
  public percentagePattern = /^\d+%$/;

  public formData: CapitalGrowForm = {
    salary: '',
    contributionRate: '',
    inflationRate: '',
    earningsRate: '',
    feesRate: '',
    taxRate: '',
    withdrawalRate: '',
    ageStopContri: '',
    ageStartWithdrawals: ''

  }

  constructor(private fb: FormBuilder, private dataService: DataService) {
    this.form = this.fb.group(this.formData);
  }

  public reset(){
    this.form.reset();
    this.dataService.reset();
  }

  public calculate(){
    this.dataService.reset();
    this.dataService.calculateProjectionData(this.form);
  }


  public isValid(value: number): boolean{
    if(isNaN(value)) {
      return true;}
    else{
      return false;
    }  
  }
}
