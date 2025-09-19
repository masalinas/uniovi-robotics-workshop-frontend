import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { MessageModule } from 'primeng/message';

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
  private maxPoints = 20; // show last N points
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
          scales: {
            x: { title: { display: true, text: 'Time' } },
            y: { title: { display: true, text: 'Value [m/s2]' } },
          },
        };
    }
  }

  private startMockData() {
    const pushRandomValues = () => {
      const label = new Date().toLocaleTimeString();

      // generate 3 random values
      const values = [
        Math.floor(Math.random() * 100),
        Math.floor(Math.random() * 100),
        Math.floor(Math.random() * 100),
      ];

      // add values to datasets
      values.forEach((val, i) => {
        (this.data.datasets[i].data as number[]).push(val);
      });

      this.data.labels!.push(label);

      // remove old points if exceeding maxPoints
      if (this.data.labels!.length > this.maxPoints) {
        this.data.labels!.shift();
        this.data.datasets.forEach((ds: any) => (ds.data as number[]).shift());
      }

      // trigger chart update
      this.data = { ...this.data };

      // schedule next random push
      const delay = Math.floor(Math.random() * 2000) + 500; // 0.5 - 2.5s
      this.intervalId = setTimeout(pushRandomValues, delay);
    };

    // start mock data
    pushRandomValues(); 
  }
  
  ngOnInit() {
    // configure chart
    this.initChart();

    // start mock data
    this.startMockData();
  }

  onClick() {
    this.msg = 'Welcome ' + this.text;
  }

  ngOnDestroy(): void {
    // destroy mock data
    if (this.intervalId) {
      clearTimeout(this.intervalId);
    }
  }
}
