import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TeachablemachineService {

  private URL = "https://teachablemachine.withgoogle.com/models/<ID-MODELO>/"
  private model: any;
  private classLabels: string[] = [];


  constructor() { }

  async loadModel() {
      try {
          const modelURL = this.URL + 'model.json';
          const metadataURL = this.URL + 'metadata.json';

          const tmImage = (window as any).tmImage;
          this.model = await tmImage.load(modelURL, metadataURL);
          this.classLabels = this.model.getClassLabels();

      } catch (error) {
          console.error('Error al cargar el modelo:', error);
          throw new Error('No se pudo cargar el modelo.');
      }
  }

  getClassLabels(): string[] {
      return this.classLabels;
  }

}
