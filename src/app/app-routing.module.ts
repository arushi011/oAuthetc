import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { FriendsComponent } from './feature/friends/friends.component';
import { EventsComponent } from './feature/events/events.component';

const routes: Routes = [{
        path: '',
        component: HomeComponent
    }, {
        path: 'friends',
        component: FriendsComponent
    }, {
        path: 'events',
        component: EventsComponent
    }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
