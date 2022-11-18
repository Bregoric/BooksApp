{
    'use strict';
    const select = {
        templateOf: {
            book: '#template-book',
        },
        containerOf: {
            booksList: '.books-list',
        },
        book: {
            image: '.books-list .book__image',

        },
    };
    const templates = {
        books: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
    };


    const classNames = {
        favorite: 'favorite',
        bookImage: 'book__image',
    };
    const favoriteBooks = [];

    class Book {
        constructor(id, data) {
            const thisBook = this;
            thisBook.id = id;
            thisBook.book = data;
            thisBook.render();
            thisBook.getElements();
            thisBook.initActions();
        }
        render() {
            const thisBook = this;
            /* generate HTML based on template */
            const generatedHTML = templates.books(thisBook.book);
            /* create element using utils.createElementFromHTML */
            thisBook.element = utils.createDOMFromHTML(generatedHTML);
            /* find menu container */
            const menuContainer = document.querySelector(select.containerOf.booksList);
            /* add element to menu */
            menuContainer.appendChild(thisBook.element);
        }
        getElements() {
            const thisBook = this;
            thisBook.Images = thisBook.element.querySelectorAll(select.book.image);
            // thisBook.FavoriteImage = thisBook.element.querySelector(select.all.ImageListFavurite);
        }
        addToFavourite(event, book) {
            if (event.target.offsetParent.classList.contains(classNames.bookImage)) {
                /* prevent default actions */
                event.preventDefault();
                /* get books id */
                const bookID = book.getAttribute('data-id');
                if (favoriteBooks.includes(bookID)) {
                    book.classList.remove(classNames.favorite);
                    const index = favoriteBooks.indexOf(bookID);
                    favoriteBooks.splice(index, 1); //usuwanie
                } else {
                    /* add element to array*/
                    favoriteBooks.push(bookID);
                    /* add class favorite*/
                    book.classList.add(classNames.favorite);



                    //console.log(favoriteBooks)
                }

            }
        }

        initActions() {
            const thisBook = this;
            for (let book of thisBook.Images) {
                /* add event listner */

                book.addEventListener('dblclick', function(event) {
                    thisBook.addToFavourite(event, book);
                });
            }


        }
    }

    const app = {
        initMenu: function() {
            const thisApp = this;
            console.log('thisApp.data:', thisApp.data);
            for (let bookData in thisApp.data.books) {
                new Book(bookData, thisApp.data.books[bookData]);
            }
        },
        initData: function() {
            const thisApp = this;
            thisApp.data = dataSource;
        },
        init: function() {
            const thisApp = this;
            console.log('*** App starting ***');
            console.log('thisApp:', thisApp);
            console.log('templates:', templates);
            thisApp.initData(); //inaczej app
            thisApp.initData();
            thisApp.initMenu(); // app
        },
    };
    app.init();


}