
Handlebars.registerHelper('formatBDay', bday =>{
    const months = [
        'января','февраля','марта','апреля',
        'мая','июня','июля','августа',
        'сентября','октября','ноября','декабря',
    ];

    const [day, month] = (bday || '').split('.');
    
    return [day, months[month - 1]].join(' ');
});

Handlebars.registerHelper('formatDay', timestamp =>{
    var d = new Date(timestamp * 1000), // Convert the passed timestamp to milliseconds
        yyyy = d.getFullYear(),
        mm = ('0' + (d.getMonth() + 1)).slice(-2),  // Months are zero based. Add leading 0.
        dd = ('0' + d.getDate()).slice(-2),         // Add leading 0.
        hh = d.getHours(),
        h = hh,
        min = ('0' + d.getMinutes()).slice(-2),     // Add leading 0.
        ampm = 'AM',
        time;

    if (hh > 12) {
        h = hh - 12;
        ampm = 'PM';
    } else if (hh === 12) {
        h = 12;
        ampm = 'PM';
    } else if (hh == 0) {
        h = 12;
    }

    // ie: 2014-03-24, 3:00 PM
    time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;
    return time;
});

Handlebars.registerHelper('formatId', id =>{
    if(id < 0){
        return 'https://vk.com/public' + id * -1;
    }
    else{
        return 'https://vk.com/id' + id;
    }
});

Handlebars.registerHelper('lastSize', attachments =>{
    const size = attachments[0].photo.sizes.length - 1;
    return attachments[0].photo.sizes[size].url;
});

Handlebars.registerHelper('urlHelper', url =>{
    if(url < 0){
        return '#public/' + url;
    }else{
        return '#friends/' + url;
    }
});

import Model from './model.js';
import Router from './router.js';
import Controller from './controller.js';

(async() =>{
    try {
        await Model.login(51521661, 2|8192);
        if(location.hash.slice(1) === ""){
            Controller.newsRoute();
        }
        Router.init();
    } catch (e) {
        console.error(e);
        alert('Ошибка: ' + e.message);
    }
})();
