import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProjectChartComponent } from './_component/project-chart/project-chart.component';
import { ProjectTableComponent } from './_component/project-table/project-table.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'chart', component: ProjectChartComponent},
  {path: 'table', component: ProjectTableComponent},
  {path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
