import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }
  GP(){
    this.router.navigate([ '/GP']);
  }
  GB(){
    this.router.navigate([ '/GB']);

  }
  GPA(){
    this.router.navigate([ '/GPA']);
  }
  GBA(){
    this.router.navigate([ '/GBA']);
  }
 

  ngOnInit(): void {
  }

}
