describe('oreq', function() {
	describe('request()', function() {
		describe('when request is empty', function() {
			var request;
			
			beforeEach(function() {
				request = oreq.request();
			});
			
			it('should return an empty string', function() {
				expect(request.url()).toEqual('');
			});
			
			describe('when withTop is 1', function() {
				it('should only return "$top=1"', function() {
					request.withTop(1);
					expect(request.url()).toEqual('$top=1');
				});
			});
			
		});

		describe('when request is "http://localhost:3000"', function() {
			var request;
			
			beforeEach(function() {
				request = oreq.request('http://localhost:3000');
			});
			
			it('should return "http://localhost:3000"', function() {
				expect(request.url()).toEqual('http://localhost:3000');
			});
			
			describe('when withTop is 1', function() {
				it('should return the "http://localhost:3000?$top=1"', function() {
					request.withTop(1);
					expect(request.url()).toEqual('http://localhost:3000?$top=1');
				});
			});
		});
	}); // request
	
	describe('withTop()', function() {
		var request;
		
		beforeEach(function() {
			request = oreq.request();
		});
	
		describe('when withTop is undefined', function() {
			beforeEach(function() {
				request.withTop();
			});
		
			it('should return ""', function() {
				expect(request.url()).toEqual('');
			});
		});
		
		describe('when withTop is null', function() {
			beforeEach(function() {
				request.withTop(null);
			});
		
			it('should return "null"', function() {
				expect(request.url()).toEqual('$top=null');
			});
		});
		
		describe('when withTop is 0', function() {
			beforeEach(function() {
				request.withTop(0);
			});
		
			it('should return "$top=0"', function() {
				expect(request.url()).toEqual('$top=0');
			});
		});
		
		describe('when withTop is "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._"', function() {
			beforeEach(function() {
				request.withTop('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._');
			});
			
			it('should return "$top=ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._"', function() {
				expect(request.url()).toEqual('$top=ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._');
			});
		});
		
		describe('when withTop is "#%&*{}\:<>? "', function() {
			beforeEach(function() {
				request.withTop('#%&*{}\:<>? ');
			});
			
			it('should return "$top=%23%25%26*%7B%7D%3A%3C%3E%3F%20"', function() {
				expect(request.url()).toEqual('$top=%23%25%26*%7B%7D%3A%3C%3E%3F%20');
			});
		});
	}); // top
	
	describe('withSkip()', function() {
		var request;
		
		beforeEach(function() {
			request = oreq.request();
		});
	
		describe('when withSkip is undefined', function() {
			beforeEach(function() {
				request.withSkip();
			});
		
			it('should return ""', function() {
				expect(request.url()).toEqual('');
			});
		});
		
		describe('when withSkip is null', function() {
			beforeEach(function() {
				request.withSkip(null);
			});
		
			it('should return "null"', function() {
				expect(request.url()).toEqual('$skip=null');
			});
		});
		
		describe('when withSkip is 0', function() {
			beforeEach(function() {
				request.withSkip(0);
			});
		
			it('should return "$skip=0"', function() {
				expect(request.url()).toEqual('$skip=0');
			});
		});
		
		describe('when withSkip is "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._"', function() {
			beforeEach(function() {
				request.withSkip('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._');
			});
			
			it('should return "$skip=ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._"', function() {
				expect(request.url()).toEqual('$skip=ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._');
			});
		});
		
		describe('when withSkip is "#%&*{}\:<>? "', function() {
			beforeEach(function() {
				request.withSkip('#%&*{}\:<>? ');
			});
			
			it('should return "$skip=%23%25%26*%7B%7D%3A%3C%3E%3F%20"', function() {
				expect(request.url()).toEqual('$skip=%23%25%26*%7B%7D%3A%3C%3E%3F%20');
			});
		});
	}); // skip
	
	describe('withFormat()', function() {
		var request;
		
		beforeEach(function() {
			request = oreq.request();
		});
	
		describe('when withFormat is undefined', function() {
			beforeEach(function() {
				request.withFormat();
			});
		
			it('should return ""', function() {
				expect(request.url()).toEqual('');
			});
		});
		
		describe('when withFormat is null', function() {
			beforeEach(function() {
				request.withFormat(null);
			});
		
			it('should return "null"', function() {
				expect(request.url()).toEqual('$format=null');
			});
		});
		
		describe('when withFormat is 0', function() {
			beforeEach(function() {
				request.withFormat(0);
			});
		
			it('should return "$format=0"', function() {
				expect(request.url()).toEqual('$format=0');
			});
		});
		
		describe('when withFormat is "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._"', function() {
			beforeEach(function() {
				request.withFormat('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._');
			});
			
			it('should return "$format=ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._"', function() {
				expect(request.url()).toEqual('$format=ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._');
			});
		});
		
		describe('when withFormat is "#%&*{}\:<>? "', function() {
			beforeEach(function() {
				request.withFormat('#%&*{}\:<>? ');
			});
			
			it('should return "$format=%23%25%26*%7B%7D%3A%3C%3E%3F%20"', function() {
				expect(request.url()).toEqual('$format=%23%25%26*%7B%7D%3A%3C%3E%3F%20');
			});
		});
		
	}); // format	
	
	describe('withExpand()', function() {
		var request;
		
		beforeEach(function() {
			request = oreq.request();
		});
	
		describe('when withExpand is undefined', function() {
			beforeEach(function() {
				request.withExpand();
			});
		
			it('should return ""', function() {
				expect(request.url()).toEqual('');
			});
		});
		
		describe('when withExpand is null', function() {
			beforeEach(function() {
				request.withExpand(null);
			});
		
			it('should return "null"', function() {
				expect(request.url()).toEqual('$expand=null');
			});
		});
		
		describe('when withExpand is 0', function() {
			beforeEach(function() {
				request.withExpand(0);
			});
		
			it('should return "$expand=0"', function() {
				expect(request.url()).toEqual('$expand=0');
			});
		});
		
		describe('when withExpand is "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._"', function() {
			beforeEach(function() {
				request.withExpand('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._');
			});
			
			it('should return "$expand=ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._"', function() {
				expect(request.url()).toEqual('$expand=ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._');
			});
		});
		
		describe('when withExpand is "#%&*{}\:<>? "', function() {
			beforeEach(function() {
				request.withExpand('#%&*{}\:<>? ');
			});
			
			it('should return "$expand=%23%25%26*%7B%7D%3A%3C%3E%3F%20"', function() {
				expect(request.url()).toEqual('$expand=%23%25%26*%7B%7D%3A%3C%3E%3F%20');
			});
		});

		describe('when withExpand is []', function() {
			beforeEach(function() {
				request.withExpand([]);
			});
			
			it('should return ""', function() {
				expect(request.url()).toEqual('');
			});
		});

		describe('when withExpand is [\'Product\', \'Customer\']', function() {
			beforeEach(function() {
				request.withExpand(['Product', 'Customer']);
			});
			
			it('should return "$expand=Product%2CCustomer"', function() {
				expect(request.url()).toEqual('$expand=Product%2CCustomer');
			});
		});
		
	}); // expand	
	
	describe('withSelect()', function() {
		var request;
		
		beforeEach(function() {
			request = oreq.request();
		});
	
		describe('when withSelect is undefined', function() {
			beforeEach(function() {
				request.withSelect();
			});
		
			it('should return ""', function() {
				expect(request.url()).toEqual('');
			});
		});
		
		describe('when withSelect is null', function() {
			beforeEach(function() {
				request.withSelect(null);
			});
		
			it('should return "null"', function() {
				expect(request.url()).toEqual('$select=null');
			});
		});
		
		describe('when withSelect is 0', function() {
			beforeEach(function() {
				request.withSelect(0);
			});
		
			it('should return "$select=0"', function() {
				expect(request.url()).toEqual('$select=0');
			});
		});
		
		describe('when withSelect is "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._"', function() {
			beforeEach(function() {
				request.withSelect('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._');
			});
			
			it('should return "$select=ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._"', function() {
				expect(request.url()).toEqual('$select=ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._');
			});
		});
		
		describe('when withSelect is "#%&*{}\:<>? "', function() {
			beforeEach(function() {
				request.withSelect('#%&*{}\:<>? ');
			});
			
			it('should return "$select=%23%25%26*%7B%7D%3A%3C%3E%3F%20"', function() {
				expect(request.url()).toEqual('$select=%23%25%26*%7B%7D%3A%3C%3E%3F%20');
			});
		});

		describe('when withSelect is []', function() {
			beforeEach(function() {
				request.withSelect([]);
			});
			
			it('should return ""', function() {
				expect(request.url()).toEqual('');
			});
		});

		describe('when withSelect is [\'TitleId\', \'TitleName\']', function() {
			beforeEach(function() {
				request.withSelect(['TitleId', 'TitleName']);
			});
			
			it('should return "$select=TitleId%2CTitleName"', function() {
				expect(request.url()).toEqual('$select=TitleId%2CTitleName');
			});
		});
		
	}); // select
	
	describe('withInlineCount()', function() {
		var request;
		
		beforeEach(function() {
			request = oreq.request();
		});
	
		describe('when withInlineCount is called', function() {
			beforeEach(function() {
				request.withInlineCount();
			});
		
			it('should return "$inlinecount=allpages"', function() {
				expect(request.url()).toEqual('$inlinecount=allpages');
			});
		});
		
	}); // inlinecount
	
	describe('withFilter()', function() {
		var request;

		beforeEach(function() {
			request = oreq.request();
		});
		
		describe('when withFilter is a String', function() {
		
			describe('when withFilter is undefined', function() {
				beforeEach(function() {
					request.withFilter();
				});
			
				it('should return ""', function() {
					expect(request.url()).toEqual('');
				});
			});
				

			describe('when withFilter is null', function() {
				beforeEach(function() {
					request.withFilter(null);
				});
			
				it('should return "null"', function() {
					expect(request.url()).toEqual('$filter=null');
				});
			});
			
			describe('when withFilter is 0', function() {
				beforeEach(function() {
					request.withFilter(0);
				});
			
				it('should return "$filter=0"', function() {
					expect(request.url()).toEqual('$filter=0');
				});
			});
			
			describe('when withFilter is "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._"', function() {
				beforeEach(function() {
					request.withFilter('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._');
				});
				
				it('should return "$filter=ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._"', function() {
					expect(request.url()).toEqual('$filter=ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._');
				});
			});
			
			describe('when withFilter is "#%&*{}\:<>? "', function() {
				beforeEach(function() {
					request.withFilter('#%&*{}\:<>? ');
				});
				
				it('should return "$filter=%23%25%26*%7B%7D%3A%3C%3E%3F%20"', function() {
					expect(request.url()).toEqual('$filter=%23%25%26*%7B%7D%3A%3C%3E%3F%20');
				});
			});
		}); // filter string

		
		describe('when withFilter is a filter', function() {
		
			describe('when withFilter is simple and encoded', function() {
				
				it('should return "$filter=Genres%20eq%202%20or%20Genres%20eq%206"', function() {
					var url = request
							.withFilter(oreq
								.filter('Genres').eq(2).or().filter('Genres').eq(6))
							.url();
					
					expect(url).toEqual('$filter=Genres%20eq%202%20or%20Genres%20eq%206');
				});
			});

			describe('when withFilter is complex and encoded', function() {
				it('should return "$filter=Genres/any%28x%3A%20x%20eq%202%20or%20x%20eq%206%29%20or%20Released/any%28x%3A%20x%20eq%201990%20or%20x%20eq%201999%29%20or%20substringof%28%22Be%20Cool%22%2CTitleName%29"', function() {
					var url = request
							.withFilter(oreq
								.filter('Genres')
								.any(oreq.filter().eq(2).or().filter().eq(6))
								.or()
								.filter('Released')
								.any(oreq.filter().eq(1990).or().filter().eq(1999))
								.or()
								.filter('"Be Cool"')
								.substringOf('TitleName'))
							.url();
					
					expect(url).toEqual('$filter=Genres/any%28x%3A%20x%20eq%202%20or%20x%20eq%206%29%20or%20Released/any%28x%3A%20x%20eq%201990%20or%20x%20eq%201999%29%20or%20substringof%28%22Be%20Cool%22%2CTitleName%29');
				});
			});
			
			describe('when withFilter is complex and contains unary', function() {
				it('should return "$filter=Genres/any(x: x eq 2 or x eq 6) or Released/any(x: year(x) eq 1990 or year(x) eq 1999) or substringof(\"Be Cool\",TitleName)"', function() {
					var url = request
							.withFilter(oreq
								.filter('Genres')
								.any(oreq.filter().eq(2).or().filter().eq(6))
								.or()
								.filter('Released')
								.any(oreq.filter().year().eq(1990).or().filter().year().eq(1999))
								.or()
								.filter('"Be Cool"')
								.substringOf('TitleName'))
							.url(true);
					
					expect(url).toEqual('$filter=Genres/any(x: x eq 2 or x eq 6) or Released/any(x: year(x) eq 1990 or year(x) eq 1999) or substringof(\"Be Cool\",TitleName)');
				});
			});
			
		});
		
	}); // filter
	
	
	describe('filterMixin()', function() {
		var request;

		beforeEach(function() {
			request = oreq.request();
		});
	
		describe('when filter(\'Genres\').anyOr() is [1,2]', function() {
			it('should return "$filter=Genres/any(x: x eq 1 or x eq 2)"', function() {
		
				var url = request
						.withFilter(oreq.filter('Genres').anyOr([1,2]))
						.url(true);
				
				expect(url).toEqual('$filter=Genres/any(x: x eq 1 or x eq 2)');
			});
		});
		
		describe('when filter(\'Released\').eqOr() is [1990,1991]', function() {
			it('should return "$filter=Released eq 1990 or Released eq 1991"', function() {
		
				var url = request
						.withFilter(oreq.filter('Released').eqOr([1990,1991]))
						.url(true);
				
				expect(url).toEqual('$filter=Released eq 1990 or Released eq 1991');
			});
		});
		
		describe('when filter(\'Released\').yearEqOr() is [1990,1991]', function() {
			it('should return "$filter=year(Released) eq 1990 or year(Released) eq 1991"', function() {
		
				var url = request
						.withFilter(oreq.filter('Released').yearEqOr([1990,1991]))
						.url(true);
				
				expect(url).toEqual('$filter=year(Released) eq 1990 or year(Released) eq 1991');
			});
		});
	}); // filterMixin
	
	describe('Verify Documentation', function() {
	
		describe('when paging', function() {
			it('should return "http://services.odata.org/Northwind/Northwind.svc/Customers?$top=10&$skip=10"', function() {
		
				var url = oreq.request('http://services.odata.org/Northwind/Northwind.svc/Customers').withSkip(10).withTop(10).url();
				
				expect(url).toEqual('http://services.odata.org/Northwind/Northwind.svc/Customers?$top=10&$skip=10');
			});
		});
		
		describe('when sorting', function() {
			it('should return "http://services.odata.org/Northwind/Northwind.svc/Customers?$orderby=Country%2CCity"', function() {
		
				var url = oreq.request('http://services.odata.org/Northwind/Northwind.svc/Customers').withOrderby(['Country','City']).url()
				
				expect(url).toEqual('http://services.odata.org/Northwind/Northwind.svc/Customers?$orderby=Country%2CCity');
			});
		});
		
		describe('when projecting', function() {
			it('should return "http://services.odata.org/Northwind/Northwind.svc/Customers?$select=CustomerID%2CCompanyName%2CCity"', function() {
		
				var url = oreq.request('http://services.odata.org/Northwind/Northwind.svc/Customers').withSelect(['CustomerID','CompanyName','City']).url();
				
				expect(url).toEqual('http://services.odata.org/Northwind/Northwind.svc/Customers?$select=CustomerID%2CCompanyName%2CCity');
			});
		});
		
		describe('when filtering', function() {
			it('should return "http://services.odata.org/Northwind/Northwind.svc/Orders?$filter=endswith%28ShipPostalCode%2C%27100%27%29"', function() {
		
				var filter = oreq.filter('ShipPostalCode').endsWith("'100'");
				var url = oreq.request('http://services.odata.org/Northwind/Northwind.svc/Orders').withFilter(filter).url();
				
				expect(url).toEqual('http://services.odata.org/Northwind/Northwind.svc/Orders?$filter=endswith%28ShipPostalCode%2C%27100%27%29');
			});
		});
		
		describe('when browser getting started', function() {
			it('should return "http://localhost:3000/Products?$top=10&$skip=1"', function() {
		
				var url = oreq.request("http://localhost:3000/Products").withSkip(1).withTop(10).url();
				
				expect(url).toEqual('http://localhost:3000/Products?$top=10&$skip=1');
			});
		});
	});
});
