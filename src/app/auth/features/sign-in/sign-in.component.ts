import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../data-acces/auth.service';
import { Router, RouterLink } from '@angular/router';
import { hasEmailError, isRequired } from '../../utils/validators';
import { toast } from 'ngx-sonner';
import { ReactiveFormsModule } from '@angular/forms';
import { GoogleButtonComponent } from '../../ui/google-button/google-button.component';

interface FormSignIn {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, GoogleButtonComponent],
  templateUrl: './sign-in.component.html',
})
export default class SignInComponent {
  private _formBuilder = inject(FormBuilder);
  private _authService = inject(AuthService);
  private _router = inject(Router);

  isRequired(field: 'email' | 'password') {
    return isRequired(field, this.form);
  }
  hasEmailError(field: 'email') {
    return hasEmailError(this.form);
  }

  form = this._formBuilder.group<FormSignIn>({
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

      await this._authService.signIn({ email, password });

      toast.success('User signed in successfully');
      this._router.navigateByUrl('/tasks');
    } catch (error) {
      toast.error('Error while signing in');
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
