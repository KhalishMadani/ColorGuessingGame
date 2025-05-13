const h1Element = document.getElementById('h1-element');
const getBtn = document.getElementById('get-py')
const sendBtn = document.getElementById('send-js')


getBtn.addEventListener('click', async () => {
    h1Element.innerText = await eel.sample_text()();
});

sendBtn.addEventListener('click', async () => {
    await eel.receive_data('Hello there from the web!!');
});