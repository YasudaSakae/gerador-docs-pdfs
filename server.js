const express = require('express');
const multer = require('multer');
const fs = require('fs-extra');
const path = require('path');
let generatePDF;

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/api', (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
});


const contentDir = path.join(__dirname, 'content');
fs.ensureDirSync(contentDir);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, contentDir);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.originalname.toLowerCase().endsWith('.md')) {
            cb(null, true);
        } else {
            cb(new Error('Apenas arquivos .md são permitidos'), false);
        }
    },
    limits: {
        fileSize: 10 * 1024 * 1024
    }
});

app.get('/api/files', async (req, res) => {
    try {
        const contentDir = path.join(__dirname, 'content');
        await fs.ensureDir(contentDir);

        const files = await fs.readdir(contentDir);
        const mdFiles = files
            .filter(file => file.endsWith('.md'))
            .map(file => ({
                name: file,
                displayName: file.replace('.md', '').replace(/_/g, ' ')
            }));

        res.json({ files: mdFiles });
    } catch (error) {
        console.error('Erro ao listar arquivos:', error);
        res.status(500).json({ error: 'Erro ao listar arquivos' });
    }
});

app.post('/api/upload', (req, res) => {
    console.log('=== ROTA /api/upload CHAMADA ===');
    console.log('Método:', req.method);
    console.log('URL:', req.url);
    console.log('Content-Type:', req.headers['content-type']);

    try {
        upload.single('file')(req, res, (err) => {
            if (err) {
                console.error('Erro no multer:', err);
                console.error('Tipo do erro:', err.constructor.name);

                if (err instanceof multer.MulterError) {
                    return res.status(400).json({
                        error: 'Erro no upload',
                        message: err.message
                    });
                }

                return res.status(400).json({
                    error: 'Erro no upload',
                    message: err.message || 'Erro desconhecido no upload'
                });
            }

            if (!req.file) {
                console.log('Nenhum arquivo recebido na requisição');
                return res.status(400).json({
                    error: 'Nenhum arquivo enviado',
                    message: 'Certifique-se de enviar um arquivo com o campo "file"'
                });
            }

            console.log('Arquivo recebido com sucesso:', req.file.originalname);
            console.log('Tamanho:', req.file.size, 'bytes');

            return res.json({
                success: true,
                message: `Arquivo "${req.file.originalname}" enviado com sucesso!`,
                filename: req.file.originalname
            });
        });
    } catch (error) {
        console.error('Erro inesperado no endpoint de upload:', error);
        return res.status(500).json({
            error: 'Erro interno no servidor',
            message: error.message
        });
    }
});

app.get('/api/pdf/:filename', (req, res) => {
    try {
        const pdfFilename = req.params.filename;
        const pdfPath = path.join(__dirname, 'output', pdfFilename);

        if (!fs.existsSync(pdfPath)) {
            return res.status(404).json({ error: 'PDF não encontrado' });
        }

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `inline; filename="${pdfFilename}"`);
        res.sendFile(pdfPath);
    } catch (error) {
        console.error('Erro ao servir PDF:', error);
        res.status(500).json({
            error: 'Erro ao servir PDF',
            message: error.message
        });
    }
});

app.post('/api/generate', async (req, res) => {
    try {
        if (!generatePDF) {
            const generateModule = require('./generate');
            generatePDF = generateModule.generatePDF;
        }

        const { filename } = req.body;

        if (!filename || !filename.endsWith('.md')) {
            return res.status(400).json({ error: 'Nome de arquivo inválido' });
        }

        const pdfName = filename
            .replace('.md', '')
            .replace(/^doc_[a-z]_/, '')
            .replace(/_/g, '_') + '.pdf';

        const result = await generatePDF(filename, pdfName);

        res.json(result);
    } catch (error) {
        console.error('Erro ao gerar PDF:', error);
        res.status(500).json({
            error: 'Erro ao gerar PDF',
            message: error.message
        });
    }
});

app.use((err, req, res, next) => {
    console.error('Erro não tratado:', err);

    if (req.path.startsWith('/api')) {
        return res.status(500).json({
            error: 'Erro interno do servidor',
            message: err.message
        });
    }

    next(err);
});

app.use(express.static('public'));

app.use((req, res) => {
    if (req.path.startsWith('/api')) {
        return res.status(404).json({
            error: 'Endpoint não encontrado',
            message: `A rota ${req.path} não existe`
        });
    }
});

// Exportar para Vercel (serverless)
module.exports = app;

// Iniciar servidor local apenas se não estiver no Vercel
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
        console.log(`📁 Certifique-se de que os arquivos .md estão na pasta 'content/'`);
        console.log(`\n📋 Rotas registradas:`);
        console.log(`   GET  /api/files`);
        console.log(`   POST /api/upload`);
        console.log(`   POST /api/generate`);
        console.log(`\n⚠️  Se você fez mudanças no código, certifique-se de reiniciar o servidor!`);
    });
}

