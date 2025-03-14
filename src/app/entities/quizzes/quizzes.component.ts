import { Component } from '@angular/core';
import {QuizPost, QuizzesService} from '../../services/quizzes-service/quizzes.service';
import {NgForOf} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-quizzes',
  imports: [
    NgForOf,
    RouterLink
  ],
  templateUrl: './quizzes.component.html',
  styleUrl: './quizzes.component.scss'
})
export class QuizzesComponent {
  quiz: QuizPost[] = [];
  tags = ['All', "Technology" , 'Productivity', 'Education', 'Programming', 'Space', 'Islamic'];

  constructor(private quizService: QuizzesService) {
    this.quizService.getQuizList().subscribe((data) => {
      this.quiz = data;
    });
  }
}
