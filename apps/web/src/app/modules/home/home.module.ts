import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

// Custom packages
import { SharedModule } from '../../shared/shared.module';
import { DefaultComponent } from './pages';

const CUSTOM_MODULES = [SharedModule];
const CUSTOM_COMPONENTS = [DefaultComponent];

@NgModule({
  declarations: [...CUSTOM_COMPONENTS],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ...CUSTOM_MODULES
  ]
})
export class HomeModule { }
