import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { MaterialModule } from './material.module';
import { FormInputComponent } from './components/form-components/form-input/form-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './components/admin/admin.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ComponentActivatorComponent } from './components/component-activator/component-activator.component';
import { CodeBookComponent } from './components/admin/code-book/code-book.component';
import { DynamicFieldDirective } from './directive/dynamic-field.directive';
import { FormSelectComponent } from './components/form-components/form-select/form-select.component';
import { ElementBindingComponent } from './components/element-binding/element-binding.component';
import { CarBrandOverviewComponent } from './components/admin/code-book/car-brand-overview/car-brand-overview.component';
import { FormBuilderComponent } from './components/form-components/form-builder/form-builder.component';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { FormAutocompleteComponent } from './components/form-components/form-autocomplete/form-autocomplete.component';
import { CarBrandPipe } from './pipes/car-brand.pipe';
import { KeyCategoryOverviewComponent } from './components/admin/code-book/key-category-overview/key-category-overview.component';
import { KeySubCategoryOverviewComponent } from './components/admin/code-book/key-sub-category-overview/key-sub-category-overview.component';
import { ClientComponent } from './components/admin/client/client.component';
import { KeyComponent } from './components/admin/key/key.component';
import { AddKeyDialogComponent } from './components/admin/key/add-key-dialog/add-key-dialog.component';
import { EditKeyDialogComponent } from './components/admin/key/edit-key-dialog/edit-key-dialog.component';
import { FormSelectGroupComponent } from './components/form-components/form-select-group/form-select-group.component';
import { KeyOverviewDialogComponent } from './components/admin/key/key-overview-dialog/key-overview-dialog.component';
import { KeyPipe } from './pipes/key.pipe';
import { ServicesComponent } from './components/admin/services/services.component';
import { AddServiceDialogComponent } from './components/admin/services/add-service-dialog/add-service-dialog.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ServiceTableBindingComponent } from './components/admin/services/service-table-binding/service-table-binding.component';
import { ServiceOverviewDialogComponent } from './components/admin/services/service-overview-dialog/service-overview-dialog.component';
import { SumGrossPipe } from './pipes/sum-gross.pipe';
import { TokenInterceptor } from './interceptor/token.interceptor';
import { BindCarBrandsPipe } from './pipes/bind-car-brands.pipe';
import { SearchPipe } from './pipes/search.pipe';
import { KeyBrandOverviewComponent } from './components/admin/code-book/key-brand-overview/key-brand-overview.component';
import { ReportsComponent } from './components/admin/reports/reports.component';
import { SumKeyPipe } from './pipes/sum-key.pipe';
import { KeyCategoryViewComponent } from './components/admin/key/key-category-view/key-category-view.component';
import { KeySubCategoryViewComponent } from './components/admin/key/key-sub-category-view/key-sub-category-view.component';
import { KeyCardComponent } from './components/admin/key/key-card/key-card.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { FormDateComponent } from './components/form-components/form-date/form-date.component';
import { WorkServiceOverviewComponent } from './components/admin/code-book/work-service-overview/work-service-overview.component';
import { MessageComponent } from './components/admin/message/message.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ImageUploadComponent } from './util/image-upload/image-upload.component';
import { MatBadgeModule } from "@angular/material/badge";
import { CountSelectedKeysPipe } from './pipes/count-selected-keys.pipe';

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
    ServicesComponent,
    AddServiceDialogComponent,
    ServiceTableBindingComponent,
    ServiceOverviewDialogComponent,
    SumGrossPipe,
    BindCarBrandsPipe,
    SearchPipe,
    KeyBrandOverviewComponent,
    ReportsComponent,
    SumKeyPipe,
    KeyCategoryViewComponent,
    KeySubCategoryViewComponent,
    KeyCardComponent,
    ConfirmDialogComponent,
    FormDateComponent,
    WorkServiceOverviewComponent,
    MessageComponent,
    ImageUploadComponent,
    CountSelectedKeysPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    CKEditorModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production,
    }),
    MatBadgeModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {
}
