//import 'fetch';
import {inject} from 'aurelia-framework';
import {Page} from 'page.js';

@inject(Page)
export class Users {
  heading = 'Github Users';
  users = [];

  constructor(page) {
    this.page = page;
    page.http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl('https://api.github.com/');
    });
  }

  attached(){
      this.page.Enhanceui.enhance(this.users);
      //Enhanceui.notify('Welcome back Mallinda Hollaway', 'inverse');
  }

  activate() {
    return this.page.http.fetch('users')
      .then(response => response.json())
      .then(users => this.users = users);
  }
}
