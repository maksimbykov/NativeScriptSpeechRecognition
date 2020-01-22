import { Component } from "@angular/core";

import {SpeechRecognition, SpeechRecognitionTranscription, SpeechRecognitionOptions} from "nativescript-speech-recognition"
import { error } from "tns-core-modules/trace/trace";

@Component({
  selector: "my-app",
  template: `
    <ActionBar title="My App" class="action-bar"></ActionBar>
    <!-- Your UI components go here -->
    <StackLayout>
      <Button (tap)="triggerListening()" text="Tap me!" >Start listening</Button>
      <Button (tap)="stopListening()" text="Stop me!" >Stop listening</Button>
      <Label [text]="text" textWrap="true"></Label>
    </StackLayout>
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
        if(transcription.finished)
          this.text = transcription.text;
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

  stopListening() {
    this.speech.stopListening().then( () => {
      console.log("Stopped listening to the user")
    }, error => {
      console.error(error)
    })
  }

}
