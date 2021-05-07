import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginComponent} from './components/login/login.component';
import {MaterialModule} from './material.module';
import {FormInputComponent} from './components/form-components/form-input/form-input.component';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AdminComponent} from './components/admin/admin.component';
import {DashboardComponent} from './components/admin/dashboard/dashboard.component';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {NavbarComponent} from './components/navbar/navbar.component';
import {ComponentActivatorComponent} from './components/component-activator/component-activator.component';
import {CodeBookComponent} from './components/admin/code-book/code-book.component';
import {DynamicFieldDirective} from './directive/dynamic-field.directive';
import {FormSelectComponent} from './components/form-components/form-select/form-select.component';
import {ElementBindingComponent} from './components/element-binding/element-binding.component';
import {CarBrandOverviewComponent} from './components/admin/code-book/car-brand-overview/car-brand-overview.component';
import {CarModelOverviewComponent} from './components/admin/code-book/car-model-overview/car-model-overview.component';
import {FormBuilderComponent} from './components/form-components/form-builder/form-builder.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FormInputComponent,
    AdminComponent,
    DashboardComponent,
    NavbarComponent,
    ComponentActivatorComponent,
    CodeBookComponent,
    DynamicFieldDirective,
    FormSelectComponent,
    ElementBindingComponent,
    CarBrandOverviewComponent,
    CarModelOverviewComponent,
    FormBuilderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  entryComponents: [CodeBookComponent, DashboardComponent],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
