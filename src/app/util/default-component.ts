import {Component, OnInit} from '@angular/core';

@Component({
  template: ''
})
export abstract class DefaultComponent<T> implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }
}
