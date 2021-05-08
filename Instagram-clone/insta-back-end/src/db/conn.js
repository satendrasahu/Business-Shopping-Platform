const mongoose = require("mongoose");

mongoose.connect(

    "mongodb+srv://satendrasah:mTOmZOCXge2Cj5ch@cluster0.jltj0.mongodb.net/TheBusiness?retryWrites=true&w=majority", {
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


   // mongodb+srv://satendrasah:<password>@cluster0.jltj0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority









// const mongoose = require("mongoose");

// mongoose.connect(

//     "mongodb://localhost:27017/instagram", {
//     useCreateIndex: true,
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false
// })

//     .then(() => {
//         console.log("db connection is successful");
//     }).catch((error) => {
//         console.log("No Connection");
//         console.log(error);
//     })

//password : mTOmZOCXge2Cj5ch
