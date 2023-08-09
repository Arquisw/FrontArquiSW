import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IngenieriaDeRequisitosComponent } from './components/ingenieria-de-requisitos/ingenieria-de-requisitos.component';

const routes: Routes = [{
  path: '',
  component: IngenieriaDeRequisitosComponent,
  children: [

  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IngenieriaDeRequisitosRoutingModule { }
