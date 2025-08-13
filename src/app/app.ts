import { Component, signal } from '@angular/core';

import { AppRoutingModule } from './app.routes';
import { PagesModule } from './pages/pages.module';
import { SharedModule } from './shared/shared.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [CommonModule, AppRoutingModule, PagesModule, SharedModule],
})
export class App {
  protected readonly title = signal('notification-ui');
}
