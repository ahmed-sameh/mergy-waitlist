class App {
  dialogNameInput = document.getElementById('name');
  dialogMailInput = document.getElementById('email');
  dialogRequestBtn = document.getElementById('request-btn');

  constructor() {
    this.navbarActivate();


    // adding users to watch list after submit and validate the data
    document.getElementById('request-btn').addEventListener('click', () => {
      this.onAddToWaitList(this.dialogNameInput.value ,this.dialogMailInput.value);
      delete this.dialogRequestBtn.dataset.bsDismiss;
    })

    // validate users mail
    this.dialogMailInput.addEventListener('keyup', () => {
      if(this.dialogMailInput.value.includes('@') && this.dialogMailInput.value.includes('.com')){
        this.dialogRequestBtn.dataset.bsDismiss="modal";
      }
    })


    // document.getElementById('contact-sub-btn').addEventListener('click', this.onContactUs)
  }

  // styles the activate link
  navbarActivate() {
    document.getElementById('nav-list').addEventListener('click', event => {
      const navItem = event.target.closest('.nav-link')

      if(!navItem.classList.contains('active')) {
        document.querySelectorAll('.nav-link').forEach(link => {
          link.classList.remove('active')
        })
        navItem.classList.add('active')
      }
    })
  }


  // validate user data and adding to waiting list
  onAddToWaitList(name, mail) {
    const errorBlock = document.getElementById('error-block');
    const userData = {name, email: mail}
    if(name && mail.includes('@') && mail.includes('.com')) {

      if(errorBlock.classList.contains('show')) {
        errorBlock.classList.remove('show')
      }
      
      fetch('https://ddstore.b4a.io/classes/waitlist', {
        method: 'post',
        body: JSON.stringify(userData), 	
        headers: {
          'accept':'application/json',
          'X-Parse-Application-Id': 'QMfcCRtjTGZIWuEh7xPSsvIlh2PgreRTjwZHqLhF',
          'X-Parse-REST-API-Key': 'z74zcyU0K9Zp1vzhaNIbT0TmfQ3yIoamIOGEEvFs',
          'Content-Type': ' application/json'
        }
        }).then( response => {
          if(response.status === 400) {
            alert(`Your Email Is Already In Our Waiting List, When The App Is Ready You Will Be Notified`)
          }
        })

      this.dialogNameInput.value ='';
      this.dialogMailInput.value ='';
    }else {
      errorBlock.classList.add('show')
    }
  }

}

window.addEventListener('load', () => {
  new App()
})

function onContactUs() {
  document.getElementById('name-input').value = '' ;
  document.getElementById('subject-input').value = '';
  document.getElementById('mail-input').value = '';
  document.getElementById('message').value = '';
}