const router = require('express').Router();
const {
    getAllThought,
    getThoughtById,
    createThought,
    updateThought,
    removeThought,
    addReaction,
    removeReaction
} = require('../../controllers/thought-controllers');

router
    .route('/')
    .get(getAllThought);

router
    .route('/:userId')
    .post(createThought);

router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(removeThought);

router
    .route('/:id/reaction')
    .post(addReaction)
    .delete(removeReaction);

module.exports = router;

