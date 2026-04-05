import { type UserDef } from '@/domains/auth';
import { NavigateOptions } from '@tanstack/react-router';
export type Routes = NavigateOptions['to'];
export type RouterContext = {
  user: UserDef | null;
};
