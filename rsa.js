// Hàm tính mũ a^b mod n

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
  
  // Hàm mã hóa RSA
  function rsaEncrypt(plaintext, e, n) {
    let ciphertext = '';
    
    for (let i = 0; i < plaintext.length; i++) {
      let charCode = plaintext.codePointAt(i);
      let encryptedCharCode = modPow(charCode, e, n);
      ciphertext += String.fromCodePoint(encryptedCharCode);
    }
    
    return ciphertext;
  }


  // Hàm giải mã RSA
function rsaDecrypt(ciphertext, d, n) {
    let plaintext = '';
  
    for (let i = 0; i < ciphertext.length; i++) {
      let charCode = ciphertext.codePointAt(i);
      let decryptedCharCode = modPow(charCode, d, n);
      plaintext += String.fromCodePoint(decryptedCharCode);
    }
  
    return plaintext;
  }

  
  // Hàm tạo khóa RSA
function generateRSAKeys() {
    // Lựa chọn hai số nguyên tố ngẫu nhiên p và q
    let p = getRandomPrime();
    let q = getRandomPrime();
  
    // Tính modulus n và hàm Euler phi(n)
    let n = p * q;
    let phi = (p - 1) * (q - 1);
  
    // Chọn số nguyên e sao cho 1 < e < phi và e là số nguyên tố cùng nhau với phi
    let e = getCoPrime(phi);
  
    // Tính số nguyên d thỏa mãn d * e ≡ 1 (mod phi)
    let d = modInverse(e, phi);
  
    // Trả về cặp khóa công khai và khóa bí mật
    return {
      publicKey:  [e, n],
      privateKey: [d, n]
    };
  }
  
  // Hàm kiểm tra số nguyên tố
  function isPrime(num) {
    if (num < 2) return false;
  
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
    }
  
    return true;
  }
  
  // Hàm tạo số nguyên tố ngẫu nhiên
  function getRandomPrime() {
    let prime;
    do {
      prime = Math.floor(Math.random() * 100) + 2;
    } while (!isPrime(prime));
    return prime;
  }
  
  // Hàm tìm ước số nguyên tố cùng nhau với một số
  function getCoPrime(num) {
    let coPrime;
    do {
      coPrime = Math.floor(Math.random() * (num - 2)) + 2;
    } while (gcd(num, coPrime) !== 1);
    return coPrime;
  }
  
  // Hàm tính ước số chung lớn nhất (GCD)
  function gcd(a, b) {
    if (b === 0) return a;
    return gcd(b, a % b);
  }
  
  // Hàm tính nghịch đảo modulo
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
  