const marked = require('marked')
const Post = require('../lib/mongo').Post


// 将post 的content 从 markdown 转换成 html
Post.plugin('contentToHtml', {
    afterFind: function(posts) {
        return posts.map(function(post) {
            post.content = marked(post.content)
            return post
        })
    },
    afterFindOne: function(post) {
        if (post) {
            post.content = marked(post.content)
        }
        return post
    }

})


module.exports = {
    // 创建一篇文章
    create: function create(post) {
        return Post.create(post).exec()
    },
    // 通过文章id获取一篇文章
    getPostById: function getPostById(postId) {
        return Post
            .findOne({_id: postId})
            .populate({path: 'author', model: 'User'})
            .addCreatedAt()
            .contentToHtml()
            .exec()
    },
    // 按创建时间降序获取所有用户文章或者某个特定用户的所有文章
    getPosts: function getPosts(author) {
        const query = {}
        if (author) {
            query.author = author
        }
        return Post
            .find(query)
            .populate({path: 'author', model: 'User'})
            .sort({_id: -1})
            .addCreatedAt()
            .contentToHtml()
            .exec()
    },
    // 通过文章id给pv加1
    incPv: function incPv(postId) {
        return Post
            .update({_id: postId}, {$inc: {pv: 1}})
            .exec()
    }
}
