import { Injectable } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { RequisitoResumen } from '../../../feature/ingenieria-de-requisitos/shared/model/requisito-resumen.module';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable()
export class PdfMakeService {
  crearPDF(nombreDelProyecto: string, requisitos: RequisitoResumen[]): void {
    const requisitosFormateados = requisitos.map(requisito => [
      {
        text: ` - Nombre: ${requisito.nombre}`,
        style: 'subheader',
      },
      {
        text: `Tipo de Requisito: ${requisito.tipoRequisito.nombre}`,
        style: 'body',
      },
      {
        text: `Descripción: ${requisito.descripcion}`,
        style: 'body',
      },
    ]);

    const pdfDefinicion: any = {
      content: [
        {
          text: 'Proceso de Ingeniería de Requisitos: ' + nombreDelProyecto,
          style: 'header',
        },
        ...requisitosFormateados,
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 5, 0, 0],
        },
        body: {
          fontSize: 12,
          margin: [0, 5, 0, 0],
        },
        defaultStyle: {
          fontSize: 12,
        },
      },
    };

    const pdf = pdfMake.createPdf(pdfDefinicion);

    pdf.open();
  }
}
