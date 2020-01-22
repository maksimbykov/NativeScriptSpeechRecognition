import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import {SpeechRecognition} from "nativescript-speech-recognition"

import { AppComponent } from "./app.component";

@NgModule({
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  imports: [NativeScriptModule],
  providers: [SpeechRecognition],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
