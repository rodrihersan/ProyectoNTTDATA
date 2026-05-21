import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar">
      <div class="navbar-brand">
        <span class="logo-icon">🎬</span>
        <span class="logo-text">CineApp</span>
      </div>
      <ul class="navbar-menu">
        <li>
          <a routerLink="/generos" routerLinkActive="active">Géneros</a>
        </li>
      </ul>
    </nav>

    <main class="main-content">
      <router-outlet />
    </main>
  `,
  styles: [`
    .navbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 2rem;
      height: 64px;
      background: #0a0a0f;
      border-bottom: 1px solid #1e1e2e;
      position: sticky;
      top: 0;
      z-index: 100;
    }

    .navbar-brand {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      text-decoration: none;
    }

    .logo-icon {
      font-size: 1.5rem;
    }

    .logo-text {
      font-family: 'Playfair Display', serif;
      font-size: 1.4rem;
      font-weight: 700;
      color: #f0c040;
      letter-spacing: 0.02em;
    }

    .navbar-menu {
      list-style: none;
      display: flex;
      gap: 2rem;
      margin: 0;
      padding: 0;
    }

    .navbar-menu a {
      color: #a0a0b8;
      text-decoration: none;
      font-size: 0.9rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      transition: color 0.2s;
    }

    .navbar-menu a:hover,
    .navbar-menu a.active {
      color: #f0c040;
    }

    .main-content {
      min-height: calc(100vh - 64px);
      background: #0d0d1a;
    }
  `]
})
export class AppComponent {}
