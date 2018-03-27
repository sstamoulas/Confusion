import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { RestangularModule, Restangular } from 'ngx-restangular';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';

@Injectable()
export class PromotionService {

  constructor(private restangular: Restangular, 
              private processHTTPMsgService: ProcessHTTPMsgService) { }

  //localhost:3000/promotion
  getPromotions(): Observable<Promotion[]> {
    return this.restangular.all('promotion').getList();
  }

  //localhost:3000/promotion/id
  getPromotion(id: number): Observable<Promotion> {
    return this.restangular.one('promotion', id).get();
  }

  //localhost:3000/promotion?featured=true
  getFeaturedPromotion(): Observable<Promotion> {
    return this.restangular.all('promotions').getList({ featured: true })
               .map(promotion => promotion[0]);
  }
}