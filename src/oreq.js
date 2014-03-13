(function(exports){

	Array.prototype.peek = function () {
		return this[this.length - 1];
	};
	var extendObj = function(childObj, parentObj) {
		var tmpObj = function () {};
		tmpObj.prototype = parentObj.prototype;
		childObj.prototype = new tmpObj();
		childObj.prototype.constructor = childObj;
	};
	var extendProto = function(destination, source) {
		for (var k in source) {
			if (source.hasOwnProperty(k)) {
				destination.prototype[k] = source[k];
			}
		}
		return destination; 
	};
	exports.request = function(root){
		return new Request(root);
	};
	exports.filter = function(value, type) {
		return new PrimitiveExpression([], value, type);
	};
	var _precedenceMap = {
		'(': 1
	};
	function _isArray(obj) {
		return obj instanceof Array;
	}
	function _isNumber(obj) {
		return Object.prototype.toString.call(obj) == '[object Number]';
	}
	function _isString(obj) {
		return Object.prototype.toString.call(obj) == '[object String]';
	}
	function _isUndefined(obj) {
		return typeof obj === 'undefined';
	}
	function _isExpression(obj, type) {
		if (_isUndefined(type))
			return obj instanceof Expression;
		else
			return obj instanceof type;
	}
	function _isOperator(obj) {
		return obj instanceof Operator;
	}
	function _isOperand(obj) {
		return obj instanceof Operand;
	}
	function _precedenceOf(c) {
		if (_isOperand(c))
			return 99;
		if (_isString(c))
			return _precedenceMap[c] || 50;
		return _precedenceMap[c.value] || 50;
	}
	function _infixToPostfix(infix) {
	 
		var output = [];
		var stack = [];

		for (var k = 0; k < infix.length;  k++) {

			// current char
			var c = infix[k];

			/*******************************/
			// console.log('stack: ' + stack.join(', '));			
			// console.log('output: ' + output.join(' '));
			// console.log('/*******************************/');
			/*******************************/

			if (c == '(') {
				stack.push(c);
			}
			else if (c == ')') {
				while (stack.peek() != '(' && !_isUndefined(stack.peek())) {
					output.push(stack.pop());
				}
				stack.pop(); // pop '('
			}

			// else work with the stack
			else {
				while (stack.length) {
					var peekedChar = stack.peek();

					var peekedCharPrecedence = _precedenceOf(peekedChar);
					var currentCharPrecedence = _precedenceOf(c);

					if (peekedCharPrecedence >= currentCharPrecedence) {
						output.push(stack.pop());
					} else {
						break;
					}
				}
				stack.push(c);
			}

		} // end for loop

		while (stack.length)
		output.push(stack.pop());

		return output;
	 
	}
	function _evalPostfix(postfix) {
		if (!postfix || !postfix.length)
			return;
			
		var result = postfix.join(' ');
		console.log(result);
		
		var stack = [];
	
		while(postfix.length) {
			/*******************************/
			// console.log('postfix: ' + postfix.join(', '));
			// console.log('stack: ' + stack.join(', '));			
			// console.log('/*******************************/');
			/*******************************/
			var cur = postfix.shift();
			if (cur instanceof UnaryOperator) {
				var una = stack.pop();
				var unval = _evalUnaryOpr(cur, una);
				stack.push(new Operand(unval));
			}
			else if (cur instanceof Operator) {
				var bina = stack.pop();
				var b = stack.pop();
				var binval = _evalBinaryOpr(cur, b, bina);
				stack.push(new Operand(binval));
			}
			else {
				stack.push(cur);
			}
		}
		
		return stack.pop().value;
	}
	function _evalBinaryOpr(op, a, b) {
		if (op.value == 'any' || op.value == 'all') {
			return a.value + '/' + op.value + '(x: ' + b.value + ')';
		}
		else if (op.value == 'substringof' || op.value == 'endswith' || op.value == 'startswith') {
			return op.value + '(' + a.value + ',' + b.value + ')';
		}
		else {
			return [a.value, op.value, b.value].join(' ');
		}
	}
	function _evalUnaryOpr(op, a) {
		if (op.value == 'year') {
			return op.value + '(' + a.value + ')';
		}
	}	
	function _toUrl(req, decoded) {
		var result = req.root;
		var params = [];
		
		var fn = !decoded ? escape : function(val) { return val; };
		
		if (!_isUndefined(req.expand))
			params.push('$expand=' + fn(req.expand));
		if (!_isUndefined(req.format))
			params.push('$format=' + fn(req.format));
		if (!_isUndefined(req.filter))
			params.push('$filter=' + fn(req.filter));
		if (!_isUndefined(req.orderby))
			params.push('$orderby=' + fn(req.orderby));
		if (!_isUndefined(req.top))
			params.push('$top=' + fn(req.top));
		if (!_isUndefined(req.skip))
			params.push('$skip=' + fn(req.skip));
		if (!_isUndefined(req.select))
			params.push('$select=' + fn(req.select));
		if (!_isUndefined(req.inlinecount))
			params.push('$inlinecount=' + fn(req.inlinecount));
		
		
		var p = params.join('&');

		result = result || '';

		if (result && p) {
			result += '?';
		}
		if (p) {
			result += p;
		}
		return result;
	}
	
	/**
	 *
	 * REQUEST
	 *
	 */
	var Request = function (root) {
		this.req = { root: root	};
		return this;
	};
	Request.prototype = {
		withExpand: function(val) {
			if (_isArray(val) && val.length > 0) {
				this.req.expand = val.join(',');
			}
			else if (!_isArray(val)) {
				this.req.expand = val;
			}
			return this;
		},
		withOrderby: function(val) {
			if (_isArray(val) && val.length > 0) {
				this.req.orderby = val.join(',');
			}
			else if (!_isArray(val)) {
				this.req.orderby = val;
			}
			return this;
		},
		withFormat: function(val) {
			this.req.format = val;
			return this;
		},
		withSkip: function(val) {
			this.req.skip = val;
			return this;
		},
		withTop: function(val) {
			this.req.top = val;
			return this;
		},
		withFilter: function(val) {
			if (_isExpression(val, BoolCommonExpression)) {			
				this.req.filter = val.evalInfix();
			}
			else if (val === null || _isUndefined(val) || _isString(val) || _isNumber(val)){
				this.req.filter = val;
			}
			else {
				throw new Error('Invalid filter expression');
			}
			return this;
		},
		withInlineCount: function() {
			this.req.inlinecount = 'allpages';
			return this;
		},
		withSelect: function(val) {
			if (_isArray(val) && val.length > 0) {
				this.req.select = val.join(',');
			}
			else if (!_isArray(val)) {
				this.req.select = val;
			}
			return this;
		},
		url: function(decoded) {
			return _toUrl(this.req, decoded);
		}
	};

	var Operand = function(value) {
		this.value = value;
	};
	Operand.prototype.toString = function() {
		return "opd:" + this.value;
	};
	var Operator = function(value) {
		this.value = value;
	};
	Operator.prototype.toString = function() {
		return "opr:" + this.value;
	};
	var UnaryOperator = function(value) {
		Operator.call(this, value);
	};
	UnaryOperator.prototype.toString = function() {
		return "uopr:" + this.value;
	};
	extendObj(UnaryOperator, Operator);
	/**
	 *
	 * EXPRESSION
	 *
	 */
	var Expression = function(infix) {
		this.infix = infix;
		this.field = this;
	};
	Expression.prototype.addOperand = function(value) {
		this.infix.push(new Operand(value));
	};
	Expression.prototype.addOperator = function(value) {
		this.infix.push(new Operator(value));
	};
	Expression.prototype.addUnaryOperator = function(value) {
		this.infix.push(new UnaryOperator(value));
	};
	Expression.prototype.addInternal = function(value) {
		this.infix.push(value);
	};
	Expression.prototype.addLambda = function(lambda) {
		this.infix.push('(');
		if (_isArray(lambda)) {
			for (var i=0; i<lambda.length; i++) {
				if (_isOperand(lambda[i])) {
					if (_isUndefined(lambda[i].value)) {
						lambda[i].value = 'x';
					}
					else if (_isString(lambda[i].value) && lambda[i].value.indexOf('/') === 0) {
						lambda[i].value = 'x' + lambda[i].value;
					}
				}
			}
		}
		this.infix = this.infix.concat(lambda);
		this.infix.push(')');
	};
	Expression.prototype.evalInfix = function() {
		// eval this.infix;
		var paren = 0;
		for (var i = 0; i < this.infix.length; i++) {
			if (this.infix[i] == '(' || this.infix[i] == ')')
				paren++;				
		}
		if (paren % 2 !== 0)	this.addInternal(')');
		
		var instring = this.infix.join(' ');
		console.log(instring);
		var post = _infixToPostfix(this.infix);
		var poststring = _evalPostfix(post);
		console.log(poststring);
		return poststring;
	};

	// commonExpression = [WSP] (boolCommonExpression / methodCallExpression /
							// parenExpression / literalExpression / addExpression /
							// subExpression / mulExpression / divExpression /
							// modExpression / negateExpression / memberExpression
							// / firstMemberExpression / castExpression / functionCallExpression ) [WSP]
	var CommonExpression = function(infix) { 
		Expression.call(this, infix);
	};
	extendObj(CommonExpression, Expression);
	
	// eqExpression = commonExpression WSP "eq" WSP commonExpression
	CommonExpression.prototype.eq = function(value) {
		this.addOperator('eq');
		this.addOperand(value);
		return new BoolCommonExpression(this.infix);
	};
	// neExpression = commonExpression WSP "ne" WSP commonExpression
	CommonExpression.prototype.ne = function(value) {
		this.addOperator('ne');
		this.addOperand(value);
		return new BoolCommonExpression(this.infix);
	};
	// gtExpression = commonExpression WSP "gt" WSP commonExpression
	CommonExpression.prototype.gt = function(value) {
		this.addOperator('gt');
		this.addOperand(value);
		return new BoolCommonExpression(this.infix);
	};
	// geExpression = commonExpression WSP "ge" WSP commonExpression
	CommonExpression.prototype.ge = function(value) {
		this.addOperator('ge');
		this.addOperand(value);
		return new BoolCommonExpression(this.infix);
	};
	// ltExpression = commonExpression WSP "lt" WSP commonExpression
	CommonExpression.prototype.lt = function(value) {
		this.addOperator('lt');
		this.addOperand(value);
		return new BoolCommonExpression(this.infix);
	};
	// leExpression = commonExpression WSP "le" WSP commonExpression
	CommonExpression.prototype.le = function(value) {
		this.addOperator('le');
		this.addOperand(value);
		return new BoolCommonExpression(this.infix);
	};
	// // notExpression = "not" WSP commonExpression
	CommonExpression.prototype.not = function(value) {
		this.addOperator('not');
		this.addOperand(value);
		return new BoolCommonExpression(this.infix);
	};
	// // addExpression = commonExpression WSP "add" WSP commonExpression
	CommonExpression.prototype.add = function(value) {
		this.addOperator('add');
		this.addOperand(value);
		return new CommonExpression(this.infix);
	};
	// // subExpression = commonExpression WSP "sub" WSP commonExpression
	CommonExpression.prototype.sub = function(value) {
		this.addOperator('sub');
		this.addOperand(value);
		return new CommonExpression(this.infix);
	};
	// // mulExpression = commonExpression WSP "mul" WSP commonExpression
	CommonExpression.prototype.mul = function(value) {
		this.addOperator('mul');
		this.addOperand(value);
		return new CommonExpression(this.infix);
	};
	// // divExpression = commonExpression WSP "div" WSP commonExpression
	CommonExpression.prototype.div = function(value) {
		this.addOperator('div');
		this.addOperand(value);
		return new CommonExpression(this.infix);
	};
	// // modExpression = commonExpression WSP "mod" WSP commonExpression
	CommonExpression.prototype.mod = function(value) {
		this.addOperator('mod');
		this.addOperand(value);
		return new CommonExpression(this.infix);
	};
	// boolCommonExpression = [WSP] (boolLiteralExpression / andExpression /
							// orExpression /
							// boolPrimitiveMemberExpression / eqExpression / neExpression /
							// ltExpression / leExpression / gtExpression /
							// geExpression / notExpression / isofExpression/
							// boolCastExpression / boolMethodCallExpression /
							// firstBoolPrimitiveMemberExpression / boolParenExpression /
							// boolFunctionCallExpression) [WSP]
							// parenExpression = "(" [WSP] commonExpression [WSP] ")"
							// boolParenExpression = "(" [WSP] boolCommonExpression [WSP] ")"
							// negateExpression = "-" [WSP] commonExpression
							// isofExpression = "isof" [WSP] "("[[WSP] commonExpression [WSP] ","][WSP]
							// stringUriLiteral [WSP] ")"
	var BoolCommonExpression = function(infix) { 
		Expression.call(this, infix);	
	};
	extendObj(BoolCommonExpression, CommonExpression);

	BoolCommonExpression.prototype.filter = function(value, type) {
		return new PrimitiveExpression(this.infix, value, type);
	};
	// andExpression = boolCommonExpression WSP "and" WSP boolCommonExpression
	BoolCommonExpression.prototype.and = function(value) {
		this.addInternal(')');
		this.addOperator('and');
		return new BoolCommonExpression(this.infix);
	};
	// orExpression = boolCommonExpression WSP "or" WSP boolCommonExpression
	BoolCommonExpression.prototype.or = function(value) {
		this.addInternal(')');
		this.addOperator('or');
		return new BoolCommonExpression(this.infix);
	};
	
	
	// castExpression = "cast" [WSP] "("[[WSP] commonExpression [WSP] ","][WSP]
						// stringUriLiteral [WSP] ")"
	// boolCastExpression = "cast" [WSP]
						// "("[[WSP] commonExpression [WSP] ","][WSP]
						// "Edm.Boolean" [WSP] ")"
	// firstMemberExpression = [WSP] [namespaceQualifiedEnitityType "/"]
						// [lambdaPredicatePrefixExpression]
						// ; A lambdaPredicatePrefixExpression is only defined inside a
						// ; lambdaPredicateExpression. A lambdaPredicateExpression is required
						// ; inside a lambdaPredicateExpression.
						// entityNavProperty /
						// ; section 2.2.3.1
						// entityComplexProperty /
						// ; section 2.2.3.1
						// entitySimpleProperty /
						// ; section 2.2.3.1
						// entityCollectionProperty
						// ; section 2.2.3.1
	// firstBoolPrimitiveMemberExpression = [namespaceQualifiedEntityType "/"]entityProperty
						// ; section 2.2.3.1
	// memberExpression = commonExpression [WSP] "/" [WSP] [namespaceQualifiedEntityType "/"]
						// entityNavProperty / ; section 2.2.3.1
						// entityComplexProperty / ; section 2.2.3.1
						// entitySimpleProperty / ; section 2.2.3.1
						// entityCollectionProperty ; section 2.2.3.1
	// boolPrimitiveMemberExpression = commonExpression [WSP] "/" [WSP]
						// [namespaceQualifiedEntityType "/"]entityProperty
						// ; section 2.2.3.1
	// literalExpression = stringUriLiteral ; section 2.2.2
						// / dateTimeUriLiteral ; section 2.2.2
						// / dateTimeOffsetUriLiteral ; section 2.2.2
						// / timeUriLiteral ; section 2.2.2
						// / decimalLiteral ; section 2.2.2
						// / guidUriLiteral ; section 2.2.2
						// / singleLiteral ; section 2.2.2
						// / doubleLiteral ; section 2.2.2
						// / int16Literal ; section 2.2.2
						// / int32Literal ; section 2.2.2
						// / int64Literal ; section 2.2.2
						// / binaryLiteral ; section 2.2.2
						// / nullLiteral ; section 2.2.2
						// / byteLiteral ; section 2.2.2
						// / fullPointLiteral ; section 2.2.2
						// / fullLineStringLiteral ; section 2.2.2
						// / fullPolygonLiteral ; section 2.2.2
						// / fullGeoCollectionLiteral ; section 2.2.2
						// / fullMultiPointLiteral ; section 2.2.2
						// / fullMultiLineStringLiteral ; section 2.2.2
						// / fullMultiGeographyLiteral ; section 2.2.2
	// boolLiteralExpression = boolLiteral ; section 2.2.2
	// methodCallExpression = boolMethodExpression
						// / indexOfMethodCallExpression
						// / replaceMethodCallExpression
						// / toLowerMethodCallExpression
						// / toUpperMethodCallExpression
						// / trimMethodCallExpression
						// / substringMethodCallExpression
						// / concatMethodCallExpression
						// / lengthMethodCallExpression
						// / yearMethodCallExpression
						// / monthMethodCallExpression
						// / dayMethodCallExpression
						// / hourMethodCallExpression
						// / minuteMethodCallExpression
						// / secondMethodCallExpression
						// / roundMethodCallExpression
						// / floorMethodCallExpression
						// / ceilingMethodCallExpression
						// / distanceMethodCallExpression
						// / geoLengthMethodCallExpression
	// boolMethodExpression = endsWithMethodCallExpression
						// / startsWithMethodCallExpression
						// / substringOfMethodCallExpression
						// / intersectsMethodCallExpression
						// / anyMethodCallExpression
						// / allMethodCallExpression
	// convert value to string
	function PrimitiveExpression(infix, value, type) {
		this.value = value;
		Expression.call(this, infix);
		this.addInternal('(');
		this.addOperand(value);
	}
	extendObj(PrimitiveExpression, CommonExpression);

	// anyMethodCallExpression = pathExpression-collection "/"
		// "any"
		// "("
		// [ lambdaVariableExpression ":" lambdaPredicateExpression ]
		// ")"
	PrimitiveExpression.prototype.any = function(lambda) {
		// check if path expression?
		this.addOperator('any');
		this.addLambda(lambda.infix);
		this.addInternal(')');
		return new BoolCommonExpression(this.infix);
	};
	// allMethodCallExpression = pathExpression-collection "/"
		// "all"
		// "("
		// lambdaVariableExpression ":" lambdaPredicateExpression
		// ")"
	PrimitiveExpression.prototype.all = function(lambda) {
		// check if path expression?
		this.addOperator('all');
		this.addLambda(lambda);
		this.addInternal(')');
		return new BoolCommonExpression(this.infix);
	};
	// yearMethodCallExpression = "year" [WSP]
					// "(" [WSP] commonexpression [WSP] ")"
	PrimitiveExpression.prototype.year = function() {
		this.addUnaryOperator('year');
		return new CommonExpression(this.infix);
	};
	// monthMethodCallExpression = "month" [WSP]
						// "(" [WSP] commonexpression [WSP] ")"
	PrimitiveExpression.prototype.month = function() {
		this.addUnaryOperator('month');
		return new CommonExpression(this.infix);
	};
	// dayMethodCallExpression = "day" [WSP]
						// "(" [WSP] commonexpression [WSP] ")"
	PrimitiveExpression.prototype.day = function() {
		this.addUnaryOperator('day');
		return new CommonExpression(this.infix);
	};
	// hourMethodCallExpression = "hour" [WSP]
						// "(" [WSP] commonexpression [WSP] ")"
	PrimitiveExpression.prototype.hour = function() {
		this.addUnaryOperator('hour');
		return new CommonExpression(this.infix);
	};
	// minuteMethodCallExpression = "minute" [WSP]
						// "(" [WSP] commonexpression [WSP] ")"
	PrimitiveExpression.prototype.minute = function() {
		this.addUnaryOperator('minute');
		return new CommonExpression(this.infix);
	};
	// secondMethodCallExpression = "second" [WSP]
						// "(" [WSP] commonexpression [WSP] ")"
	PrimitiveExpression.prototype.second = function() {
		this.addUnaryOperator('second');
		return new CommonExpression(this.infix);
	};
	// substringOfMethodCallExpression = "substringof" [WSP]
					// "(" [WSP] commonexpression [WSP]
					// [ "," [WSP] commonexpression [WSP] ] ")"
	PrimitiveExpression.prototype.substringOf = function(value) {
		this.addOperator('substringof');
		this.addOperand(value);
		this.addInternal(')');
		return new BoolCommonExpression(this.infix);
	};
	// endsWithMethodCallExpression = "endswith" [WSP]
					// "(" [WSP] commonexpression [WSP]
					// "," [WSP] commonexpression [WSP] ")"
	PrimitiveExpression.prototype.endsWith = function(value) {
		this.addOperator('endswith');
		this.addOperand(value);
		this.addInternal(')');
		return new BoolCommonExpression(this.infix);
	};
	// startsWithMethodCallExpression = "startswith" [WSP]
						// "(" [WSP] commonexpression [WSP]
						// "," [WSP] commonexpression [WSP] ")"
	PrimitiveExpression.prototype.startsWith = function(value) {
		this.addOperator('startswith');
		this.addOperand(value);
		this.addInternal(')');
		return new BoolCommonExpression(this.infix);
	};
	// indexOfMethodCallExpression = "indexof" [WSP]
						// "(" [WSP] commonexpression [WSP]
						// "," [WSP] commonexpression [WSP] ")"
	PrimitiveExpression.prototype.indexOf = function(value) {
		this.addOperator('indexof');
		this.addOperand(value);
		this.addInternal(')');
		return new CommonExpression(this.infix);
	};
	
	exports.filterMixin = function(mixin) {
		extendProto(PrimitiveExpression, mixin);
	};

	exports.filterMixin({
		eqOr: function(arr) {
			var f = oreq;
			
			if (_isArray(arr)) {
				for (var i=0; i<arr.length; i++) {
					f = f.filter(this.value).eq(arr[i]);
					if (arr.length != (i+1)) f.or();
				}
			}
			else if (arr) {
				f = f.filter(this.value).eq(arr);
			}
			
			return f;
		},
		yearEqOr: function(arr) {
			var f = oreq;
			
			if (_isArray(arr)) {
				for (var i=0; i<arr.length; i++) {
					f = f.filter(this.value).year().eq(arr[i]);
					if (arr.length != (i+1)) f.or();
				}
			}
			else if (arr) {
				f = f.filter(this.value).year().eq(arr);
			}
			
			return f;
		},
		anyOr: function(arr, lambda) {
			var f = oreq;
			
			if (_isArray(arr)) {
				for (var i=0; i<arr.length; i++) {
					f = f.filter(lambda).eq(arr[i]);
					if (arr.length != (i+1)) f.or();
				}
			}
			else if (arr) {
				f = f.filter(lambda).eq(arr);
			}
			
			return this.any(f);
		},
		anyYearOr: function(arr, lambda) {
			var f = oreq;
			
			if (_isArray(arr)) {
				for (var i=0; i<arr.length; i++) {
					f = f.filter(lambda).year().eq(arr[i]);
					if (arr.length != (i+1)) f.or();
				}
			}
			else if (arr) {
				f = f.filter(lambda).year().eq(arr);
			}
			
			return this.any(f);
		}
	});

	
})(typeof exports === 'undefined' ? this.oreq = {} : exports);


	// replaceMethodCallExpression = "replace" [WSP]
						// "(" [WSP] commonexpression [WSP]
						// "," [WSP] commonexpression [WSP]
						// "," [WSP] commonexpression [WSP] ")"
	// toLowerMethodCallExpression = "tolower" [WSP]
						// "(" [WSP] commonexpression [WSP] ")"
	// toUpperMethodCallExpression = "toupper" [WSP]
						// "(" [WSP] commonexpression [WSP] ")"
	// trimMethodCallExpression = "trim" [WSP]
						// "(" [WSP] commonexpression [WSP] ")"
	// substringMethodCallExpression = "substring" [WSP]
						// "(" [WSP] commonexpression [WSP]
						// "," [WSP] commonexpression [WSP]
						// [ "," [WSP] commonexpression [WSP] ] ")"
	// concatMethodCallExpression = "concat" [WSP]
						// "(" [WSP] commonexpression [WSP]
						// [ "," [WSP] commonexpression [WSP] ] ")"
	// lengthMethodCallExpression = "length" [WSP]
						// "(" [WSP] commonexpression [WSP] ")"
	// getTotalOffsetMinutesMethodCallExpression = "gettotaloffsetminutes" [WSP]
						// "(" [WSP] commonexpression [WSP] ")"
	// roundMethodCallExpression = "round" [WSP]
						// "(" [WSP] commonexpression [WSP] ")"						
	// floorMethodCallExpression = "floor" [WSP]
						// "(" [WSP] commonexpression [WSP] ")"
	// ceilingMethodCallExpression = "ceiling" [WSP]
						// "(" [WSP] commonexpression [WSP] ")"
	// distanceMethodCallExpression = "geo.distance" [WSP]
						// "(" [WSP] commonexpression [WSP]
						// "," [WSP] commonexpression [WSP] ")"
	// geoLengthMethodCallExpression = "geo.length" [WSP]
						// "(" [WSP] commonexpression [WSP] ")"
	// intersectsMethodCallExpression = "geo.intersects" [WSP]
						// "(" [WSP] commonexpression [WSP]
						// "," [WSP] commonexpression [WSP] ")"
	// implicitVariableExpression = "$it"	
						// ; references the unnamed outer variable of the query
	// lambdaVariableExpression = *pchar
						// ; section 3.3 of [RFC3986]
						// ; a identifier/name that complies with EDM identifier rules
	// lambdaPredicatePrefixExpression = inscopeVariableExpression "/"
	// lambdaPredicateExpression = boolCommonExpression
						// ; this is a boolCommonExpression with the added restriction that any
						// ; firstMemberExpression expressions that are inside the methodPredicateExpression
						// ; MUST have a prefix of lambdaPredicatePrefixExpression.
	// inscopeVariableExpression = implicitVariableExpression | lambdaVariableExpression
						// ; the lambdaVariableExpression must be the name of a variable introduced by either the
						// ; current lambdaMethodCallExpression’s lambdaVariableExpression or via a wrapping
						// ; lambdaMethodCallExpression’s lambdaVariableExpression.
	// lambdaMethodCallExpression = anyMethodCallExpression | allMethodCallExpression.
	// singlePathExpression = [WSP]
						// "("singlePathExpression / inscopeVariableExpression
						// "/" entityNavProperty-et | entityComplexProperty
	// collectionPathExpression = [WSP] commonexpression [WSP]
						// singlePathExpression / inscopeVariableExpression
						// "/"
						// (entityNavProperty-es | entityCollectionProperty)
	// functionCallExpression = [ ( memberExpression / firstMemberExpression ) "/"]
						// functionFQName ; section 2.2.3.1
						// "(" [functionParametersExpression] ")"
	// boolFunctionCallExpression = functionCallExpression
						// ; with the added restriction that the specified FunctionImport
						// ; has a ReturnType of Edm.Boolean
	// functionParametersExpression =
						// functionParameterExpression *( "," functionParameterExpression)
	// functionParameterExpression = [WSP]
						// functionParameterName ; section 2.2.3.1
						// [WSP] "="
						// [WSP]
						// literalExpression / structuralValue / entityReference
						// [WSP]
	// structuralValue = ; a JSON or Verbose JSON encoding of a complex type, multi-value,
						// ; entity, or collection of entities
	// entityReference = "KEY("
						// [ entityContainer "." ]
						// entitySet
						// "("keyPredicate")"
						// ")"
						// ["/" namespaceQualifiedEntityType ]
						// ; refers a single Entity by key, and optionally allows a cast to a
						// ; derived type.