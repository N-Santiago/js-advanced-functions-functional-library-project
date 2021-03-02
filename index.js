const fi = (function() {
  return {
    libraryMethod: function() {
      return 'Start by reading https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0'
    },
    each: function(collection, callback) {
      let dub = (collection instanceof Array) ? collection.split() : Object.values(collection);
      for (let i=0; i < dub.length; i++) {
        callback(dub[i]);
    }
    return collection;
    },

    map: function(collection, callback) {
      if (!(collection instanceof Array)) {
        collection = Object.values(collection)
    }
    const newCollection = []
    for (let i = 0; i < collection.length; i++) {
        newCollection.push(callback(collection[i]))
    }
    return newCollection;
    },

    reduce: function(c=[], callback = () => {}, accumulator) {
      let collection = c.slice(0)

      if (!accumulator) {
      accumulator = collection[0]
      collection = collection.slice(1)
    }
      for (let i=0; i < collection.length; i++) {
      accumulator = callback(accumulator, collection[i], collection)
    }
      return accumulator;
    },

    find: function(collection, callback) {
      for(let i = 0; i < collection.length; i++){
        if(callback(collection[i])){
          return collection[i];
        }
      }
      return undefined;
    },

    filter: function(collection, callback){
      let newCollection = [];
      for(let i = 0; i < collection.length; i++){
        if(callback(collection[i])){
          newCollection.push(collection[i]);
        }
      }
      return newCollection
    },

    size: function(collection){
      if(Array.isArray(collection)){
        return collection.length;
      } else if (typeof(collection) === "object"){
        return Object.keys(collection).length
      }
    },

    first: function(collection, num = 1){
      if(num === 1){
        return (collection[0]);
      }
      return collection.slice(0, num);
    },

    last: function(collection, num = 1){
      if (num === 1){
        return collection[collection.length - 1]
      }
      return collection.slice(collection.length - num, collection.length)
    },

    compact: function(collection) {
      const notGood = new Set([false, null, 0, "", undefined, NaN])
      // Set is used for a collection of values  
      return collection.filter(e => !notGood.has(e))
    },

    sortBy: function(collection, callback) {
      const newArray = [...collection];

      return newArray.sort(function(a, b) {
          return callback(a) - callback(b)
      })
    },

    unpack: function(receiver, array) {
      for (let value of array) {
          receiver.push(value);
      }
  },

  flatten: function(collection, shallow, newArray=[]) {
      if (!Array.isArray(collection)) return newArray.push(collection)

      if (shallow) {
          for (let val of collection)
              Array.isArray(val) ? this.unpack(newArray, val) : newArray.push(val)
      } else {
          for (let val of collection) {
              this.flatten(val, false, newArray)
          }
      }
      return newArray
  },

  uniqSorted: function(collection, iteratee) {
      const sorted = [collection[0]]
      for (let idx = 1; idx < collection.length; idx++) {
          if (sorted[idx-1] !== collection[idx])
          sorted.push(collection[idx])
      }
      return sorted
  },

  uniq: function(collection, sorted=false, iteratee=false) {
      if (sorted) {
          return fi.uniqSorted(collection, iteratee)
      } else if (!iteratee) {
          return Array.from(new Set(collection))
      } else {
          const modifiedVals = new Set()
          const uniqVals = new Set()
          for (let val of collection) {
              const moddedVal = iteratee(val)
              if (!modifiedVals.has(moddedVal)) {
                  modifiedVals.add(moddedVal)
                  uniqVals.add(val)
              }
          }
          return Array.from(uniqVals)
      }
  },

    

  keys: function(obj) {
    // Using for loop
    const keys = []

    for (let key in obj){
        keys.push(key)
    }

    return keys
},

values: function(obj) {
    // Using for loop
    const values = []

    for (let key in obj){
        values.push(obj[key])
    }

    return values

  // Using the custom 'map' method from above
  // return this.map(obj, (value) => value)

},

functions: function(object) {
    const functionNames = []

    for (let key in object) {
        if (typeof object[key] === "function"){
            functionNames.push(key)
        }
    }

    return functionNames.sort()
},


}
})()

fi.libraryMethod()
