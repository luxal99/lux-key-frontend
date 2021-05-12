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
import {CapitalizePipe} from './pipes/capitalize.pipe';
import {FormAutocompleteComponent} from './components/form-components/form-autocomplete/form-autocomplete.component';
import {CarBrandPipe} from './pipes/car-brand.pipe';
import {KeyCategoryOverviewComponent} from './components/admin/code-book/key-category-overview/key-category-overview.component';
import {KeySubCategoryOverviewComponent} from './components/admin/code-book/key-sub-category-overview/key-sub-category-overview.component';
import {ClientComponent} from './components/admin/client/client.component';
import {KeyComponent} from './components/admin/key/key.component';
import {AddKeyDialogComponent} from './components/admin/key/add-key-dialog/add-key-dialog.component';
import {EditKeyDialogComponent} from './components/admin/key/edit-key-dialog/edit-key-dialog.component';
import {FormSelectGroupComponent} from './components/form-components/form-select-group/form-select-group.component';
import {KeyOverviewDialogComponent} from './components/admin/key/key-overview-dialog/key-overview-dialog.component';
import { KeyPipe } from './pipes/key.pipe';
import { ServicesComponent } from './components/services/services.component';

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
    FormBuilderComponent,
    CapitalizePipe,
    FormAutocompleteComponent,
    CarBrandPipe,
    KeyCategoryOverviewComponent,
    KeySubCategoryOverviewComponent,
    ClientComponent,
    KeyComponent,
    AddKeyDialogComponent,
    EditKeyDialogComponent,
    FormSelectGroupComponent,
    KeyOverviewDialogComponent,
    KeyPipe,
    ServicesComponent
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
  entryComponents: [AddKeyDialogComponent, ClientComponent, CodeBookComponent,
    DashboardComponent, EditKeyDialogComponent, KeyComponent, KeyOverviewDialogComponent],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
