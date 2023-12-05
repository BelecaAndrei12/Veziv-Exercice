import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class FileConverterService {

  convertFileToBase64(file: File): void {
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64Data = reader.result?.toString().split(',')[1]; // Get the base64 data

      // Now you can send the base64Data to your API
    };

    reader.readAsDataURL(file);
  }

}
