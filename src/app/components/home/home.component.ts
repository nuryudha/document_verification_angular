import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { MainService } from 'src/app/services/main.service';
import Swal from 'sweetalert2';
import { ListNasabah } from 'src/app/shared/interface/list-nasabah';
import { NasabahDipilih } from 'src/app/shared/interface/nasabah-dipilih';
import { ListCabang } from 'src/app/shared/interface/list-cabang';
import { ErrorRequest } from 'src/app/shared/handle-error/error-request';
import { ToastrNotif } from 'src/app/shared/toast-notification/toastr-notif';
import { ToggleLoading } from 'src/app/shared/loading/toggle-loading';
import { catchError } from 'rxjs/operators';
import { FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  authUser: any = JSON.parse(localStorage.getItem('auth-user') || "{}");
  showClass: boolean = false;

  cabangControl = new FormControl('', Validators.required);
  listCabang: ListCabang[] = [];
  filteredCabang: any = this.listCabang;
  branch: string = '';
  nik: string = '';
  fullname: string = '';

  start: any;
  end: any;
  tempTanggalAwal: Date = new Date();
  tempTanggalAkhir: Date = new Date();
  tanggalAwal: string = '';
  tanggalAkhir: string = '';

  emptyStatDoc: boolean = false;


  displayedColumns: string[] = ['select', 'noAplikasi', 'namaNasabah', 'channel', 'cfo', 'ca', 'statusAppr', 'statusDocument'];
  dataSource!: MatTableDataSource<ListNasabah>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  selection = new SelectionModel<ListNasabah>(true, []);

  nasabah: ListNasabah[] = [];
  nasabahDipilih: NasabahDipilih[] = [];

  constructor(
    private breakpointObserver: BreakpointObserver, 
    private services: MainService,
    private handleError: ErrorRequest,
    private toastrNotif: ToastrNotif,
    private toggleLoading: ToggleLoading
  ) {
    console.log(this.authUser);
    this.branch = this.authUser.profilLocation[0].branch_code;
    this.nik = this.authUser.profilHeader.nik;
    this.fullname = this.authUser.profilHeader.fullname;
    this.detectScreenSize();
    this.dataSource = new MatTableDataSource(this.nasabah);
  }

  ngOnInit(): void {

    if(this.branch == "0000") {
      this.getListCabang();
      this.cabangControl.enable();
    }else {
      this.cabangControl.disable();
      let tempListCabang = [];
      for (let i = 0; i < this.authUser.profilLocation.length; i++) {
        tempListCabang.push({branch_code: this.authUser.profilLocation[i].branch_code, branch_name: this.authUser.profilLocation[i].branch_code + " - " + this.authUser.profilLocation[i].branch_name});
      }
      this.listCabang = tempListCabang;
      this.filteredCabang = this.listCabang;
      this.cabangControl.setValue(this.listCabang[0].branch_code);
      this.branch = this.listCabang[0].branch_code;
    }
    this.initiateDate();

  }

  // deteksi ukuran screen
  detectScreenSize() {
    this.breakpointObserver.observe([
      "(max-width: 900px)"
    ]).subscribe((result: BreakpointState) => {
      if (result.matches) {
          this.showClass = false;
      } else {
          this.showClass = true;
      }
    });
  }

  // get list cabang when user HO
  getListCabang() {

    this.toggleLoading.showLoading(true);
    this.services.listCabang('getAllBranch', catchError(this.handleError.handleErrorListCabang.bind(this))).subscribe( result => {
      // console.log(result);

      if(result.body.status == true && result.body.data.length > 0 && result.body.data != null) {

        let tempListCabang = result.body.data;
        let arrayListCabang: ListCabang[] = [];
        tempListCabang.forEach((element: any) => {
          arrayListCabang.push({branch_code: element.BRANCH_CODE, branch_name: element.BRANCH_CODE + " - " + element.BRANCH_NAME})
        })

        this.listCabang = arrayListCabang;
        this.filteredCabang = this.listCabang;
        this.toggleLoading.showLoading(false);
      }else {
        const waitPopUpDone = async () => {
            await this.toastrNotif.toastOnNoListCabang();
            this.toggleLoading.showLoading(false);
        }
        waitPopUpDone();
      }
    })

  }

  // on cabang change
  cabangChange(data: any) {
    this.branch = data;
  }

  // initiation date when page load
  initiateDate() {

    // get tanggal awal
    this.tempTanggalAwal = new Date();
    this.start = this.tempTanggalAwal;
    this.tanggalAwal = (this.tempTanggalAwal.getFullYear() + '/' + ("0" + (this.tempTanggalAwal.getMonth() + 1)).slice(-2) + '/' + ('0' + this.tempTanggalAwal.getDate()).slice(-2)).toString()  + ' 00:00:00';
    
    console.log(`%cTanggal awal : ${this.tanggalAwal}`, "color:#00BEB8; font-weight:bold;"); // disable on production

    // get tanggal akhir
    let lastDate = new Date();
    this.tempTanggalAkhir = new Date(lastDate.setDate(lastDate.getDate() + 7));
    this.end = this.tempTanggalAkhir;
    this.tanggalAkhir = (this.tempTanggalAkhir.getFullYear() + '/' + ("0" + (this.tempTanggalAkhir.getMonth() + 1)).slice(-2) + '/' + ('0' + this.tempTanggalAkhir.getDate()).slice(-2)).toString() + ' 23:59:59';
    
    console.log(`%cTanggal akhir : ${this.tanggalAkhir}`, "color:#00BEB8; font-weight:bold;"); // disable on production

  }

  // event onchange datepicker start & end
  addEventAwal(type: string, event: MatDatepickerInputEvent<Date>) {
    // (dateChange)="addEventAwal('change', $event)" (pakai ini di template html untuk event change)
    this.tempTanggalAwal = new Date(`${type}: ${event.value}`);
    this.start = this.tempTanggalAwal;
    this.end = new Date(this.start.getTime() + 7 * 24 * 60 * 60 * 1000);
    this.tanggalAwal = (this.tempTanggalAwal.getFullYear() + '/' + ("0" + (this.tempTanggalAwal.getMonth() + 1)).slice(-2) + '/' + ('0' + this.tempTanggalAwal.getDate()).slice(-2)).toString()  + ' 00:00:00';
    this.tanggalAkhir = (this.end.getFullYear() + '/' + ("0" + (this.end.getMonth() + 1)).slice(-2) + '/' + ('0' + this.end.getDate()).slice(-2)).toString()  + ' 23:59:59';
    
    console.log(`%cTanggal awal : ${this.tanggalAwal}`, "color:#00BEB8; font-weight:bold;"); // disable on production
    console.log(`%cTanggal akhir : ${this.tanggalAkhir}`, "color:#00BEB8; font-weight:bold;"); // disable on production
  }

  addEventAkhir(type: string, event: MatDatepickerInputEvent<Date>) {
    // (dateChange)="addEventAkhir('change', $event)" (pakai ini di template html untuk event change)
    this.tempTanggalAkhir = new Date(`${type}: ${event.value}`);
    this.end = this.tempTanggalAkhir;
    this.start = new Date(this.end.getTime() - 7 * 24 * 60 * 60 * 1000);
    this.tanggalAwal = (this.start.getFullYear() + '/' + ("0" + (this.start.getMonth() + 1)).slice(-2) + '/' + ('0' + this.start.getDate()).slice(-2)).toString()  + ' 00:00:00';
    this.tanggalAkhir = (this.tempTanggalAkhir.getFullYear() + '/' + ("0" + (this.tempTanggalAkhir.getMonth() + 1)).slice(-2) + '/' + ('0' + this.tempTanggalAkhir.getDate()).slice(-2)).toString() + ' 23:59:59';
    
    console.log(`%cTanggal awal : ${this.tanggalAwal}`, "color:#00BEB8; font-weight:bold;"); // disable on production
    console.log(`%cTanggal akhir : ${this.tanggalAkhir}`, "color:#00BEB8; font-weight:bold;"); // disable on production
  }

  // find button clicked
  findClicked() {

    if(this.cabangControl.value == '') {
      this.cabangControl.markAsTouched();
    }else {
      this.selection.clear();
      this.toggleLoading.showLoading(true);
      this.nasabah = [];
      this.dataSource = new MatTableDataSource(this.nasabah); //kosongkan table setiap kali lakukan search
      this.nasabahDipilih = [];
  
      let parameter = {
        "bran" : this.branch,
        "appl_date_awal" : this.tanggalAwal,
        "appl_date_akhir" : this.tanggalAkhir
      }
  
      this.services.findDocVer('searchDocByPeriod', parameter, catchError(this.handleError.handleErrorFindDocver.bind(this))).subscribe( result => {
        // console.log(result);
        
        if(result.body.status == true && result.body.data.length > 0 && result.body.data != null) {  
          result.body.data.forEach((element: any) => {
            this.nasabah.push({
              noAplikasi: element.no_aplikasi,
              namaNasabah: element.nama_nasabah,
              channel: element.channel,
              cfo: element.cfo,
              ca: element.ca,
              statusAppr: element.status_appr,
              statusDocument: [
                {value: 'COMPLETE & VERIFIED', view: 'COMPLETE & VERIFIED'},
                {value: 'NOT COMPLETE & VERIFIED', view: 'NOT COMPLETE & VERIFIED'}
              ],
              statusDocumentSelected: element.status_document,
              insert_by: this.nik +' - ' +this.fullname
            })
          })
          console.log(this.nasabah);
          this.dataSource = new MatTableDataSource(this.nasabah);
          this.ngAfterViewInit();
          this.toggleLoading.showLoading(false);
        }else {
          const waitPopUpDone = async () => {
              await this.toastrNotif.toastOnNoDataDocver();
              this.ngAfterViewInit();
              this.toggleLoading.showLoading(false);
          }
          waitPopUpDone();
        }
      })
    }

  }


  // saat status document di pilih
  statusChange(data: any) {
    this.nasabahDipilih.forEach(element => {
      if(element.application_id == data.noAplikasi) {
        element.status_document = data.statusDocumentSelected;
        element.insert_by = data.insert_by;
      }
    })
  }


  // after init lifecycle hook
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  // filter table
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle(data: any) {
    if(data.checked) {
      this.nasabahDipilih = [];
      this.dataSource.data.forEach(element => {
        this.nasabahDipilih.push({application_id: element.noAplikasi, status_document: element.statusDocumentSelected, insert_by: element.insert_by});
      })
      console.log(this.nasabahDipilih); // disable on production
    }else if(!data.checked) {
      this.nasabahDipilih = [];
      console.log(this.nasabahDipilih); // disable on production
    }

    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    
    this.selection.select(...this.dataSource.data);
  }

  // check and uncheck per masing masing data nasabah
  selectRow(data: any, dataSource: any) {
    if (data.checked) {
      console.log(dataSource.noAplikasi, 'Checked'); // disable on production
      this.nasabahDipilih.push({application_id: dataSource.noAplikasi, status_document: dataSource.statusDocumentSelected, insert_by: dataSource.insert_by});
    }else if(data.checked == false) {
      console.log(dataSource.noAplikasi, 'Unchecked'); // disable on production
      this.nasabahDipilih = this.nasabahDipilih.filter(e => e.application_id != dataSource.noAplikasi);
    }
    console.log(this.nasabahDipilih); // disable on production
  }


  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: ListNasabah): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.noAplikasi + 1}`;
  }


  // button confirm clicked
  confirmClicked() {
    if(this.nasabahDipilih.length == 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Silahkan pilih nasabah terlebih dahulu!'
      })
    }else if(this.nasabahDipilih.filter(e => e.status_document == '').length > 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Terdapat status document yang kosong!'
      })
    }else {
      let noAplikasi:string[] = [];
      this.nasabahDipilih.forEach(element => {
        noAplikasi.push(element.application_id);
      })
      Swal.fire({
        icon: 'question',
        title: 'Apakah anda yakin ingin melakukan Konfirmasi untuk Nasabah dengan no Aplikasi berikut ?',
        confirmButtonText: 'IYA',
        cancelButtonText: 'TIDAK',
        showCancelButton: true,
        html: `<label style='display:block;'><span>${noAplikasi.join(', ')}</span></label>`,
        confirmButtonColor: '#f7ad00',
        reverseButtons: true
      }).then((result) => {
        if(result.isConfirmed) {
          this.toggleLoading.showLoading(true);
          let parameter = { "doc": this.nasabahDipilih }
          console.log(parameter);
          this.services.confirmDocVer('confirmDocVer', parameter, catchError(this.handleError.handleErrorConfirmDocver.bind(this))).subscribe(result => {
            console.log(result); // disable on production
            if(result.body.status == true && result.body.data != null) {
              this.toggleLoading.showLoading(false);
              Swal.fire({
                icon: 'success',
                title: `${result.body.data.replace('<center>', '')}`
              }).then((result) => {
                if(result.isConfirmed) {
                  this.nasabah = [];
                  this.dataSource = new MatTableDataSource(this.nasabah);
                  this.findClicked();
                }
              })
            }else {
              const waitPopUpDone = async () => {
                  await this.toastrNotif.toastOnErrorConfirmDocverFailed();
                  this.toggleLoading.showLoading(false);
              }
              waitPopUpDone();
            }
          })
        }
      })
      
      
    }
  }

  clearClicked() {
    this.toggleLoading.showLoading(true);
    setTimeout(() => {
      this.nasabah = [];
      this.dataSource = new MatTableDataSource(this.nasabah);
      this.toggleLoading.showLoading(false);
    }, 300);
  }



}
