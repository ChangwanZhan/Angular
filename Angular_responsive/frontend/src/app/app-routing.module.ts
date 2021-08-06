import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomepageComponent} from "./components/homepage/homepage.component";
import {WatchlistComponent} from "./components/watchlist/watchlist.component";
import {MediaDetailsComponent} from "./components/media-details/media-details.component";

const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'mylist', component: WatchlistComponent},
  {
    path: 'watch',
    children: [
      { path: ':mediaCat/:mediaId', component: MediaDetailsComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
