import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TownPageComponent } from './pages/town-page/town-page.component';
import { GuildPageComponent } from './pages/guild-page/guild-page.component';
import { TravelPageComponent } from './pages/travel-page/travel-page.component';
import { StartPageComponent } from './pages/start-page/start-page.component';

const routes: Routes = [
  { path: '', component: TownPageComponent },
  { path: 'start', component: StartPageComponent },
  { path: 'guild', component: GuildPageComponent },
  { path: 'travel', component: TravelPageComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
