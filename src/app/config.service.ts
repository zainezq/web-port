import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config: any = {};

  constructor(private http: HttpClient) {}

  async loadConfig() {
    try {
      const configData = await firstValueFrom(this.http.get('/assets/config.json'));
      this.config = configData;
    } catch (error) {
      console.error('❌ Failed to load config.json', error);
    }
  }

  get firebaseConfig() {
    return this.config?.firebase || {};
  }
}
