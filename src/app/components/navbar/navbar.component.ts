import {Component, Input, OnInit, Output} from '@angular/core';
import {EventEmitter} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {

  @Output() menuBtnClick = new EventEmitter();
  @Input() header = '';

  constructor() {
  }

  ngOnInit(): void {
  }
  logout(): void {
    sessionStorage.clear();
    location.reload();
  }
}
