/**
 * CompanyController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    getAllCompany: (req, res) => {
        Company.find().exec((err, companies) => {
            res.send({ 'companies': companies });
            return;
        });
    },

    getCompanyById: (req, res) => {
        if (req.method == 'GET' && req.param('id', null) != null) {
            Company.findOne({id: req.param('id')}).exec((error, company) => {
                res.send(company);
                return;
            });
        } else {
            res.send({
                success: false,
                status: 500,
                message: 'Error in request'
            });
            return;
        }
    },

    addCompany: function (req, res) {
        if (req.method == 'POST' && req.param('company', null) != null) {
            Company.create(req.param('company'), (error, company) => {
                if (error) {
                    res.send(error);
                } else {
                    res.send({
                        success: true,
                        status: 200,
                        message: 'Successfully created 1 row in database'
                    });
                }
            });
        }
        else {
            res.send({
                success: false,
                status: 500,
                message: 'Wrong data'
            });
        }
    },

    updateCompany: function (req, res) {
        if (req.method == 'PUT' && req.param('company', null) != null) {
            Company.update({id:req.param('company')['idCompany']},req.param('company'), (error) => {
                if(error) {
                    res.send(error);
                } else {
                    res.send({
                        success: true,
                        status: 200,
                        message: 'Successfully updated 1 row in database'
                    });
                }
            });

        }
        else {
            res.send({
                success: false,
                status: 500,
                message: 'Wrong data'
            });
        }
    },

    deleteCompany: function(req, res) {
        if (req.method == 'POST' && req.param('id', null) != null) {
            Company.destroy({id: req.param('id')}).exec((error) => {
                res.send({
                    success: true,
                    status: 200,
                    message: 'Successfully deleted 1 row in database'
                });
                return;
            });
        } else {
            res.send({
                success: false,
                status: 500,
                message: 'Unable to delete'
            });
            return;
        }
    }
};