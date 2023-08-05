const imgForm=document.getElementById('imgForm')
console.log(imgForm)
console.log('connected the script')


imgForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    console.log('submit is clicked')
    const formData = new FormData(e.target);

    fetch('http://localhost:8080/upload',{
        method:'POST',
        body: formData,
        enctype:"multipart/form-data"
    })
    .then((response) => {
        // Response cannot be accessed with mode: 'no-cors'
        console.log('Request sent successfully, but no response data accessible.');
        console.log(response)
      })
      .catch((error) => {
        console.error('Error sending request:', error);
        // Handle the error, if any
      });

})