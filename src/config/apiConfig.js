// API Configuration
const API_CONFIG = {
  // Datamuse API - for fetching related words by topic
  datamuse: {
    baseUrl: 'https://api.datamuse.com',
    endpoints: {
      words: '/words',
    },
    params: {
      maxWords: 15,
    },
  },
  
  // Free Dictionary API - for word definitions, pronunciations, examples
  freeDictionary: {
    baseUrl: 'https://api.dictionaryapi.dev/api/v2',
    endpoints: {
      entries: '/entries/en',
    },
  },
};

// Helper functions to build API URLs
export const getDatamuseUrl = (topic) => {
  const { baseUrl, endpoints, params } = API_CONFIG.datamuse;
  return `${baseUrl}${endpoints.words}?ml=${encodeURIComponent(topic)}&max=${params.maxWords}`;
};

export const getFreeDictionaryUrl = (word) => {
  const { baseUrl, endpoints } = API_CONFIG.freeDictionary;
  return `${baseUrl}${endpoints.entries}/${word.toLowerCase()}`;
};

export default API_CONFIG;
