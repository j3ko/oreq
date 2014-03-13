# oreq

Generate OData requests fluently in Javascript

## Examples

**Paging**:

```javascript
var url = oreq.request("http://services.odata.org/Northwind/Northwind.svc/Customers").withSkip(10).withTop(10).url();

console.log(url); 
// output: http://services.odata.org/Northwind/Northwind.svc/Customers?$top=10&$skip=10
```

**Sorting**:

```javascript
var url = oreq.request("http://services.odata.org/Northwind/Northwind.svc/Customers").withOrderby(["Country","City"]).url();

console.log(url); 
// output: http://services.odata.org/Northwind/Northwind.svc/Customers?$orderby=Country%2CCity
```

**Projecting**:

```javascript
var url = oreq.request("http://services.odata.org/Northwind/Northwind.svc/Customers").withOrderby(["CustomerID","CompanyName","City"]).url();

console.log(url); 
// output: http://services.odata.org/Northwind/Northwind.svc/Customers?$select=CustomerID%2CCompanyName%2CCity
```

**Filtering**:

```javascript
var filter = oreq.filter("ShipPostalCode").endsWith("'100'");
var url = oreq.request("http://services.odata.org/Northwind/Northwind.svc/Orders").withFilter(filter).url();

console.log(url); 
// output: http://services.odata.org/Northwind/Northwind.svc/Orders?$filter=endswith%28ShipPostalCode%2C%27100%27%29
```

## Getting Started

<!--**NodeJs**:

Install the oreq packge:
```
$ npm install oreq
```

Usage:
```javascript
var oreq = require("oreq");
var url = oreq.request("http://localhost:3000/Products").withSkip(1).withTop(10).url();
console.log(url);
```
-->
**Browser**:

Include oreq.js:
```html
<script type="text/javascript" src="https://rawgithub.com/j3ko/oreq/master/src/oreq.js"></script>
```

Usage:
```javascript
var url = oreq.request("http://localhost:3000/Products").withSkip(1).withTop(10).url();

console.log(url);
// output: http://localhost:3000/Products?$top=10&$skip=1
```

## Documentation

### oreq Functions:

| Function | Description |
| -------- | ----------- |
| `request(root)` | Begin an OData [request](#request-functions).  `root` is the string root of the query eg. `"http://localhost:3000/Products"`.  When `root` is `undefined`, the given request will return just the parmeter portion of the query when `url()` is called: eg. `?$skip=1&top=10`.|
| `filter(field)` | Begin an OData [filter](#filter-functions).  `field` is a string representing the property in the given OData entity to be filtered on.|

### request Functions:

| Function | Description |
| -------- | ----------- |
| `withExpand(value)` | OData `$expand`.  `value` is comma seperated string or array. |
| `withFormat(value)` | OData `$format`.  `value` is a string.  One of `"atom"`, `"json"` or `"xml"`. |
| `withOrderby(value)` | OData `$orderby`.  `value` is a comma seperated string or array. |
| `withTop(value)` | OData `$top`.  `value` is a string or number. |
| `withSkip(value)` | OData `$skip`.  `value` is a string or number. |
| `withSelect(value)` | OData `$select`.  `value` is comma seperated string or array. |
| `withInlinecount()` | OData `$inlinecount`.  Adds `inlinecount=allpages` to the request.|
| `withFilter(value)` | OData `$filter`.  `value` is a filter created from `oreq.filter()`. |

### filter Functions:

There are 3 types of filter expression types:  [Primitive](#primitive-expression), Common and Boolean.

##### Primitive Expression

| Function | Description |
| -------- | ----------- |
| `year()` | Evaluate the `year()` of the Date type entity property. <br /> Example: `oreq.filter("UpdatedDate").year();`. |
| `month()` | Evaluate the `month()` of the Date type entity property.  <br /> Example: `oreq.filter("UpdatedDate").month();`. |
| `day()` | Evaluate the `day()` of the Date type entity property. <br /> Example: `oreq.filter("UpdatedDate").day();`. |
| `hour()` | Evaluate the `hour()` of the Date type entity property. <br /> Example: `oreq.filter("UpdatedDate").hour();`. |
| `minute()` | Evaluate the `minute()` of the Date type entity property.  <br /> Example: `oreq.filter("UpdatedDate").minute();`. |
| `second()` | Evaluate the `second()` of the Date type entity property. <br /> Example: `oreq.filter("UpdatedDate").second();`. |
| `any([lambda])` | Evaluate `any()` of the given lambda filter. <br /> Example: `oreq.filter("Country").any(oreq.filter().eq("Canada"));`. |
| `all([lambda])` | Evaluate `all()` of the given lambda filter. <br /> Example: `oreq.filter("Country").all(oreq.filter().eq("Canada"));`. |

## License
oreq.js is freely distributable under the terms of the MIT license.
