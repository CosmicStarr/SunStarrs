import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable,MatTableDataSource} from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
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
  displayedColumns = ['id', 'name','description','price','isOnSale','isAvailable','category','brand','actions'];
  products:IProducts[];
  amount:number
  isLoading:boolean = false
  loadingStatus:string = "Loading";
  isError:boolean = false
  searchForm:FormGroup
  constructor(private productService:ProductService,private route:ActivatedRoute,private Formbuilder:FormBuilder) {
  }
  
  getData(){
    this.productService.getProducts().subscribe((results)=>{
      this.dataSource = new MatTableDataSource<IProducts>(results.result)
      if(this.dataSource?.sort !== null || this.dataSource?.paginator !== null){
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      
      }
      this.amount = results.result.length
      this.isLoading = true

      this.dataSource.filterPredicate = (data,filter) => {
        //...spread operater clones the data!
        let newData = {...data}
        if(filter){
          filter = filter.toLowerCase()
        }
        if(newData.name){
          newData.name = newData.name.toLowerCase()
        }
        if(newData.categoryDTO){
          newData.categoryDTO = newData.categoryDTO.toLowerCase()
        }
        if(newData.brandDTO){
          newData.brandDTO = newData.brandDTO.toLowerCase()
        }
        return newData.name.indexOf(filter) != -1 || newData.categoryDTO.indexOf(filter) != -1 || newData.brandDTO.indexOf(filter) != -1
      }
    },error=>{
      console.log(error);
      this.loadingStatus = `Error while Fetching Data: ${{error}}`
      this.isError = true
    })
  }

  ngOnInit(): void {
    this.getData()
    this.searchForm = this.Formbuilder.group({
      search:this.Formbuilder.control('')
    })
  }

  filterSearch(){
    if(this.searchForm.value !== null && this.dataSource !== null)
    {
        this.dataSource.filter = this.searchForm.value.search.trim()
    }
  }

  clearSearch(){
    this.searchForm.patchValue({search:""})
    this.filterSearch()
  }
}
