import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  importProvidersFrom,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { provideNzI18n, en_US } from 'ng-zorro-antd/i18n';
import { provideNzIcons } from 'ng-zorro-antd/icon';
import {
  DashboardOutline,
  MessageOutline,
  MessageTwoTone,
  CodeOutline,
  CodeTwoTone,
  ThunderboltOutline,
  ThunderboltFill,
  CheckCircleOutline,
  CheckCircleFill,
  CheckCircleTwoTone,
  PlayCircleOutline,
  PlayCircleFill,
  UserOutline,
  SendOutline,
  BulbOutline,
  InfoCircleOutline,
  MenuFoldOutline,
  MenuUnfoldOutline,
  MenuOutline,
} from '@ant-design/icons-angular/icons';
import { routes } from './app.routes';

registerLocaleData(en);

const icons = [
  DashboardOutline,
  MessageOutline,
  MessageTwoTone,
  CodeOutline,
  CodeTwoTone,
  ThunderboltOutline,
  ThunderboltFill,
  CheckCircleOutline,
  CheckCircleFill,
  CheckCircleTwoTone,
  PlayCircleOutline,
  PlayCircleFill,
  UserOutline,
  SendOutline,
  BulbOutline,
  InfoCircleOutline,
  MenuFoldOutline,
  MenuUnfoldOutline,
  MenuOutline,
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimationsAsync(),
    provideNzI18n(en_US),
    provideNzIcons(icons),
  ],
};
