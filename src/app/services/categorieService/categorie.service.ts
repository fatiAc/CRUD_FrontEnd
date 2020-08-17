import {Injectable} from '@angular/core';
import {HttpMethodsService} from '../utils/http-methods.service';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  private className = 'categorie';

  constructor(private httpMethods: HttpMethodsService) {
  }

  findAll() {
    return this.httpMethods.get(this.className + '/findAll');
  }
}
