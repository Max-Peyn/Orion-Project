import { authService } from '../utils/authService';

export interface LoginCredentials {
  email: string;
  password: string;
  remember: boolean;
}

export interface User {
  id: string;
  email: string;
  name?: string;
}

export interface LoginResponse {
  success: boolean;
  user?: User;
  message?: string;
}

export function handleLoginSubmit(
  form: HTMLFormElement,
  errorMessage: HTMLElement,
  loginBtn: HTMLButtonElement,
  onSuccess?: (user: User) => void
): void {
  form.addEventListener('submit', async (e: Event) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    const credentials: LoginCredentials = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      remember: formData.get('remember') === 'on'
    };

    try {
      loginBtn.disabled = true;
      loginBtn.textContent = 'Logging in...';
      errorMessage.style.display = 'none';

      const response = await authService.login(credentials);
      
      if (response.success && response.user) {
        if (onSuccess) {
          onSuccess(response.user);
        }
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Login failed. Please try again.';
      errorMessage.textContent = errorMsg;
      errorMessage.style.display = 'block';
    } finally {
      loginBtn.disabled = false;
      loginBtn.textContent = 'Login';
    }
  });
}

export function handleNavigateToRegister(
  link: HTMLAnchorElement,
  onNavigate?: (page: string) => void
): void {
  link.addEventListener('click', (e: Event) => {
    e.preventDefault();
    if (onNavigate) onNavigate('register');
  });
}