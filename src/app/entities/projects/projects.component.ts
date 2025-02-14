import { Component, OnInit } from '@angular/core';
import { GithubService } from '../../services/github.service';
import { NgForOf, NgIf } from '@angular/common';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-projects',
  imports: [NgIf, NgForOf, RouterLink, RouterLinkActive],
  templateUrl: './projects.component.html',
  standalone: true,
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit {
  manualProjects: any[] = [
    {
      name: 'Database handler - CLI Interface Written in Python',
      description: 'A project that handles database operations using a CLI interface written in Python.',
    },
    {
      name: 'Project Beta',
      description: 'A machine learning project using TensorFlow.',
      link: 'https://example.com/project-beta'
    },
    {
      name: 'Project Gamma',
      description: 'A full-stack application with Node.js and React.',
      link: 'https://example.com/project-gamma'
    }
  ];

  githubRepositories: any[] = [];
  visibleGithubRepos: any[] = []; // Paginated GitHub repositories
  currentPage: number = 1;
  reposPerPage: number = 5; // Limit number of GitHub repositories per page

  constructor(private githubService: GithubService) {}

  ngOnInit(): void {
    this.githubService.fetchRepositories().subscribe({
      next: (data) => {
        this.githubRepositories = data;
        this.updateVisibleGithubRepos();
      },
      error: (error) => {
        console.error('Error fetching repositories:', error);
      },
      complete: () => {
        console.log('Repositories fetched successfully');
      }
    });
  }

  updateVisibleGithubRepos(): void {
    const start = (this.currentPage - 1) * this.reposPerPage;
    const end = start + this.reposPerPage;
    this.visibleGithubRepos = this.githubRepositories.slice(start, end);
  }

  nextPage(): void {
    if (this.currentPage * this.reposPerPage < this.githubRepositories.length) {
      this.currentPage++;
      this.updateVisibleGithubRepos();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateVisibleGithubRepos();
    }
  }
}
