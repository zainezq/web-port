import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectServiceService } from '../../../services/project-service/project-service.service';
import { marked } from 'marked';
import * as yaml from 'js-yaml';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {QuizzesService} from '../../../services/quizzes-service/quizzes.service';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import { FirebaseService } from '../../../services/firebase-service';

@Component({
  selector: 'app-quizzes-detail',
  imports: [
    NgForOf,
    NgIf,
    NgClass,
    FormsModule
  ],
  templateUrl: './quizzes-detail.component.html',
  styleUrl: './quizzes-detail.component.scss'
})
export class QuizzesDetailComponent implements OnInit {
  quiz: any = null;
  userResponses: { [key: number]: string } = {};
  submitted: boolean = false;
  score: number = 0;
  feedback: { [key: number]: string } = {};
  additionalFeedback: string = '';

  @ViewChild('content', { static: false }) content?: ElementRef;

  constructor(
    private quizService: QuizzesService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit(): void {
    this.submitted = false;
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');
      console.log("slug", slug);
      if (slug) {
        this.quizService.getQuizContent(slug).subscribe({
          next: (data) => {
            const match = data.match(/^---\n([\s\S]+?)\n---\n/);
            if (match) {
              this.quiz = yaml.load(match[1]);
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
    if (!this.quiz) return;

    this.score = 0;
    this.submitted = true;
    this.feedback = {};

    this.quiz.questions.forEach((q: any, index: number) => {
      if (this.userResponses[index] === q.answer) {
        this.score++;
        this.feedback[index] = "✅ Correct!";
      } else {
        this.feedback[index] = `❌ Wrong! Correct answer: ${q.answer}`;
      }
    });

    const quizResponse = {
      timestamp: new Date(),
      quizTitle: this.quiz.title,
      score: this.score,
      responses: this.userResponses,
      feedback: this.feedback,
      additionalFeedback: this.additionalFeedback || "No additional feedback"
    };

    this.firebaseService.submitQuizResponse(quizResponse)
      .then(() => alert("Quiz submitted successfully!"))
      .catch(error => console.error("Error submitting quiz:", error));
  }

  resetForm(): void {
    this.submitted = false;
    this.score = 0;
    this.userResponses = {};
    this.additionalFeedback = '';
    this.feedback = {};
  }
}
