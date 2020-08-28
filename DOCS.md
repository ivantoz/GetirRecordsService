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

### Success Response

Success-Response:

```
HTTP/1.1 200 OK
{
   "code": 0,
   "msg": "Success",
   "records": [
       {
             "key": "bxoQiSKL",
             "createdAt": "2016-01-29T01:59:53.494Z",
             "totalCount": 2991
       },
       {
             "key": "NOdGNUDn",
             "createdAt": "2016-01-28T07:10:33.558Z",
             "totalCount": 2813
        }
   ]
 }
```
### Error Response

Error-Response:

```
HTTP/1.1 404 Not Found
{
  "code": 404
  "msg": "Search cannot be performed"
}
```

