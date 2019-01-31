    const modal = document.querySelector(".party-modal");
    const trigger = document.querySelector(".create-party-button");
    const closeButton = document.querySelector(".close");
    const img = document.getElementById('profile-img');

    const toggleModal = () => {
        modal.classList.toggle("show-modal");
    }

    const windowOnClick = (event) => {
        if (event.target === modal) {
            toggleModal();
        }
    }

    trigger.addEventListener("click", toggleModal);
    closeButton.addEventListener("click", toggleModal);
    window.addEventListener("click", windowOnClick);

    function openNotification() {
        const displayNotification = document.querySelector('.dropdown-content');
       if (displayNotification.style.display === 'block') displayNotification.style.display = 'none';
       else displayNotification.style.display = 'block';
      }

      function openNav() {
        document.getElementById("mySidenav").style.width = "200px";
      }

      function closeNav() {
        document.getElementById("mySidenav").style.width = "0";
      }
