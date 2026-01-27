// Service for fetching word data from Free Dictionary API
import { getDatamuseUrl, getFreeDictionaryUrl } from '../config/apiConfig';
import { WORD_TOPICS } from '../config/wordTopics';

// Fetch workplace vocabulary words dynamically from Datamuse API
const fetchWorkplaceVocabulary = async () => {
  try {
    const allWords = [];
    
    for (const { topic, category } of WORD_TOPICS) {
      // Fetch words related to the topic from Datamuse API
      const response = await fetch(getDatamuseUrl(topic));
      
      if (response.ok) {
        const words = await response.json();
        // Filter out multi-word phrases (only keep single words)
        words.forEach(w => {
          if (!w.word.includes(' ') && !w.word.includes('-')) {
            // Extract frequency from tags if available (format: "f:##.##")
            let frequency = null;
            if (w.tags) {
              const freqTag = w.tags.find(tag => tag.startsWith('f:'));
              if (freqTag) {
                frequency = parseFloat(freqTag.split(':')[1]);
              }
            }
            // Calculate difficulty based on frequency and word length
            const difficulty = calculateDifficulty(frequency, w.word.length);
            allWords.push({ word: w.word, category, difficulty });
          }
        });
      }
    }
    
    // If API fails or returns no words, return fallback list
    if (allWords.length === 0) {
      return getFallbackWordsList();
    }
    
    return allWords;
  } catch (error) {
    console.error('Error fetching vocabulary from Datamuse:', error);
    return getFallbackWordsList();
  }
};

// Calculate word difficulty based on frequency score and word length
const calculateDifficulty = (frequency, wordLength) => {
  // Datamuse frequency tag (f:) ranges from ~0-100
  // Higher frequency = more common = easier
  
  // Primary: Use frequency if available
  if (frequency !== null && frequency !== undefined) {
    if (frequency >= 30) return 'Beginner';      // Very common words
    if (frequency >= 15) return 'Intermediate';  // Moderately common
    return 'Advanced';                           // Rare words
  }
  
  // Fallback: Use word length
  if (wordLength <= 6) return 'Beginner';
  if (wordLength <= 10) return 'Intermediate';
  return 'Advanced';
};

// Fallback word list in case API fails
const getFallbackWordsList = () => [
  { word: 'synergy', category: 'Meetings', difficulty: 'Intermediate' },
  { word: 'leverage', category: 'Leadership', difficulty: 'Intermediate' },
  { word: 'paradigm', category: 'Presentations', difficulty: 'Advanced' },
  { word: 'actionable', category: 'Meetings', difficulty: 'Advanced' },
  { word: 'bandwidth', category: 'Collaboration', difficulty: 'Advanced' },
  { word: 'stakeholder', category: 'Leadership', difficulty: 'Advanced' },
  { word: 'proactive', category: 'Leadership', difficulty: 'Advanced' },
  { word: 'deliverable', category: 'Collaboration', difficulty: 'Advanced' },
  { word: 'facilitate', category: 'Meetings', difficulty: 'Advanced' },
  { word: 'consensus', category: 'Meetings', difficulty: 'Advanced' },
  { word: 'initiative', category: 'Leadership', difficulty: 'Advanced' },
  { word: 'optimize', category: 'Leadership', difficulty: 'Intermediate' },
  { word: 'collaborate', category: 'Collaboration', difficulty: 'Advanced' },
  { word: 'delegate', category: 'Leadership', difficulty: 'Intermediate' },
  { word: 'empower', category: 'Leadership', difficulty: 'Intermediate' },
];

// Cache for workplace words (loaded once per session)
let cachedWordsList = null;

// Get or fetch workplace words list
const getWorkplaceWordsList = async () => {
  if (cachedWordsList) {
    return cachedWordsList;
  }
  
  cachedWordsList = await fetchWorkplaceVocabulary();
  return cachedWordsList;
};

// Generate workplace-specific examples from API data
const generateWorkplaceExamples = (word, definition, partOfSpeech, apiExamples = []) => {
  const lowerWord = word.toLowerCase();
  const capitalizedWord = word.charAt(0).toUpperCase() + word.slice(1);
  
  // If we have multiple API examples, distribute them across contexts
  if (apiExamples.length >= 3) {
    return {
      email: `Dear team, ${apiExamples[0]}`,
      chat: apiExamples[1],
      speaking: `In today's discussion, I want to emphasize that ${apiExamples[2]}`,
    };
  } else if (apiExamples.length === 2) {
    return {
      email: `Regarding our project, ${apiExamples[0]}`,
      chat: apiExamples[1],
      speaking: `Let me clarify: ${apiExamples[0]} This is crucial for our success.`,
    };
  } else if (apiExamples.length === 1) {
    const example = apiExamples[0];
    return {
      email: `I wanted to share that ${example}`,
      chat: `FYI: ${example}`,
      speaking: `As I mentioned in the meeting, ${example}`,
    };
  }
  
  // Generate unique contextual examples for each communication type
  let emailExample, chatExample, speakingExample;
  
  if (partOfSpeech === 'noun') {
    emailExample = `Dear team, I'd like to schedule a meeting to discuss the ${lowerWord} for our Q2 project. Please review the attached document before our discussion.`;
    chatExample = `The ${lowerWord} for this initiative is looking great! 🎯`;
    speakingExample = `In my presentation today, I want to emphasize the critical role that ${lowerWord} plays in our strategic objectives. ${definition}`;
  } else if (partOfSpeech === 'verb') {
    emailExample = `I recommend that we ${lowerWord} our current approach to align with the new market requirements. This will help us stay competitive.`;
    chatExample = `Can we ${lowerWord} this by Friday? Need it for the client demo.`;
    speakingExample = `Moving forward, our team needs to ${lowerWord} these processes more efficiently. This will be key to achieving our quarterly targets.`;
  } else if (partOfSpeech === 'adjective') {
    emailExample = `This represents a ${lowerWord} opportunity for our organization to demonstrate leadership in the industry.`;
    chatExample = `That's such a ${lowerWord} approach! Really impressed. 👏`;
    speakingExample = `We are pursuing a ${lowerWord} strategy that will differentiate us from competitors and drive sustainable growth.`;
  } else {
    // Default for other parts of speech
    emailExample = `I wanted to follow up on our discussion about ${lowerWord}. Could we schedule some time to explore this further?`;
    chatExample = `Quick question about ${lowerWord} - do you have a moment to chat?`;
    speakingExample = `${capitalizedWord} is an essential consideration as we move forward with our implementation plan.`;
  }
  
  return {
    email: emailExample,
    chat: chatExample,
    speaking: speakingExample,
  };
};

// Fetch word definition from Free Dictionary API
export const fetchWordDefinition = async (word) => {
  try {
    const response = await fetch(getFreeDictionaryUrl(word));
    
    if (!response.ok) {
      throw new Error('Word not found');
    }
    
    const data = await response.json();
    const wordData = data[0];
    
    // Get first meaning
    const firstMeaning = wordData.meanings[0];
    const firstDefinition = firstMeaning.definitions[0];
    
    // Collect all examples from API
    const apiExamples = [];
    wordData.meanings.forEach(meaning => {
      meaning.definitions.forEach(def => {
        if (def.example) {
          apiExamples.push(def.example);
        }
      });
    });
    
    // Generate workplace-specific examples using API data
    const examples = generateWorkplaceExamples(
      wordData.word, 
      firstDefinition.definition,
      firstMeaning.partOfSpeech,
      apiExamples
    );
    
    return {
      word: wordData.word.charAt(0).toUpperCase() + wordData.word.slice(1),
      pronunciation: wordData.phonetic || wordData.phonetics[0]?.text || '',
      partOfSpeech: firstMeaning.partOfSpeech,
      meaning: firstDefinition.definition,
      synonyms: firstMeaning.synonyms?.slice(0, 5) || [],
      examples: examples,
      allMeanings: wordData.meanings,
    };
  } catch (error) {
    console.error('Error fetching word definition:', error);
    return null;
  }
};

// Get word for a specific day (consistent word per day)
export const getWordOfTheDay = async () => {
  try {
    // Get dynamic word list
    const workplaceWordsList = await getWorkplaceWordsList();
    
    // Use current date to determine which word to show
    const today = new Date();
    const startOfYear = new Date(today.getFullYear(), 0, 1);
    const dayOfYear = Math.floor((today - startOfYear) / (1000 * 60 * 60 * 24));
    
    const wordIndex = dayOfYear % workplaceWordsList.length;
    const wordEntry = workplaceWordsList[wordIndex];
    
    // Fetch definition from API
    const wordData = await fetchWordDefinition(wordEntry.word);
    
    if (!wordData) {
      throw new Error('Failed to fetch word data');
    }
    
    return {
      ...wordData,
      category: wordEntry.category,
      date: today.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
    };
  } catch (error) {
    console.error('Error getting word of the day:', error);
    throw error;
  }
};

// Get all words by category
export const getWordsByCategory = async (category) => {
  const workplaceWordsList = await getWorkplaceWordsList();
  const wordsInCategory = workplaceWordsList.filter(w => w.category === category);
  
  // Fetch definitions for all words in category
  const wordPromises = wordsInCategory.map(async (w) => {
    const data = await fetchWordDefinition(w.word);
    return data ? { ...data, category: w.category } : null;
  });
  
  const words = await Promise.all(wordPromises);
  return words.filter(w => w !== null);
};

// Get all categories
export const getAllCategories = async () => {
  const workplaceWordsList = await getWorkplaceWordsList();
  const categories = [...new Set(workplaceWordsList.map(word => word.category))];
  return categories;
};

// Get random word
export const getRandomWord = async () => {
  const workplaceWordsList = await getWorkplaceWordsList();
  const randomIndex = Math.floor(Math.random() * workplaceWordsList.length);
  const wordEntry = workplaceWordsList[randomIndex];
  const wordData = await fetchWordDefinition(wordEntry.word);
  return wordData ? { ...wordData, category: wordEntry.category } : null;
};

// Get all words (fetches definitions from API)
export const getAllWords = async () => {
  const workplaceWordsList = await getWorkplaceWordsList();
  const wordPromises = workplaceWordsList.map(async (w) => {
    const data = await fetchWordDefinition(w.word);
    return data ? { ...data, category: w.category } : null;
  });
  
  const words = await Promise.all(wordPromises);
  return words.filter(w => w !== null);
};

// Get simple word list (just names and categories, no API calls)
export const getWordsList = async () => {
  return await getWorkplaceWordsList();
};

export default {
  getWordOfTheDay,
  fetchWordDefinition,
  getWordsByCategory,
  getAllCategories,
  getRandomWord,
  getAllWords,
  getWordsList,
};
