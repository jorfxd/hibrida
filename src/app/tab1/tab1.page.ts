import { Component, signal } from '@angular/core';
import {  IonCardContent, IonButton, IonList, IonItem, IonLabel,IonHeader, IonToolbar, IonTitle, IonContent, IonFab, IonFabButton, IonIcon, IonCard, } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { addIcons } from 'ionicons';
import { cloudUploadOutline } from 'ionicons/icons';
import { TeachablemachineService } from '../services/teachablemachine.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonCardContent, IonButton, IonList, IonItem, IonLabel,IonFab, IonFabButton, IonIcon, IonCard,IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent],
})
export class Tab1Page {
  imageReady = signal(false)
  imageUrl = signal("")
  modelLoaded = signal(false);
  classLabels: string[] = [];
     
  constructor(private teachablemachine: TeachablemachineService) {
    addIcons({ cloudUploadOutline });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
        const file = input.files[0];
   
        const reader = new FileReader();

        // Convertir el archivo a una URL base64 para mostrarlo en el html
        reader.onload = () => {
          this.imageUrl.set(reader.result as string)
          this.imageReady.set(true)
      };

        reader.readAsDataURL(file); // Leer el archivo como base64
    }
}
async ngOnInit() {
  await this.teachablemachine.loadModel()
  this.classLabels = this.teachablemachine.getClassLabels()
  this.modelLoaded.set(true)
}

  

}
