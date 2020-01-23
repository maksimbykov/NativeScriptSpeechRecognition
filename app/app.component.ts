import { Component } from "@angular/core";

import {SpeechRecognition, SpeechRecognitionTranscription, SpeechRecognitionOptions} from "nativescript-speech-recognition"
import { error } from "tns-core-modules/trace/trace";

@Component({
  selector: "my-app",
  template: `
    <ActionBar title="Fun Input Voice App (FIVA)" class="action-bar"></ActionBar>
    <!-- Your UI components go here -->
    <GridLayout orientation="horizontal" columns="auto, auto, auto"  horizontalAlignment="center" verticalAlignment="center">
      <StackLayout>
        <Button col="1" (tap)="triggerListening()" text="Listen to me!" style="border-radius: 50%;" ></Button>
        <Label text="prev.: {{text}}" textWrap="true"></Label>
      </StackLayout>
    </GridLayout>
    
  `
})
export class AppComponent {
  // Your TypeScript logic goes here
  options: SpeechRecognitionOptions;
  text: string;

  constructor(private speech: SpeechRecognition){
    this.options = {
      locale: "en-US",
      onResult: (transcription: SpeechRecognitionTranscription) => {
        if(transcription.finished) {
          alert({
            title: "Did you say...?",
            message: transcription.text
          });
          this.text = transcription.text;
        }
        console.log(`transcription: ${transcription.text}`)
        console.log(`finished: ${transcription.finished}`)
      }
    }
  }

  triggerListening() {
    this.speech.available().then( result => {
        result ? this.startListening() : alert('Speech recognition is not available!')
    }, error => {
      console.error(error);
    });
  }

  startListening() {
    this.speech.startListening(this.options).then( () => {
      console.log("Started listening")
    }, error => {
      console.error(error)
    })
  }


}
