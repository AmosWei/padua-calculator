import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectFormComponent } from './_component/project-form/project-form.component';
import { ProjectChartComponent } from './_component/project-chart/project-chart.component';
import { NgChartsModule } from 'ng2-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { ProjectTableComponent } from './_component/project-table/project-table.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PercentageSuffixDirective } from './_directive/percentage-suffix.directive';
import { HomeComponent } from './home/home.component'
@NgModule({
  declarations: [
    AppComponent,
    ProjectFormComponent,
    ProjectChartComponent,
    ProjectTableComponent,
    PercentageSuffixDirective,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgChartsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    FlexLayoutModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
