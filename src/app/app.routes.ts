import { NgModule } from '@angular/core';
import { RouterModule, Routes, ExtraOptions } from '@angular/router';
import { HomeComponent } from './entities/home/home.component';
import { ContactComponent } from './entities/contact/contact.component';
import { ProjectsComponent } from './entities/projects/projects.component';
import { BlogListComponent } from './entities/blog-list/blog-list.component';
import { BlogDetailComponent } from './entities/blog-detail/blog-detail.component';
import { ProjectDetailComponent } from './entities/projects/project-detail/project-detail.component';

const routerOptions: ExtraOptions = {
  anchorScrolling: 'enabled', // ✅ Enables native anchor scrolling
  scrollPositionRestoration: 'enabled', // ✅ Restores scroll position when navigating back
  onSameUrlNavigation: 'ignore', // ✅ Prevents full reload on fragment changes
};


export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'blogs', component: BlogListComponent },
  { path: 'blogs/:slug', component: BlogDetailComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'projects/:slug', component: ProjectDetailComponent },
  { path: 'contact', component: ContactComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' } // Wildcard route
];

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
