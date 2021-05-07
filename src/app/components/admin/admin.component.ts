import {Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {LazyLoadComponentsUtil} from '../../util/lazy-loading-components';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ComponentType} from '@angular/cdk/portal';
import {CodeBookComponent} from './code-book/code-book.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.sass']
})
export class AdminComponent implements OnInit {

  @ViewChild('target', {read: ViewContainerRef, static: false}) entry!: ViewContainerRef;
  header = 'Pregled';

  constructor(private resolver: ComponentFactoryResolver) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.initDefaultMenu();
    });
  }

  initDefaultMenu(): void {
    // @ts-ignore
    const element = document.getElementById('overview-btn');
    if (element) {
      element.click();
    }
  }

  loadDashboardComponent(): void {
    this.header = 'Pregled';
    this.lazyLoad(DashboardComponent);
  }

  loadCodeBookComponent(): void {
    this.header = 'Šifarnik';
    this.lazyLoad(CodeBookComponent);
  }

  changeColor(e: any): void {
    const element = document.querySelectorAll('.active');
    [].forEach.call(element, (el: any) => {
      el.classList.remove('active');
      el.classList.add('inactive');
    });
    e.target.className = 'active';
  }

  lazyLoad(component: ComponentType<any>): void {
    LazyLoadComponentsUtil.loadComponent(component, this.entry, this.resolver);
  }
}
