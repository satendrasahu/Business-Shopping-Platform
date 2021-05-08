const mongoose = require("mongoose");

mongoose.connect(

    "mongodb+srv://satendrasah:mTOmZOCXge2Cj5ch@cluster0.jltj0.mongodb.net/TheShopping?retryWrites=true&w=majority", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

    .then(() => {
        console.log("db connection is successful");
    }).catch((error) => {
        console.log("No Connection");
        console.log(error);
    })

