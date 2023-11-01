public with sharing class FileCardController {
    
    @AuraEnabled(cacheable=true)
    public static List<ContentVersion> getRelatedFilesByRecordId(String recordId){

        List<ContentDocumentLink> fileList = [
            SELECT
            ContentDocumentId
            FROM ContentDocumentLink
            WHERE LinkedEntityId =: recordId
        ];

        Set<Id> fileIds = new Set<Id>();

        for(ContentDocumentLink docLink : fileList){
            fileIds.add(docLink.ContentDocumentId);
        }


        List<ContentVersion> docList = [
            SELECT
            Id,
            Title,
            ContentDocumentId,
            FileType,
            ContentSize,
            FileExtension,
            CreatedDate
            FROM ContentVersion
            WHERE ContentDocumentId IN: fileIds
            ORDER BY CreatedDate DESC
        ];

        return docList;
    }
}