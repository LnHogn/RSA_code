
function modPow(a, b, n) {
    let result = 1;
    a = a % n;
    
    while (b > 0) {
      if (b % 2 === 1) {
        result = (result * a) % n;
      }
      
      a = (a * a) % n;
      b = Math.floor(b / 2);
    }
    
    return result;
  }

function generateRSAKeys() {
    let p = getRandomPrime();
    let q = getRandomPrime();
  
    let n = p * q;
    let phi = (p - 1) * (q - 1);
  
    let e = getCoPrime(phi);
  
    let d = modInverse(e, phi);
  
    return {
      publicKey:  [e, n],
      privateKey: [d, n]
    };
  }

  // function isPrime(num) {
  //   if (num < 2) return false;
  
  //   for (let i = 2; i <= Math.sqrt(num); i++) {
  //     if (num % i === 0) return false;
  //   }
  
  //   return true;
  // }
  function isPrime(num) {
    var sqrtnum=Math.floor(Math.sqrt(num));
      var prime = num != 1;
      for(var i=2; i<sqrtnum+1; i++) { // sqrtnum+1
          if(num % i == 0) {
              prime = false;
              break;
          }
      }
      return prime;
  }


  function getRandomPrime() {
    let prime;
    do {
      prime = Math.floor(Math.random() * 10000) + 2;
    } while (!isPrime(prime));
    return prime;
  }
  

  function getCoPrime(num) {
    let coPrime;
    do {
      coPrime = Math.floor(Math.random() * (num - 2)) + 2;
    } while (gcd(num, coPrime) !== 1);
    return coPrime;
  }
  

  function gcd(a, b) {
    if (b === 0) return a;
    return gcd(b, a % b);
  }
  

  function modInverse(a, m) {
    let m0 = m;
    let x0 = 0;
    let x1 = 1;
  
    if (m === 1) return 0;
  
    while (a > 1) {
      let q = Math.floor(a / m);
      let t = m;
  
      m = a % m;
      a = t;
      t = x0;
      x0 = x1 - q * x0;
      x1 = t;
    }
  
    if (x1 < 0) x1 += m0;
  
    return x1;
  }
  

  function rsaEncrypt(plaintext, e, n) {
    let ciphertext = '';
    let encryptedCharCode =[];
    for (let i = 0; i < plaintext.length; i++) {
      let charCode = plaintext.charCodeAt(i);
        encryptedCharCode[i] = modPow(charCode, e, n);
    }
    
    return btoa(encryptedCharCode);
  }



function rsaDecrypt(ciphertext, d, n) {
    let plaintext = '';
    let charCode = atob(ciphertext);
    var mang = charCode.split(",").map(Number);  
    for (let i = 0; i < charCode.length; i++) {
      let decryptedCharCode = modPow(mang[i], d, n);
      plaintext += String.fromCharCode(decryptedCharCode);
    }
    return plaintext;
  }

