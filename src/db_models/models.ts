import sequelize from '../db.js'
import {DataTypes} from 'sequelize'

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING },
    isActivated: { type: DataTypes.BOOLEAN, defaultValue: false, field: 'is_activated' },
    activationLink: { type: DataTypes.STRING, field: 'activation_link' },
    profilePicture: { type: DataTypes.STRING, field: 'profile_picture' },
});

const Role = sequelize.define('role', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
});

const UserRole = sequelize.define('user_role', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER, field: 'user_id' },
    roleId: { type: DataTypes.INTEGER, field: 'role_id' },
});

const Post = sequelize.define('post', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER, allowNull: false, field: 'user_id' },
    title: { type: DataTypes.STRING },
    image: { type: DataTypes.STRING },
    content: { type: DataTypes.TEXT },
    rating: { type: DataTypes.INTEGER },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, field: 'created_at' },
});

const Tag = sequelize.define('tag', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, unique: true },
});

const PostTag = sequelize.define('post_tag', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    postId: { type: DataTypes.INTEGER, field: 'post_id' },
    tagId: { type: DataTypes.INTEGER, field: 'tag_id' },
});

const Rating = sequelize.define('rating', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER, field: 'user_id' },
    postId: { type: DataTypes.INTEGER, field: 'post_id' },
    rate: { type: DataTypes.INTEGER },
});

const Comment = sequelize.define('comment', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    postId: { type: DataTypes.INTEGER, field: 'post_id' },
    userId: { type: DataTypes.INTEGER, field: 'user_id' },
    content: { type: DataTypes.TEXT },
    parentId: { type: DataTypes.INTEGER, allowNull: true, field: 'parent_id' },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, field: 'created_at' },
});

const UserSubscription = sequelize.define('user_subscription', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    followerId: { type: DataTypes.INTEGER, field: 'follower_id' },
    followingId: { type: DataTypes.INTEGER, field: 'following_id' },
});

// связи
User.belongsToMany(Role, { through: UserRole, foreignKey: 'user_id' });
Role.belongsToMany(User, { through: UserRole, foreignKey: 'role_id' });

User.hasMany(Post, { foreignKey: 'user_id' });
Post.belongsTo(User, { foreignKey: 'user_id' });

Post.belongsToMany(Tag, { through: PostTag, foreignKey: 'post_id' });
Tag.belongsToMany(Post, { through: PostTag, foreignKey: 'tag_id' });

User.hasMany(Rating, { foreignKey: 'user_id' });
Rating.belongsTo(User, { foreignKey: 'user_id' });

Post.hasMany(Rating, { foreignKey: 'post_id' });
Rating.belongsTo(Post, { foreignKey: 'post_id' });

User.hasMany(Comment, { foreignKey: 'user_id' });
Comment.belongsTo(User, { foreignKey: 'user_id' });

Post.hasMany(Comment, { foreignKey: 'post_id' });
Comment.belongsTo(Post, { foreignKey: 'post_id' });

User.belongsToMany(User, {
    through: UserSubscription,
    as: 'Followers',
    foreignKey: 'following_id',
    otherKey: 'follower_id',
});

User.belongsToMany(User, {
    through: UserSubscription,
    as: 'Following',
    foreignKey: 'follower_id',
    otherKey: 'following_id',
});

export default {
    User,
    Role,
    UserRole,
    Post,
    Tag,
    PostTag,
    Rating,
    Comment,
    UserSubscription
}