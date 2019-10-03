/* Needed because of https://github.com/airbnb/javascript/issues/1632 */
/* eslint no-restricted-globals: 0 */

'use strict';

let port;
let pushMessage;

self.addEventListener('push', function(event) {
    pushMessage = event.data.json();
    let data = event.data.json();
    console.log('data',data)
    let browserNotification  = {};
    if( data.type == "step_first_email"){
          return false;
    }
    browserNotification.subject = 'add Comment ';
    var url = 'birdtest.nl';

    if(!data.ticket_id && data.id){
        data.ticket_id = data.id;
    }
    browserNotification.tag = data.ticket_id;
    data.link = data.userRoom + '.' + url + '/ticket/'+ data.ticket_id;

    if(data.send_by == "note" ){
        browserNotification.subject = 'add Note ';
    }

    if(( data.send_by == "replise"  )){
        browserNotification.subject = 'add comment ';
    }

    if(data.send_by == "ticket" ){
        browserNotification.subject = 'add new ticket';
    }


    if(data.send_by == "ticketAssign" ){
        browserNotification.subject = 'ticket Assign';
    }
    data.link = data.userRoom + '.' + url + '/ticket/'+data.ticket_id;
    browserNotification.tag = data.ticket_id;

    browserNotification.body = data.message.replace(/(<([^>]+)>)/ig, "") + ' # '+data.ticket_id;
    browserNotification.data = data;
    if(data.type != "ticket_history" && data.type != "step_first_email" && data.type != 'assign_to_me' && data.type != 'assign_to_someone_else' && data.type != 'mentioned_in_ticket'){
        browserNotification.icon = 'logo.png';
        if (port) {
            port.postMessage(pushMessage);
        }

        event.waitUntil(self.registration.showNotification(browserNotification.subject,browserNotification));
    }

});

self.onmessage = function(e) {
    port = e.ports[0];
    if (pushMessage) {
        // Push message arrived before the page finished loading.
        port.postMessage(pushMessage);
    }
};

self.addEventListener('notificationclick', (event) => {
    var id = event.notification.tag;
    var link = 'https://'+event.notification.data.link || "";
    event.waitUntil(
        clients.matchAll({
            type: "window"
        })
            .then(function(clientList) {
                event.notification.close();
                for (var i = 0; i < clientList.length; i++) {
                    var client = clientList[i];
                    if (client.url == '/' && 'focus' in client)
                        return client.focus();
                }
                if (clients.openWindow) {
                    return clients.openWindow(link ? link : '');
                }
            })
    );
});
