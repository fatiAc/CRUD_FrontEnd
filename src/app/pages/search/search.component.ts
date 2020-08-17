import {Component, OnInit, ViewChild} from '@angular/core';
import {CategorieService} from '../../services/categorieService/categorie.service';
import {ProductService} from '../../services/productService/product.service';
import {jqxGridComponent} from 'jqwidgets-ng/jqxgrid';
import {JqxgridFrService} from '../../services/utils/jqxgrid-fr.service';
import {AlertBoxService} from '../../services/utils/alert-box.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @ViewChild('productGrid', {static: false}) productGrid: jqxGridComponent;

  private product = {dateMin: null, dateMax: null, ID_CATEGORIE: null};
  private categorieDroDown = {data: null, selected: null, settings: null};
  private productsTable = {dataSource: null, dataAdapter: null, columns: []};
  private localization: any = null;

  constructor(private alertBox: AlertBoxService, private categorieService: CategorieService, private productService: ProductService, private jqxgridFrService: JqxgridFrService) {
  }

  ngOnInit() {
    this.localization = this.jqxgridFrService.getLocalization('fr');
    this.getCategorieData();
    this.initproductsable();
  }

  initproductsable() {
    this.productsTable.dataSource = {
      datafields: [
        {name: 'NAME', type: 'string'},
        {name: 'DATE_SAISIE', type: 'string'},
        {name: 'DESCRIPTION', type: 'string'},
        {name: 'CATEGORIE', type: 'string'},
        {name: 'QUANTITE', type: 'number'}],
      dataType: 'array',
      localdata: []
    };
    this.productsTable.dataAdapter = new jqx.dataAdapter(this.productsTable.dataSource);
    this.productsTable.columns =
      [
        {text: 'Nom', datafield: 'NAME', width: '25%', columntype: 'textbox', filtertype: 'textbox'},
        {text: 'Catégorie', datafield: 'CATEGORIE', width: '25%', columntype: 'textbox', filtertype: 'list'},
        {text: 'Quantité', datafield: 'QUANTITE', width: '10%', columntype: 'textbox', filtertype: 'textbox'},
        {text: 'Date saisie', datafield: 'DATE_SAISIE', width: '20%', columntype: 'textbox', filtertype: 'list'},
        {text: 'Description', datafield: 'DESCRIPTION', width: '30%', columntype: 'textbox', filtertype: 'textbox'},
        {
          text: 'Supprimer', datafield: 'delete', columntype: 'button', width: '10%',
          cellsrenderer: (): string => {
            return 'X';
          },
          buttonclick: (row: number): void => {
          }
        }
      ];
    this.jqxgridFrService.configCellWidthInSmallDevice(this.productsTable.columns, null);
  }

  getCategorieData() {
    this.categorieService.findAll().subscribe(response => {
      this.categorieDroDown.data = response;
    }, error => {
      this.alertBox.alertErr(error.message);
    });
    this.categorieDroDown.settings = {
      singleSelection: true,
      idField: 'ID_CATEGORIE',
      textField: 'NAME',
      selectAllText: 'Tous',
      unSelectAllText: 'Unselect',
      itemsShowLimit: 10,
      allowSearchFilter: true
    };
  }


  search() {
    this.product.dateMin = this.product.dateMin === '' ? null : this.product.dateMin;
    this.product.dateMax = this.product.dateMax === '' ? null : this.product.dateMax;
    this.productService.findByCritaria(this.product.dateMin, this.product.dateMax, this.product.ID_CATEGORIE).subscribe(response => {
      this.productsTable.dataSource.localdata = response;
      if (this.productGrid !== undefined) {
        this.productGrid.clearselection();
        this.productGrid.updatebounddata();
      }
    }, error => {
      this.alertBox.alertErr(error.message);
    });
  }

}
