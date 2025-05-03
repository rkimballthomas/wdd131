const themeSelect = document.getElementById('theme');
const logoImage = document.querySelector('.logo');

function changeTheme() {
  const selectedTheme = themeSelect.value;

  if (selectedTheme === 'dark') {
    document.body.classList.add('dark');
    logoImage.src = 'byui-logo_white.png';
  } else {
    document.body.classList.remove('dark');
    logoImage.src = 'byui-logo_blue.webp';
  }
}

themeSelect.addEventListener('change', changeTheme);