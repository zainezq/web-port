import { Routes } from '@angular/router';
import {HomeComponent} from './entities/home/home.component';
import {ContactComponent} from './entities/contact/contact.component';
import {AboutComponent} from './entities/about/about.component';
import { ProjectsComponent } from './entities/projects/projects.component';
import {BlogListComponent} from './entities/blog-list/blog-list.component';
import {BlogDetailComponent} from './entities/blog-detail/blog-detail.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'blogs', component: BlogListComponent},
  { path: 'blogs/:slug', component: BlogDetailComponent }, // Use slug instead of ID
  { path: 'projects', component: ProjectsComponent},
  { path: 'contact', component: ContactComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  //wildcard route
  { path: '**', redirectTo: '/home' }
];

