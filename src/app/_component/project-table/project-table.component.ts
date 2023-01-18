import { Component } from '@angular/core';
import { calculatedData } from 'src/app/_interface/CalculatedData';
import { DataService } from 'src/app/_service/data.service';

@Component({
  selector: 'app-project-table',
  templateUrl: './project-table.component.html',
  styleUrls: ['./project-table.component.css']
})
export class ProjectTableComponent {

  public calculatedData: calculatedData[] = [];
  public showTable: boolean = false;
  
  constructor(private dataService: DataService){}

  ngOnInit(): void {
    this.dataService.$calculatedData.subscribe(res => {
      this.calculatedData = res;
      res.length > 0 ? this.showTable = true : this.showTable = false;
    })
  }

  ngOnDestroy(): void {
    //Unscribe to provent memory leak
    this.dataService.$calculatedData.unsubscribe();
  }
}
