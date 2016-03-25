//import {computedFrom} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
//import 'fetch';
import {Aurelia, BindingEngine, customElement, useView, inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import $ from 'jquery';
import 'bootstrap';
import {Enhanceui} from 'js/enhanceui.js';

@inject(HttpClient, Aurelia, Router, BindingEngine)
export class Page {
  heading = 'Github Users';
  users = [];

  constructor(http, aurelia, router, bindingEngine) {
    // http.configure(config => {
    //   config
    //     .useStandardConfiguration()
    //     .withBaseUrl('https://api.github.com/');
    // });

    this.http = http;
    this.app = Aurelia;
    this.router = router;
    this.bindingEngine = bindingEngine;
    this.Enhanceui = new Enhanceui();
  }
}