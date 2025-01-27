import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NgxSonnerToaster} from 'ngx-sonner'
import { AuthStateService } from './shared/data-acces/auth-state.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgxSonnerToaster],
  templateUrl: './app.component.html',
})
export class AppComponent {
  
}
