import { Injectable } from "@angular/core";
import { Router, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    // get auth user from auth service
    const authUser = this.authService.getAuthUser();
    if (authUser) {
      // check if the route is restricted by role
      if (!authUser.roles?.includes(route.data["role"])) {
        // have not role demanded redirect to home page
        this.router.navigate(route.data["homeUrl"]);
        return false;
      }

      // authorised so return true
      return true;
    }

    // not yet logged in so redirect to login page with return url
    this.router.navigate(route.data["loginUrl"], {queryParams: {returnUrl: state.url}});
    return false;
  }

}
