/************************
 *
 */

import io from 'socket.io-client';



function get_io(msg_list) {
    var socket = io(location.origin);

    var id = 0;

    socket.on('connect', function() {
        console.log('connect');
        socket.emit('login');
    });

    socket.on('user_data', function(data) {
        data = JSON.parse(data);
        id = data.id;
    });

    socket.on('message', function(data) {
        console.log('message:' + data);
        msg_list.push(data);
    });

    socket.on('disconnect', function() {
        console.log('disconnect');
    });

    socket.sendData = function(text) {
        if (text) {
            var send_data = {
                text: text,
                id: id,
            }
            console.log(send_data);
            socket.emit('message', JSON.stringify(send_data));
        }
    }

    return socket;
}





export default get_io;
