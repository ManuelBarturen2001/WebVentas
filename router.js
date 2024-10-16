//ENRUTADOR PARA REDIRECCIONAR LAS PAGINAS
const express = require('express');
const router = express.Router();
//const authController = require('./controllers/authController.js');
//const crud = require('./controllers/crud.js');
//const crudperson = require('./controllers/crudperson.js');
//Invocamos a la base de datos
const conexion = require('./database/db');

// ----------------------------------------------------------------------------------------------------
/*
const multer = require('multer');
const upload = multer({dest: '/public/img/'});
const fs = require('node:fs');

router.post('/images/single', upload.single('imagentest'), (req,res) =>{
    console.log(req.file);
    saveImage(req.file);
    res.send('Termina');
});

// multiples imagenes
router.post('/images/multi', upload.array('photos',10),(req,res)=>{
    req.files.map(saveImage);
    res.send('Termina Multi');
})

function saveImage(file) {
    const newPath = `public/img/${file.originalname}`;
    fs.renameSync(file.path, newPath);
    return newPath;
}*/
// -----------------------------------------------------------------------------------------------------

/*
//PERSONAS----------------------------------------------------------------------------------------------
router.get('/crudpersonas', (req,res)=>{
    if(req.session.loggedin){
        conexion.query('SELECT * FROM sistema.personas', (error, results)=>{
            if (error) {
                throw error;
            }else{
                res.render('crudpersonas', {
                    login: true,
                    personas: true,
                    name: req.session.name,
                    results: results
                });
            }
        });
    }else{
        res.render('index',{
            login: false,
            name:'Debe iniciar sesión'
        });
    }
});

router.get('/eliminar/:id', (req,res)=>{
    const id = req.params.id;
    conexion.query('DELETE FROM sistema.personas where id=?', [id], (error, results)=>{
        if (error) {
            throw error;
        }else{
            res.redirect('/crudpersonas');
            
        }
    });
});

//router.post('/newpersona', crudperson.newpersona);
//router.post('/updateperson',crudpersonas.updateperson);


router.post('/newperson', upload.single('imagen'), (req,res) =>{
    const dni = req.body.dni;
    const nombre = req.body.nombre;
    const imagen = req.file.filename; // Obtener el nombre del archivo de la propiedad filename de req.file

    conexion.query('INSERT INTO sistema.personas SET ?', { dni: dni, nombre: nombre, imagen: req.file.originalname }, (error, results) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error interno del servidor');
        } else {
            console.log(req.file);
            saveImage(req.file);
            res.redirect('/crudpersonas');
        }
    });
    
});

router.post('/updateperson', upload.single('imagen'), (req,res) =>{
    const id = req.body.id;
    const dni = req.body.dni;
    const nombre = req.body.nombre;
    const imagen = req.file.filename; // Obtener el nombre del archivo de la propiedad filename de req.file

    conexion.query("UPDATE sistema.personas SET dni=?, nombre=?, imagen=? WHERE id=?", [dni, nombre, req.file.originalname, id], (error, results) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error interno del servidor');
        } else {
            console.log(req.file);
            saveImage(req.file);
            res.redirect('/crudpersonas');
        }
    });
    
});

//FIN PERSONAS----------------------------------------------------------------------------------


//PRODUCTOS -----------------------------------------------------------------------------------
const uploadproduct = multer({dest: '/public/img/product/'});
function saveImageProduct(file) {
    const newPath = `public/img/product/${file.originalname}`;
    fs.renameSync(file.path, newPath);
    return newPath;
}
*/
/*
router.get('shop-single', (req,res)=>{
    if(req.session.loggedin){
        res.render('/shop/shop-single',{
            login: true,
            name: req.session.name,
            // para pedir el usuario - user: req.user
        });
    }else{
        res.render('shop-single',{
            login: false,
            name:'Debe iniciar sesión'
        });
    }
});


router.get('/shop', (req,res)=>{
    conexion.query('SELECT * FROM sistema.productos', (error, results)=>{
    if(req.session.loggedin){
        
            if (error) {
                throw error;
            } else {
                res.render('shop', {
                    login: true, 
                    productos: true, 
                    name: req.session.name, 
                    results: results
                    });           
            }
        
    } else {
        res.render('shop', {
            login: false,
            productos: true,
            results: results
        });
    }
    });
});
*/

//Listar todos los productos
/*
router.get('/shop', (req, res) => {

    const page = req.query.page || 1; // Obtener el número de página de la consulta URL
    const limit = 3; // Número de productos por página
    const offset = (page - 1) * limit; // Calcular el desplazamiento

    const genero = req.query.pf_t_genero;
    if (genero === 'hombre') {
        conexion.query("SELECT COUNT(*) AS total FROM sistema.productos where genero = 'hombre'", (error, countResult) => {
            if (error) {
                console.error('Error al contar productos:', error);
                res.status(500).send('Error interno del servidor');
                return;
            }

            const totalProducts = countResult[0].total; // Obtener el número total de productos
            const totalPages = Math.ceil(totalProducts / limit); // Calcular el número total de páginas

            conexion.query("SELECT * FROM sistema.productos where genero = 'hombre' LIMIT ? OFFSET ?", [limit, offset], (error, results) => {
                if (error) {
                    console.error('Error al recuperar productos:', error);
                    res.status(500).send('Error interno del servidor');
                    return;
                }

                res.render('shop', {
                    login: req.session.loggedin || false,
                    productos: true,
                    name: req.session.name || 'Debe iniciar sesión',
                    results: results,
                    currentPage: parseInt(page),
                    totalPages: totalPages
                });
            });
        });
    } else if (genero ==='mujer') {

        conexion.query("SELECT COUNT(*) AS total FROM sistema.productos where genero = 'mujer'", (error, countResult) => {
            if (error) {
                console.error('Error al contar productos:', error);
                res.status(500).send('Error interno del servidor');
                return;
            }
    
            const totalProducts = countResult[0].total; // Obtener el número total de productos
            const totalPages = Math.ceil(totalProducts / limit); // Calcular el número total de páginas
    
            conexion.query("SELECT * FROM sistema.productos where genero = 'mujer' LIMIT ? OFFSET ?", [limit, offset], (error, results) => {
                if (error) {
                    console.error('Error al recuperar productos:', error);
                    res.status(500).send('Error interno del servidor');
                    return;
                }
    
                res.render('shop', {
                    login: req.session.loggedin || false,
                    productos: true,
                    name: req.session.name || 'Debe iniciar sesión',
                    results: results,
                    currentPage: parseInt(page),
                    totalPages: totalPages
                });
            });
        });

    }else{

        conexion.query('SELECT COUNT(*) AS total FROM sistema.productos', (error, countResult) => {
            if (error) {
                console.error('Error al contar productos:', error);
                res.status(500).send('Error interno del servidor');
                return;
            }
            const totalProducts = countResult[0].total; // Obtener el número total de productos
            const totalPages = Math.ceil(totalProducts / limit); // Calcular el número total de páginas

            conexion.query('SELECT * FROM sistema.productos LIMIT ? OFFSET ?', [limit, offset], (error, results) => {
                if (error) {
                    console.error('Error al recuperar productos:', error);
                    res.status(500).send('Error interno del servidor');
                    return;
                }

                res.render('shop', {
                    login: req.session.loggedin || false,
                    productos: true,
                    name: req.session.name || 'Debe iniciar sesión',
                    results: results,
                    currentPage: parseInt(page),
                    totalPages: totalPages
                });
            });
        });
    }

});
*/


router.get('/store/shop', (req, res) => {
    const page = req.query.page || 1; // Obtener el número de página de la consulta URL
    const limit = 6; // Número de productos por página
    const offset = (page - 1) * limit; // Calcular el desplazamiento

    let queryCondition = '';
    let queryParams = [];
    const genero = req.query.pf_g_genero;
    const categoria = req.query.pf_c_categoria;
    const tallas = req.query.pf_t_talla;
    const sortOrder = req.query.sortOrder;
    const marca = req.query.pf_m_marca;


    // Verificar y construir la condición de consulta para el filtro de género
    if (genero) {
        if (typeof genero === 'string') {
            if (queryCondition) queryCondition += ' AND ';
            queryCondition += 'genero = ?';
            queryParams.push(genero);
        } else if (Array.isArray(genero) && genero.length > 0) {
            if (queryCondition) queryCondition += ' AND ';
            const generoConditions = genero.map(() => 'genero = ?').join(' OR ');
            queryCondition += `(${generoConditions})`;
            queryParams.push(...genero);
        }
    }

    // Verificar y construir la condición de consulta para el filtro de categoría
    if (categoria) {
        if (typeof categoria === 'string') {
            if (queryCondition) queryCondition += ' AND ';
            queryCondition += 'categoria = ?';
            queryParams.push(categoria);
        } else if (Array.isArray(categoria) && categoria.length > 0) {
            if (queryCondition) queryCondition += ' AND ';
            const categoriaConditions = categoria.map(() => 'categoria = ?').join(' OR ');
            queryCondition += `(${categoriaConditions})`;
            queryParams.push(...categoria);
        }
    }

    if (tallas) {
        if (typeof tallas === 'string') {
            if (queryCondition) queryCondition += ' AND ';
            queryCondition += `${tallas} >= 1`; // Suponiendo que el nombre de la talla coincide con el nombre del campo en la tabla tallasproduct
        } else if (Array.isArray(tallas) && tallas.length > 0) {
            if (queryCondition) queryCondition += ' AND ';
            const tallasConditions = tallas.map(talla => `${talla} >= 1`).join(' OR ');
            queryCondition += `(${tallasConditions})`;
        }
    }

    // Verificar y construir la condición de consulta para el filtro de marca
    if (marca) {
        if (typeof marca === 'string') {
            if (queryCondition) queryCondition += ' AND ';
            queryCondition += 'marca = ?';
            queryParams.push(marca);
        } else if (Array.isArray(marca) && marca.length > 0) {
            if (queryCondition) queryCondition += ' AND ';
            const marcaConditions = marca.map(() => 'marca = ?').join(' OR ');
            queryCondition += `(${marcaConditions})`;
            queryParams.push(...marca);
        }
    }

    // Verificar y construir la condición de consulta para la ordenación
    let sortQuery = '';
    switch (sortOrder) {
        case 'price-asc':
            sortQuery = 'ORDER BY precio ASC';
            break;
        case 'price-desc':
            sortQuery = 'ORDER BY precio DESC';
            break;
        case 'name-asc':
            sortQuery = 'ORDER BY nombre ASC';
            break;
        case 'name-desc':
            sortQuery = 'ORDER BY nombre DESC';
            break;
    }

    // Realizar la consulta a la base de datos utilizando una función
    getProductos(queryCondition, queryParams, sortQuery, limit, offset)
        .then(({ totalProducts, totalPages, results }) => {
            res.render('shop', {
                login: req.session.loggedin || false,
                productos: true,
                name: req.session.name || 'Debe iniciar sesión',
                results: results,
                currentPage: parseInt(page),
                totalPages: totalPages
            });
        })
        .catch(error => {
            console.error('Error al recuperar productos:', error);
            res.status(500).send('Error interno del servidor');
        });
});

function getProductos(queryCondition, queryParams, sortQuery, limit, offset) {
    return new Promise((resolve, reject) => {
        let totalProductsQuery = 'SELECT COUNT(*) AS total FROM sistema.productos p';
        let productosQuery = 'SELECT p.* FROM sistema.productos p';
        let productParams = [];

        if (queryCondition) {
            totalProductsQuery += ` INNER JOIN sistema.tallasproduct t ON p.id = t.idproduct WHERE ${queryCondition}`;
            productosQuery += ` INNER JOIN sistema.tallasproduct t ON p.id = t.idproduct WHERE ${queryCondition}`;
            productParams = [...queryParams];
        }

        if (sortQuery) {
            productosQuery += ` ${sortQuery}`;
        }


        conexion.query(totalProductsQuery, productParams, (error, countResult) => {
            if (error) {
                reject(error);
                return;
            }

            const totalProducts = countResult[0].total; // Obtener el número total de productos
            const totalPages = Math.ceil(totalProducts / limit); // Calcular el número total de páginas

            productosQuery += ' LIMIT ? OFFSET ?';
            productParams.push(limit, offset);

            conexion.query(productosQuery, productParams, (error, results) => {
                if (error) {
                    reject(error);
                    return;
                }

                resolve({ totalProducts, totalPages, results });
            });
        });
    });
}

//Para buscar productos de hombre
router.get('/store/hombre', (req, res) => {
    const page = req.query.page || 1; // Obtener el número de página de la consulta URL
    const limit = 6; // Número de productos por página
    const offset = (page - 1) * limit; // Calcular el desplazamiento
    let queryCondition = '';
    let queryParams = [];
    const categoria = req.query.pf_c_categoria;
    const tallas = req.query.pf_t_talla;
    const sortOrder = req.query.sortOrder;
    const marca = req.query.pf_m_marca;

    // Verificar y construir la condición de consulta para el filtro de categoría
    if (categoria) {
        if (typeof categoria === 'string') {
            if (queryCondition) queryCondition += ' AND ';
            queryCondition += 'categoria = ?';
            queryParams.push(categoria);
        } else if (Array.isArray(categoria) && categoria.length > 0) {
            if (queryCondition) queryCondition += ' AND ';
            const categoriaConditions = categoria.map(() => 'categoria = ?').join(' OR ');
            queryCondition += `(${categoriaConditions})`;
            queryParams.push(...categoria);
        }
    }
    
    if (tallas) {
        if (typeof tallas === 'string') {
            if (queryCondition) queryCondition += ' AND ';
            queryCondition += `${tallas} >= 1`; // Suponiendo que el nombre de la talla coincide con el nombre del campo en la tabla tallasproduct
        } else if (Array.isArray(tallas) && tallas.length > 0) {
            if (queryCondition) queryCondition += ' AND ';
            const tallasConditions = tallas.map(talla => `${talla} >= 1`).join(' OR ');
            queryCondition += `(${tallasConditions})`;
        }
    }
    
    // Verificar y construir la condición de consulta para el filtro de marca
    if (marca) {
        if (typeof marca === 'string') {
            if (queryCondition) queryCondition += ' AND ';
            queryCondition += 'marca = ?';
            queryParams.push(marca);
        } else if (Array.isArray(marca) && marca.length > 0) {
            if (queryCondition) queryCondition += ' AND ';
            const marcaConditions = marca.map(() => 'marca = ?').join(' OR ');
            queryCondition += `(${marcaConditions})`;
            queryParams.push(...marca);
        }
    }

    // Verificar y construir la condición de consulta para la ordenación
    let sortQuery = '';
    switch (sortOrder) {
        case 'price-asc':
            sortQuery = 'ORDER BY precio ASC';
            break;
        case 'price-desc':
            sortQuery = 'ORDER BY precio DESC';
            break;
        case 'name-asc':
            sortQuery = 'ORDER BY nombre ASC';
            break;
        case 'name-desc':
            sortQuery = 'ORDER BY nombre DESC';
            break;
    }

    // Realizar la consulta a la base de datos utilizando una función
    getProductosHombre(queryCondition, queryParams, sortQuery, limit, offset)
        .then(({ totalProducts, totalPages, results }) => {
            res.render('hombre', {
                login: req.session.loggedin || false,
                productos: true,
                name: req.session.name || 'Debe iniciar sesión',
                results: results,
                currentPage: parseInt(page),
                totalPages: totalPages
            });
        })
        .catch(error => {
            console.error('Error al recuperar productos:', error);
            res.status(500).send('Error interno del servidor');
        });
});

function getProductosHombre(queryCondition, queryParams, sortQuery, limit, offset) {
    return new Promise((resolve, reject) => {
        let totalProductsQuery = "SELECT COUNT(*) AS total FROM sistema.productos p WHERE p.genero = 'hombre'";
        let productosQuery = "SELECT p.* FROM sistema.productos p WHERE p.genero = 'hombre'";
        let productParams = [];

        if (queryCondition) {
            totalProductsQuery += ` AND EXISTS (SELECT 1 FROM sistema.tallasproduct t WHERE p.id = t.idproduct AND ${queryCondition})`;
            productosQuery += ` AND EXISTS (SELECT 1 FROM sistema.tallasproduct t WHERE p.id = t.idproduct AND ${queryCondition})`;
            productParams = [...queryParams];
        }

        if (sortQuery) {
            productosQuery += ` ${sortQuery}`;
        }

        conexion.query(totalProductsQuery, productParams, (error, countResult) => {
            if (error) {
                reject(error);
                return;
            }

            const totalProducts = countResult[0].total; // Obtener el número total de productos
            const totalPages = Math.ceil(totalProducts / limit); // Calcular el número total de páginas

            productosQuery += ' LIMIT ? OFFSET ?';
            productParams.push(limit, offset);

            conexion.query(productosQuery, productParams, (error, results) => {
                if (error) {
                    reject(error);
                    return;
                }

                resolve({ totalProducts, totalPages, results });
            });
        });
    });
}

router.get('/store/mujer', (req, res) => {
    const page = req.query.page || 1; // Obtener el número de página de la consulta URL
    const limit = 6; // Número de productos por página
    const offset = (page - 1) * limit; // Calcular el desplazamiento
    let queryCondition = '';
    let queryParams = [];
    const categoria = req.query.pf_c_categoria;
    const tallas = req.query.pf_t_talla;
    const sortOrder = req.query.sortOrder;
    const marca = req.query.pf_m_marca;

    // Verificar y construir la condición de consulta para el filtro de categoría
    if (categoria) {
        if (typeof categoria === 'string') {
            if (queryCondition) queryCondition += ' AND ';
            queryCondition += 'categoria = ?';
            queryParams.push(categoria);
        } else if (Array.isArray(categoria) && categoria.length > 0) {
            if (queryCondition) queryCondition += ' AND ';
            const categoriaConditions = categoria.map(() => 'categoria = ?').join(' OR ');
            queryCondition += `(${categoriaConditions})`;
            queryParams.push(...categoria);
        }
    }
    
    if (tallas) {
        if (typeof tallas === 'string') {
            if (queryCondition) queryCondition += ' AND ';
            queryCondition += `${tallas} >= 1`; // Suponiendo que el nombre de la talla coincide con el nombre del campo en la tabla tallasproduct
        } else if (Array.isArray(tallas) && tallas.length > 0) {
            if (queryCondition) queryCondition += ' AND ';
            const tallasConditions = tallas.map(talla => `${talla} >= 1`).join(' OR ');
            queryCondition += `(${tallasConditions})`;
        }
    }

    // Verificar y construir la condición de consulta para el filtro de marca
    if (marca) {
        if (typeof marca === 'string') {
            if (queryCondition) queryCondition += ' AND ';
            queryCondition += 'marca = ?';
            queryParams.push(marca);
        } else if (Array.isArray(marca) && marca.length > 0) {
            if (queryCondition) queryCondition += ' AND ';
            const marcaConditions = marca.map(() => 'marca = ?').join(' OR ');
            queryCondition += `(${marcaConditions})`;
            queryParams.push(...marca);
        }
    }

    // Verificar y construir la condición de consulta para la ordenación
    let sortQuery = '';
    switch (sortOrder) {
        case 'price-asc':
            sortQuery = 'ORDER BY precio ASC';
            break;
        case 'price-desc':
            sortQuery = 'ORDER BY precio DESC';
            break;
        case 'name-asc':
            sortQuery = 'ORDER BY nombre ASC';
            break;
        case 'name-desc':
            sortQuery = 'ORDER BY nombre DESC';
            break;
    }

    // Realizar la consulta a la base de datos utilizando una función
    getProductosMujer(queryCondition, queryParams, sortQuery, limit, offset)
        .then(({ totalProducts, totalPages, results }) => {
            res.render('mujer', {
                login: req.session.loggedin || false,
                productos: true,
                name: req.session.name || 'Debe iniciar sesión',
                results: results,
                currentPage: parseInt(page),
                totalPages: totalPages
            });
        })
        .catch(error => {
            console.error('Error al recuperar productos:', error);
            res.status(500).send('Error interno del servidor');
        });
});

function getProductosMujer(queryCondition, queryParams, sortQuery, limit, offset) {
    return new Promise((resolve, reject) => {
        let totalProductsQuery = "SELECT COUNT(*) AS total FROM sistema.productos p WHERE p.genero = 'mujer'";
        let productosQuery = "SELECT p.* FROM sistema.productos p WHERE p.genero = 'mujer'";
        let productParams = [];

        if (queryCondition) {
            totalProductsQuery += ` AND EXISTS (SELECT 1 FROM sistema.tallasproduct t WHERE p.id = t.idproduct AND ${queryCondition})`;
            productosQuery += ` AND EXISTS (SELECT 1 FROM sistema.tallasproduct t WHERE p.id = t.idproduct AND ${queryCondition})`;
            productParams = [...queryParams];
        }

        if (sortQuery) {
            productosQuery += ` ${sortQuery}`;
        }

        conexion.query(totalProductsQuery, productParams, (error, countResult) => {
            if (error) {
                reject(error);
                return;
            }

            const totalProducts = countResult[0].total; // Obtener el número total de productos
            const totalPages = Math.ceil(totalProducts / limit); // Calcular el número total de páginas

            productosQuery += ' LIMIT ? OFFSET ?';
            productParams.push(limit, offset);

            conexion.query(productosQuery, productParams, (error, results) => {
                if (error) {
                    reject(error);
                    return;
                }

                resolve({ totalProducts, totalPages, results });
            });
        });
    });
}
/*
router.get('/product/all', (req, res) =>{
    const page = req.query.page || 1; // Obtener el número de página de la consulta URL
    const limit = 6; // Número de productos por página
    const offset = (page - 1) * limit; // Calcular el desplazamiento

    conexion.query("SELECT COUNT(*) AS total FROM sistema.productos where genero = 'hombre'", (error, countResult) => {
        if (error) {
            console.error('Error al contar productos:', error);
            res.status(500).send('Error interno del servidor');
            return;
        }

        const totalProducts = countResult[0].total; // Obtener el número total de productos
        const totalPages = Math.ceil(totalProducts / limit); // Calcular el número total de páginas

        conexion.query("SELECT * FROM sistema.productos where genero = 'hombre' LIMIT ? OFFSET ?", [limit, offset], (error, results) => {
            if (error) {
                console.error('Error al recuperar productos:', error);
                res.status(500).send('Error interno del servidor');
                return;
            }

            res.render('shop', {
                login: req.session.loggedin || false,
                productos: true,
                name: req.session.name || 'Debe iniciar sesión',
                results: results,
                currentPage: parseInt(page),
                totalPages: totalPages
            });
        });
    });
})
*/
//para buscar productos de mujer


router.get('/store/shop/product/:slug', (req, res) => {
    const slug = req.params.slug;
    mostrarProducto(slug, req, res);
});

router.get('/store/hombre/product/:slug', (req, res) => {
    const slug = req.params.slug;
    mostrarProducto(slug, req, res);
});

router.get('/store/mujer/product/:slug', (req, res) => {
    const slug = req.params.slug;
    mostrarProducto(slug, req, res);
});

//FUNCION PARA MOSTRAR LOS PRODUCTOS
function mostrarProducto(slug, req, res) {
    let productosPromise = new Promise((resolve, reject) => {
        conexion.query('SELECT * FROM sistema.productos WHERE slug=?', [slug], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results[0]);
            }
        });
    });

    let imagenesPromise = new Promise((resolve, reject) => {
        conexion.query('SELECT * FROM sistema.imagenesproduct WHERE slugproduct=?', [slug], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results[0]);
            }
        });
    });

    let tallasPromise = new Promise((resolve, reject) => {
        conexion.query('SELECT * FROM sistema.tallasproduct WHERE slugproduct=?', [slug], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results[0]);
            }
        });
    });

    Promise.all([productosPromise, imagenesPromise, tallasPromise])
        .then(([productos, imagenesproduct, tallasproduct]) => {
            res.render('shop-single', { productos, imagenesproduct, tallasproduct });
        })
        .catch(error => {
            console.error('Error al recuperar datos:', error);
            res.status(500).send('Error interno del servidor');
        });
}



//FIN PRODUCTOS -------------------------------------------------------------------------------

//Peticion de todos los registros de los usuarios


router.get('/admin', (req, res) => {
    if (req.session.loggedin) {
        res.render('admin', {
            login: true,
            name: req.session.name,
            // para pedir el usuario - user: req.user
        });
    } else {
        res.render('index', {
            login: false,
            name: 'Debe iniciar sesión'
        });
    }
});

router.get('/login', (req, res) => {
    res.render('login.ejs');
});

router.get('/index', (req, res) => {
    if (req.session.loggedin) {
        res.render('index', {
            login: true,
            name: req.session.name,
            // para pedir el usuario - user: req.user
        });
    } else {
        res.render('index', {
            login: false,
            name: 'Debe iniciar sesión'
        });
    }

});

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error al cerrar la sesión:', err);
            return res.status(500).send('Error al cerrar la sesión');
        }
        // Eliminar la cookie de sesión

        res.clearCookie('connect.sid');
        res.clearCookie('jwt');
        // Redirigir al usuario a la página de inicio de sesión u otra página relevante
        return res.redirect('/login');
    });
});


/*
router.get('/create', (req,res)=>{
    res.render('create.ejs');
});

router.get('/edit/:id', (req,res)=>{
    const id = req.params.id;
    conexion.query('SELECT * FROM users where id=?', [id], (error, results)=>{
        if (error) {
            throw error;
        }else{
            res.render('edit.ejs', {user:results[0]});
        }
    });
});

router.get('/delete/:id', (req,res)=>{
    const id = req.params.id;
    conexion.query('DELETE FROM users where id=?', [id], (error, results)=>{
        if (error) {
            throw error;
        }else{
            res.redirect('/main');
        }
    });
});

//invocamos al crud
router.post('/save', crud.save); 
router.post('/change', crud.change); 

//invocamos al authController
router.post('/auth', authController.auth); 
router.post('/register', authController.register);
*/
//Exportamos
module.exports = router;



