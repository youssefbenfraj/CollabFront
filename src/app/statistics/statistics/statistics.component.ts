import { Component,OnInit } from '@angular/core';
import { ModulesService } from '../../services/modules.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls:[ './statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  moduleStatistics: any;

  constructor(private modulesService: ModulesService) {}

  ngOnInit(): void {
    this.loadModuleStatistics();
  }

  loadModuleStatistics(): void {
    this.modulesService.getModuleStatistics().subscribe(
      (data) => {
        this.moduleStatistics = data;
        console.log('Module Statistics:', this.moduleStatistics);
      },
      (error) => {
        console.error('Error fetching module statistics:', error);
      }
    );
  }
}
