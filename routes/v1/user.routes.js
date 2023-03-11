const express=require('express')
const { allUser, addUser, randomUser, updateUser, deleteUser } = require('../../controllers/user.controllers')
const router=express.Router()


/**
 * get all user
 */

router.route('/user/all')
.get(allUser)


/**
 * get random user
 */
router.route('/user/random')
.get(randomUser)

/**
 * add new user
 */
router.route('/user/save')
.post(addUser)

/**
 * update a user
 */
router.route('/user/:id')
.patch(updateUser)

/**
 * delete a user
 */
.delete(deleteUser)



//router export
module.exports=router