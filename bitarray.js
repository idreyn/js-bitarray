/*
The MIT License (MIT)

Copyright (c) 2015 Ian Reynolds

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

function BitArray(length) {
	this._length = length;
	this._array = new Uint8Array(Math.ceil(length / 8))
}

BitArray.prototype = {
	_checkIndex: function(index) {
		if(isNaN(index) || index < 0 || index > this.length - 1) {
			throw "Invalid index: " + index.toString() + " is greater than " + (this.length - 1).toString();
		}
	},

	_checkValue: function(value) {
		if(!(
			value === true ||
			value === false ||
			value === 1 ||
			value === 0
		)) {
			throw new Error("Illegal value: " + value.toString() + " cannot be cast to boolean.");
		}
	},

	at: function(index) {
		var arrIndex, bitIndex;
		this._checkIndex(index);
		arrIndex = Math.floor(index / 8);
		bitIndex = index % 8;
		return !!((this._array[arrIndex] >> bitIndex) & 1);
	},

	set: function(index,value) {
		var arrIndex, bitIndex, currentVal, upperMask, lowerMask;
		this._checkIndex(index);
		this._checkValue(value);
		arrIndex = Math.floor(index / 8);
		bitIndex = index % 8;
		currentVal = this._array[arrIndex];
		upperMask = (currentVal >> (bitIndex + 1)) << (bitIndex + 1);
		lowerMask = (currentVal << (8 - bitIndex)) >> (8 - bitIndex);
		this._array[arrIndex] = (value << bitIndex) | upperMask | lowerMask;
	},

	toString: function() {
		var s = '',
			a;
		for(var i=0;i<this._array.length;i++) {
			a = this._array[i].toString(2).split('').reverse().join('');
			while(a.length < 8) a = a + '0';
			s = s + a;
		}
		return s.slice(0,this.length);
	},
};

Object.defineProperties(BitArray.prototype,{
	length: {
		get: function() {
			return this._length;
		}
	}
});

BitArray.test = function(n) {
	// Make a very big array
	n = n || 1000000;
	var ba = new BitArray(n);
	var arr = [];
	for(var i=0;i<n;i++) {
		var val = !!(Math.random() > 0.5);
		ba.set(i,val);
		arr[i] = val;
	}
	// Sequential access
	for(i=0;i<n;i++) {
		if(ba.at(i) != arr[i]) {
			return false;
		}
	}
	// Random access
	for(var i=0;i<n;i++) {
		var ind = Math.floor(Math.random() * n);
		if(ba.at(ind) != arr[ind]) {
			return false;
		}
	}
	// Nice work, everyone!
	return true;
}

try {
	module.exports = BitArray;
} catch(err) {
	// Do nothing
}