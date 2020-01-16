const express = require("express");
const getMember = require("../functions/member");
const router = express.Router();
const uuidv1 = require("uuid/v1");
const formidable = require("formidable");
const fs = require("fs");
const models = require("../models");

let uniqueFilename = "";

router.get("/", (req, res) => {
  // const members = req.session.familyAll.family_members
  // const name = req.session.familyAll.family_name
  // res.render("members", {members: members, name: name})
  models.Family_member.findAll({
    where: {
      family_id: req.session.family.userId
    }
  }).then(members => {
    //console.log(members)
    res.render("members", {
      members: members,
      name: req.session.family.family_name
    });
  });
});
//<localhost>:<port>/members/add/<family_id>
router.post("/add", (req, res) => {
  let member = models.Family_member.build({
    image_url: req.body.image_url,
    family_member: req.body.family_member,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    birthday: req.body.birthday,
    family_id: req.session.family.userId
  });
  member.save().then(savedMember => res.redirect("/members") /*console.log(savedMember)*/);
//   res.redirect("/members");
});

router.get("/update/:member", (req, res) => {
  let member = models.Family_member.findAll({
    where: {
      id: req.params.member
    }
  }).then(member => {
    res.render("update", {
      id: req.params.member,
      name: member[0].dataValues.first_name
    });
  });
});

router.get("/add", (req, res) => {
  res.render("add", { id: req.session.family.userId });
});

//<Localhost>:<port>/members/update/<memberId>
router.post("/update/:memberId", (req, res) => {
  let member = models.Family_member.update(
    {
      image_url: req.body.image_url,
      family_member: req.body.family_member,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      birthday: req.body.birthday
    },
    {
      where: {
        id: req.params.memberId
      }
    }
  ).then(res.redirect("/members"));
});

//<Localhost>:<port>/members/delete/<memberId>
router.get("/delete/:memberId", (req, res) => {
  models.Family_member.destroy({
    where: {
      id: req.params.memberId
    }
  }).then(res.redirect("/members"));
});

// router.post("/member", async (req, res) => {
//   const member_id = req.body.member_id;
//   const image_url = req.body.image_url;
//   req.session.memberInfo = await getMember(member_id);
//   console.log(req.session.memberInfo);
//   res.render("member", { member: req.session.memberInfo });
// });
//Kety Worked?? from here
function uploadFile(req, callback) {
  new formidable.IncomingForm()
    .parse(req)
    .on("fileBegin", (name, file) => {
      uniqueFilename = `${uuidv1()}.${file.name.split(".").pop()}`;
      file.name = uniqueFilename;
      file.path = __basedir + "/uploads/" + file.name;
    })
    .on("file", (name, file) => {
      callback(file.name);
    });
}
router.post("/upload/:memberId", (req, res) => {
  let memberId = req.params.memberId;
  let image_url = req.body.image_url;
  uploadFile(req, photoURL => {
    photoURL = `/uploads/${photoURL}`;
    res.render("members", {
      memberId: memberId,
      image_url: photoURL,
      className: "preview-image"
    });
  });
});

router.get("/member/:id", async (req, res) => {
    const member_id = req.params.id
    req.session.memberInfo = await getMember(member_id)
    res.render("member", {member: req.session.memberInfo})

})

module.exports = router;
