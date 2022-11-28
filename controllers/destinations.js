const Flight = require('../models/flight');


function newDestination(req, res) {
    res.render('flights/show');
}


function create(req, res) {
  Flight.findById(
    req.params.id,

    function (err, flight) {
      flight.destination.push(req.body);
      flight.save(function (err) {
        if (err) {
          console.log(err);
        }
        res.redirect(`/flights/${flight._id}`);
      });
    }
  );
}

function deleteDestination (req, res) {
  Flight.findById(req.params.flight)
      .then(flight => {
          let idx = flight.destination.findIndex(dest => dest._id == req.params.dest)
          flight.destination.splice(idx, 1)
          flight.save()
              .then(res.redirect(`/flights/${req.params.flight}`))
              .catch(err => console.log(err))
  })
}


module.exports = {
    create,
    newDestination,
    delete:deleteDestination
    // delete:deleteDestination
}
