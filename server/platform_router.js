module.exports = (dal) => {
    let express = require('express');
    let router = express.Router();

    router.get('/', (req, res) => {
        // Get all games. Put game into json response when it resolves.
        dal.getPlatforms().then(games => res.json(games));
    });

    router.get('/:id', (req, res) => {
        let id = req.params.id;
        dal.getPlatform(id).then(game => res.json(game));
    });

    router.post('/', (req, res) => {
        console.log(req.body)
        let platform = {
            name : req.body.name,
            games : [] 
        };
        dal.createPlatform(platform).then(newPlatform => res.json(newPlatform));
    });

    router.post('/:id/games', (req, res) => {
        dal.addGame(req.params.id, req.body.game)
            .then(updatedGame => res.json(updatedGame));
    });

    router.get('/:platformId/games/:gameId', (req, res) => {
        dal.getGame(req.params.platformId, req.params.gameId).then(g => res.json(g))
    })

    return router;
};