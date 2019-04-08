import { Component, OnInit } from '@angular/core';
import List from '../../List';
import {ListService} from '../../services/list.service';

@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.css']
})
export class ListDetailComponent implements OnInit {

  lists: List[];

  constructor(private listService: ListService) { }

  ngOnInit() {
    this.listService.getList().subscribe((data: List[]) => {
      this.lists = data;
    });
  }

  deleteList(id) {
    this.listService.deleteBusiness(id).subscribe(res => {
      console.log('Deleted');
    });
  }


}
