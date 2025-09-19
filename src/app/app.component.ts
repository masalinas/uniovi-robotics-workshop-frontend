import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { MessageModule } from 'primeng/message';

import { registerables } from 'chart.js';
import StreamingPlugin from 'chartjs-plugin-streaming';
import 'chartjs-adapter-luxon';

import { Chart } from 'chart.js';
Chart.register(...registerables, StreamingPlugin);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    RouterOutlet, 
    CommonModule,
    RouterOutlet,
    InputTextModule,
    ButtonModule,
    MessageModule,
    FormsModule,
    ChartModule,
  ],  
})
export class AppComponent implements OnInit {    
  private platformId = inject(PLATFORM_ID);
  private intervalId: any;
  private msg!: string;

  text!: string;
  data: any;
  options: any;

  private initChart() {
    if (isPlatformBrowser(this.platformId)) {
      const colorAccX = 'red';
      const colorAccY = 'green';
      const colorAccZ = 'blue';

      this.data = {
        labels: [],
        datasets: [
          {
            label: 'Accelerometer X',
            data: [],
            fill: false,
            borderColor: colorAccX,
            tension: 0.4
          },
          {
            label: 'Accelerometer Y',
            data: [],
            fill: false,
            borderColor: colorAccY,
            tension: 0.4
          },
          {
            label: 'Accelerometer Z',
            data: [],
            fill: false,
            borderColor: colorAccZ,
            tension: 0.4
          }                    
        ]
      };

      this.options = {        
        responsive: true,
        animation: false,
        parsing: false, // important for streaming plugin
        scales: {
          x: {
            type: 'realtime',
            realtime: {
              duration: 20000, // show last 20 seconds
              refresh: 1000,   // update every second
              delay: 1000,     // delay for smooth scrolling
              onRefresh: (chart: any) => {
                const now = Date.now();

                chart.data.datasets!.forEach((ds: any) => {
                  ds.data!.push({
                    x: now,
                    y: Math.floor(Math.random() * 100) // random mock value
                  });
                });
              }
            }
          },
          y: { 
            title: { 
              display: true, 
              text: 'Value [m/s2]' 
            } 
          },
        },
      };
    }
  }

  ngOnInit() {
    this.initChart();
  }

  onClick() {
    this.msg = 'Welcome ' + this.text;
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearTimeout(this.intervalId);
    }
  }
}
