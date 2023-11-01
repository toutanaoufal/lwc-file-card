import { LightningElement, api, wire } from 'lwc';
import getRelatedFilesByRecordId from '@salesforce/apex/FileCardController.getRelatedFilesByRecordId';
import { ShowToastEvent } from "lightning/platformShowToastEvent";

export default class LwcFileCard extends LightningElement {

    @api recordId;

    files = [];
    loaded = false;
    errors;

    @wire(getRelatedFilesByRecordId, { recordId: '$recordId' })
    wiredFiles({ data, error }) {
        if (data) {
            for (let i = 0; i < data.length; i++) {
                let file = {
                    Id: data[i].Id,
                    Title: data[i].Title,
                    Extension: data[i].FileExtension,
                    ContentDocumentId: data[i].ContentDocumentId,
                    CreatedDate: data[i].CreatedDate,
                    thumbnailFileCard: "/sfc/servlet.shepherd/version/renditionDownload?rendition=THUMB720BY480&versionId=" +
                        data[i].Id +
                        "&operationContext=CHATTER&contentId=" +
                        data[i].ContentDocumentId,
                    Url: "/sfc/servlet.shepherd/document/download/" + data[i].ContentDocumentId
                };

                this.files.push(file);
            }
            this.loaded = true;
            console.log('files', JSON.stringify(data));

        } else if (error) {
            this.errors = error;
            console.log('error', error);
        }
    }

}