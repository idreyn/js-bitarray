# js-bitarray

![Conway's Game of Life](http://i.imgur.com/3mNRhPg.gif)

Sometimes you just need to store a bunch of bits in Javascript. These days the best way to do that is with a typed Uint8Array and some bitmasking, which is really all this class does. Usage is as follows:

    if(skeptical) {
      console.assert(BitArray.test());
    }
    
    var ba = new BitArray(100);
    ba.length // 100;
  
    for(var i=0;i<fb.length;i++) {
      ba.set(i,isPrime(i));
    }
  
    ba.get(23); // true
    ba.get(42); // false

Nothing to write home about, but if you're storing millions of values it'll be better than using an untyped array.
