const Pet = require("../models/Pet");
const UserProfile = require("../models/UserProfile");

function generateRandomString(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomString = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters[randomIndex];
  }
  return randomString;
}

// Get list of all users
exports.users = async (req, res) => {
  try {
    const profiles = await UserProfile.find({});
    res.status(200).json(profiles);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

exports.addpet = (req, res) => {
  let fileToUpload = req.files.photoURL;
  const uploadedFileName = generateRandomString(20);
  fileToUpload.mv("./client/public/uploads/" + uploadedFileName);
  req.body.photo = uploadedFileName;

  // Store in MongoDB
  Pet.insertMany(req.body, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
};

// admin edit pet
exports.editpet = (req, res) => {
  Pet.findByIdAndUpdate(req.params.id, {});
};
