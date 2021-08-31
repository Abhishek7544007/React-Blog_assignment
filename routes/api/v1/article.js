const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const auth = require('../../../middleware/auth');
const { postArticle, getAllArticles, getArticleById, removeArticle } = require('../../../services/article');


//ADD POST
router.post("/", 
    [
        check("title", "title is required").trim().notEmpty(),
        check("content", "content is required").trim().notEmpty(),
        check("author_id", "author_id is required").trim().notEmpty(),
        check("author_name", "author_name is required").trim().notEmpty()
    ],
    auth,
    async(req, res) => {
        const validationErrors = validationResult(req);
        if(!validationErrors.isEmpty()){
            return res.status(400).json({
                error: validationErrors.array(),
                success: false
            });
        }
        const newArticle = req.body;

        const result = await postArticle(newArticle);
        return res.status(result.status).json(result.response);
    }
);

//GET ALL ARTICLES
router.get('/', auth, async (req, res) => {
    const result = await getAllArticles();
    return res.status(result.status).json(result.response)
});


//GET ARTICLE BY ID
router.get("/:id", auth, async(req, res) => {
    const result = await getArticleById(req.params.id);
    return res.status(result.status).json(result.response);
})


//DELETE POST
router.delete("/:id", auth, async(req, res) => {
    const result = await getArticleById(req.params.id);
    if(!result.response.success){
        return res.status(result.status).json({
            error: [{msg: result.response.error[0].msg}],
            success: false
        });
    }
    const article = result.response.data;
    if(req.user.id != article.author_id){
        return res.status(403).json({
            error:[{ msg: "You are not authorized to perform this action"}],
            success: false
        });
    }
    if(!article){
        return {
            response: {
                error: [{ msg: "The article you are looking for does not exist"}],
                success: false
            },
            status: 404
        }
    }
    const success = await removeArticle(req.params.id);

    return success ? res.status(200).json({
        data:{
            msg: "Article deleted successfully"
        },
        success: true
    }) 
    : 
    res.status(400).json({
        error: [{msg: "Failed to delete the article"}],
        success: false
    });
});

module.exports = router;