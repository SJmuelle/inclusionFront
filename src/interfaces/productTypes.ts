export interface SeachProducts {
    canal: string,
    marca: string,
    centroCosto: string,
    abuscar: string,
    convenio: string,
    ciudad: string,
    stockMayor: number,
    cantidad: number
}

export interface ListProduct {
    idreferencia: string,
    descripcion: string,
    subgrupo34: string,
    subgrupo35: string,
    subcategoria: string,
    subgrupo36: string,
    categoria: string,
    descripcion_adicional: string,
    contenido: string,
    unidad_contenido: string,
    marcaProveedor: string,
    precio1: number,
    idunidad: number,
    iva: number,
    precioUnitario_ConIva: number,
    precioCaja_ConIva: number,
    totalCantidad: number,
    descuento: number,
    POS: string,
    idOferta: number,
    idTipoOferta: string,
    valorDescuento: number,
    precioUnitario: number,
    precioCaja: number,
    totalprecio: number,
    bodega: string,
    stock: number
}

export type ListProducts = ListProduct[];
