const rout = require("../controllers/logic");
const Menu1 = require("../models/schema");
var arr = [];
var count = 0;
function start(app) {
  app.get("/", (req, res) => {
    res.render("dashboard", { count: count });
  });

  app.get("/regis", (req, res) => {
    res.render("regis", { errmsg: "", succmsg: "" });
  });
  app.post("/registdata", rout.register);
  app.post("/logindata", rout.login);

  app.get("/login", (req, res) => {
    res.render("login", { errmsg: "", succmsg: "" });
  });
  app.get("/cart", (req, res) => {
    res.render("cart.ejs", { data1: arr, count: count });
  });
  var arr = [];
  app.get("/addcart/:id", (req, res) => {
    let id = req.params.id;
    Menu1.findOne({ _id: id }).then((data) => {
      arr.push(data);
      count++;
      res.render("cart.ejs", { data1: arr, count: count });
    });
  });

  //delete cart
  app.get("/deletecart/:id", (req, res) => {
    let id = req.params.id;
    for (i in arr) {
      console.log(arr[i]);
      if (id == arr[i]._id) {
        arr.splice(i, 1);
        count--;
      }
    }
    res.render("cart.ejs", { data1: arr, count: count });
  });
  // app.post('/logindata',routes.login())
  app.get("/menu", (req, res) => {
    Menu1.create([
      {
        name: "Carbonara",

        image:
          "https://www.shutterstock.com/image-photo/carbonara-pizza-bacon-260nw-1078764764.jpg",
        price: "350",
        size: "SMALL",
      },
      {
        name: "Paneer Pizza",

        image:
          "https://www.shutterstock.com/image-photo/pizza-paneer-served-wooden-pan-260nw-1635512437.jpg",
        price: "550",
        size: "MEDIUM",
      },
      {
        name: "vegies pizza",

        image:
          "https://www.shutterstock.com/image-photo/pizza-vegetarian-on-plate-260nw-176980196.jpg",
        price: "1000",
        size: "LARGE",
      },
      {
        name: "Chicken Mushroom",

        image:
          "https://www.shutterstock.com/image-photo/pizza-chicken-tomato-mushrooms-260nw-217660969.jpg",
        price: "500",
        size: "MEDIUM",
      },
      {
        name: "Marinara",

        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2U8jk_XouKbhL-NvOsjLMVKb-kffu3RyivqJRWDro&s",
        price: "300",
        size: "SMALL",
      },

      {
        name: "Margherita",

        image:
          "https://media.istockphoto.com/id/1280329631/photo/italian-pizza-margherita-with-tomatoes-and-mozzarella-cheese-on-wooden-cutting-board-close-up.jpg?b=1&s=170667a&w=0&k=20&c=_t83ocY59IayPnspluN99xOM_RQ5ytAMTfXQperbL_I=",
        price: "500",
        size: "LARGE",
      },
    ]);
    Menu1.find().then(function (pizzas) {
      console.log(pizzas);
      return res.render("menu", { pizzas: pizzas, count: count });
    });
    // const pizzas = await Menu1.find()
    // return res.render('menu',{pizzas:pizzas})
  });
}
module.exports = start;
