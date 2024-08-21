const express = require('express');
const router = express.Router();
const config = require('config');
const request = require('request');
const auth =require('../../middleware/auth');
const Profile =require('../../model/Profile');
const User =require('../../model/User');
const Task = require('../../model/Task');
const { check, validationResult } = require('express-validator');


//@rout    Get api/Profile/me
//@desc    Get cuurent user profile
//@access   private

router.get('/me',auth,async (req,res)=>{
    try {
        //Get User Profile By User ID
        const profile =await Profile.findOne({ user:req.user.id }).populate('user',['name,avatar']);
        //check if user profile not exist
        if(!profile){
            return res.status(400).json({ msg: 'This is no profile for this user' });
        }
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});



//@route    post  api/profile
//desc      create or update profile
//access    private
router.post('/',[auth,
    [
        check('jopTitle','Jop title is required').not().isEmpty(),
    ]
],async (req,res)=>{
const errors = validationResult(req);
if(!errors.isEmpty()) {
    return res.status(400).json({ errors:errors.array() });
}
//Destructuring prob from user
const {
    jopTitle,
    bio,
    youtube,
    facebook,
    twitter,
    instagram,
    linkedin
  } = req.body;
//Build profile object
const ProfileField={};
ProfileField.user=req.user.id;
if(jopTitle) ProfileField.jopTitle = jopTitle;
if(bio) ProfileField.bio = bio;
//Build socail object
ProfileField.social={};
if (youtube) ProfileField.social.youtube=youtube;
if (twitter) ProfileField.social.twitter=twitter;
if (facebook) ProfileField.social.facebook=facebook;
if (linkedin) ProfileField.social.linkedin=linkedin;
if (instagram) ProfileField.social.instagram=instagram;

//Create and update profile user
try {
    let profile = await Profile.findOne({ user:req.user.id });
if(profile) {
    //Update
    profile=await Profile.findOneAndUpdate(
        {user:req.user.id},
        {$set:ProfileField},
        {new:true}
    );

    return res.json(profile);
}
//Create
profile=new Profile(ProfileField);
await profile.save();
res.json(profile);

} catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
}
});

//@route    get  api/profile/user/:user_id
//desc      get profile by id
//access    private
router.get('/user/:user_id',auth,async (req,res)=>{
    try {
        const profile=await Profile.findOne({ user:req.params.user_id });
        if(!profile) {
            return res.status(400).json({ msg: 'Profile not found' });
        }
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        if(err.kind =='ObjectId') {
            return res.status(400).json({ msg:'Profile not found' });
        }
        res.status(500).send('Server Error');
    }
});


//@rout    Delete api/Profile
//@desc    Delete profile,user,posts
//@access   Private
router.delete('/',auth,async(req,res)=>{
    try {
        //Delete posts
        await Task.deleteMany({ user:req.user.id })

        //Delete profile
        await Profile.findOneAndDelete({ user:req.user.id });
        //Delet user
        await User.findOneAndDelete({ _id:req.user.id });
        res.json({ msg:'User Deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;