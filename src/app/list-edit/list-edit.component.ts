import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ListService} from '../../services/list.service';

@Component({
  selector: 'app-list-edit',
  templateUrl: './list-edit.component.html',
  styleUrls: ['./list-edit.component.css']
})
export class ListEditComponent implements OnInit {

  list: any = {};
  listForm: FormGroup;
  constructor(private  route: ActivatedRoute,
              private router: Router,
              private listService: ListService,
              private formBuilder: FormBuilder) {
    this.createForm();
  }


  ngOnInit() {
    this.route.params.subscribe(params => {
      this.listService.editList(params.id).subscribe(res => {
        this.list = res;
      });
    });
  }

  private createForm() {
    this.listForm = this.formBuilder.group({
      listTitle: ['', Validators.required ],
      listDescription: ['', Validators.required ]
    });
  }

  updateList(listTitle, listDescription) {
    this.route.params.subscribe(params => {
      this.listService.updateList(listTitle, listDescription, params.id);
      this.router.navigate(['list']);
    });
  }
}
