function getCategories($){
    var categories = [];
    $('.ban').each(function(){
        categories.push({
            name: $(this).find('span').text(),
            link: $(this).find('a').attr('href'),
            sub: getSubCategories($, this)
        });
    });
    return categories;
}

function getSubCategories($, prevElem){
    var sub = [];
    $(prevElem).next('.cats').find('ul').each(function(index, el){
        var data = getSubData($, this);
        sub.push(data);
    });
    var listCount = sub.length;
    subCategories = [];
    for(var i = 0; i < listCount; i++){
        subCategories = subCategories.concat(sub[i]);
    }
    return subCategories;
}

function getSubData($, el){
    var subCats = [];
    $(el).find('li').each(function(i, elem){
        subCats.push({
            name: $(elem).find('span').first().text(),
            link: $(elem).find('a').first().attr('href')
        });
    });
    return subCats;
}