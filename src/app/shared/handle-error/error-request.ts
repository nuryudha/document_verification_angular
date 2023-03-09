import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { throwError } from "rxjs";
import { ToggleLoading } from "../loading/toggle-loading";
import { ToastrNotif } from "../toast-notification/toastr-notif";

@Injectable({
    providedIn: 'root'
})

export class ErrorRequest {

    constructor(
        private toastrNotif: ToastrNotif,
        private toggleLoading: ToggleLoading,
        private router: Router
    ) {}


    // handle error get detail user
    handleErrorDetailUser(error: HttpErrorResponse) {
        console.log(error);
        
        if (error.status === 0) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error);
        const waitPopUpDone = async () => {
            await this.toastrNotif.toastOnErrorDetailUser();
            this.toggleLoading.showLoading(false);
            this.router.navigate(['/unauthorized']);
        }
        waitPopUpDone();
        } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong.
        console.error(`Backend returned code ${error.status}, body was: `, error.error);
        const waitPopUpDone = async () => {
            await this.toastrNotif.toastOnErrorDetailUser();
            this.toggleLoading.showLoading(false);
            this.router.navigate(['/unauthorized']);
        }
        waitPopUpDone();
        }
        // Return an observable with a user-facing error message.
        return throwError(() => new Error('Something bad happened; please try again later.'));
    }

    // handle error get list cabang
    handleErrorListCabang(error: HttpErrorResponse) {
        console.log(error);
        
        if (error.status === 0) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error);
        const waitPopUpDone = async () => {
            await this.toastrNotif.toastOnErrorRequestListCabang();
            this.toggleLoading.showLoading(false);
        }
        waitPopUpDone();
        } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong.
        console.error(`Backend returned code ${error.status}, body was: `, error.error);
        const waitPopUpDone = async () => {
            await this.toastrNotif.toastOnErrorRequestListCabang();
            this.toggleLoading.showLoading(false);
        }
        waitPopUpDone();
        }
        // Return an observable with a user-facing error message.
        return throwError(() => new Error('Something bad happened; please try again later.'));
    }

    // handle error get docver
    handleErrorFindDocver(error: HttpErrorResponse) {
        console.log(error);
        
        if (error.status === 0) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error);
        const waitPopUpDone = async () => {
            await this.toastrNotif.toastOnErrorFindDocver();
            this.toggleLoading.showLoading(false);
        }
        waitPopUpDone();
        } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong.
        console.error(`Backend returned code ${error.status}, body was: `, error.error);
        const waitPopUpDone = async () => {
            await this.toastrNotif.toastOnErrorFindDocver();
            this.toggleLoading.showLoading(false);
        }
        waitPopUpDone();
        }
        // Return an observable with a user-facing error message.
        return throwError(() => new Error('Something bad happened; please try again later.'));
    }

    // handle error confirm docver
    handleErrorConfirmDocver(error: HttpErrorResponse) {
        console.log(error);
        
        if (error.status === 0) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error);
        const waitPopUpDone = async () => {
            await this.toastrNotif.toastOnErrorConfirmRequestDocver();
            this.toggleLoading.showLoading(false);
        }
        waitPopUpDone();
        } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong.
        console.error(`Backend returned code ${error.status}, body was: `, error.error);
        const waitPopUpDone = async () => {
            await this.toastrNotif.toastOnErrorConfirmRequestDocver();
            this.toggleLoading.showLoading(false);
        }
        waitPopUpDone();
        }
        // Return an observable with a user-facing error message.
        return throwError(() => new Error('Something bad happened; please try again later.'));
    }
}
