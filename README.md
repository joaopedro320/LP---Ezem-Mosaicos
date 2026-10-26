# LP Ezem Mosaicos e Pedras

Landing page da Ezem Mosaicos e Pedras (Eusébio/CE), produto Projeto Stones. Feita pela QH4 Growth em 26/10/2026.

## Estrutura

```
ezem-mosaicos-lp/
├── index.html            LP principal
├── obrigado.html         página de obrigado (noindex), aberta depois do envio do formulário
├── 404.html              página de erro personalizada (a Vercel usa automaticamente)
├── favicon.ico
├── robots.txt
├── sitemap.xml
├── site.webmanifest
├── vercel.json           cache dos assets e headers de segurança
├── README.md
└── assets/
    ├── css/style.css
    ├── js/main.js
    └── img/              35 fotos em .webp, logo em SVG, favicon, ícones e og-image.jpg
```

## Como publicar na Vercel

1. Descompacte o zip.
2. Na Vercel: Add New > Project > arraste a pasta `ezem-mosaicos-lp` (ou suba num repositório e importe).
3. Framework Preset: Other. Sem build command, sem output directory.
4. Deploy. Depois, em Settings > Domains, conecte o domínio do cliente.

## Pendências antes de publicar

- **Domínio:** o cliente ainda não tem domínio. Usei `https://www.ezemmosaicosepedras.com.br/` como provisório. Quando o domínio for definido, trocar em: `index.html` (canonical, og:url, og:image, twitter:image e os dois JSON-LD), `robots.txt` e `sitemap.xml`.
- **Pixel do Meta:** espaço reservado no `<head>` do `index.html`, `obrigado.html` e `404.html`, logo abaixo do GTM, marcado com `<!-- META PIXEL: colar o código ... -->`.
- **GTM:** já instalado (GTM-WPMZW2LT) no head e no body das três páginas.
- **Endereço:** a página mostra só "Eusébio, região metropolitana de Fortaleza". O briefing traz um endereço no bloco de dados do titular (Rua Francisco Oliveira de Almeida, 1134, Coaçu), mas não deixa claro se é o endereço do estoque. Confirmar com o Edyelc antes de publicar rua, mapa ou link do GMN.
- **Avaliações do Google:** o briefing diz "ainda não definido", então a LP não tem depoimentos. Quando o GMN tiver avaliações, dá para incluir uma seção.
- **Instagram da QH4 no rodapé:** apontando para `instagram.com/qh4growth`. Conferir o @.
- **Formulário:** não há Apps Script. O formulário monta a mensagem com todos os campos, abre o WhatsApp (85) 98144-8844 e redireciona para `obrigado.html`. Se a conversa não abrir (bloqueio de pop-up), a página de obrigado tem o botão "Abrir o WhatsApp" com a mesma mensagem.

## Fonte do conteúdo

Tudo veio do briefing do formulário (respondido pelo Edyelc) e do resumo de contrato da QH4. Nada foi inventado: sem anos de empresa, sem obras próprias, sem depoimentos, sem garantias e sem dados técnicos de pedra.

- Pedras: Quartzito São Thomé (direto da mina), Quartzito Branca, Ouro Velho e Chumbita, Pedra Cariri, borda de piscina em Pedra Cariri, Pedra Castelo, Pedra Medieval Bege, Pedra Moledo, mosaicos; pedras do Piauí, Paraíba e interior do Ceará.
- Serviços: atendimento técnico, controle de qualidade, cubagem correta, entrega terceirizada, pós-venda.
- Experiência: mais de 20 anos no ramo da construção e mais de 10 como representante visitando obras (sem citar nomes, porque o cliente não quer aparecer).
- Logística: Fortaleza e região metropolitana; interior do Ceará por fretes parceiros. Máquina de corte de pequeno porte.
- Horário: segunda a sexta, 07:30 às 11:30 e 13:00 às 17:00.
- Posicionamento marcado no briefing: alto luxo, moderno, técnico, "Pedras Naturais Nobres". Fundo mesclado. Sem preferência de fonte ou paleta, então: Poppins + Inter e as cores da logo (marinho #0E2240 e dourado #C9A84C).
- Fotos: as 7 pastas enviadas pelo Erick (Borda de Piscina Cariri, Moledo, Medieval, Castelo, Cariri, Quartzito, São Thomé). Ficaram de fora prints com interface de celular, foto com figurinha e a de baixa resolução.

## Headline

A regra "MARMORARIA + PERTO DE VOCÊ" não se aplica aqui porque a Ezem não é marmoraria (vende pedras naturais e mosaicos). A headline ficou "Pedras naturais nobres perto de você", usando o termo que o próprio cliente pediu como tema principal.

## Eventos de rastreamento (dataLayer)

| Evento | Quando dispara | Parâmetros |
|---|---|---|
| `whatsapp_click` | clique em qualquer link de WhatsApp | `local` (hero, vivencia, info, rodape, flutuante, obrigado) |
| `cta_click` | clique em "Pedir orçamento" do topo e do hero | `local` |
| `pedra_visualizada` | troca de pedra no amostrário | `pedra` |
| `cta_orcar_pedra` | botão "Orçar [pedra]" | `pedra` |
| `form_start` | primeira interação com o formulário | |
| `generate_lead` | envio do formulário | `form`, `pedra`, `perfil`, `aplicacao` |
| `pagina_obrigado` | carregamento da página de obrigado | |

Conversão sugerida no Google Ads: `generate_lead` (ou `pagina_obrigado`) e `whatsapp_click`.

## Checklist de SEO

- [x] Title e meta description com nicho e cidade (Eusébio, Fortaleza)
- [x] Um H1, hierarquia H2/H3
- [x] Canonical (trocar quando houver domínio)
- [x] Open Graph completo + og-image 1200x630
- [x] Twitter Card
- [x] JSON-LD HomeAndConstructionBusiness (telefone, cidade, área atendida, horário, Instagram, produtos)
- [x] JSON-LD FAQPage com as 6 perguntas da página
- [x] robots.txt e sitemap.xml
- [x] site.webmanifest, favicon e apple-touch-icon
- [x] width/height em todas as imagens, lazy loading fora da primeira dobra, preload da imagem do hero
- [x] Imagens em WebP (4 MB no total)
- [x] Página 404 personalizada e página de obrigado com noindex
- [x] vercel.json
- [x] Botão de WhatsApp flutuante no canto direito
- [x] Botão de envio só libera com todos os campos obrigatórios válidos
- [x] Acessível: foco visível, navegação por teclado no amostrário, respeita "reduzir movimento"
