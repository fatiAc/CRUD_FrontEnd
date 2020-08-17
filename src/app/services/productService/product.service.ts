import {Injectable} from '@angular/core';
import {HttpMethodsService} from '../utils/http-methods.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private className = 'product';

  constructor(private httpMethods: HttpMethodsService) {
  }

  findAll() {
    return this.httpMethods.get(this.className + '/findAll');
  }

  findByCritaria(dateMin, dateMax, catgrID) {
    return this.httpMethods.get(this.className + '/findByCritaria/' + dateMin + '/' + dateMax + '/' + catgrID);
  }

  create(data) {
    return this.httpMethods.post(this.className + '/create', data);
  }

  update(data) {
    return this.httpMethods.put(this.className + '/update', data);
  }

  delete(productID) {
    return this.httpMethods.delete(this.className + '/delete/' + productID);
  }
}
