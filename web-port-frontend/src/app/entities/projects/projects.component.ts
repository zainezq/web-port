import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {GithubService} from '../../services/github.service';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-projects',
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './projects.component.html',
  standalone: true,
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit {
  repositories: any[] = [];
  visibleRepositories: any[] = [];
  currentPage: number = 1;
  reposPerPage: number = 5;  // Limit number of repositories per page



  constructor(
    private githubService: GithubService,
    private el: ElementRef,
    private renderer: Renderer2
  ) {}
  ngOnInit(): void {
    this.githubService.fetchRepositories().subscribe({
      next: (data) => {
        this.repositories = data;
        this.updateVisibleRepositories();

      },
      error: (error) => {
        console.error('Error fetching repositories:', error);
      },
      complete: () => {
        console.log('Repositories fetched successfully');
      }
    });
  }
  updateVisibleRepositories(): void {
    const start = (this.currentPage - 1) * this.reposPerPage;
    const end = start + this.reposPerPage;
    this.visibleRepositories = this.repositories.slice(start, end);
  }

  nextPage(): void {
    if (this.currentPage * this.reposPerPage < this.repositories.length) {
      this.currentPage++;
      this.updateVisibleRepositories();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateVisibleRepositories();
    }
  }
}
