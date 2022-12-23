# OamLog

### Location
The OamLog is part of the TinyApplicationController.  
The TinyApplicationController is for managing the REST microservices of the application layer.  

### Description
Every application that belongs to the application layer sends a record about every processed OaM request to the OamLog.  
The OamLog stores these records into an ElasticSearch database.  
Filtering OaM records for activities on a specific application is supported.  

### Relevance
The OamLog is core element of the application layer running in the live network at Telefonica Germany.  

### Resources
- [Specification](./spec/)
- [TestSuite](./testing/)
- [Implementation](./server/)

### Comments
./.
