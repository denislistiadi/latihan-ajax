function main() {

    const baseUrl = "https://books-api.dicoding.dev";

    // mendapatkan data buku
    const getBook = async() => {
        try {
            const response = await fetch(`${baseUrl}/list`);
            const data = await response.json();
            
            if(data.error) {
                showResponseMessage(data.message)
            } else {
                renderAllBooks(data.books)
            }
        } catch (error) {
            showResponseMessage(error);
        }
    };

    // menambahkan data buku
    const insertBook = async(book) => {
        try {
            const option = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Auth-Token": "12345"
                },
                body: JSON.stringify(book)
            }

            const response = await fetch(`${baseUrl}/add`, option);
            const data = await response.json();
            showResponseMessage(data.message);
            getBook();
        } catch (error) {
            showResponseMessage(error);
        }
    };

    // memperbarui data buku
    const updateBook = async(book) => {
        try {
            const option = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "X-Auth-Token": "12345"
                },
                body: JSON.stringify(book)
            }

            const response = await fetch(`${baseUrl}/edit/${book.id}`, option);
            const data = await response.json();
            showResponseMessage(data.message);
            getBook();
        } catch (error) {
            showResponseMessage(error);
        }
    };

    // menghapus data buku
    const removeBook = async(bookId) => {
        const response = confirm("Apakah anda yakin ingin menghapus buku ini?");
        if(response) {
            try {
                const option = {
                    method: "DELETE",
                    headers: {
                        "X-Auth-Token": "12345"
                    }
                }

                const response = await fetch(`${baseUrl}/delete/${bookId}`, option);
                const data = await response.json();
                showResponseMessage(data.message);
                getBook();
            } catch (error) {
                showResponseMessage(error);
            }
        }
    };






    /*
        jangan ubah kode di bawah ini ya!
    */

    const renderAllBooks = (books) => {
        const listBookElement = document.querySelector("#listBook");
        listBookElement.innerHTML = "";

        books.forEach(book => {
            listBookElement.innerHTML += `
                <div class="col-lg-4 col-md-6 col-sm-12" style="margin-top: 12px;">
                    <div class="card">
                        <div class="card-body">
                            <h5>(${book.id}) ${book.title}</h5>
                            <p>${book.author}</p>
                            <button type="button" class="btn btn-danger button-delete" id="${book.id}">Hapus</button>
                        </div>
                    </div>
                </div>
            `;
        });

        const buttons = document.querySelectorAll(".button-delete");
        buttons.forEach(button => {
            button.addEventListener("click", event => {
                const bookId = event.target.id;
                removeBook(bookId);
            })
        })
    };

    const showResponseMessage = (message = "Check your internet connection") => {
        alert(message);
    };

    document.addEventListener("DOMContentLoaded", () => {

        const inputBookId = document.querySelector("#inputBookId");
        const inputBookTitle = document.querySelector("#inputBookTitle");
        const inputBookAuthor = document.querySelector("#inputBookAuthor");
        const buttonSave = document.querySelector("#buttonSave");
        const buttonUpdate = document.querySelector("#buttonUpdate");

        buttonSave.addEventListener("click", function () {
            const book = {
                id: Number.parseInt(inputBookId.value),
                title: inputBookTitle.value,
                author: inputBookAuthor.value
            };
            insertBook(book)
        });

        buttonUpdate.addEventListener("click", function () {
            const book = {
                id: Number.parseInt(inputBookId.value),
                title: inputBookTitle.value,
                author: inputBookAuthor.value
            };

            updateBook(book)
        });
        getBook();
    });
}

export default main;