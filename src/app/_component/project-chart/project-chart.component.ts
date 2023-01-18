import { Component } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { calculatedData } from 'src/app/_interface/CalculatedData';
import { DataService } from 'src/app/_service/data.service';

@Component({
  selector: 'app-project-chart',
  templateUrl: './project-chart.component.html',
  styleUrls: ['./project-chart.component.css']
})
export class ProjectChartComponent {

  public lineChartType: ChartType = 'line';
  private calculatedData: calculatedData[] = [];

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [],
    labels: []
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5
      }
    },
    scales: {
      y:
        {
          position: 'left',
        },
    },
  };
  
  constructor(private dataService: DataService){
    window['line'] = this;
  }

  ngOnInit(): void {
    this.dataService.$calculatedData.subscribe(res => {
      console.log(res);
      this.calculatedData = res;
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
    })
  }

  private getYData(){
    return this.calculatedData.map(ele => ele.startBalalce);
  }

  private getXData(){
    return this.calculatedData.map(ele => ele.year);
  }

  ngOnDestroy(): void {
    //Unscribe to provent memory leak
    this.dataService.$calculatedData.unsubscribe();
  }

}
