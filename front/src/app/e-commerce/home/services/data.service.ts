import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public actualizarPantalla: EventEmitter<void> = new EventEmitter<void>();
}