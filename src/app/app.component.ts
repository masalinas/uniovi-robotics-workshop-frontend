import { ChangeDetectorRef, Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
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
  text = '';
  msg = '';

  data: any;
  options: any;
  platformId = inject(PLATFORM_ID);

  constructor(private cd: ChangeDetectorRef) {}

  private initChart() {
      if (isPlatformBrowser(this.platformId)) {
          const documentStyle = getComputedStyle(document.documentElement);
          const textColor = documentStyle.getPropertyValue('--p-text-color');
          const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
          const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

          const colorAccX = 'red';
          const colorAccY = 'green';
          const colorAccZ = 'blue';

          this.data = {
              labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
              datasets: [
                  {
                      label: 'Accelerometer X',
                      data: [65, 59, 80, 81, 56, 55, 40],
                      fill: false,
                      borderColor: colorAccX,
                      tension: 0.4
                  },
                  {
                      label: 'Accelerometer Y',
                      data: [28, 48, 40, 19, 86, 27, 90],
                      fill: false,
                      borderColor: colorAccY,
                      tension: 0.4
                  },
                  {
                      label: 'Accelerometer Z',
                      data: [89, 12, 10, 67, 16, 90, 8],
                      fill: false,
                      borderColor: colorAccZ,
                      tension: 0.4
                  }                    
              ]
          };

          this.options = {
              maintainAspectRatio: false,
              aspectRatio: 0.6,
              plugins: {
                  legend: {
                      labels: {
                          color: textColor
                      }
                  }
              },
              scales: {
                  x: {
                      ticks: {
                          color: textColorSecondary
                      },
                      grid: {
                          color: surfaceBorder,
                          drawBorder: false
                      }
                  },
                  y: {
                      ticks: {
                          color: textColorSecondary
                      },
                      grid: {
                          color: surfaceBorder,
                          drawBorder: false
                      }
                  }
              }
          };
          this.cd.markForCheck()
      }
  }

  ngOnInit() {
      this.initChart();
  }

  onClick() {
    this.msg = 'Welcome ' + this.text;
  }  
}
