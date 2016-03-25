//import 'fetch';
import {inject} from 'aurelia-framework';
import {Page} from 'page.js';

@inject(Page)
export class Additem {
  constructor(page) {
    this.page = page;
    this.isrent = [];
    this.issale = [];
    this.istrade = [];
    this.title;

    // let dispose = page.bindingEngine
    //   .propertyObserver(this, 'isrent')
    //   .subscribe(this.firstNameChanged);

    // let subscription = page.bindingEngine
    //   .collectionObserver(this.isrent)
    //   .subscribe(splices => { console.log(splices); console.log(this.isrent); } );
  }

  // firstNameChanged(newValue, oldValue){
  //   console.log(`this is new value: ${newValue} and this is old value: ${oldValue}`);
  // }

  attached(){
      this.page.Enhanceui.enhance(this.additem);
      //Enhanceui.notify('Welcome back Mallinda Hollaway', 'inverse');

      $('.selectpicker').selectpicker();
      if ($(this.additem).find('.lightbox')[0]) {
          $(this.additem).find('.lightbox').lightGallery()
      }
  }

  activate() {}
}
