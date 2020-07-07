import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ObsService {
  actuliza$ = new EventEmitter <string> ();
  constructor() { }
}
