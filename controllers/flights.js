const Flight = require('../models/flight');
const Ticket = require('../models/ticket')
const { render } = require('../server');


function index(req, res) {
    Flight.find({})
        .then((flights) => {
            flights.sort((a, b) => a.departs - b.departs);
            res.render('flights/index', { flights, title: "All"})
        })
        .catch((err) => console.log(err))
}

// function create(req, res) {
//     const flight = new Flight(req.body);
//     flight.save()
//         .then(() => res.redirect(`/flights`))
//         .catch((err) => console.log(err))
// }

function create(req, res) {
    const flight = new Flight(req.body);
    flight.save(function (err) {
        if (err) return res.render('flights/new');
        res.redirect('/flights');
    });
}

function newFlight(req, res) {
    const defaultFlight = new Flight();
    const dt = defaultFlight.departs;
    const departsDate = dt.toISOString().slice(0,16)
    res.render('flights/new', { departsDate, title: "Add New Flight" });
}

function deleteFlight(req, res) {
    Flight.findByIdAndDelete(req.params.id)
        .then(docs => {
            console.log("Deleted : ", docs);
            res.redirect('/flights')
        .catch(err => console.log(err))
        })
}

// function show(req, res) {
//     Flight.findById(req.params.id)
//         .then((flights) => {
//             flights.destination.sort((a, b) => a.arrival - b.arrival)
//             Ticket.find({ flight: flights._id })
//                 .then((tickets) => {
//                     res.render('flights/show', { ticket: tickets, flight: flights, title: 'Flight Detail' })
//                 })
//                 .catch((err) => console.log(err))
//         })
// }

function show(req, res) {
	Flight.findById(req.params.id, function(err, flight) {
		Ticket.find({ flight: flight._id }, function(err, tickets) {
			res.render('flights/show', {
				ticket: tickets, flight: flight, title: 'Flight Detail'
			});
		});
	});
}

function update(req, res) {
    for (let key in req.body) {
      if (req.body[key] === '') delete req.body[key]
    }
    Flight.findByIdAndUpdate(req.params.id, req.body, function(err, flight) {
      res.redirect(`/flights/${flight._id}`)
    })
  }

function edit(req, res) {
    Flight.findById(req.params.id, function(err, flight) {
      res.render('flights/edit', {
        flight,
        err,
        title: 'Edit Flight',
      })
    })
  }


module.exports = {
    new: newFlight,
    create,
    index,
    show,
    delete:deleteFlight,
    update,
    edit

};
