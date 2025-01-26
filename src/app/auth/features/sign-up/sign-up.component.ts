import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { hasEmailError, isRequired } from '../../utils/validators';
import { AuthService } from '../../data-acces/auth.service';
import { toast } from 'ngx-sonner';
import { Router, RouterLink } from '@angular/router';
import { GoogleButtonComponent } from '../../ui/google-button/google-button.component';

interface FormSignup {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, GoogleButtonComponent],
  templateUrl: './sign-up.component.html',
})
export default class SignUpComponent {
  private _formBuilder = inject(FormBuilder);
  private _authService = inject(AuthService);
  private _router = inject(Router);

  isRequired(field: 'email' | 'password') {
    return isRequired(field, this.form);
  }
  hasEmailError(field: 'email') {
    return hasEmailError(this.form);
  }

  form = this._formBuilder.group<FormSignup>({
    email: this._formBuilder.control('', [
      Validators.required,
      Validators.email,
    ]),
    password: this._formBuilder.control('', [Validators.required]),
  });
  async submit() {
    if (this.form.invalid) return;

    try {
      const { email, password } = this.form.value;

      if (!email || !password) return;

      await this._authService.signUp({ email, password });

      toast.success('User signed up successfully');
      this._router.navigateByUrl('/tasks');
    } catch (error) {
      toast.error('Error while signing up');
    }
  }
  async submitWithGoogle() {
    try {
      await this._authService.signInWithGoogle();
      toast.success('User signed in successfully');
      this._router.navigateByUrl('/tasks');
    } catch (error) {
      toast.error('Error while signing');
    }
  }
}