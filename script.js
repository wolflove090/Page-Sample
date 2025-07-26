 // 必要に応じて追加
const books = ["01.Nyoki", "02.NamakoRobo", "03.GamingObake", "04.YummyGohan", "05.TakoPai"];
const bookList = document.getElementById("book-list");

books.forEach(book => {
  const div = document.createElement("div");
  div.className = "book";
  div.innerHTML = `<img src="./books/${book}/00.png" alt="${book} 表紙">`;
  div.onclick = () => {
    location.href = `./book-viewer.html?book=${book}`;
  };
  bookList.appendChild(div);
});