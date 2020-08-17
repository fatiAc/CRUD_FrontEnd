import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {CategorieService} from '../../services/categorieService/categorie.service';
import {ProductService} from '../../services/productService/product.service';
import {JqxgridFrService} from '../../services/utils/jqxgrid-fr.service';
import {jqxGridComponent} from 'jqwidgets-ng/jqxgrid';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {AlertBoxService} from '../../services/utils/alert-box.service';

@Component({
  selector: 'app-parametrage',
  templateUrl: './parametrage.component.html',
  styleUrls: ['./parametrage.component.css']
})
export class ParametrageComponent implements OnInit {

  @ViewChild('productGrid', {static: false}) productGrid: jqxGridComponent;

  private categorieDroDown = {data: null, selected: null, settings: null};
  private selectedCategorieDroDown = {data: null, selected: null, settings: null};
  private product = {NAME: null, DESCRIPTION: null, ID_CATEGORIE: null, QUANTITE: null};
  private productsTable = {dataSource: null, dataAdapter: null, columns: []};
  private localization: any = null;
  private modalRef: BsModalRef;
  private selectedRow: any;

  constructor(private categorieService: CategorieService, private productService: ProductService, private jqxgridFrService: JqxgridFrService,
              private modalService: BsModalService, private alertBoxService: AlertBoxService) {
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
    this.getProductData();
  }

  delete(product) {
    this.alertBoxService.confirm('Confirmation', 'Voulez-vous supprimer cet element ? ')
      .then(res => {
        if (res) {
          this.productService.delete(product).subscribe(response => {
            this.alertBoxService.alertDelete();
            this.getProductData();
          }, error => {
            this.alertBoxService.alertErr(error.message);
          });
        }
      });
  }

  getCategorieData() {
    this.categorieService.findAll().subscribe(response => {
      this.categorieDroDown.data = response;
      this.selectedCategorieDroDown.data = response;
    }, error => {
      this.alertBoxService.alertErr(error.message);
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
    this.selectedCategorieDroDown.settings = {
      singleSelection: true,
      idField: 'ID_CATEGORIE',
      textField: 'NAME',
      selectAllText: 'Tous',
      unSelectAllText: 'Unselect',
      itemsShowLimit: 10,
      allowSearchFilter: true
    };
  }

  getProductData() {
    this.productService.findByCritaria(null, null, null).subscribe(response => {
      this.productsTable.dataSource.localdata = response;
      if (this.productGrid !== undefined) {
        this.productGrid.clearselection();
        this.productGrid.updatebounddata();
      }
    }, error => {
      this.alertBoxService.alertErr(error.message);
    });
  }

  create() {
    this.productService.create(this.product).subscribe(response => {
      this.alertBoxService.alertCreate();
      this.getProductData();
      this.refreshUI();
    }, error => {
      this.alertBoxService.alertErr(error.message);
    });
  }

  onSelectCategorie() {
    this.product.ID_CATEGORIE = this.categorieDroDown.selected[0].ID_CATEGORIE;
  }

  refreshUI() {
    this.product = {NAME: null, DESCRIPTION: null, ID_CATEGORIE: null, QUANTITE: null};
    this.categorieDroDown.selected = null;
  }

  update() {
    this.productService.update(this.selectedRow).subscribe(response => {
      this.alertBoxService.alertEdit();
      this.getProductData();
      this.modalRef.hide();
    }, error => {
      this.alertBoxService.alertErr(error.message);
    });
  }

  verifyFields(selected) {
    if (selected.NAME == null || selected.DESCRIPTION == null || selected.ID_CATEGORIE == null || selected.QUANTITE === 0 ||
      selected.QUANTITE == null || selected.QUANTITE < 0 || selected.NAME === '' || selected.DESCRIPTION === '') {
      return true;
    } else {
      return false;
    }
  }

  openModal(event, modal: TemplateRef<any>) {
    this.selectedRow = this.productsTable.dataSource.localdata[event.args.row.boundindex];
    delete this.selectedRow.DATE_SAISIE;
    this.selectedCategorieDroDown.selected = [this.selectedCategorieDroDown.data.find(item => item.ID_CATEGORIE === this.selectedRow.ID_CATEGORIE)];
    if (event.args.datafield !== 'delete') {
      this.modalRef = this.modalService.show(modal, {class: 'modal-md'});
    } else {
      this.delete(this.selectedRow.ID_PRODUCT);
    }
  }
}
