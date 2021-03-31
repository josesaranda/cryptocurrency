import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";
import { AccountService } from "src/services/AccountService";

@Injectable()
export class DetailsGuard implements CanActivate {

    constructor(
        private accountService: AccountService,
        private router: Router
    ){}

    async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
        let {id} = route.params;
        if(id === undefined){
            this.router.navigateByUrl('/accounts');
            return false;
        }
        try{
            await this.accountService.findOne(id);
            return true;
        }catch{
            this.router.navigateByUrl('/accounts');
            return false;
        }
    }

}