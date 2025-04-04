import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import mermaid from 'mermaid';
import { marked, Tokens, RendererObject } from 'marked';

@Component({
  selector: 'app-now',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './now.component.html',
  styleUrls: ['./now.component.scss']
})
export class NowComponent implements OnInit {
  markdownContent: string | Promise<string> = '';

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    const renderer = {
      code(this: any, args: Tokens.Code): string {
        const { text, lang } = args;
        if (lang === 'mermaid') {
          return `<div class="mermaid">${text}</div>`;
        }
        return `<pre><code class="language-${lang}">${text}</code></pre>`;
      }
    };

    marked.use({ renderer });
    mermaid.initialize({ startOnLoad: false });
    this.loadMarkdown();
  }

  async loadMarkdown(): Promise<void> {
    try {
      const rawMd = await firstValueFrom(
        this.http.get('assets/now/now.md', { responseType: 'text' })
      );
      if (rawMd != null) {
        this.markdownContent = marked.parse(rawMd);
        this.cdr.detectChanges();
        await mermaid.run({
          nodes: [document.querySelector('.mermaid')!]
        });


      }
    } catch (error) {
      console.error('Error loading now.md:', error);
    }
  }
}
