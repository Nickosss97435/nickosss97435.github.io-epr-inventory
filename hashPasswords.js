const bcrypt = require("bcrypt");
const fs = require("fs");

const users = [
  { id: 1, username: "admin", password: "admin123" },
  { id: 2, username: "user", password: "user123" },
];

(async () => {
  for (const user of users) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  fs.writeFileSync("./data/users.json", JSON.stringify(users, null, 2));
  console.log("Mots de passe hachés et sauvegardés !");
})();
