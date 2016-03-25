//lightgallery
//https://github.com/sachinchoolur/lightGallery/tree/1.1.5
//http://sachinchoolur.github.io/lightGallery/1.1-docs/

//composition
//http://ilikekillnerds.com/2015/10/aurelia-dynamic-composition/
//http://www.sitepoint.com/composition-aurelia-report-builder/
//http://patrickwalters.net/my-best-practices-in-aurelia/
//http://patrickwalters.net/my-best-practices-for-aurelia-solving-the-m-in-mvvm/

//observing properties and arrays
//http://ilikekillnerds.com/2015/10/observing-objects-and-arrays-in-aurelia/

//systemJS overview
//https://github.com/systemjs/systemjs/blob/master/docs/overview.md

//setroot trick
//http://stackoverflow.com/questions/33458274/how-to-switch-between-login-page-and-app-with-aurelia
//https://github.com/davismj/sentry

//aurelia tutorials
//http://ilikekillnerds.com/category/javascript/aurelia-tutorials/

//compose ref
//https://github.com/aurelia/templating-resources/issues/64
//https://github.com/aurelia/templating-resources/issues/90

//event aggregator
//http://www.elanderson.net/2015/12/aurelia-event-aggregator/
//http://ilikekillnerds.com/2016/02/working-with-the-aurelia-event-aggregator/
//http://stackoverflow.com/questions/32206257/aurelia-unsubscribe-event-aggregator

//adaptive binding
//http://eisenbergeffect.bluespire.com/aurelias-adaptive-binding/

//inreitance in pages
//http://stackoverflow.com/questions/30094497/how-to-inject-in-a-parent-class-in-aurelia

//dynamic templating
//http://ilikekillnerds.com/2016/01/enhancing-at-will-using-aurelias-templating-engine-enhance-api/

//----------cordova plugins
/*
  cordova plugin add cordova-plugin-dialogs
  
  cordova plugin add https://github.com/moshetet/cordova-plugin-local-notifications
  https://github.com/katzer/cordova-plugin-local-notifications
  https://github.com/katzer/cordova-plugin-local-notifications/wiki/11.-Samples
  FORKED LINK https://github.com/moshetet/cordova-plugin-local-notifications

  
*/

import $ from 'jquery';

export class App {
  configureRouter(config, router) {
    config.title = 'Aurelia';
    config.map([
      { route: ['', 'welcome'], name: 'welcome',      moduleId: 'welcome',      nav: true, title: 'Welcome' },
      { route: 'additem', name: 'additem',      moduleId: 'additem',      nav: true, title: 'Add Item' },
      { route: 'users',         name: 'users',        moduleId: 'users',        nav: true, title: 'Github Users' },
      //{ route: 'child-router',  name: 'child-router', moduleId: 'child-router', nav: true, title: 'Child Router' }
    ]);

    this.router = router;
  }

  constructor(){
  	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
         $('html').addClass('ismobile');
    }
  }
}
