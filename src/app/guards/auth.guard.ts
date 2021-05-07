import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {PageRoutes, TOKEN_NAME} from '../constant/const';
import {JwtService} from '../service/jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private jwtService: JwtService, private router: Router) {
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    if (sessionStorage.getItem(TOKEN_NAME)) {
      this.jwtService.verify().subscribe((resp) => {
        return true;
      }, () => {
        this.returnToLogin(state);
        return false;
      });

    } else {
      this.returnToLogin(state);
      return false;
    }
  }

  returnToLogin(state: RouterStateSnapshot): void {
    this.router.navigate([PageRoutes.LOGIN], {queryParams: {returnUrl: state.url}});
  }
}
