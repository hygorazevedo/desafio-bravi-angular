import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {
  processMessages(container: FormGroup, validationMessages: { [key: string]: { [key: string]: string } }): { [key: string]: string } {
  var messages: any = {};
    for (const controlKey in container.controls) {
      if (container.controls.hasOwnProperty(controlKey)) {
        const controlProperty = container.controls[controlKey];
        if (controlProperty instanceof FormGroup) {
          const childMessages = this.processMessages(controlProperty, validationMessages);
          Object.assign(messages, childMessages);
        } else {
          if (validationMessages[controlKey]) {
            messages[controlKey] = '';
            if ((controlProperty.dirty || controlProperty.touched) && controlProperty.errors) {
              Object.keys(controlProperty.errors).map(messageKey => {
                if (validationMessages[controlKey][messageKey]) {
                  messages[controlKey] += validationMessages[controlKey][messageKey] + ' ';
                }
              });
            }
          }
        }
      }
    }
    return messages;
  }
}
