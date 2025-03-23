import { Component, OnInit } from '@angular/core';
import { GithubService } from '../../services/github.service';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {ProjectPost, ProjectServiceService} from '../../services/project-service/project-service.service';

@Component({
  selector: 'app-projects',
  imports: [NgIf, NgForOf, RouterLink, RouterLinkActive, DatePipe],
  templateUrl: './projects.component.html',
  standalone: true,
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit {
  projects : ProjectPost[] = [];

  githubRepositories: any[] = [];
  visibleGithubRepos: any[] = []; // Paginated GitHub repositories
  currentPage: number = 1;
  reposPerPage: number = 6; // Limit number of GitHub repositories per page

  constructor(private githubService: GithubService, private projectService: ProjectServiceService) {}

  ngOnInit(): void {
    this.projectService.getProjectList().subscribe(data => {
      this.projects = data;
    })

    console.log('projects component initialized' + this.projects);
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
