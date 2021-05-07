import {Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {LazyLoadComponentsUtil} from '../../util/lazy-loading-components';
import {DashboardComponent} from './dashboard/dashboard.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.sass']
})
export class AdminComponent implements OnInit {

  @ViewChild('target', {read: ViewContainerRef, static: false}) entry!: ViewContainerRef;

  constructor(private resolver: ComponentFactoryResolver) {
  }

  ngOnInit(): void {
  }

  loadDashboardComponent(): void {
    LazyLoadComponentsUtil.loadComponent(DashboardComponent, this.entry, this.resolver);
  }


  changeColor(e: any): void {
    const element = document.querySelectorAll('.active');
    [].forEach.call(element, (el: any) => {
      el.classList.remove('active');
      el.classList.add('inactive');
    });
    e.target.className = 'active';
  }

}
