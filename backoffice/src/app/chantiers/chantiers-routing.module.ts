import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChantierListComponent } from './chantier-list/chantier-list.component';
import { ChantierDetailComponent } from './chantier-detail/chantier-detail.component';
import { ChantierFormComponent } from './chantier-form/chantier-form.component';

const routes: Routes = [
    { path: '', component: ChantierListComponent },
    { path: 'nouveau', component: ChantierFormComponent },
    { path: ':id', component: ChantierDetailComponent },
    { path: ':id/editer', component: ChantierFormComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ChantiersRoutingModule { }