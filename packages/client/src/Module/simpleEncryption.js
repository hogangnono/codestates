/* eslint-disable no-array-constructor */
/* eslint-disable no-new-wrappers */

export const Encrypt = (theText) => {
    let output = new String();
    const Temp = new Array();
    const Temp2 = new Array();
    const TextSize = theText.length;
    for (let i = 0; i < TextSize; i++) {
        const rnd = Math.round(Math.random() * 122) + 68;
        Temp[i] = theText.charCodeAt(i) + rnd;
        Temp2[i] = rnd;
    }
    for (let j = 0; j < TextSize; j++) {
        output += String.fromCharCode(Temp[j], Temp2[j]);
    }
    return output;
};

export const Decrypt = (theText) => {
    let output = new String();
    const Temp = new Array();
    const Temp2 = new Array();
    const TextSize = theText.length;
    for (let i = 0; i < TextSize; i++) {
        Temp[i] = theText.charCodeAt(i);
        Temp2[i] = theText.charCodeAt(i + 1);
    }
    for (let j = 0; j < TextSize; j += 2) {
        output += String.fromCharCode(Temp[j] - Temp2[j]);
    }
    return output;
};
