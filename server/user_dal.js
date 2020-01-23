class Db {
    /**
     * Constructors an object for accessing users in the database
     * @param mongoose the mongoose object used to create schema objects for the database
     */
    constructor(mongoose) {
        // This is the schema we need to store users in MongoDB
        const userSchema = new mongoose.Schema({
            username: String,
            password: String 
        });

        // This model is used in the methods of this class to access users
        this.userModel = mongoose.model('user', userSchema);
    }

    // async getUsers() {
    //     try {
    //         return await this.userModel.find({});
    //     } catch (error) {
    //         console.error("getUsers:", error.message);
    //         return {};
    //     }
    // }

    async getUser(id) {
        try {
            return await this.userModel.findById(id);
        } catch (error) {
            console.error("getUser:", error.message);
            return {};
        }
    }

    async createUser(newUser) {
        let user = new this.userModel(newUser);
        return user.save();
    }

}

// We export the object used to access the users in the database
module.exports = mongoose => new Db(mongoose);