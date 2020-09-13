import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer  } from '@angular/platform-browser';

@Pipe({
  name: 'domseguro'
})
export class DomseguroPipe implements PipeTransform {

  constructor( 
    private domSanitizer: DomSanitizer 
    ){ }

  transform( value: string, url: string): any {
    value = value.split(":", value.length)[2];
    return this.domSanitizer.bypassSecurityTrustResourceUrl( url + value );
  }

}
