import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'chantiers',
        loadChildren: () => import('./chantiers/chantiers.module').then(m => m.ChantiersModule)
    },
    {
        path: '',
        redirectTo: 'chantiers',
        pathMatch: 'full'
    }
];
