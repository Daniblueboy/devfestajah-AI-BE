import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ChatComponent } from './pages/chat/chat.component';
import { CodeHelperComponent } from './pages/code-helper/code-helper.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'chat', component: ChatComponent },
      { path: 'code-helper', component: CodeHelperComponent },
    ],
  },
  { path: '**', redirectTo: 'dashboard' },
];
