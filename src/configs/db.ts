const mongoose = require('mongoose');

const connect = async () => {
    try {
      const connection  = await mongoose.connect('mongodb://localhost:27017/tracker', { 
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      console.log('connected to db')
      return connection;
    } catch (error) {
        throw error;
    }
};

export default connect();
