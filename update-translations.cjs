const fs = require('fs');
const content = fs.readFileSync('src/i18n/translations.js', 'utf8');

const newStrings = {
  en: {
    set_theme: 'Theme Mode', set_theme_sub: 'Choose your preferred theme',
    set_accent: 'Accent Color', set_accent_sub: 'Personalize primary color',
    set_glass: 'Glassmorphism', set_glass_sub: 'Adjust transparency & blur',
    set_bg: 'Background Style', set_bg_sub: 'Select your background',
    set_font: 'Font Family', set_font_sub: 'Choose preferred font',
    set_fontsize: 'Typography Scale', set_fontsize_sub: 'Adjust text size',
    set_density: 'Layout Density', set_density_sub: 'Choose layout spacing',
    set_anim: 'Animations', set_anim_sub: 'Toggle motion effects',
    set_contrast: 'High Contrast', set_contrast_sub: 'Improve visibility',
    set_lang: 'Language', set_lang_sub: 'Choose region',
    set_card: 'Card Style', set_card_sub: 'Choose card display',
    preview: 'Live Preview', preview_sub: 'See changes in real-time',
    card_primary: 'PRIMARY CARD', card_travel: 'TRAVEL CARD', card_shopping: 'SHOPPING CARD', card_business: 'BUSINESS CARD', card_forex: 'FOREX CARD',
    status_active: 'Active', status_inactive: 'Inactive',
    promo_1_title: 'Weekend Bonanza!', promo_1_desc: 'Up to 20% off on dining & movies.', promo_1_btn: 'Explore Offers',
    promo_2_title: 'Travel Benefits', promo_2_desc: '5X points on flights.', promo_2_btn: 'Book Now',
    promo_3_title: 'Shopping Festival', promo_3_desc: 'Extra 15% cashback on fashion.', promo_3_btn: 'Shop Now'
  },
  hi: {
    set_theme: 'थीम मोड', set_theme_sub: 'अपनी पसंदीदा थीम चुनें',
    set_accent: 'एक्सेंट रंग', set_accent_sub: 'प्राथमिक रंग वैयक्तिकृत करें',
    set_glass: 'ग्लासमॉर्फिज्म', set_glass_sub: 'पारदर्शिता और धुंधलापन समायोजित करें',
    set_bg: 'पृष्ठभूमि शैली', set_bg_sub: 'पृष्ठभूमि चुनें',
    set_font: 'फ़ॉन्ट शैली', set_font_sub: 'फ़ॉन्ट चुनें',
    set_fontsize: 'टाइपोग्राफी स्केल', set_fontsize_sub: 'टेक्स्ट का आकार बदलें',
    set_density: 'लेआउट घनत्व', set_density_sub: 'लेआउट स्पेसिंग चुनें',
    set_anim: 'एनिमेशन', set_anim_sub: 'गति प्रभाव टॉगल करें',
    set_contrast: 'उच्च कंट्रास्ट', set_contrast_sub: 'दृश्यता में सुधार करें',
    set_lang: 'भाषा (Language)', set_lang_sub: 'क्षेत्र चुनें',
    set_card: 'कार्ड शैली', set_card_sub: 'कार्ड प्रदर्शन चुनें',
    preview: 'लाइव पूर्वावलोकन', preview_sub: 'वास्तविक समय में परिवर्तन देखें',
    card_primary: 'प्राथमिक कार्ड', card_travel: 'यात्रा कार्ड', card_shopping: 'शॉपिंग कार्ड', card_business: 'व्यापार कार्ड', card_forex: 'विदेशी मुद्रा कार्ड',
    status_active: 'सक्रिय', status_inactive: 'निष्क्रिय',
    promo_1_title: 'सप्ताहांत धमाका!', promo_1_desc: 'डाइनिंग और फिल्मों पर 20% तक की छूट।', promo_1_btn: 'ऑफर देखें',
    promo_2_title: 'यात्रा लाभ', promo_2_desc: 'उड़ानों पर 5X पॉइंट्स।', promo_2_btn: 'अभी बुक करें',
    promo_3_title: 'शॉपिंग फेस्टिवल', promo_3_desc: 'फैशन पर अतिरिक्त 15% कैशबैक।', promo_3_btn: 'अभी खरीदें'
  },
  ta: {
    set_theme: 'தீம் பயன்முறை', set_theme_sub: 'விருப்பமான தீம் தேர்வு செய்க',
    set_accent: 'முதன்மை நிறம்', set_accent_sub: 'முதன்மை நிறத்தை மாற்றுக',
    set_glass: 'கண்ணாடி விளைவு', set_glass_sub: 'வெளிப்படைத்தன்மையை மாற்றுக',
    set_bg: 'பின்னணி பாணி', set_bg_sub: 'பின்னணியை தேர்வு செய்க',
    set_font: 'எழுத்துரு', set_font_sub: 'எழுத்துருவை தேர்வு செய்க',
    set_fontsize: 'எழுத்து அளவு', set_fontsize_sub: 'எழுத்து அளவை மாற்றுக',
    set_density: 'இடைவெளி அளவு', set_density_sub: 'இடைவெளியை தேர்வு செய்க',
    set_anim: 'இயங்குபடங்கள்', set_anim_sub: 'இயங்குபடங்களை மாற்று',
    set_contrast: 'உயர் மாறுபாடு', set_contrast_sub: 'காட்சி மேம்படுத்தல்',
    set_lang: 'மொழி (Language)', set_lang_sub: 'பகுதியைத் தேர்வு செய்க',
    set_card: 'அட்டை பாணி', set_card_sub: 'அட்டை தோற்றத்தை தேர்வு செய்க',
    preview: 'நேரடி முன்னோட்டம்', preview_sub: 'மாற்றங்களை உடனே காணுங்கள்',
    card_primary: 'முதன்மை அட்டை', card_travel: 'பயண அட்டை', card_shopping: 'ஷாப்பிங் அட்டை', card_business: 'வணிக அட்டை', card_forex: 'அந்நிய செலாவணி அட்டை',
    status_active: 'செயலில்', status_inactive: 'செயலற்ற',
    promo_1_title: 'வார இறுதி சலுகை!', promo_1_desc: 'உணவு & திரைப்படங்களுக்கு 20% தள்ளுபடி.', promo_1_btn: 'சலுகைகள்',
    promo_2_title: 'பயண நன்மைகள்', promo_2_desc: 'விமானங்களுக்கு 5X புள்ளிகள்.', promo_2_btn: 'இப்போதே பதிவு செய்',
    promo_3_title: 'ஷாப்பிங் திருவிழா', promo_3_desc: '15% கூடுதல் கேஷ்பேக்.', promo_3_btn: 'இப்போதே வாங்கு'
  },
  te: {
    set_theme: 'థీమ్ మోడ్', set_theme_sub: 'థీమ్ ఎంచుకోండి',
    set_accent: 'యాస రంగు', set_accent_sub: 'ప్రాథమిక రంగుని మార్చండి',
    set_glass: 'గ్లాస్ ఎఫెక్ట్', set_glass_sub: 'పారదర్శకతను మార్చండి',
    set_bg: 'నేపథ్య శైలి', set_bg_sub: 'నేపథ్యాన్ని ఎంచుకోండి',
    set_font: 'ఫాంట్ శైలి', set_font_sub: 'ఫాంట్‌ను ఎంచుకోండి',
    set_fontsize: 'అక్షర పరిమాణం', set_fontsize_sub: 'అక్షర పరిమాణాన్ని మార్చండి',
    set_density: 'ఖాళీలు', set_density_sub: 'లేఅవుట్ ఖాళీలను ఎంచుకోండి',
    set_anim: 'యానిమేషన్లు', set_anim_sub: 'యానిమేషన్లను మార్చండి',
    set_contrast: 'అధిక కాంట్రాస్ట్', set_contrast_sub: 'వీక్షణను మెరుగుపరచండి',
    set_lang: 'భాష (Language)', set_lang_sub: 'ప్రాంతాన్ని ఎంచుకోండి',
    set_card: 'కార్డు శైలి', set_card_sub: 'కార్డు ప్రదర్శనను ఎంచుకోండి',
    preview: 'లైవ్ ప్రివ్యూ', preview_sub: 'మార్పులను వెంటనే చూడండి',
    card_primary: 'ప్రాథమిక కార్డు', card_travel: 'ప్రయాణ కార్డు', card_shopping: 'షాపింగ్ కార్డు', card_business: 'వ్యాపార కార్డు', card_forex: 'విదేశీ మారక కార్డు',
    status_active: 'చురుకుగా', status_inactive: 'క్రియారహితం',
    promo_1_title: 'వీకెండ్ బొనాంజా!', promo_1_desc: 'భోజనం & సినిమాలపై 20% తగ్గింపు.', promo_1_btn: 'ఆఫర్లు చూడండి',
    promo_2_title: 'ప్రయాణ ప్రయోజనాలు', promo_2_desc: 'విమానాలపై 5X పాయింట్లు.', promo_2_btn: 'ఇప్పుడే బుక్ చేయండి',
    promo_3_title: 'షాపింగ్ ఫెస్టివల్', promo_3_desc: 'అదనంగా 15% క్యాష్‌బ్యాక్.', promo_3_btn: 'ఇప్పుడే కొనండి'
  },
  fr: {
    set_theme: 'Mode Thème', set_theme_sub: 'Choisissez votre thème',
    set_accent: 'Couleur Principale', set_accent_sub: 'Personnalisez la couleur',
    set_glass: 'Effet Verre', set_glass_sub: 'Ajuster transparence & flou',
    set_bg: 'Fond', set_bg_sub: 'Sélectionnez votre fond',
    set_font: 'Police', set_font_sub: 'Choisissez la police',
    set_fontsize: 'Taille du texte', set_fontsize_sub: 'Ajuster la taille',
    set_density: 'Densité', set_density_sub: "Choisissez l'espacement",
    set_anim: 'Animations', set_anim_sub: 'Activer le mouvement',
    set_contrast: 'Contraste élevé', set_contrast_sub: 'Améliorer la visibilité',
    set_lang: 'Langue (Language)', set_lang_sub: 'Choisissez la région',
    set_card: 'Style de Carte', set_card_sub: 'Affichage des cartes',
    preview: 'Aperçu', preview_sub: 'Voir les changements',
    card_primary: 'CARTE PRINCIPALE', card_travel: 'CARTE VOYAGE', card_shopping: 'CARTE SHOPPING', card_business: 'CARTE PRO', card_forex: 'CARTE DEVISES',
    status_active: 'Actif', status_inactive: 'Inactif',
    promo_1_title: 'Offre Week-end!', promo_1_desc: "Jusqu'à 20% de réduc.", promo_1_btn: 'Explorer',
    promo_2_title: 'Avantages Voyage', promo_2_desc: '5X points sur les vols.', promo_2_btn: 'Réserver',
    promo_3_title: 'Festival Shopping', promo_3_desc: '15% de cashback.', promo_3_btn: 'Acheter'
  },
  es: {
    set_theme: 'Modo Tema', set_theme_sub: 'Elige tu tema',
    set_accent: 'Color Principal', set_accent_sub: 'Personaliza el color',
    set_glass: 'Efecto Vidrio', set_glass_sub: 'Ajustar transparencia',
    set_bg: 'Fondo', set_bg_sub: 'Selecciona el fondo',
    set_font: 'Fuente', set_font_sub: 'Elige la fuente',
    set_fontsize: 'Tamaño del texto', set_fontsize_sub: 'Ajustar tamaño',
    set_density: 'Densidad', set_density_sub: 'Elige el espaciado',
    set_anim: 'Animaciones', set_anim_sub: 'Alternar movimiento',
    set_contrast: 'Alto contraste', set_contrast_sub: 'Mejorar visibilidad',
    set_lang: 'Idioma (Language)', set_lang_sub: 'Elige región',
    set_card: 'Estilo de Tarjeta', set_card_sub: 'Mostrar tarjetas',
    preview: 'Vista Previa', preview_sub: 'Ver cambios',
    card_primary: 'TARJETA PRINCIPAL', card_travel: 'TARJETA VIAJE', card_shopping: 'TARJETA COMPRAS', card_business: 'TARJETA NEGOCIOS', card_forex: 'TARJETA DIVISAS',
    status_active: 'Activo', status_inactive: 'Inactivo',
    promo_1_title: '¡Oferta Fin de Semana!', promo_1_desc: 'Hasta 20% de desc.', promo_1_btn: 'Explorar',
    promo_2_title: 'Beneficios de Viaje', promo_2_desc: '5X puntos en vuelos.', promo_2_btn: 'Reservar',
    promo_3_title: 'Festival de Compras', promo_3_desc: '15% de reembolso.', promo_3_btn: 'Comprar'
  }
};

let newContent = content;
Object.keys(newStrings).forEach(lang => {
  const stringToAdd = Object.entries(newStrings[lang])
    .map(([k, v]) => `    ${k}: '${v.replace(/'/g, "\\'")}',`)
    .join('\n');
  newContent = newContent.replace(`  ${lang}: {`, `  ${lang}: {\n${stringToAdd}`);
});

fs.writeFileSync('src/i18n/translations.js', newContent);
console.log('Translations updated.');
