import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';
import { environment } from '../../environments/environment';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  imports: [CommonModule, NgChartsModule],
})
export class DashboardComponent implements OnInit {
  chartData: ChartConfiguration<'pie'>['data'] = {
    labels: [],
    datasets: [{ data: [] }],
  };
  chartType: ChartType = 'pie';

  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get<any[]>(`${this.apiUrl}/dashboard/chart-data`)
      .subscribe((data) => {
        this.chartData = {
          labels: data.map((d) => d.status),
          datasets: [{ data: data.map((d) => d.count) }],
        };
      });
  }
}
