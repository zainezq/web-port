import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectServiceService } from '../../../services/project-service/project-service.service';
import { marked } from 'marked';
import * as yaml from 'js-yaml';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {QuizzesService} from '../../../services/quizzes-service/quizzes.service';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-quizzes-detail',
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './quizzes-detail.component.html',
  styleUrl: './quizzes-detail.component.scss'
})
export class QuizzesDetailComponent implements OnInit {
  quiz: any = null;
  userResponses: { [key: number]: string } = {};

  @ViewChild('content', { static: false }) content?: ElementRef;

  constructor(
    private quizService: QuizzesService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');
      console.log("slug", slug);
      if (slug) {
        this.quizService.getQuizContent(slug).subscribe({
          next: (data) => {
            // Extract YAML frontmatter from Markdown
            const match = data.match(/^---\n([\s\S]+?)\n---\n/);
            if (match) {
              this.quiz = yaml.load(match[1]);
              console.log("quiz", this.quiz);
            }
          },
          error: (err) => {
            console.error('Error fetching quiz:', err);
          },
        });
      }
    });
  }

  submitQuiz(): void {
    const responseText = Object.entries(this.userResponses)
      .map(([index, answer]) => `Q${+index + 1}: ${answer}`)
      .join('\n');
    console.log(responseText);
    //const mailtoLink = `mailto:your-email@example.com?subject=Quiz Submission&body=${encodeURIComponent(responseText)}`;
    //window.location.href = mailtoLink;
  }
}
