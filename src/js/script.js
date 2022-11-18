{
    'use strict';
    const select = {
        templateOf: {
            book: '#template-book',
        },
        containerOf: {
            booksList: '.books-list',
            filters: '.filters',
        },
        book: {
            image: '.books-list .book__image',
            rating: '.book-list .book__raiting'

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
    const filters = [];

    function filterBooks() {
        for (let dataBook of dataSource.books) {
            let shouldBeHidden = false;
            let bookImage = document.querySelector('.book__image[data-id="' + dataBook.id + '"]');
            for (const filter of filters) {
                if (!dataBook.details[filter]) {
                    shouldBeHidden = true;
                    break;
                }
            }
            if (shouldBeHidden == true) {

                bookImage.classList.add('hidden');
            } else {

                bookImage.classList.remove('hidden');
            }
        }
    }

    function checkboxClick(event) {

        const filter = event.target;
        if (filter.tagName == 'INPUT' && filter.type == 'checkbox' && filter.name == 'filter') {
            let filterValue = filter.value;
            if (filter.checked == true) {
                filters.push(filterValue);
            } else {
                filters.splice(filterValue, 1);
            }


        }
        filterBooks();
    }


    class Book {
        constructor(id, data) {
            const thisBook = this;
            thisBook.id = id;
            thisBook.book = data;
            thisBook.data = dataSource.books;
            thisBook.render();
            thisBook.getElements();
            thisBook.initActions();


        }
        render() {
            const thisBook = this;

            for (let book of thisBook.data) {
                const ratingBgc = thisBook.determineRatingBgc(book.rating);
                console.log(ratingBgc);
                const ratingWidth = book.rating * 10;
                console.log(ratingWidth)
                book.ratingBgc = ratingBgc;
                book.ratingWidth = ratingWidth;
                console.log('ratingWidth', ratingWidth);
            }
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
            thisBook.booksList = document.querySelector(select.containerOf.booksList);
            thisBook.Images = thisBook.element.querySelectorAll(select.book.image);
            thisBook.Filter = document.querySelector(select.containerOf.filters);
            // thisBook.FavoriteImage = thisBook.element.querySelector(select.all.ImageListFavurite);
        }
        addToFavourite(event) {
            if (event.target.offsetParent.classList.contains(classNames.bookImage)) {

                /* prevent default actions */
                event.preventDefault();
                /* get books id */

                const book = event.target.closest('.book__image');
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
                }
            }
        }

        initActions() {
            const thisBook = this;
            /* add event listner */

            thisBook.booksList.addEventListener('dblclick', function(event) {
                thisBook.addToFavourite(event);
            });


            thisBook.Filter.addEventListener('click', function(event) {
                checkboxClick(event);

            });
        }

        determineRatingBgc(rating) {
            let ratingBgc = '';
            if (rating < 6) {
                ratingBgc = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%';
            } else if (rating > 6 && rating <= 8) {
                ratingBgc = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%';
            } else if (rating > 8 && rating <= 9) {
                ratingBgc = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%';
            } else if (rating > 9) {
                ratingBgc = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%';
            }
            return ratingBgc;
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
            thisApp.initMenu(); // app
        },
    };
    app.init();
}