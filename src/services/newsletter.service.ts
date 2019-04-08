import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';



@Injectable()
export class NewsletterService {

  uri = 'http://localhost:4000';

  constructor(private http: HttpClient) {

  }

  /**
   * On enregistre le nouvel abonné dans la BDD
   * @param sub L'abonnement push au format json
   */
  addPushSubscriber(sub: any) {
    console.log(JSON.stringify(sub));
    return this.http.post<any>(`${this.uri}/api/notifications`, sub);
  }

  /**
   * On envoie le message à tous les abonnés
   */
  send() {
    console.log('on envoie une notif =^w^=');
    console.log(`${this.uri}/api/newsletter`);
    return this.http.post<any>(`${this.uri}/api/newsletter`, 'test');
  }

}
