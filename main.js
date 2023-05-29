let keys = generateRSAKeys();

document.getElementById('fileInput').addEventListener('change', handleFileSelect, false);
function encrypt() {
 
  let plaintext = document.getElementById("plaintext").value;
  let e = keys.publicKey[0];
  let n = keys.publicKey[1];
  
  let ciphertext = rsaEncrypt(plaintext, e, n);
  document.getElementById("ciphertext").innerHTML= ciphertext;
}

function decrypt() {
    let ciphertext = document.getElementById("banma").value;
    let d = keys.privateKey[0];
    let n = keys.privateKey[1];
    
    let plaintext = rsaDecrypt(ciphertext, d, n);
    document.getElementById("giaiMa").innerHTML = plaintext;
  }

  function chuyen(){
    let banMa = document.getElementById("ciphertext").value;
    document.getElementById("banma").innerHTML = banMa;
  }

  function save_ban_ma() {
    let luu_ban_ma = document.getElementById("ciphertext").value;
    var file = new Blob([luu_ban_ma],{type:"text"});
    var anchor = document.createElement("a");
    anchor.href = URL.createObjectURL(file);
    anchor.download = "ban_ma.txt";
    anchor.click();
};

function save_ban_ro() {
  let luu_ban_ro = document.getElementById("giaiMa").value;
  var file = new Blob([luu_ban_ro],{type:"text"});
  var anchor = document.createElement("a");
  anchor.href = URL.createObjectURL(file);
  anchor.download = "ban_ro.txt";
  anchor.click();
};
