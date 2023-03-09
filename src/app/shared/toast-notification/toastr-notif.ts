import { BreakpointObserver, BreakpointState } from "@angular/cdk/layout";
import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Injectable({
    providedIn: 'root'
})

export class ToastrNotif {

    isDesktop: boolean = false;
    positionToast: string = '';

    constructor(
        private breakpointObserver: BreakpointObserver, 
        private toastr: ToastrService
    ) { 
        this.breakpointObserver.observe([
            "(max-width: 992px)"
          ]).subscribe((result: BreakpointState) => {
            if (result.matches) {
                this.isDesktop = false;
            } else {
                this.isDesktop = true;
            }
          });
        
        this.isDesktop == false ? this.positionToast = 'toast-top-center' : this.positionToast = 'toast-top-right';
     }


    toastOnErrorDetailUser() {

        return new Promise<void>((resolve, reject) => {

            this.toastr.error(
                `Terjadi masalah saat proses get detail user`,
                'Whoops!..',
                {
                timeOut: 2000,
                positionClass: `${this.positionToast}`,
                enableHtml: true
                }
            )
            setTimeout(() => {
                const shouldResolve = true;
                if(shouldResolve) {
                    resolve();
                }else {
                    reject("Error : something went wrong!");
                }
            }, 2000);
        })
    }

    toastOnNoListCabang() {

        return new Promise<void>((resolve, reject) => {

            this.toastr.error(
                `Tidak ada list cabang ditemukan!`,
                'Whoops!..',
                {
                timeOut: 2000,
                positionClass: `${this.positionToast}`,
                enableHtml: true
                }
            )
            setTimeout(() => {
                const shouldResolve = true;
                if(shouldResolve) {
                    resolve();
                }else {
                    reject("Error : something went wrong!");
                }
            }, 2000);
        })
    }

    toastOnErrorRequestListCabang() {

        return new Promise<void>((resolve, reject) => {

            this.toastr.error(
                `Terjadi masalah saat proses get list cabang`,
                'Whoops!..',
                {
                timeOut: 2000,
                positionClass: `${this.positionToast}`,
                enableHtml: true
                }
            )
            setTimeout(() => {
                const shouldResolve = true;
                if(shouldResolve) {
                    resolve();
                }else {
                    reject("Error : something went wrong!");
                }
            }, 2000);
        })
    }

    toastOnNoDataDocver() {

        return new Promise<void>((resolve, reject) => {

            this.toastr.error(
                `Tidak ada data ditemukan`,
                'Whoops!..',
                {
                timeOut: 2000,
                positionClass: `${this.positionToast}`,
                enableHtml: true
                }
            )
            setTimeout(() => {
                const shouldResolve = true;
                if(shouldResolve) {
                    resolve();
                }else {
                    reject("Error : something went wrong!");
                }
            }, 2000);
        })
    }

    toastOnErrorFindDocver() {

        return new Promise<void>((resolve, reject) => {

            this.toastr.error(
                `Terjadi masalah saat proses get data Docver`,
                'Whoops!..',
                {
                timeOut: 2000,
                positionClass: `${this.positionToast}`,
                enableHtml: true
                }
            )
            setTimeout(() => {
                const shouldResolve = true;
                if(shouldResolve) {
                    resolve();
                }else {
                    reject("Error : something went wrong!");
                }
            }, 2000);
        })
    }

    toastOnErrorConfirmDocverFailed() {

        return new Promise<void>((resolve, reject) => {

            this.toastr.error(
                `Proses konfirmasi gagal dilakukan!`,
                'Whoops!..',
                {
                timeOut: 2000,
                positionClass: `${this.positionToast}`,
                enableHtml: true
                }
            )
            setTimeout(() => {
                const shouldResolve = true;
                if(shouldResolve) {
                    resolve();
                }else {
                    reject("Error : something went wrong!");
                }
            }, 2000);
        })
    }

    toastOnErrorConfirmRequestDocver() {

        return new Promise<void>((resolve, reject) => {

            this.toastr.error(
                `Terjadi masalah saat proses confirm Docver`,
                'Whoops!..',
                {
                timeOut: 2000,
                positionClass: `${this.positionToast}`,
                enableHtml: true
                }
            )
            setTimeout(() => {
                const shouldResolve = true;
                if(shouldResolve) {
                    resolve();
                }else {
                    reject("Error : something went wrong!");
                }
            }, 2000);
        })
    }
}
