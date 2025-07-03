import { Routes } from '@angular/router';
import { StarWarsTableComponent } from './components/star-wars-table/star-wars-table.component';
import { ProfileComponent } from './components/profile/profile.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'heroes',
        pathMatch: 'full'
    },
    {
        path: 'heroes',
        component: StarWarsTableComponent
    },
    {
        path: 'characters/:id',
        component: ProfileComponent
    }
];
