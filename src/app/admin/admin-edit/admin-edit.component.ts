import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable,MatTableDataSource} from '@angular/material/table';
import { IProducts } from 'src/app/Models/Products';
import { SunParams } from 'src/app/Models/SunStarrParams';
import { ProductService } from 'src/app/_services/product.service';



@Component({
  selector: 'app-admin-edit',
  templateUrl: './admin-edit.component.html',
  styleUrls: ['./admin-edit.component.scss']
})
export class AdminEditComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<IProducts>;
  dataSource: MatTableDataSource<IProducts> = null;
  sun:SunParams
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name','description','price','isOnSale','isAvailable','category','brand'];

  constructor(private productService:ProductService) {
  }
  
  getData(){
    this.productService.getProducts().subscribe((results)=>{
      this.dataSource = new MatTableDataSource<IProducts>(results.result)
      if(this.dataSource?.sort !== null || this.dataSource?.paginator !== null){
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    },error=>{
      console.log(error);
    })
  }

  ngOnInit(): void {
    this.getData()
  }
}
