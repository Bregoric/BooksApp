{
    'use strict';
    const select = {
        templateOf: {
            book: '#template-book',
        },
        containerOf: {
            booksList: '.books-list',
        },
    };
    const templates = {
        books: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
    };
    class Book {
        constructor(id, data) {
            const thisBook = this;
            thisBook.id = id;
            thisBook.book = data;
            thisBook.render();
        }
        render() {
            const thisBook = this;
            /* generate HTML based on template */
            const generatedHTML = templates.books(thisBook.book);
            /* create element using utils.createElementFromHTML */
            const generatedDOM = utils.createDOMFromHTML(generatedHTML);
            /* find menu container */
            const menuContainer = document.querySelector(select.containerOf.booksList);
            /* add element to menu */
            menuContainer.appendChild(generatedDOM);
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