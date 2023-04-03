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

// trigger event call
$('#btn-others-message').click(function () {
    let message = $('#others-message').val();
    connection.invoke("SendToOthers", message).catch(err => console.error(err.toString()));
});

// trigger event call
$('#btn-self-message').click(function () {
    let message = $('#self-message').val();
    connection.invoke("SendToCaller", message).catch(err => console.error(err.toString()));
});

// trigger event call
$('#btn-individual-message').click(function () {
    let message = $('#individual-message').val();
    let connectionId = $('#connection-for-message').val();
    connection.invoke("SendToIndividual", connectionId, message).catch(err => console.error(err.toString()));
});

$('#btn-group-message').click(function () {
    let message = $('#group-message').val();
    let group = $('#group-for-message').val();
    connection.invoke("SendToGroup", group, message).catch(err => console.error(err.toString()));
});

$('#btn-group-add').click(function () {
    let group = $('#group-to-add').val();
    connection.invoke("AddUserToGroup", group).catch(err => console.error(err.toString()));
});

$('#btn-group-remove').click(function () {
    let group = $('#group-to-remove').val();
    console.log(group)
    connection.invoke("RemoveUserFromGroup", group).catch(err => console.error(err.toString()));
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