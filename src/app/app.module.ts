import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ParametrageComponent} from './pages/parametrage/parametrage.component';
import {HttpClientModule} from '@angular/common/http';
import {CategorieService} from './services/categorieService/categorie.service';
import {ProductService} from './services/productService/product.service';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {FormsModule} from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { jqxGridModule } from 'jqwidgets-ng/jqxgrid';
import {ModalModule} from 'ngx-bootstrap/modal';
import {AlertBoxService} from './services/utils/alert-box.service';
import { SearchComponent } from './pages/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    ParametrageComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgMultiSelectDropDownModule.forRoot(),
    FormsModule,
    AngularFontAwesomeModule,
    jqxGridModule,
    ModalModule.forRoot(),
  ],
  providers: [
    ProductService,
    CategorieService,
    AlertBoxService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
