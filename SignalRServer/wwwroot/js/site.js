// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.


const connection = new signalR.HubConnectionBuilder()
    .withUrl("/learningHub")
    .configureLogging(signalR.LogLevel.Information)
    .build();

    // event listener
connection.on("ReceiveMessage", (message) => {
    $('#signalr-message-panel').prepend($('<div />').text(message));
});

    // trigger event call
$('#btn-broadcast').click(function () {
    let message = $('#broadcast').val();
    connection.invoke("BroadcastMessage", message).catch(err => console.error(err.toString()));
});

async function start() {
    try {
        await connection.start();
        console.log('connected');
    } catch (err) {
        console.log(err);
        setTimeout(() => start(), 5000); // try to start again if there is an error while starting
    }
};

connection.onclose(async () => {
    await start();
});

start();