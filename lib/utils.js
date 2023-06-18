exports.sortArrayObjects = (key, order='asc') => {
    return function(a, b) {
      let varA = '';
      let varB = '';

      if(Array.isArray(key)) {
        for(let i=0; i<key.length; i++) {
          if(parseInt(a[key[i]]) > 0 && parseInt(a[key[i]]) < 10) {
            a[key[i]] = '0'+parseInt(a[key[i]]);
          }
          if(parseInt(b[key[i]]) > 0 && parseInt(b[key[i]]) < 10) {
            b[key[i]] = '0'+parseInt(b[key[i]]);
          }
          varA += (typeof a[key[i]] === 'string') ? a[key[i]].toUpperCase() : a[key[i]];
          varB += (typeof b[key[i]] === 'string') ? b[key[i]].toUpperCase() : b[key[i]];
        }
      } else {
        if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
          return 0;
        }
        varA = (typeof a[key] === 'string') ? a[key].toUpperCase() : a[key];
        varA = (varA ? varA : '');
        varB = (typeof b[key] === 'string') ? b[key].toUpperCase() : b[key];
        varB = (varB ? varB : '');
      }

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order === 'desc') ? (comparison * -1) : comparison
      );
    };
  };
