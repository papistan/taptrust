
module.exports = {
  
    logout(req, res) {
        req.session.destroy((err) => {
            res.status(400).send(error)
        });
    }
}