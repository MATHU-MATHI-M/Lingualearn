export interface Word {
  id: string;
  word: string;
  translation: string;
  pronunciation?: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  example?: string;
  exampleTranslation?: string;
}

export interface LanguageData {
  [key: string]: Word[];
}

export const languageData: LanguageData = {
  en: [
    // Basics
    { id: 'en1', word: 'Hello', translation: 'Hello', category: 'basics', difficulty: 'beginner' },
    { id: 'en2', word: 'Goodbye', translation: 'Goodbye', category: 'basics', difficulty: 'beginner' },
    { id: 'en3', word: 'Please', translation: 'Please', category: 'basics', difficulty: 'beginner' },
    { id: 'en4', word: 'Thank you', translation: 'Thank you', category: 'basics', difficulty: 'beginner' },
    { id: 'en5', word: 'Yes', translation: 'Yes', category: 'basics', difficulty: 'beginner' },
    { id: 'en6', word: 'No', translation: 'No', category: 'basics', difficulty: 'beginner' },
    
    // Numbers
    { id: 'en7', word: 'One', translation: 'One', category: 'numbers', difficulty: 'beginner' },
    { id: 'en8', word: 'Two', translation: 'Two', category: 'numbers', difficulty: 'beginner' },
    { id: 'en9', word: 'Three', translation: 'Three', category: 'numbers', difficulty: 'beginner' },
    { id: 'en10', word: 'Four', translation: 'Four', category: 'numbers', difficulty: 'beginner' },
    { id: 'en11', word: 'Five', translation: 'Five', category: 'numbers', difficulty: 'beginner' },
    
    // Colors
    { id: 'en12', word: 'Red', translation: 'Red', category: 'colors', difficulty: 'beginner' },
    { id: 'en13', word: 'Blue', translation: 'Blue', category: 'colors', difficulty: 'beginner' },
    { id: 'en14', word: 'Green', translation: 'Green', category: 'colors', difficulty: 'beginner' },
    { id: 'en15', word: 'Yellow', translation: 'Yellow', category: 'colors', difficulty: 'beginner' },
    { id: 'en16', word: 'Black', translation: 'Black', category: 'colors', difficulty: 'beginner' },
    { id: 'en17', word: 'White', translation: 'White', category: 'colors', difficulty: 'beginner' },
    
    // Food
    { id: 'en18', word: 'Water', translation: 'Water', category: 'food', difficulty: 'beginner' },
    { id: 'en19', word: 'Bread', translation: 'Bread', category: 'food', difficulty: 'beginner' },
    { id: 'en20', word: 'Rice', translation: 'Rice', category: 'food', difficulty: 'beginner' },
    { id: 'en21', word: 'Apple', translation: 'Apple', category: 'food', difficulty: 'beginner' },
    { id: 'en22', word: 'Milk', translation: 'Milk', category: 'food', difficulty: 'beginner' },
    
    // Animals
    { id: 'en23', word: 'Cat', translation: 'Cat', category: 'animals', difficulty: 'beginner' },
    { id: 'en24', word: 'Dog', translation: 'Dog', category: 'animals', difficulty: 'beginner' },
    { id: 'en25', word: 'Bird', translation: 'Bird', category: 'animals', difficulty: 'beginner' },
    { id: 'en26', word: 'Fish', translation: 'Fish', category: 'animals', difficulty: 'beginner' },
    { id: 'en27', word: 'Horse', translation: 'Horse', category: 'animals', difficulty: 'beginner' },
  ],
  
  hi: [
    // Basics
    { id: 'hi1', word: 'नमस्ते', translation: 'Hello', category: 'basics', difficulty: 'beginner', pronunciation: 'namaste' },
    { id: 'hi2', word: 'अलविदा', translation: 'Goodbye', category: 'basics', difficulty: 'beginner', pronunciation: 'alvida' },
    { id: 'hi3', word: 'कृपया', translation: 'Please', category: 'basics', difficulty: 'beginner', pronunciation: 'kripaya' },
    { id: 'hi4', word: 'धन्यवाद', translation: 'Thank you', category: 'basics', difficulty: 'beginner', pronunciation: 'dhanyawad' },
    { id: 'hi5', word: 'हाँ', translation: 'Yes', category: 'basics', difficulty: 'beginner', pronunciation: 'haan' },
    { id: 'hi6', word: 'नहीं', translation: 'No', category: 'basics', difficulty: 'beginner', pronunciation: 'nahin' },
    
    // Numbers
    { id: 'hi7', word: 'एक', translation: 'One', category: 'numbers', difficulty: 'beginner', pronunciation: 'ek' },
    { id: 'hi8', word: 'दो', translation: 'Two', category: 'numbers', difficulty: 'beginner', pronunciation: 'do' },
    { id: 'hi9', word: 'तीन', translation: 'Three', category: 'numbers', difficulty: 'beginner', pronunciation: 'teen' },
    { id: 'hi10', word: 'चार', translation: 'Four', category: 'numbers', difficulty: 'beginner', pronunciation: 'char' },
    { id: 'hi11', word: 'पांच', translation: 'Five', category: 'numbers', difficulty: 'beginner', pronunciation: 'paanch' },
    
    // Colors
    { id: 'hi12', word: 'लाल', translation: 'Red', category: 'colors', difficulty: 'beginner', pronunciation: 'laal' },
    { id: 'hi13', word: 'नीला', translation: 'Blue', category: 'colors', difficulty: 'beginner', pronunciation: 'neela' },
    { id: 'hi14', word: 'हरा', translation: 'Green', category: 'colors', difficulty: 'beginner', pronunciation: 'hara' },
    { id: 'hi15', word: 'पीला', translation: 'Yellow', category: 'colors', difficulty: 'beginner', pronunciation: 'peela' },
    { id: 'hi16', word: 'काला', translation: 'Black', category: 'colors', difficulty: 'beginner', pronunciation: 'kaala' },
    { id: 'hi17', word: 'सफेद', translation: 'White', category: 'colors', difficulty: 'beginner', pronunciation: 'safed' },
    
    // Food
    { id: 'hi18', word: 'पानी', translation: 'Water', category: 'food', difficulty: 'beginner', pronunciation: 'paani' },
    { id: 'hi19', word: 'रोटी', translation: 'Bread', category: 'food', difficulty: 'beginner', pronunciation: 'roti' },
    { id: 'hi20', word: 'चावल', translation: 'Rice', category: 'food', difficulty: 'beginner', pronunciation: 'chawal' },
    { id: 'hi21', word: 'सेब', translation: 'Apple', category: 'food', difficulty: 'beginner', pronunciation: 'seb' },
    { id: 'hi22', word: 'दूध', translation: 'Milk', category: 'food', difficulty: 'beginner', pronunciation: 'doodh' },
    
    // Animals
    { id: 'hi23', word: 'बिल्ली', translation: 'Cat', category: 'animals', difficulty: 'beginner', pronunciation: 'billi' },
    { id: 'hi24', word: 'कुत्ता', translation: 'Dog', category: 'animals', difficulty: 'beginner', pronunciation: 'kutta' },
    { id: 'hi25', word: 'पक्षी', translation: 'Bird', category: 'animals', difficulty: 'beginner', pronunciation: 'pakshi' },
    { id: 'hi26', word: 'मछली', translation: 'Fish', category: 'animals', difficulty: 'beginner', pronunciation: 'machhli' },
    { id: 'hi27', word: 'घोड़ा', translation: 'Horse', category: 'animals', difficulty: 'beginner', pronunciation: 'ghoda' },
  ],
  
  ta: [
    // Basics
    { id: 'ta1', word: 'வணக்கம்', translation: 'Hello', category: 'basics', difficulty: 'beginner', pronunciation: 'vanakkam' },
    { id: 'ta2', word: 'போய்வரேன்', translation: 'Goodbye', category: 'basics', difficulty: 'beginner', pronunciation: 'poyvaren' },
    { id: 'ta3', word: 'தயவுசெய்து', translation: 'Please', category: 'basics', difficulty: 'beginner', pronunciation: 'thayavu seidhu' },
    { id: 'ta4', word: 'நன்றி', translation: 'Thank you', category: 'basics', difficulty: 'beginner', pronunciation: 'nandri' },
    { id: 'ta5', word: 'ஆம்', translation: 'Yes', category: 'basics', difficulty: 'beginner', pronunciation: 'aam' },
    { id: 'ta6', word: 'இல்லை', translation: 'No', category: 'basics', difficulty: 'beginner', pronunciation: 'illai' },
    
    // Numbers
    { id: 'ta7', word: 'ஒன்று', translation: 'One', category: 'numbers', difficulty: 'beginner', pronunciation: 'ondru' },
    { id: 'ta8', word: 'இரண்டு', translation: 'Two', category: 'numbers', difficulty: 'beginner', pronunciation: 'irandu' },
    { id: 'ta9', word: 'மூன்று', translation: 'Three', category: 'numbers', difficulty: 'beginner', pronunciation: 'moondru' },
    { id: 'ta10', word: 'நான்கு', translation: 'Four', category: 'numbers', difficulty: 'beginner', pronunciation: 'naangu' },
    { id: 'ta11', word: 'ஐந்து', translation: 'Five', category: 'numbers', difficulty: 'beginner', pronunciation: 'ainthu' },
    
    // Colors
    { id: 'ta12', word: 'சிவப்பு', translation: 'Red', category: 'colors', difficulty: 'beginner', pronunciation: 'sivappu' },
    { id: 'ta13', word: 'நீலம்', translation: 'Blue', category: 'colors', difficulty: 'beginner', pronunciation: 'neelam' },
    { id: 'ta14', word: 'பச்சை', translation: 'Green', category: 'colors', difficulty: 'beginner', pronunciation: 'pachai' },
    { id: 'ta15', word: 'மஞ்சள்', translation: 'Yellow', category: 'colors', difficulty: 'beginner', pronunciation: 'manjal' },
    { id: 'ta16', word: 'கருப்பு', translation: 'Black', category: 'colors', difficulty: 'beginner', pronunciation: 'karuppu' },
    { id: 'ta17', word: 'வெள்ளை', translation: 'White', category: 'colors', difficulty: 'beginner', pronunciation: 'vellai' },
    
    // Food
    { id: 'ta18', word: 'தண்ணீர்', translation: 'Water', category: 'food', difficulty: 'beginner', pronunciation: 'thanneer' },
    { id: 'ta19', word: 'ரொட்டி', translation: 'Bread', category: 'food', difficulty: 'beginner', pronunciation: 'rotti' },
    { id: 'ta20', word: 'அரிசி', translation: 'Rice', category: 'food', difficulty: 'beginner', pronunciation: 'arisi' },
    { id: 'ta21', word: 'ஆப்பிள்', translation: 'Apple', category: 'food', difficulty: 'beginner', pronunciation: 'aappil' },
    { id: 'ta22', word: 'பால்', translation: 'Milk', category: 'food', difficulty: 'beginner', pronunciation: 'paal' },
    
    // Animals
    { id: 'ta23', word: 'பூனை', translation: 'Cat', category: 'animals', difficulty: 'beginner', pronunciation: 'poonai' },
    { id: 'ta24', word: 'நாய்', translation: 'Dog', category: 'animals', difficulty: 'beginner', pronunciation: 'naai' },
    { id: 'ta25', word: 'பறவை', translation: 'Bird', category: 'animals', difficulty: 'beginner', pronunciation: 'paravai' },
    { id: 'ta26', word: 'மீன்', translation: 'Fish', category: 'animals', difficulty: 'beginner', pronunciation: 'meen' },
    { id: 'ta27', word: 'குதிரை', translation: 'Horse', category: 'animals', difficulty: 'beginner', pronunciation: 'kuthirai' },
  ]
};

export const categories = [
  { id: 'basics', name: 'Basics', icon: '👋', color: 'bg-blue-500' },
  { id: 'numbers', name: 'Numbers', icon: '🔢', color: 'bg-green-500' },
  { id: 'colors', name: 'Colors', icon: '🎨', color: 'bg-purple-500' },
  { id: 'food', name: 'Food', icon: '🍎', color: 'bg-orange-500' },
  { id: 'animals', name: 'Animals', icon: '🐱', color: 'bg-red-500' },
];

export const getWordsForLanguage = (language: string): Word[] => {
  return languageData[language] || [];
};

export const getWordsByCategory = (language: string, category: string): Word[] => {
  return getWordsForLanguage(language).filter(word => word.category === category);
};