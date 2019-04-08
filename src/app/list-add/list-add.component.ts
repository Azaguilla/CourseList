import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ListService} from '../../services/list.service';
import {NewsletterService} from '../../services/newsletter.service';

@Component({
  selector: 'app-list-add',
  templateUrl: './list-add.component.html',
  styleUrls: ['./list-add.component.css']
})
export class ListAddComponent implements OnInit {

  listForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private listService: ListService,
              private newsletterService: NewsletterService) {
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.listForm = this.formBuilder.group({
      listTitle: ['', Validators.required ],
      listDescription: ['', Validators.required ]
    });
  }

  onSubmitList() {
    const listTitle = this.listForm.get('listTitle').value;
    const listDescription = this.listForm.get('listDescription').value;
    console.log('on ajoute les valeurs');
    this.newsletterService.send();
    this.listService.addList(listTitle, listDescription);
  }
}
