import {
  Component,
  ComponentFactoryResolver,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { LazyLoadComponentsUtil } from '../../util/lazy-loading-components';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ComponentType } from '@angular/cdk/portal';
import { CodeBookComponent } from './code-book/code-book.component';
import { ClientComponent } from './client/client.component';
import { KeyComponent } from './key/key.component';
import { ServicesComponent } from './services/services.component';
import { ReportsComponent } from './reports/reports.component';
import { MessageComponent } from './message/message.component';
import { MatDrawer } from '@angular/material/sidenav';
import { AnalyticsComponent } from './analytics/analytics.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.sass'],
})
export class AdminComponent implements OnInit {
  @ViewChild('drawer') drawer!: MatDrawer;
  isMobile = window.screen.width <= 570;
  @ViewChild('target', { read: ViewContainerRef, static: false })
  entry!: ViewContainerRef;
  header = 'Pregled';

  constructor(private resolver: ComponentFactoryResolver) {}

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

  loadAnalyticsComponent(): void {
    this.header = 'Analitika';
    this.lazyLoad(AnalyticsComponent);
  }

  loadCodeBookComponent(): void {
    this.header = 'Šifarnik';
    this.lazyLoad(CodeBookComponent);
  }

  loadClientComponent(): void {
    this.header = 'Klijenti';
    this.lazyLoad(ClientComponent);
  }

  loadKeyComponent(): void {
    this.header = 'Ključevi';
    this.lazyLoad(KeyComponent);
  }

  loadServicesComponent(): void {
    this.header = 'Servisi';
    this.lazyLoad(ServicesComponent);
  }

  loadReportsComponent(): void {
    this.header = 'Izveštaji';
    this.lazyLoad(ReportsComponent);
  }

  loadMessageComponent(): void {
    this.header = 'Poruke';
    this.lazyLoad(MessageComponent);
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
    if (this.isMobile && this.drawer.opened) {
      this.drawer.toggle().then(() => {
        LazyLoadComponentsUtil.loadComponent(
          component,
          this.entry,
          this.resolver
        );
      });
    } else {
      LazyLoadComponentsUtil.loadComponent(
        component,
        this.entry,
        this.resolver
      );
    }
  }
}
