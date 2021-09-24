import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Key } from '../../../models/key';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass'],
})
export class DashboardComponent implements OnInit {


  listOfKey: Key[] = [];
  searchText = '';

  constructor() {
  }

  searchForm = new FormGroup({
    search: new FormControl({}),
  });

  ngOnInit(): void {
  }

  inputChange(): void {
    if (this.searchText.length === 0) {
      // @ts-ignore
      document.getElementById('search').style.display = 'none';
      // @ts-ignore
      document.getElementById('huge-label').style.display = 'block';

      // @ts-ignore
      document.getElementById('centered').style.minHeight = '70vh';
      this.listOfKey = [];
    } else if (this.searchText.length > 1) {
      // @ts-ignore
      document.getElementById('search').style.display = 'block';
      // @ts-ignore
      document.getElementById('huge-label').style.display = 'none';
      // @ts-ignore
      document.getElementById('centered').style.minHeight = '30vh';
    }
  }

  showSearch(): void {
    // @ts-ignore
    document.getElementById('search').style.display = 'block';
    // @ts-ignore
    document.getElementById('huge-label').style.display = 'none';
  }
}
