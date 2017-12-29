var express = require('express');
var mysql = require('mysql');
var config = require('../config/index.js');
var $sql = require('../modal/sqlMap.js');
var pool = mysql.createPool(config);
var router = express.Router();
router.post('/create', function (req, res) {
	pool.getConnection(function (err, connection) {
		if(err) throw err;
		var sql = $sql.create;
		var date = new Date();
		var dateText = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
		connection.query(sql, [req.body.name, req.body.password, req.body.age, dateText], function (err, results){
			if(err) {
				res.json({
					code: 10500,
					msg: 'Bad request',
					data: err
				})
			};
			connection.release();
			res.json({
				code:10200,
				msg:'Success',
				data:results
			})
		})
	})
});

router.get('/select/:id', function (req, res) {
	pool.getConnection(function (err, connection) {
		var sql = $sql.selectUser;
		connection.query(sql, [req.params.id], function (err, results){
			if(err) {
				res.json({
					code: 10500,
					msg: 'Bad request',
					data: err
				})
			};
			connection.release();
			// res.json({
			// 	code:10200,
			// 	msg:'Success',
			// 	data:results
			// })
			res.render('listone', {title: results[0].name, list:results});
		})
	})
});
router.post('/update', function (req, res) {
	pool.getConnection(function (err, connection) {
		var sql = $sql.update;
		connection.query(sql, [
			{name:req.body.name},
			{password:req.body.password},
			{age:req.body.age},
			{date:req.body.date},
			{id:req.body.uid}], function (err, results){
			if(err) {
				res.json({
					code: 10500,
					msg: 'Bad request',
					data: err
				})
			};
			connection.release();
			// res.json({
			// 	code:10200,
			// 	msg:'Success',
			// 	data:results
			// })
			res.redirect('/api/find');
		})
	})
});
router.delete('/delete', function (req, res) {
	pool.getConnection(function (err, connection) {
		var sql = $sql.delete;
		connection.query(sql, [req.query.id], function (err, results) {
			if(err) {
				res.json({
					code: 10500,
					msg: 'Bad request',
					data: err
				})
			};
			connection.release();
			res.json({
				code:10200,
				msg:'Success',
				data:results
			})
		})
	})
});

router.get('/find', function (req, res) {
	pool.getConnection(function (err, connection) {
		var order = req.query.order ? req.query.order : 'name';
		var sort = req.query.sort == 'false' ? 'DESC' : 'ASC';
		var sql = $sql.selectAll + ' ' + order + ' ' + sort;
		connection.query(sql, function (err, results){
			if(err) {
				res.json({
					code: 10500,
					msg: 'Bad request',
					data: err
				})
			};
			connection.release();
			res.render('list', {title: 'list', list:results});
		})
	})
});

module.exports = router;