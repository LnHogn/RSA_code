
function create_key(){
  let keys = generateRSAKeys();
  document.getElementById("public_key").innerHTML = btoa(keys.publicKey);
  document.getElementById("private_key").innerHTML = btoa(keys.privateKey);
}

document.getElementById('fileInput').addEventListener('change', handleFileSelect, false);
function encrypt() {
 
  let plaintext = document.getElementById("plaintext").value;
  let key_pub = atob(document.getElementById("public_key").value);
  var publickey_re = key_pub.split(",").map(Number);
  let e = publickey_re[0];
  let n = publickey_re[1];
 
  let ciphertext = rsaEncrypt(plaintext, e, n);
  document.getElementById("ciphertext").innerHTML= ciphertext;
}

function decrypt() {
    let ciphertext = document.getElementById("banma").value;
    let key_pri = atob(document.getElementById("private_key").value);
    var privatekey_re = key_pri.split(",").map(Number);
    let d = privatekey_re[0];
    let n = privatekey_re[1];
    
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

function file_ban_ro(){
  document.getElementById("fileInput").addEventListener("change", function (event) {
  var file = event.target.files[0]; 
  var reader = new FileReader();
  reader.addEventListener("load", function (event) {
    var contents = event.target.result;
    document.getElementById("plaintext").textContent = contents;
  });
reader.readAsText(file);
});
}

function file_ban_ma(){
  document.getElementById("fileInput_2").addEventListener("change", function (event) {
    var file = event.target.files[0]; 
    var reader = new FileReader();
    reader.addEventListener("load", function (event) {
      var contents = event.target.result;
      document.getElementById("banma").textContent = contents;
    });
  reader.readAsText(file);
  });
}
