    const modal = document.querySelector(".party-modal");
    const trigger = document.querySelector(".create-party-button");
    const closeButton = document.querySelector(".close");

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