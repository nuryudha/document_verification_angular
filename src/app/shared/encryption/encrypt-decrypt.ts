import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
declare let CryptoJS:any;

@Injectable({
    providedIn: 'root'
})

export class EncryptDecrypt {

    encryptParameter(wantToEncrypt: any){

        function base64ToHexFunc(data: any) {
          const encodedData = atob(data);
          let result = '';
          for (let i = 0; i < encodedData.length; i++) {
            const hex = encodedData.charCodeAt(i).toString(16);
            result += (hex.length === 2 ? hex : '0' + hex);
          }
          return result;
        }
    
        let key = environment.secretKeyEncryption;
        let iv = environment.ivEncryption;
    
        let ivWA = CryptoJS.enc.Utf8.parse(iv);
        let keyWA = CryptoJS.enc.Utf8.parse(key);
    
        let encryptedCP = CryptoJS.AES.encrypt(wantToEncrypt, keyWA, { iv: ivWA });
        let ciphertext = base64ToHexFunc(encryptedCP.toString());
        // console.log("Encrypt  : " + ciphertext);
    
        return ciphertext;
      }
    
      decryptParameter(dataEncrypt:any){
    
        let ciphertext = dataEncrypt;
        let key = environment.secretKeyEncryption;
        let iv = environment.ivEncryption;
    
        let ciphertextWA = CryptoJS.enc.Hex.parse(ciphertext);
        let ivWA = CryptoJS.enc.Utf8.parse(iv);
        let ciphertextCP = { ciphertext: ciphertextWA };
        let keyWA = CryptoJS.enc.Utf8.parse(key);
    
        let decrypted = CryptoJS.AES.decrypt(
            ciphertextCP,
            keyWA, 
            { iv: ivWA }
        );
    
        // console.log(decrypted.toString(CryptoJS.enc.Utf8));
        return decrypted.toString(CryptoJS.enc.Utf8);
    
      }
      
}
