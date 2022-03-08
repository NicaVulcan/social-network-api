const { Thought, User } = require('../models');

const thoughtController = {
    //* Thought Routes
    // get all routes
    getAllThought(req, res){
        Thought.find({})
            .populate(
                {
                    path: 'reactions',
                    select: '-__v'
                }
            )
            .select('-__v')
            .then(thoughtData => res.json(thoughtData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    // get thought by id
    getThoughtById({ params }, res){
        Thought.findOne({ _id: params.id })
            .populate(
                {
                    path: 'reactions',
                    select: '-__v'
                }
            )
            .select('-__v')
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(400).json({ message: 'Thought not found!' });
                    return;
                }
                res.json(thoughtData)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    // create new thought
    // createThought({ params, body }, res){
    //     Thought.create(body)
    //         .then(( thoughtData ) => {
    //             console.log(thoughtData._id);
    //             console.log(params.id);
    //             res.json(thoughtData);
             
    //             return User.findByIdAndUpdate(
    //                 { _id: params.userId },
    //                 { $push: { thoughts: thoughtData._id } },
    //                 { new: true } 
    //             )
    //         })
    //         .catch(err => res.status(400).json(err));
    // },
    // },
    // edit existing thought by id
    updateThought({ params, body }, res){
        Thought.findByIdAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(400).json({ message: 'Thought not found!' });
                    return;
                }
                res.json(thoughtData)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    // remove thought by id
    removeThought({ params }, res){
        Thought.findOneAndDelete({ _id: params.id })
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(400).json({ message: 'Thought not found!' });
                    return;
                }
                res.json(thoughtData)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    //* Reaction Routes
    // add reaction
    addReaction({ params, body }, res){
        Thought.findByIdAndUpdate(
        { _id: params.id },
        { $push: { reactions: body} },
        { new: true, runValidators: true }
        )
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(400).json({ message: 'Thought not found!' });
                    return;
                }
                res.json(thoughtData)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    // remove reaction
    removeReaction({ params }, res){
        Thought.findByIdAndUpdate(
            { _id: params.userId },
            { $pull: { reactions: params.id } },
            { new: true }
        )
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(400).json({ message: 'Thought not found!' });
                    return;
                }
                res.json(thoughtData)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    }

}

module.exports = thoughtController;