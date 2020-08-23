import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './pages/home/home.page';
import { FavouritesPage } from './pages/favourites/favourites.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  {
    path: 'favourites',
    component: FavouritesPage
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
