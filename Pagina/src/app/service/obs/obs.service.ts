import { EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ObsService {
  actuliza$ = new EventEmitter <string> ();
  constructor() { }
}
