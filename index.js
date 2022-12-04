function goToSearch() {
    let inputTxt = document.getElementById("input").value;
    localStorage.setItem('id',inputTxt)
    window.location.href = `${origin}/movies.html`
  }