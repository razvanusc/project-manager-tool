const express = require('express');
const router = express.Router();
const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const ProjectController = require('./controllers/ProjectController')
const UserController = require('./controllers/UserController')

router.post('/register',
  AuthenticationControllerPolicy.register,
  AuthenticationController.register)
router.post('/login',
  AuthenticationController.login)


router.get('/projects',
  ProjectController.getProjects)
router.post('/projects/create',
  ProjectController.createProject)


router.get('/users',
  UserController.getUsers)
router.get('/users/me',
  UserController.getUser)

module.exports = router;
