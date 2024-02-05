import { Component, ElementRef, HostListener, ViewChild, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos/productos.service';
import { MensajesService } from 'src/app/services/mensajes/mensajes.service';
import FGenerico from 'src/app/shared/util/funciones-genericas';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-productos',
	templateUrl: './productos.component.html',
	styleUrls: ['./productos.component.css']
})
export class ProductosComponent extends FGenerico implements OnInit {
	@HostListener('window:resize', ['$event'])
	@ViewChild('accordionButton') accordionButton!: ElementRef;

	protected formBusqueda! : FormGroup;

	public categorias : any = [];
	protected productosMostrar: any = [];
	protected window: any;
	public mostrarOpcionesProductos : boolean = false;
	protected listaProductosTienda : any[] = [];

	constructor(
		private apiProductos : ProductosService,
		private msj : MensajesService,
		private fb : FormBuilder
	) {
		super();
		this.window = window;
	}

	async ngOnInit(): Promise<void> {
		this.msj.mensajeEsperar();
		this.crearFormBusqueda();
		await Promise.all([
			this.obtenerCategorias(),
			this.obtenerNombresProductosTienda()
		]);
		this.msj.cerrarMensajes();
	}

	private crearFormBusqueda () : void {
		this.formBusqueda = this.fb.group({
			producto : ['', [Validators.required, Validators.pattern('[a-zA-Zá-úÁ-Ú0-9 .,-@#$%&+{}()?¿!¡]*')]],
		});
	}

	private obtenerCategorias () : Promise<any> {
		return this.apiProductos.obtenerCategoriasApartados().toPromise().then(
			respuesta => {
				this.categorias = respuesta.data.categoriasApartados;
			}, error => {
				this.msj.mensajeGenerico('error', 'error');
			}
		);
	}

	private obtenerNombresProductosTienda () : Promise<any> {
		return this.apiProductos.obtenerNombresProductosTienda().toPromise().then(
			respuesta => {
				this.listaProductosTienda = respuesta.data.nombresProductos;
				return;
			}, error => {
				this.msj.mensajeGenerico('error', 'error');
			}
		);
	}

	protected mostrarProductos () : void {
		const campoNombre : any = this.formBusqueda.get('producto')?.value;
		this.mostrarOpcionesProductos = campoNombre.length > 0;
		if (this.listaProductosTienda.includes(campoNombre)) {
			this.buscarPorductos();
		}
	}

	protected obtenerProductosPorApartado (event: Event, idCategoria: number, idApartado: number) : void {
		const categoria = this.categorias.find((categoria : any) => categoria.id === idCategoria);
		const apartado = categoria?.apartados.find((apartado : any) => apartado.id === idApartado);
		const checkbox = event.target as HTMLInputElement;

		if (checkbox.checked) {
			this.msj.mensajeEsperar();
			if (apartado !== undefined) {
				this.desactivarApartados();
				apartado.check = !apartado.check;
			}
			this.accordionButton.nativeElement.click();

			this.apiProductos.obtenerProductosPorApartado(idApartado).subscribe(
				respuesta => {
					this.productosMostrar = respuesta.data.productos;
					this.msj.cerrarMensajes();
				}, error => {
					this.msj.mensajeGenerico('error', 'error');
				}
			);
		} else {
			this.desactivarApartados();
			this.productosMostrar = [];
		}
	}

	protected buscarPorductos () : void {
		this.msj.mensajeEsperar();
		this.productosMostrar = [];
		const producto = this.formBusqueda.get('producto')?.value;

		this.apiProductos.obtenerProductosBusqueda(producto).subscribe(
			respuesta => {
				this.productosMostrar = respuesta.data.productos;
				this.msj.cerrarMensajes();
			}, error => {
				this.msj.mensajeGenerico('error', 'error');
			}
		);
	}

	public productosDestacados() {
		this.desactivarApartados();
		this.productosMostrar = [];
		this.accordionButton.nativeElement.click();
	}

	private desactivarApartados() {
		this.categorias.forEach((cat : any) => {
			cat.apartados.forEach((a : any) => {
				a.check = false;
			});
		});
	}
}