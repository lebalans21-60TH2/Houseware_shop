const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const SHA1 = require("crypto-js/sha1");
const multer = require("multer");
const moment = require("moment");
const formidable = require("express-formidable");
const cloudinary = require("cloudinary");
const fs = require("fs");
const path = require("path");
require("dotenv").config();
const app = express();
const passport = require("passport");
const mongoose = require("mongoose");
const async = require("async");
const cors = require("cors")
const stripe =require("stripe")(process.env.STRIPE_SECRET_TEST)


mongoose.Promise = global.Promise;
mongoose
    .connect(process.env.DATABASE)
    .then(() => console.log("MongoDB Connected!"))
    .catch(err => console.log(err));



app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static("client/build"));
app.use(cors())
// UTILS
const {sendEmail} = require("./utils/mail/index");
cloudinary.config({
    cloud_name: "dyahyvzfh",
    api_key: "473784839987125",
    api_secret: "ExVo_CXNOROAan1BnQk1lNYiqXY"
});
// STORAGE MULTER CONFIG
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
    // fileFilter:(req,file,cb)=>{

    //     const ext = path.extname(file.originalname)
    //     if(ext !== '.jpg' && ext !== '.png'){
    //         return cb(res.status(400).end('only jpg, png is allowed'),false);
    //     }

    //     cb(null,true)
    // }
});
// Models
const {User} = require("./models/user");
const {Brand} = require("./models/brand");
const {Wood} = require("./models/wood");
const {Product} = require("./models/product");
const {Payment} = require("./models/payment");
// Middleware
const {auth} = require("./middleware/auth");
const {authAdmin} = require("./middleware/authAdmin");
const {admin} = require("./middleware/admin");
require("./services/passport");
require("./routes/authRoutes")(app);

//////////PAYMENT///
app.post("/payment", cors(), async (req, res) =>{
    let { amount, id } = req.body
    try {
		const payment = await stripe.paymentIntents.create({
			amount,
			currency: "vnd",
			description: "Spatula company",
			payment_method: id,
			confirm: true
		})
		console.log("Payment", payment)
		res.json({
			message: "Payment successful",
			success: true
		})
	} catch (error) {
		console.log("Error", error)
		res.json({
			message: "Payment failed",
			success: false
		})
	}

})
////////////////////////////////////////
///              REPORT
///////////////////////////////////////
app.get("/api/payments/getall", (req, res) => {
    Payment.find({}, (err, types) => {
        if (err) return res.status(400).send(err);
        return res.status(200).send(types);
    }).sort([["date", "desc"]]);
});
// Defined update
app.post("/api/payment/update/:id", authAdmin, admin, (req, res, next) => {
    Payment.findById(req.params.id, (err, payment) => {
        if (!payment) {
            return next(new Error("could not load Document"));
        } else {
            // do your update here
            payment.status = req.body.status;
            payment
                .save()
                .then(payment => {
                    return res.status(200).json({
                        success: true,
                        payment
                    });
                })
                .catch(err => {
                    res.status(400).send("unable to update the database");
                });
        }
    });
});
app.post("/api/payment/dateRange", (req, res) => {
    var todayEnd = new Date(req.body.end);
    todayEnd.setUTCHours(23);
    todayEnd.setUTCMinutes(59);
    todayEnd.setUTCSeconds(59);
    todayEnd.setUTCMilliseconds(999);
    var nowStart = new Date(Date.now());
    nowStart.setUTCHours(0);
    nowStart.setUTCMinutes(0);
    nowStart.setUTCSeconds(0);
    nowStart.setUTCMilliseconds(000);
    var nowEnd = new Date(Date.now());
    nowEnd.setUTCHours(23);
    nowEnd.setUTCMinutes(59);
    nowEnd.setUTCSeconds(59);
    nowEnd.setUTCMilliseconds(999);
    Payment.aggregate([
        {
            $match: {
                date: {
                    $gte: req.body.start ? new Date(req.body.start) : new Date(nowStart),
                    $lte: req.body.end ? new Date(todayEnd) : new Date(nowEnd)
                }
            }
        },

        {
            $group: {
                _id: {$dateToString: {format: "%Y-%m-%d", date: "$date"}},
                amount: {$sum: "$amount"}
            }
        }
    ]).exec((err, results) => {
        if (err) return res.status(400).send(err);
        res.status(200).json({
            size: results.length,
            results
        });
    });
});
// Week
app.post("/api/payment/week", (req, res) => {
    var date = new Date(req.body.date);
    date.setUTCHours(23);
    date.setUTCMinutes(59);
    date.setUTCSeconds(59);
    date.setUTCMilliseconds(999);
    var newdate = new Date(date).getUTCDate() - 7;
    var dateweek = new Date(date).setUTCDate(newdate);
    Payment.aggregate([
        {
            $match: {
                date: {
                    $gte: new Date(dateweek),
                    $lte: new Date(date)
                }
            }
        },

        {
            $group: {
                _id: {$dateToString: {format: "%Y-%m-%d", date: "$date"}},
                amount: {$sum: "$amount"}
            }
        }
    ]).exec((err, results) => {
        if (err) return res.status(400).send(err);
        res.status(200).json({
            size: results.length,
            results
        });
    });
});
// year
app.post("/api/payment/year", (req, res) => {
    var yearNow = `${new Date(Date.now()).getUTCFullYear()}-01-01`;
    var newYearNow = new Date(yearNow).getUTCDate() + 365;
    var yearNowNow = new Date(yearNow).setUTCDate(newYearNow);
    var date = new Date(req.body.year);
    var year = new Date(date).getUTCDate() + 365;
    var newYear = new Date(date).setUTCDate(year);
    console.log(yearNow);
    console.log(new Date(yearNowNow));
    Payment.aggregate([
        {
            $match: {
                date: {
                    $gte: req.body.year ? new Date(date) : new Date(yearNow),
                    $lte: req.body.year ? new Date(newYear) : new Date(yearNowNow)
                }
            }
        },

        {
            $group: {
                _id: {$dateToString: {format: "%m", date: "$date"}},
                amount: {$sum: "$amount"}
            }
        }
    ]).exec((err, results) => {
        if (err) return res.status(400).send(err);
        res.status(200).json({
            size: results.length,
            results
        });
    });
});
// product
app.post("/api/payment/product", (req, res) => {
    var todayEnd = new Date(req.body.end);
    todayEnd.setUTCHours(23);
    todayEnd.setUTCMinutes(59);
    todayEnd.setUTCSeconds(59);
    todayEnd.setUTCMilliseconds(999);
    var nowStart = new Date(Date.now());
    nowStart.setUTCHours(0);
    nowStart.setUTCMinutes(0);
    nowStart.setUTCSeconds(0);
    nowStart.setUTCMilliseconds(000);
    var nowEnd = new Date(Date.now());
    nowEnd.setUTCHours(23);
    nowEnd.setUTCMinutes(59);
    nowEnd.setUTCSeconds(59);
    nowEnd.setUTCMilliseconds(999);
    Payment.aggregate([
        {
            $match: {
                date: {
                    $gte: req.body.start ? new Date(req.body.start) : new Date(nowStart),
                    $lte: req.body.end ? new Date(todayEnd) : new Date(nowEnd)
                }
            }
        },
        {$unwind: {path: "$product", preserveNullAndEmptyArrays: true}},
        {
            $group: {
                _id: "$product.name",
                amount: {
                    $sum: {
                        $multiply: ["$product.quantity", "$product.price"] //nhan
                    }
                }
            }
        }
    ]).exec((err, results) => {
        if (err) return res.status(400).send(err);
        res.status(200).json({
            size: results.length,
            results
        });
    });
});
// Customer
app.post("/api/payment/customer", (req, res) => {
    var todayEnd = new Date(req.body.end);
    todayEnd.setUTCHours(23);
    todayEnd.setUTCMinutes(59);
    todayEnd.setUTCSeconds(59);
    todayEnd.setUTCMilliseconds(999);
    var nowStart = new Date(Date.now());
    nowStart.setUTCHours(0);
    nowStart.setUTCMinutes(0);
    nowStart.setUTCSeconds(0);
    nowStart.setUTCMilliseconds(000);
    var nowEnd = new Date(Date.now());
    nowEnd.setUTCHours(23);
    nowEnd.setUTCMinutes(59);
    nowEnd.setUTCSeconds(59);
    nowEnd.setUTCMilliseconds(999);
    Payment.aggregate([
        {
            $match: {
                date: {
                    $gte: req.body.start ? new Date(req.body.start) : new Date(nowStart),
                    $lte: req.body.end ? new Date(todayEnd) : new Date(nowEnd)
                }
            }
        },
        {$unwind: {path: "$user", preserveNullAndEmptyArrays: true}},
        {
            $group: {
                _id: "$user.name",
                amount: {$sum: "$amount"}
            }
        }
    ]).exec((err, results) => {
        if (err) return res.status(400).send(err);
        res.status(200).json({
            size: results.length,
            results
        });
    });
});
////////////////////////////////////////
///              PRODUCT
///////////////////////////////////////
app.post("/api/item/shop", (req, res) => {
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sorBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};
    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === "price") {
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                };
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }
    findArgs["publish"] = true;
    findArgs["quantity"] = {$gt: 0};
    Product.find(findArgs)
        .populate("brand")
        .populate("wood")
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, articles) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({
                size: articles.length,
                articles
            });
        });
});

app.get("/api/item/articles", (req, res) => {
    let order = req.query.order ? req.query.order : "asc";
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    let limit = req.query.limit ? parseInt(req.query.limit) : 100;
    let findArgs = {};
    findArgs["publish"] = true;
    findArgs["quantity"] = {$gt: 0};
    Product.find(findArgs)
        .populate("brand")
        .populate("wood")
        .sort([[sortBy, order]])
        .limit(limit)
        .exec((err, articles) => {
            if (err) return res.status(400).send(err);
            return res.status(200).send(articles);
        });
});

app.get("/api/item/articles_by_id", (req, res) => {
    let type = req.query.type;
    let items = req.query.id;

    if (type === "array") {
        let ids = req.query.id.split(",");
        items = [];
        items = ids.map(item => {
            return mongoose.Types.ObjectId(item);
        });
    }

    Product.find({_id: {$in: items}})
        .populate("brand")
        .populate("wood")
        .exec((err, docs) => {
            return res.status(200).send(docs);
        });
});

app.post("/api/item/article", authAdmin, admin, (req, res) => {
    const product = new Product(req.body);

    product.save((err, doc) => {
        if (err) return res.json({success: false, err});

        return res.status(200).json({
            success: true,
            article: doc
        });
    });
});
app.get("/api/item/products", (req, res) => {
    Product.find({}, (err, types) => {
        if (err) return res.status(400).send(err);
        return res.status(200).send(types);
    })
        .populate("brand")
        .populate("wood");
});

app.post("/api/item/update/:id", authAdmin, admin, (req, res, next) => {
    Product.findByIdAndUpdate(req.params.id, req.body, (err, product) => {
        if (err) return next(err);
        return res.status(200).json({
            success: true,
            product
        });
    });
});
////////////////////////////////////////
///              Types
///////////////////////////////////////
app.post("/api/item/type", authAdmin, admin, (req, res) => {
    const type = new Wood(req.body);
    type.save((err, doc) => {
        if (err) return res.json({success: false, err});
        return res.status(200).json({
            success: true,
            wood: doc
        });
    });
});
app.get("/api/item/types", (req, res) => {
    Wood.find({}, (err, types) => {
        if (err) return res.status(400).send(err);
        return res.status(200).send(types);
    });
});
app.get("/api/type/delete/:id", (req, res) => {
    Wood.findByIdAndRemove({_id: req.params.id}, (err, product) => {
        if (err) {
            res.json(err);
        } else {
            res.json("Successfully removed");
        }
    });
});
// Defined update
app.post("/api/type/update/:id", authAdmin, admin, (req, res) => {
    Wood.findById(req.params.id, (err, item) => {
        if (!item) {
            return next(new Error("could not load Document"));
        } else {
            // do your update here
            item.name = req.body.name;
            item
                .save()
                .then(item => {
                    res.json("Update complete");
                })
                .catch(err => {
                    res.status(400).send("unable to update the database");
                });
        }
    });
});
////////////////////////////////////////
///              BRAND
///////////////////////////////////////
app.post("/api/item/brand", authAdmin, admin, (req, res) => {
    const brand = new Brand(req.body);
    brand.save((err, doc) => {
        if (err) return res.json({success: false, err});
        res.status(200).json({
            success: true,
            brand: doc
        });
    });
});
app.get("/api/item/brands", (req, res) => {
    Brand.find({}, (err, brands) => {
        if (err) return res.status(400).send(err);
        return res.status(200).send(brands);
    });
});
app.get("/api/brand/delete/:id", (req, res) => {
    Brand.findByIdAndRemove({_id: req.params.id}, (err, product) => {
        if (err) {
            res.json(err);
        } else {
            res.json("Successfully removed");
        }
    });
});
// Defined update
app.post("/api/brand/update/:id", authAdmin, admin, (req, res) => {
    Brand.findById(req.params.id, (err, item) => {
        if (!item) {
            return next(new Error("could not load Document"));
        } else {
            // do your update here
            item.name = req.body.name;
            item
                .save()
                .then(item => {
                    res.json("Update complete");
                })
                .catch(err => {
                    res.status(400).send("unable to update the database");
                });
        }
    });
});
////////////////////////////////////////
///      USER
///////////////////////////////////////
app.get("/api/client/getAllUsers", (req, res) => {
    User.find({}, (err, users) => {
        if (err) return res.status(400).send(err);
        return res.status(200).send(users);
    });
});
app.post("/api/client/update/:id", authAdmin, admin, (req, res, next) => {
    User.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
        if (err) return next(err);
        return res.status(200).json({
            success: true,
            user
        });
    });
});
app.post("/api/client/reset_user", (req, res) => {
    User.findOne({email: req.body.email}, (err, user) => {
        if(!user){
            return res.json({
                success: false,
                message: "Sorry, token bad please try again!."
            });
        }
        user.generateResetToken((err, user) => {
            if (err) return res.json({success: false, err});
            // sendEmail(user.email, user.name, null, "reset_password", user);
            sendEmail(user.email, user.name, null, "reset_password", user);
            return res.json({success: true});
        });
    });
   
});

app.post("/api/client/reset_password", (req, res) => {
    var today = moment()
        .startOf("day")
        .valueOf();
    User.findOne(
        {
            // resetToken: req.body.resetToken,
            // resetTokenExp: {
            //     $gte: today
            resetToken: req.body.resetToken,
            resetTokenExp: {
                $gte: today
            }
        },
        (err, user) => {
            if (!user)
                return res.json({
                    success: false,
                    message: "Sorry, token bad please try again!."
                });

            user.password = req.body.password;
            user.resetToken = "";
            user.resetTokenExp = "";

            user.save((err, doc) => {
                if (err) return res.json({success: false, err});
                return res.status(200).json({
                    success: true
                });
            });
        }
    );
});
app.post("/api/client/update_password", auth, (req, res) => {
   
    User.findOneAndUpdate(
        {_id: req.user._id,
        id: req.body.id,}, {new: true}, (err, user) => {
            if (!user)
                return res.json({
                    success: false,
                    message: "Sorry, token bad please try again!."
                });
                user.comparePassword(req.body.password, (err, isMatch) => {
                            if (!isMatch)
                                return res.json({success: false, message: "Password cũ không khớp!"});
            user.password = req.body.newpassword;
            user.save((err, doc) => {
                if (err) return res.json({success: false, err});
                return res.status(200).send({
                    success: true
                });
            });
        });
    
            
        }
       
        
        
    );
    });

app.get("/api/client/auth", auth, (req, res) => {
    res.status(200).json({
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        id: req.user._id,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        cart: req.user.cart,
        history: req.user.history
    });
});
app.get("/api/client/authAdmin", authAdmin, (req, res) => {
    res.status(200).json({
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        id: req.user._id,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        cart: req.user.cart,
        history: req.user.history
    });
});
app.post("/api/client/register", (req, res) => {
    const user = new User(req.body);
    user.save((err, doc) => {
        if (err) return res.json({success: false, err});
        sendEmail(doc.email, doc.name, null, "welcome");
        res.status(200).json({
            success: true,
            userdata: doc
        });
    });
});
app.post("/api/client/login", (req, res) => {
    //find the email
    User.findOne({email: req.body.email}, (err, user) => {
        if (!user)
            return res.json({
                loginSuccess: false,
                message: "Auth failes, email not found"
            });
        // check password
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({loginSuccess: false, message: "Password is wrong"});
            // generate Token
            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                if (user.role === 1) {
                    res
                        .cookie("ad_auth", user.token)
                        .status(200)
                        .json({
                            loginSuccess: true,
                            role: user.role
                        });
                } else {
                    res
                        .cookie("w_auth", user.token)
                        .status(200)
                        .json({
                            loginSuccess: true,
                            role: user.role
                        });
                }
            });
        });
    });
});
app.get("/api/client/logout", auth, (req, res) => {
    User.findByIdAndUpdate(
        {
            _id: req.user._id
        },
        {token: ""},
        (err, doc) => {
            if (err) return res.json({success: false, err});
            return res.status(200).send({
                success: true
            });
        }
    );
});

app.post("/api/client/update_profile", auth, (req, res) => {
    User.findOneAndUpdate(
        {_id: req.user._id},
        {
            $set: req.body
        },
        {new: true},
        (err, doc) => {
            if (err) return res.json({success: false, err});
            return res.status(200).send({
                success: true
            });
        }
    );
});


app.post("/api/client/addToCart", auth, (req, res) => {
    User.findOne({_id: req.user._id}, (err, doc) => {
        let duplicate = false;
        doc.cart.forEach(item => {
            if (item.id == req.query.productId) {
                duplicate = true;
            }
        });

        if (duplicate) {
            User.findOneAndUpdate(
                {
                    _id: req.user._id,
                    "cart.id": mongoose.Types.ObjectId(req.query.productId)
                },
                {
                    $inc: {"cart.$.quantity": req.body.quantity ? req.body.quantity : 1}
                },
                {new: true},
                (err, user) => {
                    if (err) return res.json({success: false, err});
                    let cart = user.cart;
                    let array = cart.map(item => {
                        return mongoose.Types.ObjectId(item.id);
                    });
                    Product.find({_id: {$in: array}})
                        .populate("brand")
                        .populate("wood")
                        .exec((err, cartDetail) => {
                            return res.status(200).json({
                                cartDetail,
                                cart
                            });
                        });
                }
            );
        } else {
            User.findOneAndUpdate(
                {_id: req.user._id},
                {
                    $push: {
                        cart: {
                            id: mongoose.Types.ObjectId(req.query.productId),
                            quantity: req.body.quantity ? req.body.quantity : 1,
                            price: mongoose.Types.ObjectId(req.query.price),
                            date: Date.now()
                        }
                    }
                },
                {new: true},
                (err, user) => {
                    if (err) return res.json({success: false, err});
                    let cart = user.cart;
                    let array = cart.map(item => {
                        return mongoose.Types.ObjectId(item.id);
                    });
                    Product.find({_id: {$in: array}})
                        .populate("brand")
                        .populate("wood")
                        .exec((err, cartDetail) => {
                            return res.status(200).json({
                                cartDetail,
                                cart
                            });
                        });
                }
            );
        }
    });
});
app.post("/api/client/updateCart", auth, (req, res) => {
    User.findOne({_id: req.user._id}, (err, doc) => {
        let duplicate = false;
        doc.cart.forEach(item => {
            if (item.id == req.query.productId) {
                duplicate = true;
            }
        });
        if (duplicate) {
            User.findOneAndUpdate(
                {
                    _id: req.user._id,
                    "cart.id": mongoose.Types.ObjectId(req.query.productId)
                },
                {
                    $inc: {"cart.$.quantity": req.body.key === 1 ? 1 : -1}
                },
                {new: true},
                (err, user) => {
                    let cart = user.cart;
                    let array = cart.map(item => {
                        return mongoose.Types.ObjectId(item.id);
                    });
                    Product.find({_id: {$in: array}})
                        .populate("brand")
                        .populate("wood")
                        .exec((err, cartDetail) => {
                            return res.status(200).json({
                                cartDetail,
                                cart
                            });
                        });
                }
            );
        }
    });
});
app.get("/api/client/removeFromCart", auth, (req, res) => {
    User.findOneAndUpdate(
        {_id: req.user._id},
        {$pull: {cart: {id: mongoose.Types.ObjectId(req.query._id)}}},
        {new: true},
        (err, doc) => {
            let cart = doc.cart;
            let array = cart.map(item => {
                return mongoose.Types.ObjectId(item.id);
            });

            Product.find({_id: {$in: array}})
                .populate("brand")
                .populate("wood")
                .exec((err, cartDetail) => {
                    return res.status(200).json({
                        cartDetail, // list products
                        cart
                    });
                });
        }
    );
});
app.get("/api/payment/delete/:id", (req, res) => {
    Payment.findByIdAndRemove({_id: req.params.id}, (err, product) => {
        if (err) {
            res.json(err);
        } else {
            res.json({success: true});
        }
    });
});
app.post("/api/client/successBuy", auth, (req, res) => {
    let history = [];
    let transactionData = {};
    const date = new Date();
    const po = `PO-${date.getSeconds()}${date.getMilliseconds()}-${SHA1(
        req.user._id
    )
        .toString()
        .substring(0, 8)}`;
    // user history
    req.body.cartDetail.forEach(item => {
        history.push({
            porder: po,
            dateOfPurchase: Date.now(),
            name: item.name,
            brand: item.brand.name,
            id: item._id,
            price: item.price,
            quantity: item.quantityCart,
            paymentId: req.body.paymentData.paymentID,
            paymentMethod: req.body.paymentData.method
        });
    });

    // PAYMENTS DASH
    transactionData.user = {
        id: req.user._id,
        name: req.user.name,
        lastname: req.user.lastname,
        email: req.user.email
    };
    transactionData.data = {
        ...req.body.paymentData,
        porder: po
    };
    transactionData.product = history;
    transactionData.amount = req.body.amount;
    User.findOneAndUpdate(
        {_id: req.user._id},
        {$push: {history: history}, $set: {cart: []}},
        {new: true},
        (err, user) => {
            if (err) return res.json({success: false, err});

            const payment = new Payment(transactionData);
            payment.save((err, doc) => {
                if (err) return res.json({success: false, err});
                let products = [];
                doc.product.forEach(item => {
                    products.push({id: item.id, quantity: item.quantity});
                });

                async.eachSeries(
                    products,
                    (item, callback) => {
                        Product.update(
                            {_id: item.id},
                            {
                                $inc: {
                                    sold: item.quantity,
                                    quantity: -item.quantity
                                }
                            },
                            {new: false},
                            callback
                        );
                    },
                    err => {
                        if (err) return res.json({success: false, err});
                        sendEmail(user.email, user.name, null, "purchase", transactionData);
                        res.status(200).json({
                            success: true,
                            cart: user.cart,
                            cartDetail: []
                        });
                    }
                );
            });
        }
    );
});

//search product by productName
app.get("/api/item/searchProduct/:name", (req, res) => {
    Product.find(
        {name: {$regex: new RegExp(req.params.name, "i")}},
        (err, product) => {
            if (err) {
                res.json({success: false, message: err});
            } else {
                if (product.length <= 0) {
                    res.json({success: false, message: "No product found."});
                } else {
                    res.json({success: true, product: product});
                }
            }
        }
    );
});

//=================================
//             ADMIN
//=================================
const upload = multer({storage: storage}).single("file");

app.post("/api/client/uploadfile", auth, admin, (req, res) => {
    upload(req, res, err => {
        if (err) {
            return res.json({success: false, err});
        }
        return res.json({success: true});
    });
});
app.post("/api/client/uploadimage", authAdmin, admin, formidable(), (req, res) => {
    cloudinary.uploader.upload(
        req.files.file.path,
        result => {
            res.status(200).send({
                public_id: result.public_id,
                url: result.url
            });
        },
        {
            public_id: `${Date.now()}`,
            resource_type: "auto"
        }
    );
});
app.get("/api/item/delete/:id", (req, res) => {
    Product.findByIdAndRemove({_id: req.params.id}, (err, product) => {
        if (err) {
            res.json(err);
        } else {
            res.json("Successfully removed");
        }
    });
});
app.get("/api/client/removeimage", authAdmin, admin, (req, res) => {
    let image_id = req.query.public_id;
    cloudinary.uploader.destroy(image_id, (error, result) => {
        if (error) return res.json({succes: false, error});
        res.status(200).send("ok");
    });
});

app.get("/api/client/admin_files", auth, admin, (req, res) => {
    const dir = path.resolve(".") + "/uploads/";
    fs.readdir(dir, (err, items) => {
        return res.status(200).send(items);
    });
});

app.get("/api/client/download/:id", auth, admin, (req, res) => {
    const file = path.resolve(".") + `/uploads/${req.params.id}`;
    res.download(file);
});

// DEFAULT
if (process.env.NODE_ENV === "production") {
    const path = require("path");
    app.get("/*", (req, res) => {
        res.sendfile(path.resolve(__dirname, "../client", "build", "index.html"));
    });
}
const port = process.env.PORT || 7000;

app.listen(port, () => {
    console.log(`Server running at ${port}`);
});

// Handling uncaught Exception
process.on("uncaughtException",(err) =>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server for Handling uncaught Exception`);
})
process.on("unhandledRejection", (err) =>{
    console.log(`Shutting down server for ${err.message}`);
    console.log(`Shutting down the server due to Unhandled promise rejection`);
    server.close(() =>{
        process.exit(1);
    });
});