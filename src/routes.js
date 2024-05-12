const {addRecipeHandler, getAllRecipeHandler, getReceipeByIdHandler, updateRecipeByIdHandler, deleteRecipeByIdHandler } = require('./handler');

const route = [
    {
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return 'Welcome to Recipe Apps API! V1.0.0';
        },
    },
    {
        method: 'POST',
        path: '/recipes',
        handler: addRecipeHandler,
    },
    {
        method: 'GET',
        path: '/recipes',
        handler: getAllRecipeHandler,
    },
    {
        method: 'GET',
        path: '/recipes/{id}',
        handler: getReceipeByIdHandler,
    },
    {
        method: 'PUT',
        path: '/recipes/{id}',
        handler: updateRecipeByIdHandler, 
    },
    {
        method: 'DELETE',
        path: '/recipes/{id}',
        handler: deleteRecipeByIdHandler,
    },
    {
        method: '*',
        path: '/{any*}',
        handler: (request, h) => {
            const response = h.response({
                status: 'fail',
                message: 'Halaman tidak ditemukan',
            });
            response.code(404);
            return response;
        },
    },
];

module.exports = route;