
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Letz' });
};

exports.simple = function(req,res){
	res.render('simple', {title: 'Letz'});
};