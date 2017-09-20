function getResults($){
    var results = [];
    $('.result-row').each(function(){
        results.push({
            link: $(this).find('a').first().attr('href'),
            price: $(this).find('.result-price').html(),
            title: $(this).find('.result-title').html(),
            location: $(this).find('.result-hood').html(),
        })
    });
    return results;
}