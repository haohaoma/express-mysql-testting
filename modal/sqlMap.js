var sql = {
	create: 'INSERT INTO test (name, password, age, date) VALUES (?,?,?,?)',
	delete: 'DELETE FROM test WHERE id=?',
	update: 'UPDATE test SET ?,?,?,? WHERE ?',
	selectAll: 'SELECT * FROM test ORDER BY',
	selectUser: 'SELECT * FROM test WHERE id=?',
	createTable: 'CREATE TABLE IF NOT EXISTS `runoob_tbl`(\
		   `id` INT UNSIGNED AUTO_INCREMENT,\
		   `name` VARCHAR(100) NOT NULL,\
		   `password` VARCHAR(40) NOT NULL,\
		   `age` INT NOT NULL,\
		   `date` DATE,\
		   PRIMARY KEY ( `runoob_id` )\
		)ENGINE=InnoDB DEFAULT CHARSET=utf8;'
};

module.exports = sql;