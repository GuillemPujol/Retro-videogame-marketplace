class Db {
    /**
     * Constructors an object for accessing platforms in the database
     * @param mongoose the mongoose object used to create schema objects for the database
     */
    constructor(mongoose) {
        // This is the schema we need to store platforms in MongoDB
        const platformSchema = new mongoose.Schema({
            name: String,
            games: [{
                name: String,
                condition: String,
                price: Number,
                sellerName: String,
                sellerEmail: String
            }] // A list of games as string
        });

        // This model is used in the methods of this class to access platforms
        this.platformModel = mongoose.model('platform', platformSchema);
    }

    async getPlatforms() {
        try {
            return await this.platformModel.find({});
        } catch (error) {
            console.error("getPlatforms:", error.message);
            return {};
        }
    }

    async getPlatform(id) {
        try {
            return await this.platformModel.findById(id);
        } catch (error) {
            console.error("getPlatform:", error.message);
            return {};
        }
    }

    async createPlatform(newPlatform) {
        let platform = new this.platformModel(newPlatform);
        return platform.save();
    }

    async addGame(platformId, game) {
        const platform = await this.getPlatform(platformId);
        console.log(platformId, game)
        platform.games.push(game);
        return platform.save();
    }

    async getGame(platformId, gameId) {
        try {
            const platform = await this.platformModel.findById(platformId);
            return platform.games.find(g => g._id == gameId)
        } catch (error) {
            console.error("getPlatform:", error.message);
            return {};
        }
    }

    /**
     * This method adds a bunch of test data if the database is empty.
     * @param count The amount of platforms to add.
     * @returns {Promise} Resolves when everything has been saved.
     */
    async bootstrap() {
        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }    

            const categories = [
                'PS1',
                'Xbox',
                'Nintendo 64',
                'GameBoy',
                'GameBoy Color'
            ]
            const games = [{
                "name": "Resident Evil 2",
                "condition": "Bad",
                "price": 120,
                "sellerName": "admin",
                "sellerEmail": "admin@admin.com"
            },{
                "name": "Pokemon",
                "condition": "Good",
                "price": 99,
                "sellerName": "admin",
                "sellerEmail": "admin@admin.com"
            },{
                "name": "Metal Gear Solid",
                "condition": "Great",
                "price": 420,
                "sellerName": "admin",
                "sellerEmail": "admin@admin.com"
            },{
                "name": "Final Fantasy VII",
                "condition": "Good",
                "price": 69,
                "sellerName": "admin",
                "sellerEmail": "admin@admin.com"
            },{
                "name": "Tomb Rider",
                "condition": "Great",
                "price": 98,
                "sellerName": "admin",
                "sellerEmail": "admin@admin.com"
            }, {
                "name": "Silent Hill",
                "condition": "Acceptable",
                "price": 99,
                "sellerName": "admin",
                "sellerEmail": "admin@admin.com"
            }, {
                "name": "Digimon World",
                "condition": "Like new",
                "price": 144,
                "sellerName": "admin",
                "sellerEmail": "admin@admin.com"
            }, {
                "name": "Tekken 3",
                "condition": "Great",
                "price": 999,
                "sellerName": "admin",
                "sellerEmail": "admin@admin.com"
            }];

        function getRandomGames() {
            const shuffled = games.sort(() => 0.5 - Math.random());
            return shuffled.slice(0, getRandomInt(1,shuffled.length));
        }

        let l = (await this.getPlatforms()).length;
        console.log("platform collection size:", l);

        if (l === 0) {
            let promises = [];

            for (let i = 0; i < categories.length; i++) {
                let platform = new this.platformModel({
                    name: categories[i],
                    games: getRandomGames()
                });
                promises.push(platform.save());
            }

            return Promise.all(promises);
        }
    }
}

// We export the object used to access the platforms in the database
module.exports = mongoose => new Db(mongoose);