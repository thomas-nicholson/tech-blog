const User = require('./User');
const Blog = require('./Blog');

//const Project = require('./Project');
/*
User.hasMany(Project, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});*/
/*
Project.belongsTo(User, {
  foreignKey: 'user_id'
});*/

module.exports = { User, Blog };