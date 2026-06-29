import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Third party packages
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SwiperModule } from 'swiper/angular';
import { YouTubePlayerModule } from '@angular/youtube-player';
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper';

// Register Swiper modules globally so features like autoplay work
SwiperCore.use([Autoplay, Navigation, Pagination]);

// Custom packages
import { SharedModule as CoreSharedModule } from '@core/shared';
import {
  PaginatorComponent,
  ResultEmptyComponent,
  CompleteComponent,
  FailComponent,
  PendingComponent,
} from './components';
import {
  ZipCodeControlComponent,
} from './controls';
import {
  ImagePreviewDialogWidgetComponent,
  JsonViewDialogWidgetComponent,
} from './widgets';
import { PartnerLogosComponent } from './components/partner-logos/partner-logos.component';

const CUST_MODULES = [CoreSharedModule];
const CUST_COMPONENTS = [
  PaginatorComponent,
  ResultEmptyComponent,
  CompleteComponent,
  FailComponent,
  PendingComponent,
];
const CUST_CONTROLS = [
  ZipCodeControlComponent,
];
const CUST_WIDGETS = [
  ImagePreviewDialogWidgetComponent,
  JsonViewDialogWidgetComponent,
];
const THIRD_MODULES = [InfiniteScrollModule, NgxSpinnerModule, SwiperModule, YouTubePlayerModule];

@NgModule({
  declarations: [
    ...CUST_COMPONENTS,
    ...CUST_CONTROLS,
    ...CUST_WIDGETS,
    PartnerLogosComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    ...CUST_MODULES,
    ...THIRD_MODULES,
  ],
  exports: [
    ...CUST_MODULES,
    ...CUST_COMPONENTS,
    ...CUST_CONTROLS,
    ...CUST_WIDGETS,
    ...THIRD_MODULES,
    PartnerLogosComponent,
  ],
  providers: [],
})
export class SharedModule {}
