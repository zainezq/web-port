import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { marked } from 'marked';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-now',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './now.component.html',
  styleUrls: ['./now.component.scss']
})
export class NowComponent implements OnInit {
  markdownContent: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadMarkdown();
  }

  async loadMarkdown(): Promise<void> {
    const rawMd = await this.http.get('assets/now/now.md', { responseType: 'text' }).toPromise();
    if (rawMd != null) {
      this.markdownContent = await marked.parse(rawMd);
    }
  }
}
