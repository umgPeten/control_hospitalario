import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as xlsx from 'xlsx'

const Exel_Type = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8';
const Exel_Ext = '.xlsx'

@Injectable({
  providedIn: 'root'
})
export class ExporterService {

  constructor() { }

  exportToExel(json: any[], ExelFileNale: string): void{
    const worksheet: xlsx.WorkSheet = xlsx.utils.json_to_sheet(json);
    const workbook: xlsx.WorkBook = { Sheets: { 'data': worksheet}, SheetNames: ['data']};
    const exelBuffer: any = xlsx.write(workbook, {bookType: 'xlsx', type: 'array'});

    //llamar al metodo pasar buffer y nombre 
    this.saveExel(exelBuffer, ExelFileNale);
  }

  private saveExel(buffer: any, fileName: string): void{
    const data: Blob = new Blob([buffer], {type: Exel_Type});
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + Exel_Ext);
  }
}
