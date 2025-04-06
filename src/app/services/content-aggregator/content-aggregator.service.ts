import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {Injectable} from '@angular/core';
import {BlogPost, BlogService} from '../blog-service/blog.service';
import {ProjectPost, ProjectServiceService} from '../project-service/project-service.service';
import {RSSItem} from '../rss/rss.service';
import {ChangelogService} from '../changelog-service/changelog-service.service';

@Injectable({ providedIn: 'root' })
export class ContentAggregatorService {
  constructor(
    private blogService: BlogService,
    private projectService: ProjectServiceService,
    private changelogService: ChangelogService
  ) {}

  getAllRssItems(): Observable<RSSItem[]> {
    return combineLatest([
      this.blogService.getBlogList(),
      this.projectService.getProjectList(),
      this.changelogService.getChangelogMarkdown()
    ]).pipe(
      map(([blogs, projects, changelog]) => {
        const blogItems: RSSItem[] = blogs.map(post => ({
          title: post.title,
          slug: post.slug,
          summary: post.summary,
          date: post.date,
          type: 'blog'
        }));

        const projectItems: RSSItem[] = projects.map(project => ({
          title: project.title,
          slug: project.slug,
          summary: project.summary || '',
          date: project.date,
          type: 'project'
        }));

        const changelogItems: RSSItem[] = [{
          title: 'Changelog',
          slug: 'changelog',
          summary: changelog,
          date: new Date().toISOString(),
          type: 'changelog'
        }];

        return [...blogItems, ...projectItems, ...changelogItems].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
      })
    );
  }
}
