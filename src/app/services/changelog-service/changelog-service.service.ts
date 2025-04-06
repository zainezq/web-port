import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import {RSSItem} from '../rss/rss.service';

@Injectable({ providedIn: 'root' })
export class ChangelogService {
  constructor(private http: HttpClient) {}

  getChangelogMarkdown(): Observable<string> {
    return this.http.get('assets/changelog/changelog.md', { responseType: 'text' });
  }

  getChangelogRssItem(): Observable<RSSItem> {
    return this.getChangelogMarkdown().pipe(
      map(content => ({
        title: 'Changelog',
        slug: 'changelog',
        summary: 'Latest changes and updates to the site.',
        date: new Date().toISOString(),
        type: 'changelog',
        content
      }))
    );
  }
}
