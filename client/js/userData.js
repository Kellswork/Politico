function showName() {
  const firstname = localStorage.getItem('firstname');
  const firstName = document.querySelectorAll('.firstName');
  const profileImage = document.querySelectorAll('.profileImg');
  const profileImg = localStorage.getItem('profileImg');
  firstName[0].innerHTML = firstname;
  firstName[1].innerHTML = firstname;
  profileImage[0].setAttribute = ('src', profileImg);
  profileImage[1].setAttribute = ('src', profileImg);
  console.log(profileImage);
  console.log(profileImg);
}
showName();
