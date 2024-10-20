// src/services/menuService.ts
import type { MenuItem } from '../interfaces/menuTypes';

export const fetchMenu = (): Promise<MenuItem[]> => {
  return new Promise((resolve) => {
    const menu: MenuItem[] = [
      { index: '1', title: 'Caja', value:"Caja", link:"" },
      {
        index: '2',
        title: 'Movimientos',
        value:"Movimientos",
        link:"",
        subMenu: [
          { index: '2-1', title: 'Clientes', value:"Clientes", link:""},
          { index: '2-2', title: 'Factura de contado', value:"Factura de contado", link:"" },
          { index: '2-3', title: 'Factura de crédito sin cupo', value:"Factura de crédito sin cupo", link:"" },
          {
            index: '2-4',
            title: 'Pedidos Excesos y agotados',
            value:"Pedidos Excesos y agotados",
            link:"",
            subMenu: [
              { index: '2-4-1', title: 'Sugerido proximo pedido', value:"Sugerido proximo pedido", link:"" },
              { index: '2-4-2', title: 'Sugerido proximo pedido dispensario', value:"Sugerido proximo pedido dispensario", link:"" },
              { index: '2-4-3', title: 'Agotados', value:"Agotados", link:"" },
              { index: '2-4-4', title: 'Excesos de inventarios' , value:"Excesos de inventarios", link:""},
              { index: '2-4-5', title: 'Pedidos de clientes', value:"Pedidos de clientes", link:"" },
              { index: '2-4-6', title: 'Ordenes de compra', value:"Ordenes de compra", link:"" },
              { index: '2-4-7', title: 'Dias de inventario', value:"Dias de inventario", link:"" },
              { index: '2-4-8', title: 'Inv. consignación' , value:"Sugerido proximo pedido", link:""},
            ],
          },
          { index: '2-5', title: 'Movimiento de inventarios', value:"Movimiento de inventarios", link:"" },
          { index: '2-6', title: 'Imprmir etiquetas precios', value:"Imprmir etiquetas precios", link:"" },
          { index: '2-7', title: 'Compras' , value:"Compras", link:""},
          { index: '2-8', title: 'Marca de inventario A,B,C,H', value:"arca de inventario A,B,C,H", link:"" },
          { index: '2-9', title: 'Recaudo serfinanza', value:"Recaudo serfinanza", link:"" },
          { index: '2-10', title: 'Digitar gastos', value:"Digitar gastos", link:"" },
          { index: '2-11', title: 'Recibir abonos', value:"Recibir abonos", link:"" },
          { index: '2-12', title: 'Anular factura', value:"Anular factura", link:"" },
          { index: '2-13', title: 'Ubicación y detalle  referencia', value:"Ubicación y detalle  referencia", link:"" },
          { index: '2-14', title: 'Relación seriales-documentos', value:"Relación seriales-documentos", link:"" },
          { index: '2-15', title: 'Devoluciones de compra', value:"Devoluciones de compra", link:"" },
          { index: '2-16', title: 'Notas inventario' , value:"Notas inventario", link:""},
          { index: '2-17', title: 'Desmarcar documento replicados', value:"Desmarcar documento replicados", link:"" },
          { index: '2-18', title: 'Modificar formulas FFMM', value:"Modificar formulas FFMM", link:"" },
          { index: '2-19', title: 'Cambiar precio articulos', value:"Cambiar precio articulos", link:"" },
          { index: '2-20', title: 'Revisión lotes de inventarios', value:"Revisión lotes de inventarios", link:"" },
          { index: '2-21', title: 'Relación de documentos', value:"Relación de documentos", link:"" },
          { index: '2-22', title: 'Formula de auditorias' , value:"Formula de auditorias", link:""},
          { index: '2-23', title: 'Ajuste de factor productos' , value:"Ajuste de factor productos", link:""},
          { index: '2-24', title: 'Descarga datos web' , value:"Descarga datos web", link:""},
        ],
      },
      {
        index: '3',
        title: 'Configuración',
        value:"Configuración", 
        link:"",
        popperOffset: 8,
        subMenu: [
          { index: '3-1', title: 'Quien Soy',value:"Quien Soy", link:"/admin/perfil" },
          { index: '3-2', title: 'Recobro laboratorio',value:"Recobro laboratorio", link:""  },
          { index: '3-3', title: 'Digitar Gastos', value:"Digitar Gastos", link:""  },
          { index: '3-4', title: 'Sicronización manual', disabled:false ,value:"Sicronización manual", link:"" },
          {
            index: '3-4',
            title: 'Sistemas',
            value:"Sistemas", 
            link:"",
            popperOffset: 20,
            subMenu: [
              { index: '3-4-1', title: 'Perfil de usuarios' ,value:"Perfil de usuarios", link:""},
              { index: '3-4-2', title: 'Cambios generales',value:"Cambios generales", link:"" },
              { index: '3-4-3', title: 'Version' ,value:"Version", link:""},
            ],
          },
        ],
      },
      { index: '4', title: 'Consultas',value:"Consultas", link:""},
    ];
    setTimeout(() => resolve(menu), 1000); // Simula un retardo en la respuesta de la API
  });
};
