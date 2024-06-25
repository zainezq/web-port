import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoadingSpinnerService } from './loading-spinner.service';
import { Subscription } from 'rxjs';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  standalone: true,
  imports: [
    NgIf
  ],
  styleUrls: ['./loading-spinner.component.scss']
})
export class LoadingSpinnerComponent implements OnInit, OnDestroy {
  isLoading = false;
  private loadingSubscription!: Subscription;

  constructor(private loadingSpinnerService: LoadingSpinnerService) {}

  ngOnInit(): void {
    this.loadingSubscription = this.loadingSpinnerService.loading$.subscribe(
      (isLoading) => {
        console.log(isLoading);
        this.isLoading = isLoading;
      }
    );
  }

  ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe();
  }
}
