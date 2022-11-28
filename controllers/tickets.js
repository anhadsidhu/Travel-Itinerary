const Ticket = require('../models/ticket')
const Flight = require('../models/flight')
const flight = require('../models/flight')

module.exports = {
    new: newTicket,
    create,
    delete: deleteTicket
}


function create(req, res) {
	req.body.flight = req.params.id;
	Ticket.create(req.body, function(err, ticket) {
		res.redirect(`/flights/${req.params.id}`);
	});
}


function newTicket(req,res) {
    Flight.findById(req.params.id, function(err, flight){
    res.render('tickets/new', {title: 'Add Ticket', flight: flight })
    })
  };

  
function deleteTicket(req, res) {
    Ticket.findByIdAndDelete(req.params.tic)
        .then((docs) => {
            console.log('Deleted : ', docs)
            res.redirect(`/flights/${req.params.flight}`)
            .catch(err => console.log(err))
        });
}




module.exports = {
    new: newTicket,
    delete:deleteTicket,
    create,
};
