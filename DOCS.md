# getir-records-service v0.0.0



- [Records](#records)
	- [Search records](#search-records)
	


# Records

## Search records



	POST /records


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| startDate			| 			|  <p>date in a “YYYY-MM-DD” format used to filter the data.</p>							|
| endDate			| 			|  <p>date in a “YYYY-MM-DD” format used to filter the data.</p>							|
| minCount			| 			|  <p>Records's minimum counts used for filtering the data. Sum of the “count” array in the documents should be between “minCount” and “maxCount”</p>							|
| maxCount			| 			|  <p>Records's maximum count counts used for filtering the data. Sum of the “count” array in the documents should be between “minCount” and “maxCount”</p>							|


