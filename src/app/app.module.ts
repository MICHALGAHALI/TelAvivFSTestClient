import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DialogComponent } from './shared/dialog/dialog.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/Input'
import { HeaderHttpInterceptor } from './header.http.Interceptor';
@NgModule({
  declarations: [
    AppComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    MatInputModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatDialogModule,
    MatFormFieldModule
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      multi:true,
      useClass:HeaderHttpInterceptor
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
