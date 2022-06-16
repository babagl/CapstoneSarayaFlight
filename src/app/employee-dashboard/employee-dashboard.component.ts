import { Component, OnInit ,ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { ApiService } from '../services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.scss']
})
export class EmployeeDashboardComponent implements OnInit {
  displayedColumns: string[] = ['productName', 'category', 'date', 'freshness','price','comment','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  openDialog() {
    this.dialog.open(DialogComponent, {
     width: '30%'
    }).afterClosed().subscribe(val=>{
      if(val === 'save'){
        this.getAllBookings();
      }
    })
  }
  
  constructor(private dialog :MatDialog, private api :ApiService ) { }

  ngOnInit(): void {
    this.getAllBookings();
  }
  getAllBookings(){
    this.api.getProduct()
    .subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:(err)=>{
        alert("error while fetching the records");
      }
    })
  }

  editProduct(row : any){
    this.dialog.open(DialogComponent,{
      width: '30%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val==='update'){
        this.getAllBookings();
      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteBooking(id : number){
    this.api.deleteProduct(id)
    .subscribe({
      next:(res)=>{
        alert("Booking deleted successfully")
        this.getAllBookings();
      },
      error:()=>{
        alert("error while deleted the booking")
      }
    })
  }

}
