import { LightningElement, api } from 'lwc';
import {NavigationMixin} from 'lightning/navigation';

export default class PreviewFileCard extends NavigationMixin(LightningElement) {

    @api file;
    @api recordId;
    @api thumbnail;

    get iconName(){
        if(this.file.Extension) {
            if(this.file.Extension === "pdf") {
                return "doctype:pdf";
            }
            if(this.file.Extension === "ppt") {
                return "doctype:ppt";
            }
            if(this.file.Extension === "xls") {
                return "doctype:xls";
            }
            if(this.file.Extension === "csv") {
                return "doctype:csv";
            }
            if(this.file.Extension === "txt") {
                return "doctype:txt";
            }
            if(this.file.Extension === "xml") {
                return "doctype:xml";
            }
            if(this.file.Extension === "doc") {
                return "doctype:doc";
            }
            if(this.file.Extension === "pdf") {
                return "doctype:pdf";
            }
            if(this.file.Extension === "zip") {
                return "doctype:zip";
            }
            if(this.file.Extension === "rtf") {
                return "doctype:rtf";
            }
            if(this.file.Extension === "psd") {
                return "doctype:psd";
            }
            if(this.file.Extension === "gdoc") {
                return "doctype:gdoc";
            }
        }

        return "doctype:image";
    }

    handlePreview(event){
        console.log(event.target.dataset.id)
        this[NavigationMixin.Navigate]({ 
            type:'standard__namedPage',
            attributes:{ 
                pageName:'filePreview'
            },
            state:{ 
                recordIds: event.target.dataset.id,
                selectedRecordId: event.target.dataset.id
            }
        });
    }
}