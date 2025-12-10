const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const path = require('path');

async function generatePDF(inputFilename, outputFilename) {
    try {
        // No Vercel, usar /tmp (único diretório writable). Localmente, usar a pasta do projeto
        const isVercel = process.env.VERCEL === '1';
        const baseDir = isVercel ? '/tmp' : __dirname;

        const mdPath = path.join(baseDir, 'content', inputFilename);
        const templatePath = path.join(__dirname, 'template.html');
        const stylePath = path.join(__dirname, 'styles', 'style.css');

        // Garantir que o diretório content existe (não precisamos mais de output)
        await fs.ensureDir(path.join(baseDir, 'content'));

        const markdownContent = await fs.readFile(mdPath, 'utf-8');
        const templateHtml = await fs.readFile(templatePath, 'utf-8');

        // Importar marked dinamicamente (é um módulo ES)
        const { marked } = await import('marked');
        const htmlBody = marked.parse(markdownContent);

        const finalHtml = templateHtml
            .replace('{{content}}', htmlBody)
            .replace('{{stylePath}}', stylePath);

        // Configuração para funcionar em ambientes serverless (Vercel, etc.)
        const browser = await puppeteer.launch({
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--no-first-run',
                '--no-zygote',
                '--single-process',
                '--disable-gpu'
            ],
            headless: true
        });
        const page = await browser.newPage();

        await page.setContent(finalHtml, { waitUntil: 'networkidle0' });

        const documentTitle = inputFilename
            .replace('.md', '')
            .replace(/_/g, ' ')
            .replace(/\b\w/g, l => l.toUpperCase());

        const currentDate = new Date().toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });

        // Gerar PDF em buffer (memória) ao invés de salvar em arquivo
        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
            displayHeaderFooter: true,
            title: documentTitle,
            author: 'Documentação Técnica',
            subject: 'Documentação Técnica',
            keywords: 'documentação, técnico, manual',
            headerTemplate: '<div></div>',
            footerTemplate: `
                <div style="font-size: 9px; color: #6b7280; width: 100%; padding: 0 2cm; border-top: 1px solid #e5e7eb; padding-top: 10px; display: flex; justify-content: space-between; align-items: center; font-family: 'Inter', sans-serif; background: transparent;">
                    <div style="display: flex; gap: 24px; align-items: center;">
                        <span style="color: #374151; font-weight: 500;">${currentDate}</span>
                        <span style="width: 1px; height: 12px; background: #d1d5db;"></span>
                        <span style="color: #9ca3af; text-transform: uppercase; letter-spacing: 0.5px; font-size: 8px;">Documentação Técnica</span>
                    </div>
                    <div style="color: #6b7280; font-weight: 500; letter-spacing: 0.3px;">
                        <span style="color: #9ca3af;">Página </span><span class="pageNumber" style="color: #374151;"></span><span style="color: #9ca3af;"> de </span><span class="totalPages" style="color: #374151;"></span>
                    </div>
                </div>
            `,
            margin: {
                top: '2.5cm',
                bottom: '2.8cm',
                left: '2cm',
                right: '2cm'
            }
        });

        await browser.close();
        console.log(`✅ PDF gerado com sucesso: ${outputFilename}`);

        // Retornar o buffer do PDF ao invés de salvar em arquivo
        return {
            success: true,
            message: `PDF gerado com sucesso: ${outputFilename}`,
            filename: outputFilename,
            pdfBuffer: pdfBuffer
        };

    } catch (error) {
        console.error('Erro ao gerar PDF:', error);
        throw error;
    }
}

// Não precisamos mais criar diretório output - PDFs são gerados em memória

module.exports = { generatePDF };
