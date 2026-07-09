
// renumber-slots.js
// ONE-TIME script: converts your existing "A1", "A2"... slot codes into
// plain sequential numbers "1", "2", "3"... keeping the same order.
//
// HOW TO USE:
// 1. Open js/productdata.js and add this line at the very bottom:
//      module.exports = machineProducts;
//    (temporary — you can remove it again after running this script)
// 2. Save this file (renumber-slots.js) in the SAME folder as productdata.js
// 3. In a terminal, in that folder, run:  node renumber-slots.js
// 4. It creates a NEW file: productdata.renumbered.js
// 5. Open it, check it looks right, then rename it to replace productdata.js

const machineProducts = require("./productdata.js");

const renumbered = {};

for (const machineId of Object.keys(machineProducts)) {
  renumbered[machineId] = machineProducts[machineId].map(function (product, index) {
    return {
      ...product,
      slot: String(index + 1), // A1 becomes "1", A2 becomes "2", and so on, in order
    };
  });
}

// Build the output file content, matching your original file's format
let output = "const machineProducts = " + JSON.stringify(renumbered, null, 2) + ";\n";
require("fs").writeFileSync("./productdata.renumbered.js", output);

console.log("✅ Done! Check productdata.renumbered.js, then rename it to replace productdata.js");