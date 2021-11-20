import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styleUrls: ['./server-error.component.scss']
})
export class ServerErrorComponent implements OnInit {

  error: any;
  constructor(private route: Router) {
  const navi = this.route.getCurrentNavigation();
  this.error = navi?.extras?.state?.error;
    
  }

  ngOnInit(): void {
  }

}
