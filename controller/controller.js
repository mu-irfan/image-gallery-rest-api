const ImgGallery = require("../schema/gallery");
const User = require("../schema/user");

const createGalleryImage = async (req, res) => {
  const { imgTitle, imgUrl } = req.body;
  if (!imgTitle || !imgUrl) {
    return res.status(422).json({ error: "Please Filled all fields" });
  }

  try {
    const imageExist = await ImgGallery.findOne({ imgTitle: imgTitle });
    if (imageExist) {
      return res.status(422).json({ error: "Image Already Exists!" });
    } else {
      const new_img = new ImgGallery({
        imgTitle,
        imgUrl,
      });

      const imgAdded = await new_img.save();
      console.log(imgAdded);

      if (imgAdded) {
        res
          .status(201)
          .json({ message: "Image Successfully Added to Gallery!" });
      } else {
        res.status(500).json({ error: "Image addition Failed!" });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const getGallery = async (req, res) => {
  try {
    const gallery = await ImgGallery.find();
    if (gallery) {
      res.send(gallery);
    } else {
      res.status(401).send("Gallery not Recieved!");
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

const getSingleImage = async (req, res) => {
  const singleImage = await ImgGallery.findById(req.params.id);
  res.send(singleImage);
};

const createUser = async (req, res) => {
  const { userName, profileUrl, bio } = req.body;
  if (!userName || !profileUrl || !bio) {
    return res.status(422).json({ error: "Please Filled all fields" });
  }

  try {
    const new_user = new User({
      userName,
      profileUrl,
      bio,
    });

    const userAdded = await new_user.save();
    console.log(userAdded);

    if (userAdded) {
      res.status(201).json({ message: "User created successfully!" });
    } else {
      res.status(500).json({ error: "User creation Failed!" });
    }
  } catch (error) {
    console.log(error);
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (users) {
      res.send(users);
    } else {
      res.status(401).send("Users not Found!");
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

const getUser = async (req, res) => {
  const specificUser = await User.findById(req.params.id).populate("images");
  res.send(specificUser);
};

module.exports = {
  createGalleryImage,
  getGallery,
  getSingleImage,
  createUser,
  getUsers,
  getUser,
};
