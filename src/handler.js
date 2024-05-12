const receipe = require('./receipe');

const addRecipeHandler = (request, h) => {
    const { name, region, image, ingredients, instructions } = request.payload;

    const id = receipe[receipe.length - 1].id + 1;
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newRecipe = {
        id, name, region, image, ingredients, instructions, createdAt, updatedAt,
    };

    receipe.push(newRecipe);

    const isSuccess = receipe.filter((recipe) => recipe.id === id).length > 0;

    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'resep berhasil ditambahkan',
            data: {
                recipeId: id,
            },
        });
        response.code(201);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'resep gagal ditambahkan',
    });
    response.code(500);
    return response;
};

const getAllRecipeHandler = (request, h) => {
    const { name } = request.query;
    
    if (!name) {
        const response = h.response({
            status: 'success',
            data: {
                receipe,
            },
        });
        response.code(200);
        return response;
    }

    const filteredRecipes = receipe.filter(r => r.name.toLowerCase().includes(name.toLowerCase()));

    const response = h.response({
        status: 'success',
        data: {
            receipe: filteredRecipes,
        },
    });
    response.code(200);
    return response;
};

const getReceipeByIdHandler = (request, h) => {
    const { id } = request.params;

    const recipe = receipe.filter(r => r.id === parseInt(id))[0];

    if (recipe !== undefined) {
        return {
            status: 'success',
            data: {
                recipe,
            },
        };
    }

    const response = h.response({
        status: 'fail',
        message: 'resep tidak ditemukan',
    });
    response.code(404);
    return response;
};

const updateRecipeByIdHandler = (request, h) => {
    const { id } = request.params;

    const { name, region, image, ingredients, instructions  } = request.payload;

    const updatedAt = new Date().toISOString();

    const index = receipe.findIndex((recipe) => recipe.id === parseInt(id));

    if (index !== -1) {
        receipe[index] = {
            ...receipe[index],
            name,
            region,
            image,
            ingredients,
            instructions,
            updatedAt,
        };

        const response = h.response({
            status: 'success',
            message: 'resep berhasil diperbarui',
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui resep. Id tidak ditemukan',
    });
    response.code(404);
    return response;
};

const deleteRecipeByIdHandler = (request, h) => {
    const { id } = request.params;

    const index = receipe.findIndex((recipe) => recipe.id === parseInt(id));

    if (index !== -1) {
        receipe.splice(index, 1);
        const response = h.response({
            status: 'success',
            message: 'resep berhasil dihapus',
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'resep gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
}

module.exports = {addRecipeHandler, getAllRecipeHandler, getReceipeByIdHandler, updateRecipeByIdHandler, deleteRecipeByIdHandler };