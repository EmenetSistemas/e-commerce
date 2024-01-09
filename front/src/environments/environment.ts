export const categorias : any = [
    {
        id: 1,
        nombre: 'Accesorios',
        apartados: [
            {
                id: 1,
                nombre: 'Tapetes',
                check: false
            }, {
                id: 2,
                nombre: 'Mouse pad',
                check: false
            }, {
                id: 3,
                nombre: 'Cargadores',
                check: false
            }, {
                id: 4,
                nombre: 'HUBs USB',
                check: false
            }, {
                id: 5,
                nombre: 'Mochilas',
                check: false
            }, {
                id: 6,
                nombre: 'Webcams',
                check: false
            }
        ]
    }, {
        id: 2,
        nombre: 'Computadoras',
        apartados: [
            {
                id: 1,
                nombre: 'Portatiles',
                check: false
            }
        ]
    }
];

export const productos : any = [
    {
        id: 1,
        nombre: 'Mouse Pad Gamer',
        imagen: 'https://http2.mlstatic.com/D_NQ_NP_841351-MLU73311508527_122023-V.webp',
        precio: 114,
        descuento: 0,
        categoria: 'Accesorios',
        idCategoria: 1,
        apartado: 'Tapetes',
        idApartado: 1,
        calificacion: 5,
        calificaciones: 23,
        descripcion: 'Mouse Pad Gamer Alfombrilla Raton Antideslizante 80x30cm',
        caracteristicas: [
            {
                titulo: 'Marca',
                descripcion: 'TEC'
            }, {
                titulo: 'Modelo',
                descripcion: 'MM8030'
            }, {
                titulo: 'Tamaño',
                descripcion: '80 cm x 30 cm'
            }, {
                titulo: 'Material',
                descripcion: 'Látex'
            }, {
                titulo: 'Color',
                descripcion: 'Negro-Mapa'
            }
        ],
        stock: 5
    }, {
        id: 2,
        nombre: 'Mouse Pad Alfombrilla',
        imagen: 'https://http2.mlstatic.com/D_NQ_NP_866787-MLM48951651808_012022-O.webp',
        precio: 119,
        descuento: 0.18,
        categoria: 'Accesorios',
        idCategoria: 1,
        apartado: 'Tapetes',
        idApartado: 1,
        calificacion: 4,
        calificaciones: 4,
        descripcion: 'Mouse Pad Alfombrilla Grande Tapete Gamer Escritorio Pc',
        caracteristicas: [
            {
                titulo: 'Marca',
                descripcion: 'TEC'
            }, {
                titulo: 'Modelo',
                descripcion: 'Gamer'
            }, {
                titulo: 'Tamaño',
                descripcion: '80 cm x 30 cm'
            }, {
                titulo: 'Material',
                descripcion: 'Neopreno'
            }, {
                titulo: 'Color',
                descripcion: 'Negro'
            }
        ],
        stock: 7
    }, {
        id: 3,
        nombre: 'Tapete De Escritorio Mouse Pad',
        imagen: 'https://http2.mlstatic.com/D_NQ_NP_711419-MLM48719342220_122021-O.webp',
        precio: 122,
        descuento: 0.18,
        categoria: 'Accesorios',
        idCategoria: 1,
        apartado: 'Tapetes',
        idApartado: 1,
        calificacion: 5,
        calificaciones: 7,
        descripcion: 'Tapete De Escritorio Mouse Pad Oficina Mesa 80cm X 40cm Vimi',
        caracteristicas: [
            {
                titulo: 'Marca',
                descripcion: 'Vimi'
            }, {
                titulo: 'Modelo',
                descripcion: 'PAD - 02'
            }, {
                titulo: 'Tamaño',
                descripcion: '80 cm x 40 cm'
            }, {
                titulo: 'Material',
                descripcion: 'Caucho,Poliéster'
            }, {
                titulo: 'Color',
                descripcion: 'Azul'
            }
        ],
        stock: 10
    }, {
        id: 4,
        nombre: 'Cubre Escritorio Elegante',
        imagen: 'https://http2.mlstatic.com/D_NQ_NP_642875-MLM72072079840_102023-O.webp',
        precio: 699,
        descuento: 0.18,
        categoria: 'Accesorios',
        idCategoria: 1,
        apartado: 'Tapetes',
        idApartado: 1,
        calificacion: 4,
        calificaciones: 10,
        descripcion: 'Cubre Escritorio Elegante Comodo Suave Portatil Home Office',
        caracteristicas: [
            {
                titulo: 'Marca',
                descripcion: 'Office'
            }, {
                titulo: 'Modelo',
                descripcion: 'Tapete piel sintetica'
            }, {
                titulo: 'Tamaño',
                descripcion: '80 cm x 40 cm'
            }, {
                titulo: 'Material',
                descripcion: 'Piel'
            }, {
                titulo: 'Color',
                descripcion: 'Rosa'
            }
        ],
        stock: 13
    }, {
        id: 5,
        nombre: 'Mouse Pad Tapete',
        imagen: 'https://http2.mlstatic.com/D_NQ_NP_906604-MLU72631580435_112023-O.webp',
        precio: 89,
        descuento: 0.10,
        categoria: 'Accesorios',
        idCategoria: 1,
        apartado: 'Mouse pad',
        idApartado: 2,
        calificacion: 4,
        calificaciones: 5,
        descripcion: 'Cubre Escritorio Elegante Comodo Suave Portatil Home Office',
        caracteristicas: [
            {
                titulo: 'Modelo',
                descripcion: 'HI-M303'
            }, {
                titulo: 'Tamaño',
                descripcion: '23 cm x 19 cm'
            }, {
                titulo: 'Material',
                descripcion: 'Plástico'
            }, {
                titulo: 'Color',
                descripcion: 'Negro'
            }
        ],
        stock: 5
    }, {
        id: 6,
        nombre: 'Mousepad Slim Company',
        imagen: 'https://http2.mlstatic.com/D_NQ_NP_956227-MLU72565705318_112023-O.webp',
        precio: 97.29,
        descuento: 0.10,
        categoria: 'Accesorios',
        idCategoria: 1,
        apartado: 'Mouse pad',
        idApartado: 2,
        calificacion: 4,
        calificaciones: 24,
        descripcion: 'Mousepad Slim Company Tapete Ergonomico De Gel Antideslizante Raton Con Reposa Muñeca',
        caracteristicas: [
            {
                titulo: 'Modelo',
                descripcion: 'HI-M303'
            }, {
                titulo: 'Tamaño',
                descripcion: '23 cm x 19 cm'
            }, {
                titulo: 'Material',
                descripcion: 'Plástico'
            }, {
                titulo: 'Color',
                descripcion: 'Azul'
            }
        ],
        stock: 10
    }, {
        id: 7,
        nombre: 'Mouse Pad Reposamuñecas',
        imagen: 'https://http2.mlstatic.com/D_NQ_NP_715321-MLM50503686548_062022-O.webp',
        precio: 229,
        descuento: 0.42,
        categoria: 'Accesorios',
        idCategoria: 1,
        apartado: 'Mouse pad',
        idApartado: 2,
        calificacion: 5,
        calificaciones: 24,
        descripcion: 'Mouse Pad Teclado Ratón Reposamuñecas Juego De Tres Piezas',
        caracteristicas: [
            {
                titulo: 'Marca',
                descripcion: 'TEC'
            }, {
                titulo: 'Modelo',
                descripcion: 'P02'
            }, {
                titulo: 'Tamaño',
                descripcion: '250 mm x 230 mm'
            }, {
                titulo: 'Material',
                descripcion: 'Gel de sílice'
            }, {
                titulo: 'Color',
                descripcion: 'Negro'
            }
        ],
        stock: 5
    }, {
        id: 8,
        nombre: 'Tapete Raton Huella 3d Gato',
        imagen: 'https://http2.mlstatic.com/D_NQ_NP_920667-MLU72628278140_112023-O.webp',
        precio: 298,
        descuento: 0.18,
        categoria: 'Accesorios',
        idCategoria: 1,
        apartado: 'Mouse pad',
        idApartado: 2,
        calificacion: 4,
        calificaciones: 12,
        descripcion: 'Tapete Raton Huella 3d Gato Antideslizante Gel Ortopedico Color Negro',
        caracteristicas: [
            {
                titulo: 'Marca',
                descripcion: 'Soku'
            }, {
                titulo: 'Modelo',
                descripcion: 'PC-GAF9HFCT'
            }, {
                titulo: 'Tamaño',
                descripcion: '27 cm x 20 cm'
            }, {
                titulo: 'Material',
                descripcion: 'Gel silicon'
            }, {
                titulo: 'Color',
                descripcion: 'Negro-Rosa'
            }
        ],
        stock: 10
    }, {
        id: 9,
        nombre: 'Cargador Hp Envy Original',
        imagen: 'https://http2.mlstatic.com/D_NQ_NP_612994-MLM46510206327_062021-O.webp',
        precio: 159,
        descuento: 0,
        categoria: 'Accesorios',
        idCategoria: 1,
        apartado: 'Cargadores',
        idApartado: 3,
        calificacion: 4,
        calificaciones: 5,
        descripcion: '',
        caracteristicas: [],
        stock: 5
    }, {
        id: 10,
        nombre: 'Adl45wcc Ac Adapter Lenovo',
        imagen: 'https://http2.mlstatic.com/D_NQ_NP_801058-MLM50308323037_062022-O.webp',
        precio: 520,
        descuento: 0.15,
        categoria: 'Accesorios',
        idCategoria: 1,
        apartado: 'Cargadores',
        idApartado: 3,
        calificacion: 4,
        calificaciones: 5,
        descripcion: '',
        caracteristicas: [],
        stock: 5
    }, {
        id: 11,
        nombre: 'Cargador Original Acer Aspire',
        imagen: 'https://http2.mlstatic.com/D_NQ_NP_824774-MLM49744723875_042022-O.webp',
        precio: 159,
        descuento: 0.15,
        categoria: 'Accesorios',
        idCategoria: 1,
        apartado: 'Cargadores',
        idApartado: 3,
        calificacion: 4,
        calificaciones: 5,
        descripcion: '',
        caracteristicas: [],
        stock: 5
    }, {
        id: 12,
        nombre: 'Cargador Tipo C Compatible Huawei',
        imagen: 'https://http2.mlstatic.com/D_NQ_NP_668691-MLM53939657974_022023-O.webp',
        precio: 559,
        descuento: 0.47,
        categoria: 'Accesorios',
        idCategoria: 1,
        apartado: 'Cargadores',
        idApartado: 3,
        calificacion: 4,
        calificaciones: 5,
        descripcion: '',
        caracteristicas: [],
        stock: 5
    }, {
        id: 13,
        nombre: 'Hub Adaptador Multi-puerto',
        imagen: 'https://http2.mlstatic.com/D_NQ_NP_922439-MLM54636018545_032023-O.webp',
        precio: 128,
        descuento: 0.18,
        categoria: 'Accesorios',
        idCategoria: 1,
        apartado: 'HUBs USB',
        idApartado: 4,
        calificacion: 4,
        calificaciones: 5,
        descripcion: '',
        caracteristicas: [],
        stock: 5
    }, {
        id: 14,
        nombre: 'Hub Usb Con 7 Puertos Usb',
        imagen: 'https://http2.mlstatic.com/D_NQ_NP_972557-MLM72976028660_112023-O.webp',
        precio: 280,
        descuento: 0.50,
        categoria: 'Accesorios',
        idCategoria: 1,
        apartado: 'HUBs USB',
        idApartado: 4,
        calificacion: 4,
        calificaciones: 5,
        descripcion: '',
        caracteristicas: [],
        stock: 5
    }, {
        id: 15,
        nombre: 'Mochila De Viaje Cluci',
        imagen: 'https://http2.mlstatic.com/D_NQ_NP_707043-CBT72817386359_112023-O.webp',
        precio: 1671.91,
        descuento: 0.45,
        categoria: 'Accesorios',
        idCategoria: 1,
        apartado: 'Mochilas',
        idApartado: 5,
        calificacion: 4,
        calificaciones: 5,
        descripcion: '',
        caracteristicas: [],
        stock: 5
    }, {
        id: 16,
        nombre: 'Mochila Informática Bolsa Laptop',
        imagen: 'https://http2.mlstatic.com/D_NQ_NP_915886-MLM73463713852_122023-O.webp',
        precio: 710,
        descuento: 0.40,
        categoria: 'Accesorios',
        idCategoria: 1,
        apartado: 'Mochilas',
        idApartado: 5,
        calificacion: 4,
        calificaciones: 5,
        descripcion: '',
        caracteristicas: [],
        stock: 5
    }, {
        id: 17,
        nombre: 'Cámara Web 4k Hd 2160p',
        imagen: 'https://http2.mlstatic.com/D_NQ_NP_825625-CBT72659718673_112023-O.webp',
        precio: 683.60,
        descuento: 0.41,
        categoria: 'Accesorios',
        idCategoria: 1,
        apartado: 'Webcams',
        idApartado: 6,
        calificacion: 4,
        calificaciones: 5,
        descripcion: '',
        caracteristicas: [],
        stock: 5
    }, {
        id: 18,
        nombre: 'Cámara Web Logitech Hd C270',
        imagen: 'https://http2.mlstatic.com/D_NQ_NP_619491-MLU72854932614_112023-O.webp',
        precio: 354,
        descuento: 0,
        categoria: 'Accesorios',
        idCategoria: 1,
        apartado: 'Webcams',
        idApartado: 6,
        calificacion: 4,
        calificaciones: 5,
        descripcion: '',
        caracteristicas: [],
        stock: 5
    }, {
        id: 19,
        nombre: 'Cámara Web Usb Full Hd',
        imagen: 'https://http2.mlstatic.com/D_NQ_NP_978686-MLM69449831317_052023-O.webp',
        precio: 500,
        descuento: 0.49,
        categoria: 'Accesorios',
        idCategoria: 1,
        apartado: 'Webcams',
        idApartado: 6,
        calificacion: 4,
        calificaciones: 5,
        descripcion: '',
        caracteristicas: [],
        stock: 5
    }, {
        id: 20,
        nombre: 'Laptop HP 245 G9 negra',
        imagen: 'https://http2.mlstatic.com/D_NQ_NP_875135-MLU73165785293_112023-O.webp',
        precio: 10299,
        descuento: 0.27,
        categoria: 'Computadoras',
        idCategoria: 2,
        apartado: 'Portatiles',
        idApartado: 1,
        calificacion: 4,
        calificaciones: 5,
        descripcion: '',
        caracteristicas: [],
        stock: 5
    }, {
        id: 21,
        nombre: 'Laptop Chuwi HeroBook Pro space',
        imagen: 'https://http2.mlstatic.com/D_NQ_NP_851348-MLU72636716115_112023-O.webp',
        precio: 5622.61,
        descuento: 0.13,
        categoria: 'Computadoras',
        idCategoria: 2,
        apartado: 'Portatiles',
        idApartado: 1,
        calificacion: 4,
        calificaciones: 3,
        descripcion: 'Laptop Chuwi HeroBook Pro space gray 14.1", Intel Celeron N4020 8GB de RAM 256GB SSD, Intel UHD Graphics 600 1920x1080px Windows 11 Home',
        caracteristicas: [
            {
                titulo: 'Color',
                descripcion: 'Space gray'
            }, {
                titulo: 'Memoria RAM',
                descripcion: '8 GB'
            }, {
                titulo: 'Tipo RAM',
                descripcion: 'LPDDR4'
            }, {
                titulo: 'Almacenamiento',
                descripcion: 'SSD'
            }, {
                titulo: 'Capacidad',
                descripcion: '256 GB'
            }, {
                titulo: 'Resolución ',
                descripcion: '1920px x 1080px'
            }
        ],
        stock: 5
    }
];

export const carritoCompras : any = [
    5,
    7,
    8,
    3,
    10
];