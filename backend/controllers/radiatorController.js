// give me a controller for radiators
const mongoose = require('mongoose')
const fs = require('fs')
const Radiator = require('../models/radiator')
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)

const getRadiators = async(req, res) => {
    const radiators = await Radiator.find({}).sort({createdAt: -1})
    res.status(200).json(radiators)
}

const getRadiator = async(req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such radiator'})
    }

    const radiator = await Radiator.findById(id)

    if(!radiator){
        return res.status(404).json({error: 'No such radiator'})
    }

    res.status(200).json(radiator)
}

const createRadiator = async(req, res) => {    
    const radiatorObj = {
        name: req.body.name,
        price: req.body.price,
        stock: req.body.stock,
        img: {
            data: fs.readFileSync('./uploads/' + req.file.filename),
            contentType: 'image/jpg'
        }
    }

    const radiator = await Radiator.create(radiatorObj)

    if(radiator) {
       res.status(200).json(radiator)
    }
    else {
        res.status(400).json({ error: 'Fields {X}' })
    }
    fs.rmSync(('./uploads/' + req.file.filename))

}

const updateRadiator = async(req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Object not found'})
    }

    const radiator = await Radiator.findOneAndUpdate({_id: id},{
        ...req.body
    })

    if(!radiator) {
        return res.status(404).json({error: 'Radiator not found'})
    }

    res.status(200).json(radiator)
}

const deleteRadiator = async(req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Object not found'})
    }

    const radiator = await Radiator.findOneAndDelete({_id: id})

    if(!radiator) {
        return res.status(404).json({error: 'Radiator not found'})
    }

    res.status(200).json(radiator)
}

const checkoutSession = async (req, res) => {
    const ids = req.body.items.map((item) => item.id)

    console.log(ids)

    const dbData = await Radiator.find({ '_id': { $in: ids } })

    console.log(dbData)

    const data = await dbData.map(({ name, stock, price }) => {
        return {
          price_data: {
            currency: "inr",
            product_data: {
              name: name,
            },
            unit_amount: price * 100,
          },
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
            maximum: stock,
          },
          quantity: 1,
        }
    })

    

    try {
      // Create a checkout session with Stripe
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        // For each item use the id to get it's information
        // Take that information and convert it to Stripe's format
        line_items: data,
        mode: "payment",
        // Set a success and cancel URL we will send customers to
        // These must be full URLs
        // In the next section we will setup CLIENT_URL
        success_url: `${process.env.CLIENT_URL}`,
        cancel_url: `${process.env.CLIENT_URL}`,
      })
      res.json({ url: session.url })
    } catch (e) {
      // If there is an error send it to the client
      res.status(500).json({ error: e.message })
    }

    // const session = await stripe.checkout.sessions.retrieve(
    //     limit: 1,
    // );
    //   if (session.payment_status === "paid") {
    //     const stock = dbData(({ stock }) => {
    //         stock = stock - quantity
    //     })
    //     console.log(stock)
    //   }
    // if (session) {
    //     const stock = dbData(({ stock }) => {
    //         stock = stock - quantity
    //     })
    //     console.log(session)
    // }
}

module.exports = {
    getRadiator,
    getRadiators,
    createRadiator,
    updateRadiator,
    deleteRadiator,
    checkoutSession
}