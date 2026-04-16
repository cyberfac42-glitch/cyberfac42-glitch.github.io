// CHATBOT CYBER FAC - Version autonome
// Ajouter ce fichier sur GitHub puis ajouter cette ligne dans index.html:
// <script src="chatbot.js"></script>

(function() {
    // Injecter le CSS
    const style = document.createElement('style');
    style.textContent = `
        .chat-widget {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 9999;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        .chat-toggle {
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #006233 0%, #004d28 100%);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            font-size: 28px;
            box-shadow: 0 4px 20px rgba(0,98,51,0.4);
            transition: transform 0.3s, box-shadow 0.3s;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .chat-toggle:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 25px rgba(0,98,51,0.5);
        }
        .chat-toggle.open { display: none; }
        .chat-window {
            display: none;
            width: 370px;
            height: 550px;
            background: #f5f5f5;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 5px 40px rgba(0,0,0,0.3);
            flex-direction: column;
        }
        .chat-window.open { display: flex; }
        .chat-header {
            background: linear-gradient(135deg, #006233 0%, #004d28 100%);
            color: white;
            padding: 14px 16px;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .chat-avatar {
            width: 40px;
            height: 40px;
            background: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
        }
        .chat-info h4 { font-size: 16px; font-weight: 600; margin: 0; }
        .chat-info p { font-size: 11px; opacity: 0.9; margin: 2px 0 0 0; }
        .chat-status-dot {
            width: 8px;
            height: 8px;
            background: #4CAF50;
            border-radius: 50%;
            display: inline-block;
            margin-right: 4px;
            animation: chat-pulse 2s infinite;
        }
        @keyframes chat-pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }
        .chat-close {
            margin-left: auto;
            background: none;
            border: none;
            color: white;
            font-size: 24px;
            cursor: pointer;
            opacity: 0.8;
            padding: 0;
            line-height: 1;
        }
        .chat-close:hover { opacity: 1; }
        .chat-messages {
            flex: 1;
            overflow-y: auto;
            padding: 16px;
            display: flex;
            flex-direction: column;
            gap: 12px;
            background: #f5f5f5;
        }
        .chat-msg {
            max-width: 85%;
            padding: 10px 14px;
            border-radius: 16px;
            line-height: 1.5;
            font-size: 14px;
            animation: chat-fadeIn 0.3s ease;
        }
        @keyframes chat-fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .chat-msg.bot {
            background: white;
            color: #333;
            align-self: flex-start;
            border-bottom-left-radius: 4px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        .chat-msg.user {
            background: #006233;
            color: white;
            align-self: flex-end;
            border-bottom-right-radius: 4px;
        }
        .chat-quick-replies {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            padding: 8px 16px;
            background: #f5f5f5;
            border-top: 1px solid #e0e0e0;
        }
        .chat-quick-btn {
            background: white;
            border: 1px solid #006233;
            color: #006233;
            padding: 6px 12px;
            border-radius: 16px;
            font-size: 12px;
            cursor: pointer;
            transition: all 0.3s;
        }
        .chat-quick-btn:hover {
            background: #006233;
            color: white;
        }
        .chat-input-area {
            display: flex;
            gap: 8px;
            padding: 12px;
            background: white;
            border-top: 1px solid #e0e0e0;
        }
        .chat-input-area input {
            flex: 1;
            padding: 10px 14px;
            border: 1px solid #ddd;
            border-radius: 20px;
            font-size: 14px;
            outline: none;
        }
        .chat-input-area input:focus { border-color: #006233; }
        .chat-input-area button {
            width: 40px;
            height: 40px;
            background: #006233;
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            font-size: 18px;
        }
        .chat-typing {
            display: flex;
            gap: 4px;
            padding: 10px 14px;
            background: white;
            border-radius: 16px;
            align-self: flex-start;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        .chat-typing span {
            width: 8px;
            height: 8px;
            background: #006233;
            border-radius: 50%;
            animation: chat-typing 1.4s infinite;
        }
        .chat-typing span:nth-child(2) { animation-delay: 0.2s; }
        .chat-typing span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes chat-typing {
            0%, 100% { transform: translateY(0); opacity: 0.5; }
            50% { transform: translateY(-4px); opacity: 1; }
        }
        .chat-info-card {
            background: #f0f9f4;
            border-left: 3px solid #006233;
            padding: 10px;
            margin-top: 8px;
            border-radius: 0 8px 8px 0;
            font-size: 13px;
        }
        .chat-info-card strong {
            color: #006233;
            display: block;
            margin-bottom: 4px;
        }
        .chat-price-tag {
            display: inline-block;
            background: #D21034;
            color: white;
            padding: 2px 8px;
            border-radius: 10px;
            font-weight: 600;
            font-size: 13px;
        }
        @media (max-width: 420px) {
            .chat-window {
                width: calc(100vw - 20px);
                height: calc(100vh - 80px);
                position: fixed;
                bottom: 70px;
                right: 10px;
            }
        }
    `;
    document.head.appendChild(style);

    // Injecter le HTML
    const widget = document.createElement('div');
    widget.className = 'chat-widget';
    widget.innerHTML = `
        <button class="chat-toggle" id="chat-toggle" onclick="toggleChatBot()">💬</button>
        <div class="chat-window" id="chat-window">
            <div class="chat-header">
                <div class="chat-avatar">🏪</div>
                <div class="chat-info">
                    <h4>Cyber Fac</h4>
                    <p><span class="chat-status-dot"></span>En ligne</p>
                </div>
                <button class="chat-close" onclick="toggleChatBot()">×</button>
            </div>
            <div class="chat-messages" id="chat-messages"></div>
            <div class="chat-quick-replies">
                <button class="chat-quick-btn" onclick="sendQuickReply('Photos d\\'identité')">📸 Photos</button>
                <button class="chat-quick-btn" onclick="sendQuickReply('Tarifs')">💰 Tarifs</button>
                <button class="chat-quick-btn" onclick="sendQuickReply('Démarches administratives')">📄 Démarches</button>
                <button class="chat-quick-btn" onclick="sendQuickReply('Documents Algérie S12')">🇩🇿 Algérie</button>
            </div>
            <div class="chat-input-area">
                <input type="text" id="chat-input" placeholder="Posez votre question..." onkeypress="handleChatKeyPress(event)">
                <button onclick="sendChatMessage()">➤</button>
            </div>
        </div>
    `;
    document.body.appendChild(widget);

    // Variables
    const CF_TEL = "04 77 95 55 50";
    const CF_ADRESSE = "64 rue du Onze Novembre, 42100 Saint-Étienne";

    // Fonctions globales
    window.getChatResponse = function(msg) {
        msg = msg.toLowerCase();
        
        if (msg.match(/^(bonjour|salut|hello|coucou|bonsoir|hey)/)) {
            return `Bonjour ! 👋 Bienvenue chez Cyber Fac. Comment puis-je vous aider ?`;
        }
        
        if (msg.match(/horaire|heure|ouvert|fermé|ouvre|ferme|quand/)) {
            return `🕐 <strong>Nos horaires :</strong><br><br>• Lundi : 9h30-19h<br>• Mar-Jeu : 8h45-19h<br>• Vendredi : 8h45-13h / 14h30-19h<br>• Samedi : 8h45-17h<br>• Dimanche : Fermé<div class="chat-info-card"><strong>📞 Contact</strong>${CF_TEL}</div>`;
        }
        
        if (msg.match(/adresse|où|localisation|situé|trouver|venir/)) {
            return `📍 <strong>Notre adresse :</strong><br><br>${CF_ADRESSE}<br><br>Près du centre-ville de Saint-Étienne.`;
        }
        
        if (msg.match(/photo|identité|passeport|permis|visa|fond blanc/)) {
            let r = `📸 <strong>Photos d'identité</strong><br><br>✅ Carte d'identité française<br>✅ Passeport français<br>✅ Permis de conduire<br>✅ Titre de séjour<br>✅ Visa<br>✅ <strong>Passeport algérien (fond blanc)</strong><br>✅ <strong>Carte identité algérienne</strong><br><br><span class="chat-price-tag">6€ tous types</span>`;
            if (msg.match(/ephoto|e-photo|code|numérique|ants/)) {
                r += `<div class="chat-info-card"><strong>📱 E-photo</strong>Code numérique pour démarches en ligne. Valide immédiatement !</div>`;
            }
            return r;
        }
        
        if (msg.match(/tarif|prix|coût|combien|cher/)) {
            return `💰 <strong>Nos tarifs :</strong><br><br>📸 Photos (tous types) : <span class="chat-price-tag">6€</span><br>📋 CV professionnel : <span class="chat-price-tag">10€</span><br>🖨️ Photocopie NB : <span class="chat-price-tag">0.20€</span><br>🖨️ Photocopie couleur : <span class="chat-price-tag">0.50€</span><br>📄 Impression NB : <span class="chat-price-tag">0.30€</span><br>📄 Impression couleur : <span class="chat-price-tag">0.50€</span><br>📠 Scan : <span class="chat-price-tag">0.50€</span>`;
        }
        
        if (msg.match(/dekra|code de la route|examen/)) {
            return `🚗 <strong>Code DEKRA</strong><br><br>Centre d'examen agréé !<br><br>✅ Inscription rapide<br>✅ Sessions du lundi au samedi<br>✅ Résultat immédiat<div class="chat-info-card"><strong>📝 Inscription</strong>Venez avec une pièce d'identité ou appelez le ${CF_TEL}</div>`;
        }
        
        if (msg.match(/transfert|argent|envoyer|ria|western|moneygram|orange money/)) {
            return `💸 <strong>Transfert d'argent</strong><br><br>• Ria<br>• Western Union<br>• Moneygram<br>• Orange Money<br><br>✅ Rapide et sécurisé<br>✅ Vers tous les pays<div class="chat-info-card"><strong>📄 Document</strong>Pièce d'identité requise</div>`;
        }
        
        if (msg.match(/cv|curriculum|lettre|emploi|candidature/)) {
            return `📋 <strong>CV professionnel</strong><br><br>✅ Mise en page moderne<br>✅ Conseils personnalisés<br>✅ Impression + PDF<br><br><span class="chat-price-tag">10€</span><div class="chat-info-card"><strong>⏱️ Délai</strong>30 min à 1h selon complexité</div>`;
        }
        
        if (msg.match(/photocop|impression|imprimer|copie|scanner|scan/)) {
            return `🖨️ <strong>Photocopies & Impressions</strong><br><br>📄 <strong>Photocopie</strong><br>• NB : <span class="chat-price-tag">0.20€</span><br>• Couleur : <span class="chat-price-tag">0.50€</span><br><br>🖨️ <strong>Impression</strong><br>• NB : <span class="chat-price-tag">0.30€</span><br>• Couleur : <span class="chat-price-tag">0.50€</span><br><br>📠 <strong>Scan</strong> : <span class="chat-price-tag">0.50€</span>`;
        }
        
        if (msg.match(/contact|appeler|téléphone|numéro/)) {
            return `📞 <strong>Nous contacter</strong><br><br><strong>Tél :</strong> ${CF_TEL}<br><strong>Adresse :</strong> ${CF_ADRESSE}<br><br>📱 Instagram : @cyber_fac<br>📘 Facebook : Cyber Fac`;
        }
        
        if (msg.match(/service|proposez|faites|offre/)) {
            return `🏪 <strong>Nos services :</strong><br><br>📸 Photos d'identité (ANTS, e-photo)<br>🚗 Code DEKRA<br>💸 Transfert d'argent<br>📋 CV & lettres<br>🖨️ Photocopies<br>📄 Démarches administratives<br>🇩🇿 Documents Algérie (S12, capacité...)`;
        }
        
        if (msg.match(/administratif|démarche|demarche|dossier|papier/)) {
            return `📄 <strong>Démarches administratives</strong><br><br>Nous vous aidons pour :<br><br>🛂 <strong>Titre de séjour</strong> (tous types)<br>🚗 <strong>Permis de conduire</strong><br>🚙 <strong>Carte grise</strong><br>📝 Formulaires CERFA<br>📋 Dossiers complets<div class="chat-info-card"><strong>💡 Conseil</strong>Venez avec vos documents, on s'occupe du reste !</div>`;
        }
        
        if (msg.match(/titre.{0,5}séjour|titre.{0,5}sejour|régularisation|regularisation|récépissé|recepisse|préfecture|prefecture/)) {
            return `🛂 <strong>Titre de séjour</strong><br><br>Nous vous accompagnons pour :<br><br>✅ Première demande<br>✅ Renouvellement<br>✅ Changement de statut<br>✅ Constitution du dossier<br>✅ Photos conformes ANTS<br>✅ E-photo pour ANEF<div class="chat-info-card"><strong>📍 Venez nous voir</strong>On prépare votre dossier complet !</div>`;
        }
        
        if (msg.match(/carte.{0,5}grise|immatriculation|véhicule|vehicule/)) {
            return `🚙 <strong>Carte grise</strong><br><br>Nous vous aidons pour :<br><br>✅ Changement de propriétaire<br>✅ Changement d'adresse<br>✅ Duplicata<br>✅ Déclaration de cession<div class="chat-info-card"><strong>📄 Documents à apporter</strong>Carte grise, pièce d'identité, justificatif de domicile</div>`;
        }
        
        if (msg.match(/s12|capacité|capac|consulat|carte.{0,5}identité.{0,5}alg|cni.{0,5}alg|algér|dz/)) {
            return `🇩🇿 <strong>Documents Algérie</strong><br><br>📸 <strong>Photos conformes consulat</strong><br>• Passeport algérien (fond blanc)<br>• Carte d'identité algérienne<br><br>📄 <strong>Documents consulaires</strong><br>• S12 (certificat de résidence)<br>• Capacité permis DZ<br>• Dossiers consulat<br><br><span class="chat-price-tag">Photos : 6€</span><div class="chat-info-card"><strong>🇩🇿 Spécialistes Algérie</strong>Normes consulat respectées !</div>`;
        }
        
        if (msg.match(/merci|super|génial|parfait/)) {
            return `Avec plaisir ! 😊 À bientôt chez Cyber Fac !`;
        }
        
        if (msg.match(/au revoir|bye|à bientôt/)) {
            return `Au revoir ! 👋 À très bientôt chez Cyber Fac !`;
        }
        
        return `Je peux vous renseigner sur :<br><br>• 📸 Photos d'identité<br>• 🚗 Code DEKRA<br>• 💸 Transfert d'argent<br>• 📄 Démarches administratives<br>• 🇩🇿 Documents Algérie<br>• 🕐 Horaires<br>• 💰 Tarifs<br><br>Ou appelez le <strong>${CF_TEL}</strong>`;
    };

    window.toggleChatBot = function() {
        const win = document.getElementById('chat-window');
        const btn = document.getElementById('chat-toggle');
        
        if (win.classList.contains('open')) {
            win.classList.remove('open');
            btn.classList.remove('open');
        } else {
            win.classList.add('open');
            btn.classList.add('open');
            if (document.getElementById('chat-messages').children.length === 0) {
                addBotMsg('Bonjour ! 👋 Je suis l\'assistant Cyber Fac. Comment puis-je vous aider ?');
            }
        }
    };

    window.addBotMsg = function(text) {
        const div = document.createElement('div');
        div.className = 'chat-msg bot';
        div.innerHTML = text;
        document.getElementById('chat-messages').appendChild(div);
        document.getElementById('chat-messages').scrollTop = document.getElementById('chat-messages').scrollHeight;
    };

    window.addUserMsg = function(text) {
        const div = document.createElement('div');
        div.className = 'chat-msg user';
        div.textContent = text;
        document.getElementById('chat-messages').appendChild(div);
        document.getElementById('chat-messages').scrollTop = document.getElementById('chat-messages').scrollHeight;
    };

    window.showTypingIndicator = function() {
        const div = document.createElement('div');
        div.className = 'chat-typing';
        div.id = 'chat-typing';
        div.innerHTML = '<span></span><span></span><span></span>';
        document.getElementById('chat-messages').appendChild(div);
        document.getElementById('chat-messages').scrollTop = document.getElementById('chat-messages').scrollHeight;
    };

    window.hideTypingIndicator = function() {
        const el = document.getElementById('chat-typing');
        if (el) el.remove();
    };

    window.sendChatMessage = function() {
        const input = document.getElementById('chat-input');
        const text = input.value.trim();
        if (!text) return;
        
        addUserMsg(text);
        input.value = '';
        showTypingIndicator();
        
        setTimeout(() => {
            hideTypingIndicator();
            addBotMsg(getChatResponse(text));
        }, 600 + Math.random() * 600);
    };

    window.sendQuickReply = function(text) {
        document.getElementById('chat-input').value = text;
        sendChatMessage();
    };

    window.handleChatKeyPress = function(e) {
        if (e.key === 'Enter') sendChatMessage();
    };
})();
