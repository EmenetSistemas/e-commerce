import { Component, HostListener } from '@angular/core';
import { DataService } from './e-commerce/home/services/data.service';
import { shared } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	
	constructor (
		private dataService : DataService
	) {
		shared.screenWidth = window.innerWidth;
	}
		
	@HostListener('window:resize', ['$event'])
	onResize(event: any) {
		shared.screenWidth = window.innerWidth;
		this.dataService.actualizarPantalla.emit();
	}
}