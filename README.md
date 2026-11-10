# OhYu — profile and portfolio

Complete static site, adapted from the supplied imfunniee/gitfolio layout: profile on the left, circular avatar with transparent feathered edges, standalone clickable social icons, Work and Forks cards on the right, responsive mobile layout. Interface text is in English. Repository descriptions are shown in the author's original language.

## Shard Cloud — ohyusemri.xyz

1. Envie o ZIP para sua aplicação de site na Shard Cloud. `package.json`, `server.js` e `index.html` precisam ficar na raiz, junto de `assets/`.
2. Selecione ambiente Node.js 20 ou superior.
3. Comando de inicialização: `npm start`. Arquivo principal, se solicitado: `server.js`.
4. Não há build nem dependências externas. Se o painel exigir instalação, `npm install` é suficiente.
5. O servidor escuta em `0.0.0.0` e usa a variável `PORT` definida pela plataforma; quando ela não existe, usa a porta `80`. Se o painel pedir a porta HTTP, configure o mesmo valor.
6. Vincule `ohyusemri.xyz` à aplicação na configuração de domínio da hospedagem. Caso ainda não esteja vinculado, crie no seu provedor DNS exatamente os registros exibidos pelo painel. Não há um IP universal neste pacote. Adicione `www.ohyusemri.xyz` separadamente somente se quiser usar www.
7. Verifique o HTTPS/SSL no painel. O servidor Node recebe HTTP internamente; o HTTPS público fica a cargo da hospedagem.

Teste a aplicação em `/health`: deve responder `{"status":"ok","site":"ohyusemri.xyz"}`. Se a resposta for a página da plataforma dizendo "Site not found", verifique o domínio e o vínculo com a aplicação.

As configurações de domínio, DNS e SSL não são alteradas pelo ZIP. O pacote foi preparado e testado localmente; ainda precisa ser enviado à sua conta.

### Executar localmente

No PowerShell, dentro da pasta extraída:

```powershell
$env:PORT = "3000"
npm start
```

Abra http://localhost:3000. Você também pode abrir index.html para conferir o visual. A foto e os projetos precisam de internet. O layout, os ícones, as fontes e o fundo estão no pacote.

Documentação de recursos da plataforma: https://shardcloud.app/pt-br/resources/applications

## Links

- GitHub: https://github.com/llohyull
- Discord: https://discord.com/users/1429982972081209525

The avatar loads from your GitHub profile automatically. If loading fails, initials appear.

## Projects

Public repositories are loaded from GitHub on opening, refreshed every five minutes while the tab is visible, and can also be refreshed manually. This is periodic updating, not a realtime event stream. Work and forks have separate sections. The script supports pagination up to 1,000 repositories. Cards open an accessible details dialog; its button opens the actual project on GitHub. Ctrl/Cmd-click opens the repository directly. Escape closes the dialog.

The last successful response is cached in the visitor's browser. If GitHub is unavailable or its public rate limit is reached, an error is displayed and cached cards remain visible. No sample projects or invented statistics are shown.

## Background

The attachment named `video_alta_qualidade(2).gif` actually contains a single-frame PNG. Its grid image is included as `assets/background.png`, with a looping CSS pan/zoom and black gradients. This does not recreate missing frames from the original animation. To use the exact animated GIF, place it in `assets/background.gif` and change the URL in `.backdrop` in index.css. You can also remove `drift` from its animation rule to keep only the GIF's own motion.

Reduced-motion system settings disable the decorative movement. Background layers do not intercept clicks. All project text is inserted as text, not interpreted as HTML.

## Files

- index.html: profile, content sections and project dialog.
- index.css: layout, fonts, dark gradient, feathered avatar transparency and effects.
- app.js: repository loading, caching and dialog.
- assets/: supplied background and fonts/icons from the supplied template archive.

The old template owner's projects, demo blog, contact details and social links were removed. No global visitor counter is included in this static redesign. No website was deployed or GitHub repository modified.

Design reference: supplied imfunniee/gitfolio HTML/CSS. Font Awesome brand icons and Poppins/Questrial font files were taken from the supplied resource archive; retain applicable third-party license notices when distributing.
