import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { RestangularModule, Restangular } from 'ngx-restangular';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';

@Injectable()
export class LeaderService {

  constructor(private restangular: Restangular, 
              private processHTTPMsgService: ProcessHTTPMsgService) { }

  //localhost:3000/leaders
  getLeaders(): Observable<Leader[]> {
    return this.restangular.all('leaders').getList();
  }

  //localhost:3000/leaders/id
  getLeader(id: number): Observable<Leader> {
    return this.restangular.one('leaders', id).get();
  }

  //localhost:3000/leaders?featured=true
  getFeaturedLeader(): Observable<Leader> {
    return this.restangular.all('leaders').getList({ featured: true })
               .map(leaders => leaders[0]);
  }
}
