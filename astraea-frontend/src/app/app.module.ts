import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {
  TranslateModule,
  TranslateLoader,
  TranslateService,
} from '@ngx-translate/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TownPageComponent } from './pages/town-page/town-page.component';
import { HttpBackend, HttpClientModule } from '@angular/common/http';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';
import { GuildPageComponent } from './pages/guild-page/guild-page.component';
import { StoreModule } from '@ngrx/store';
import { questReducer } from './store/quest/quest.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { QuestLineComponent } from './pages/guild-page/quest-line/quest-line.component';
import { TravelPageComponent } from './pages/travel-page/travel-page.component';
import { worldReducer } from './store/world/world.reducer';
import { hydrationMetaReducer } from './store/meta/meta.reducer';

export function HttpLoaderFactory(_httpBackend: HttpBackend) {
  return new MultiTranslateHttpLoader(_httpBackend, ['/assets/i18n/']);
}

@NgModule({
  declarations: [
    AppComponent,
    TownPageComponent,
    GuildPageComponent,
    QuestLineComponent,
    TravelPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(
      { quests: questReducer, world: worldReducer },
      { metaReducers: [hydrationMetaReducer] }
    ),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpBackend],
      },
    }),
    StoreDevtoolsModule.instrument(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private translate: TranslateService) {
    this.translate.use('en');
  }
}
