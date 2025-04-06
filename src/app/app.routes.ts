import { NgModule } from '@angular/core';
import { RouterModule, Routes, ExtraOptions } from '@angular/router';
import { HomeComponent } from './entities/home/home.component';
import { ContactComponent } from './entities/contact/contact.component';
import { ProjectsComponent } from './entities/projects/projects.component';
import { BlogListComponent } from './entities/blog-list/blog-list.component';
import { BlogDetailComponent } from './entities/blog-detail/blog-detail.component';
import { ProjectDetailComponent } from './entities/projects/project-detail/project-detail.component';
import {QuizzesDetailComponent} from './entities/quizzes/quizzes-detail/quizzes-detail.component';
import {QuizzesComponent} from './entities/quizzes/quizzes.component';
import {NowComponent} from './entities/now/now.component';
import { ChangelogComponent } from './entities/changelog/changelog.component';
import { ErrorPageComponent } from './entities/error-page/error-page.component';
import { SitemapComponent } from './entities/sitemap/sitemap.component';

const routerOptions: ExtraOptions = {
  anchorScrolling: 'enabled',
  scrollPositionRestoration: 'enabled',
  onSameUrlNavigation: 'ignore',
};


export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'blogs', component: BlogListComponent },
  { path: 'blogs/:slug', component: BlogDetailComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'projects/:slug', component: ProjectDetailComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'quizzes', component: QuizzesComponent },
  { path: 'quizzes/:slug', component: QuizzesDetailComponent },
  { path: 'now', component: NowComponent },
  { path: 'changelog', component: ChangelogComponent },
  { path: 'sitemap', component: SitemapComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '404', component: ErrorPageComponent},
  { path: '**', redirectTo: '/404' } // Wildcard route
];

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
