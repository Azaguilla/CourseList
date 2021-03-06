import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  uri = 'http://localhost:4000/list';

  constructor(private http: HttpClient) { }

  addList(listTitle, listDescription) {
    const object = {
      listTitle,
      listDescription
    };

    console.log(object);
    this.http.post(`${this.uri}/add`, object)
      .subscribe(res => console.log('Done'));
  }

  getList() {
    return this.http.get(`${this.uri}`);
  }

  editList(id) {
    return this
      .http
      .get(`${this.uri}/edit/${id}`);
  }

  updateList(listTitle, listDescription, id) {
    const object = {
      listTitle,
      listDescription
    };
    this.http.post(`${this.uri}/update/${id}`, object).subscribe(res => console.log('Update done'));
  }

  deleteBusiness(id) {
    return this
      .http
      .get(`${this.uri}/delete/${id}`);
  }
}
