import { formatDate } from '@angular/common';
import { Component, Input } from '@angular/core';
import html2canvas from 'html2canvas';
import { data } from 'jquery';
import jsPDF from 'jspdf';
import * as moment from 'moment';
import { Novedad } from 'src/app/models/novedad';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-reportenovedades',
  templateUrl: './reportenovedades.component.html'
})
export class ReportenovedadesComponent {
  @Input() novedades:Novedad[]=[];
  @Input() total:any=0;
  inicio!:string;
  final!:string;
  fecha = formatDate(new Date(), 'dd-MM-yyyy HH:mm:ss', 'en-US')

  itemOne:boolean=true;
  usuario!:Usuario;

  


  constructor(
    private authService:AuthService,
    private mService:ModalService
  ){
    if(this.authService.usuario){
      this.usuario= this.authService.usuario;
    }

    this.mService.inicio.subscribe(resp=>this.inicio=resp);
    this.mService.final.subscribe(resp=>this.final=resp);
  }
  
  downloadPDF() {
    this.itemOne=true;

    setTimeout(()=>{
      // Extraemos el
      // let DATA:any = document.getElementById('htmlData');
      // const doc = new jsPDF('p', 'pt', 'a4');
      // const options = {
      //   background: 'white',
      //   scale: 3
      // };

      html2canvas($('#htmlData')[0],{allowTaint:true}).then(function(canvas) {
        var imgData = canvas.toDataURL('image/png');
          var imgWidth = 200;
          var pageHeight = 295;
          var imgHeight = canvas.height * imgWidth / canvas.width;
          var heightLeft = imgHeight;
    
          var doc = new jsPDF('p', 'mm', "a4");
          var position = 0;
    
          doc.addImage(imgData, 'PNG', 5, position, imgWidth, imgHeight+15);
          heightLeft -= pageHeight;
    
          while (heightLeft >= 0) {
              position = heightLeft - imgHeight;
              doc.addPage();
              doc.addImage(imgData, 'PNG', 5, position, imgWidth, imgHeight+15);
              heightLeft -= pageHeight;
          }
        doc.save("Dashboard.pdf");
      });
      

      // html2canvas(DATA, options).then((canvas) => {

      //   const img = canvas.toDataURL('image/PNG');

      //   // Add image Canvas to PDF
      //   const bufferX = 15;
      //   const bufferY = 15;
      //   const imgProps = (doc as any).getImageProperties(img);
      //   const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      //   const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      //   doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      //   return doc;
      // }).then((docResult) => {
      //   docResult.save(`${new Date().toISOString()}_seguridad.pdf`);
      //   this.itemOne=false;
      // });
    },1000);
    
  }


  

  horaMes =(fecha:any)=>{
    const hoyMes = moment(fecha);
    return hoyMes.format(' MMMM D');
  }

}
