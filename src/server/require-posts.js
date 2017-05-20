const wordsContext = require.context('../../words', false, /\.md$/);
const wordsMap = wordsContext.keys().map((fileName) => ({ fileName, words: wordsContext(fileName) }));
export default wordsMap;
