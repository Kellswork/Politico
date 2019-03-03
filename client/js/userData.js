function showName() {
  const firstname = localStorage.getItem('firstname');
  const firstName = document.querySelectorAll('.firstName');
  const profileImage = document.querySelectorAll('.profileImg');
  const tokenImg = localStorage.getItem('profileimg');
  firstName[0].innerHTML = firstname;
  firstName[1].innerHTML = firstname;
  profileImage[0].src = tokenImg;
  profileImage[1].src = tokenImg;
  console.log(profileImage);
  console.log(tokenImg);
}
showName();
