function caesarCipher(str, shift) {
  return str
    .split("")
    .map((char) => {
      if (char.match(/[a-z]/i)) {
        const code = char.charCodeAt(0);
        const base = char === char.toUpperCase() ? 65 : 97;
        return String.fromCharCode(((code - base + shift + 26) % 26) + base);
      }
      return char;
    })
    .join("");
}

function encrypt() {
  const message = document.getElementById("message").value;
  const shiftStart = parseInt(document.getElementById("shiftStart").value);
  const shiftEnd = parseInt(document.getElementById("shiftEnd").value);
  const resultBox = document.getElementById("result");

  if (shiftStart > shiftEnd) {
    resultBox.value = "Invalid range: start must be less than or equal to end.";
    return;
  }

  let results = "";

  for (let shift = shiftStart; shift <= shiftEnd; shift++) {
    const encrypted = caesarCipher(message, shift);
    results += `Shift ${shift}: ${encrypted}\n\n`;
  }

  resultBox.value = results;
}

function decrypt() {
  const message = document.getElementById("message").value;
  const shiftStart = parseInt(document.getElementById("shiftStart").value);
  const shiftEnd = parseInt(document.getElementById("shiftEnd").value);
  const resultBox = document.getElementById("result");

  if (shiftStart > shiftEnd) {
    resultBox.value = "Invalid range: start must be less than or equal to end.";
    return;
  }

  let results = "";

  for (let shift = shiftStart; shift <= shiftEnd; shift++) {
    let decrypted = "";

    for (let i = 0; i < message.length; i++) {
      let char = message[i];

      if (char.match(/[a-z]/i)) {
        let code = message.charCodeAt(i);
        let base = code >= 65 && code <= 90 ? 65 : 97;
        char = String.fromCharCode(((code - base - shift + 26) % 26) + base);
      }

      decrypted += char;
    }

    results += `Shift ${shift}: ${decrypted}\n\n`;
  }

  resultBox.value = results;
}

