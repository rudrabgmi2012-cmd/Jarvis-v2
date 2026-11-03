import {PorcupineWorker,BuiltInKeyword} from "@picovoice/porcupine-web";
import {WebVoiceProcessor} from "@picovoice/web-voice-processor";
import {SpeechRecognition} from "@capacitor-community/speech-recognition";
let w=null;
window.Wake={
async start(key,cb){await this.stop();w=await PorcupineWorker.create(key,[BuiltInKeyword.Jarvis],()=>cb(),{publicPath:"porcupine_params.pv",forceWrite:true});await WebVoiceProcessor.subscribe(w)},
async stop(){if(!w)return;const x=w;w=null;try{await WebVoiceProcessor.unsubscribe(x)}catch(e){}try{await x.release()}catch(e){}try{x.terminate()}catch(e){}},
async listen(){const p=await SpeechRecognition.requestPermissions();if(p&&p.speechRecognition&&p.speechRecognition!=="granted")throw new Error("Microphone permission was denied");
const r=await SpeechRecognition.start({language:"en-US",maxResults:1,partialResults:false,popup:false});return r&&r.matches&&r.matches[0]||""}
};
