import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { MainService } from 'src/app/services/main.service';
import { EncryptDecrypt } from 'src/app/shared/encryption/encrypt-decrypt';
import { ErrorRequest } from 'src/app/shared/handle-error/error-request';
import { ToggleLoading } from 'src/app/shared/loading/toggle-loading';

@Component({
  selector: 'app-auth-check',
  templateUrl: './auth-check.component.html',
  styleUrls: ['./auth-check.component.css']
})
export class AuthCheckComponent implements OnInit {

  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    observe: 'response',
    responseType: 'json'
  }

  tokenParameter: string = '';
  urlParameter: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private services: MainService,
    private encryption: EncryptDecrypt,
    private toggleLoading: ToggleLoading,
    private handleError: ErrorRequest
  ) { }

  ngOnInit(): void {
    this.getUrlParameter();
  }

  // getting url parameter
  getUrlParameter() {

    this.tokenParameter = this.route.snapshot.params['token'];
    this.urlParameter = this.encryption.decryptParameter(this.route.snapshot.params['params']) == '' ? {} : JSON.parse(this.encryption.decryptParameter(this.route.snapshot.params['params']));
    // console.log('TOKEN : ', this.tokenParameter);
    // console.log('URL Parameter : ', this.urlParameter);

    this.httpOptions.headers = this.httpHeaders.set('Authorization', `Bearer ${this.tokenParameter}`);
    
    switch (true) {
      case 
      'skeleton' in this.urlParameter &&
      this.tokenParameter != '':
        this.getDetailUser();
        break;
      default:
        this.router.navigate(['/unauthorized']);
        break;
    }
    
  }

  getDetailUser() {

    this.toggleLoading.showLoading(true);
    this.services.detailUser('details', {}, this.httpOptions, catchError(this.handleError.handleErrorDetailUser.bind(this))).subscribe( result => {
      console.log(result);

      if(result.body.status.responseCode == 200) {
        const authLogin = {
          "token" : this.tokenParameter,
          "profilLocation" : result.body.result.iamResult.resultUserProfileLocation,
          "profilHeader" : result.body.result.iamResult.resultUserProfileHeader,
          "skeleton" : this.urlParameter.skeleton
        }
        // console.log(authLogin);

        localStorage.setItem('auth-user', JSON.stringify(authLogin));
        this.toggleLoading.showLoading(false);
        this.router.navigate(['/home']);

      }else {
        this.toggleLoading.showLoading(false);
        this.router.navigate(['/unauthorized']);
      }
    })
  }

}
