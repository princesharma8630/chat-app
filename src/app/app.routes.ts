import { Routes } from '@angular/router';
import { Signup } from './pages/auth/signup/signup/signup';
import { ProfileSetup } from './pages/profile-setup/profile-setup/profile-setup';
import { Login } from './pages/auth/login/login';
import { authGuard } from './core/guards/auth-guard';
import { ChatShell } from './pages/chat/chat-shell/chat-shell';

export const routes: Routes = [
    {path:'chat' , component:ChatShell},
     { path: 'signup', component: Signup },
  { path: '', redirectTo: 'signup', pathMatch: 'full' },
  {path:'profile-setup' , component:ProfileSetup},
  {path:'login' , component:Login},

    
];
