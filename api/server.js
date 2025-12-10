// Wrapper para Vercel - importa o app Express principal
const app = require('../server');

// Exportar como handler serverless do Vercel
module.exports = (req, res) => {
    return app(req, res);
};

