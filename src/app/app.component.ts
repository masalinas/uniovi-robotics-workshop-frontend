import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { MessageModule } from 'primeng/message';

import { registerables, Chart } from 'chart.js';
import StreamingPlugin from 'chartjs-plugin-streaming';
import 'chartjs-adapter-luxon';

Chart.register(...registerables, StreamingPlugin);

import { MqttService } from 'ngx-mqtt';
import { Subscription } from 'rxjs';

interface SensorData {
  accX: number;
  accY: number;
  accZ: number;
}

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
  private msg!: string;

  text!: string;
  data: any;
  options: any;

  private latestData: SensorData | null = null;
  private isConnection = false
  private subscription!: Subscription;

  constructor(private mqttService: MqttService) {
  }

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

                // push mock data
                /*chart.data.datasets!.forEach((ds: any) => {
                  ds.data!.push({
                    x: now,
                    y: Math.floor(Math.random() * 100) // random mock value
                  });
                });*/

                // push data received via MQTT
                if (this.latestData) {  
                  chart.data.datasets[0].data.push(
                    {
                      x: now,
                      y: this.latestData.accX,
                    });

                  chart.data.datasets[1].data.push(
                    {
                      x: now,
                      y: this.latestData.accY,
                    });

                  chart.data.datasets[2].data.push(
                    {
                      x: now,
                      y: this.latestData.accZ,
                    });

                  this.latestData = null; // reset after using
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
        }
      }
    }
  }

  private initMQTTClient() {
    // Listen for connect event
    this.mqttService?.onConnect.subscribe(() => {
      this.isConnection = true;
      console.log('Connection succeeded!')

      // Subscribe to topic
      this.subscription = this.mqttService.observe('sensors/+/data').subscribe(msg => {
        const payload = msg.payload.toString();
        console.log('Received:', payload); 
        
        this.latestData = JSON.parse(msg.payload.toString());
      });      
    });

    // Listen for error event
    this.mqttService?.onError.subscribe((error: any) => {
      this.isConnection = false;
      console.log('Connection failed', error)
    });
  }  
  
  ngOnInit() {
    this.initChart();

    this.initMQTTClient();
  }

  onClick() {
    this.msg = 'Welcome ' + this.text;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
