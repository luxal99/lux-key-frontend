import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, } from "@angular/router";
import { Pages, TOKEN_NAME } from "../constant/const";
import { JwtService } from "../service/jwt.service";
import { decode } from "../util/jwt/jwt";
import * as moment from "moment";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private router: Router) {
  }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const user = await decode(localStorage.getItem(TOKEN_NAME) as string);

    if (!user) {
      await this.returnToLogin(state);
      return false;
    }
    // @ts-ignore
    if (
      moment(user.exp * 1000).format("YYYY-MM-DD HH:mm") >
      moment(new Date()).format("YYYY-MM-DD HH:mm")
    ) {
      return true;
    } else {
      await this.returnToLogin(state);
      return false;
    }
  }

  async returnToLogin(state: RouterStateSnapshot): Promise<void> {
    await this.router.navigate([Pages.LOGIN], {
      queryParams: { returnUrl: state.url },
    });
  }
}
