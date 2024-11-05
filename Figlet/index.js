var figlet = require("figlet");

figlet("Hacked", function (err, data) {
  if (err) {
    console.log("Something went wrong...");
    console.dir(err);
    return;
  }
  console.log(data);
});

// figlet.text(
//     "Party To Banti",
//     {
//       font: "Ghost",
//       horizontalLayout: "default",
//       verticalLayout: "default",
//       width: 80,
//       whitespaceBreak: true,
//     },

//     function (err, data) {
//         if (err) {
//           console.log("Something went wrong...");
//           console.dir(err);
//           return;
//         }
//         console.log(data);
//       }
//     );