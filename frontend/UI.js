import BookService from "./services/BookService";
const bookService = new BookService();
//<!--<img src="${book.imagePath}" class="img-fluid" alt="">-->
import { format } from "timeago.js";

class UI {
	async renderBooks() {
		const books = await bookService.getBooks();
		const booksCardContainer = document.getElementById("books-cards");
		booksCardContainer.innerHTML = "";
		books.forEach((book) => {
			const div = document.createElement("div");
			div.className = "animated fadeInRight";
			div.innerHTML = `
<div class="card m-2">
    <div class="row no-gutters">
		<div class="col-md-4 p-3">
		
		<img src="${book.imagePath}" class="img-fluid" alt="">
        </div>
            <div class="col-md-8 p-1">
                <div class="card-block px-2 p-2">
                    <h4 class="card-title p-2 m-1" >${book.title}</h4>
                    <p class="card-text  p-2 m-1">${book.author}</p>
                    <p class="card-text  p-2 m-1">${book.year}</p>
                    <p class="card-text  p-2 m-1">${book.songs}</p>
                    <p class="card-text  p-2 m-1">${book.person}</p>
                    <p class="card-text  p-2 m-1">${book.favorite}</p>
                    <p class="card-text  p-2 m-1">${book.commentary}</p>
                    <a href="#" class="btn btn-danger delete " _id="${
											book._id
										}">X</a>
                </div>
            </div>
        </div>
        <div class="card-footer w-100 text-muted p-2">
          ${format(book.created_at)}
    </div>
</div>
      `;
			booksCardContainer.appendChild(div);
		});
	}

	async addANewBook(book) {
		await bookService.postBook(book);
		this.renderBooks();
		this.clearBookForm();
	}

	clearBookForm() {
		document.getElementById("book-form").reset();
		document.getElementById("title").focus();
	}

	renderMessage(message, colorMessage, secondsToRemove) {
		// Creating a div
		const div = document.createElement("div");
		// Styling the div
		div.className = `message ${colorMessage}`;
		// Adding Text to the div
		div.appendChild(document.createTextNode(message));
		// Puting in the documnet
		const container = document.querySelector(".col-md-4");
		const bookForm = document.querySelector("#book-form");
		container.insertBefore(div, bookForm);
		// Removing the div after some secconds
		setTimeout(() => {
			document.querySelector(".message").remove();
		}, secondsToRemove);
	}

	async deleteBook(bookId) {
		await bookService.deleteBook(bookId);
		this.renderBooks();
	}
}

export default UI;
