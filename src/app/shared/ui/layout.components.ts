import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthStateService } from '../data-acces/auth-state.service';

@Component({
  standalone: true,
  selector: 'app-layout',
  imports: [RouterModule, RouterLink], // RouterOutlet is used to dynamically load routes in the application.
  template: ` <header
      class="h-[80px] mb-8 w-full max-w-screen-log mx-auto px-4"
    >
      <nav class="flex items-center justify-between h-full">
        <a class="text-2xl font-bold" routerLink="/tasks">Ng Task</a>
        <button
          type="button"
          class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          (click)="logOut()"
        >
          Log Out
        </button>
      </nav>
    </header>
    <router-outlet />`,
})
export default class LayoutComponent {
  private _authState = inject(AuthStateService);
  private _router = inject(Router);
  async logOut() {
    await this._authState.logOut();
    this._router.navigateByUrl('/auth/sign-in');
  }
}
