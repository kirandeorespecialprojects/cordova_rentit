import {inject, TemplatingEngine} from 'aurelia-framework';
import {Page} from 'page.js';
import * as mCustomScrollbar from '../lib/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min';

@inject(Page, TemplatingEngine)
export class Welcome {
  heading = 'Welcome to the Aurelia Navigation App!';
  firstName = 'John';
  lastName = 'Doe';
  previousValue = this.fullName;
  
  constructor(page, templatingEngine){
    this.page = page;
    this.templatingEngine = templatingEngine;
    this.sometext = 'yo';
    this.map = new Map();
  }
  
  //Getters can't be directly observed, so they must be dirty checked.
  //However, if you tell Aurelia the dependencies, it no longer needs to dirty check the property.
  //To optimize by declaring the properties that this getter is computed from, uncomment the line below
  //as well as the corresponding import above.
  //@computedFrom('firstName', 'lastName')
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  submit() {
    this.previousValue = this.fullName;
    alert(`Welcome, ${this.fullName}!`);
  }

  openCamera(){
    navigator.camera.getPicture(()=> {
      alert('Chung ho gaya');
    }, ()=>{
      alert('Gand lag gayi');
    }, {
      sourceType: Camera.PictureSourceType.CAMERA
    });
  }

  attached(){
      let self = this;
      this.page.Enhanceui.enhance(this.welcome);
      //this.page.Enhanceui.notify('Welcome back Mallinda Hollaway', 'inverse');
    
      if ($(this.welcome).find('.lightbox')[0]) {
          $(this.welcome).find('.lightbox').lightGallery({
              enableTouch: true,
              preload: 2, 
              thumbnail : false,  
              closable : true,
              onSlideAfter: function(el, data){
                //console.log('onSlideAfter', data.currentIndex, data.slides[data.currentIndex], data.prevIndex);

                self.loadSlideInfo(data);
              },
              onOpen: function(el, data){
                self.loadSlideInfo(data);
              }  
          });
      }
  }

  loadSlideInfo(data){
    let self = this;
    setTimeout(() => {
      $.each( $(data.slides).parent().find('.loaded'), function(index) {
          //setTimeout(() => {
            if(!$(this).find('img').hasClass('isloaded')){
              self.map.set(index, { 
                  title : $(this).find('img').attr('src'),
                  description: 'Cum sociis natoque penatibus et magnis dis parturient montes'
               } );

              $(this).find('img').addClass('isloaded')
                .before( '<p>${map.get(' + index + ').title}</p>' )

              var bottom = 60;
              var height = $( window ).height() - ($(this).find('img').height() + $(this).find('img').prev().height() + $('#lg-action').height()) - bottom - 30 /*br*/;

              console.log($('#lg-action').height());
              console.log($(this).find('img').height() + $(this).find('img').prev().height() + $('#lg-action').height());

              $(this).find('img').after('<br><br><div id="scroll" style="overflow:hidden; position:absolute;height:' + height + 'px;bottom:' + bottom + 'px;padding-right:10px;padding-left:10px;"><p>${map.get(' + index + ').description}</p><br><br><br><br><br><br><p>Hey</p><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><p>Hey</p></div> <div style="position:absolute;bottom:15px;width:100%; padding-right:23px;padding-left:10px;"><div class="row"><div class="col-xs-6"><button class="btn bgm-teal btn-block">Teal</button></div><div class="col-xs-6"><button class="btn bgm-teal btn-block">Make an offer</button></div></div><div/>');
              //console.log(this, self.map.get(index));
              console.log($(this).find('#scroll'));
              $(this).find('#scroll').mCustomScrollbar({ axis:"y" }); //, setHeight: '150px'
              self.templatingEngine.enhance({element: this, bindingContext: self});
            }
          //}, 100);
      });
    }, 500);
  }
  
}

export class UpperValueConverter {
  toView(value) {
    return value && value.toUpperCase();
  }
}
