import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ParametrageComponent} from './pages/parametrage/parametrage.component';
import {SearchComponent} from './pages/search/search.component';


const routes: Routes = [
  {path: 'parametrage', component: ParametrageComponent },
  {path: 'search', component: SearchComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
