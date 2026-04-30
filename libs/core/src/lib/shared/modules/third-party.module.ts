import { NgModule } from '@angular/core';

import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { NgxPrintModule } from 'ngx-print';
import { NgxSpinnerModule } from 'ngx-spinner';
// QuillModule 已移除：無任何元件宣告使用它，保留會讓 quill（506 KB）被打包進 chunk
import { SwiperModule } from 'swiper/angular';

const MODULES = [
  NgxMatTimepickerModule, NgxPrintModule, NgxSpinnerModule,
  SwiperModule
]

@NgModule({
  imports: [
    // 防止出現警告： Property "type" is missed
    NgxSpinnerModule.forRoot({ type: "''" })
  ],
  exports: [
    ...MODULES
  ],
  providers: []
})
export class ThirdPartyModule {
}
