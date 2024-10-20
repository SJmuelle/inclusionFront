import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import {AuthService} from "@/services/authServices";

export function requireAuth(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
  // const isAuthenticated = AuthService.isAuthenticated();

  // if (to.matched.some(record => record.meta.requireAuth)) {
  //   if (!isAuthenticated) {
  //     next({ name: 'login' });
  //   } else {
  //     next();
  //   }
  // } else {
  //   next();
  // }
  next();
}
