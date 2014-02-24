# oreq #

Fluent OData API for Javascript

## Basic Usage ##

**Paging**:

```javascript
var url = oreq.request('http://localhost:3000').withSkip(1).withTop(10).url();
```
