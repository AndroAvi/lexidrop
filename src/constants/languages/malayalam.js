const vowels = [
    { native: 'അ', english: 'a' },
    { native: 'ആ', english: 'ā' },
    { native: 'ഇ', english: 'i' },
    { native: 'ഈ', english: 'ī' },
    { native: 'ഉ', english: 'u' },
    { native: 'ഊ', english: 'ū' },
    { native: 'ഋ', english: 'ṛ' },
    { native: 'എ', english: 'e' },
    { native: 'ഏ', english: 'ē' },
    { native: 'ഐ', english: 'ai' },
    { native: 'ഒ', english: 'o' },
    { native: 'ഓ', english: 'ō' },
    { native: 'ഔ', english: 'au' },
    { native: 'അം', english: 'aṃ' },
    { native: 'അഃ', english: 'aḥ' },
]

const consonants = [
    { native: 'ക', english: 'ka' },
    { native: 'ഖ', english: 'kha' },
    { native: 'ഗ', english: 'ga' },
    { native: 'ഘ', english: 'gha' },
    { native: 'ങ', english: 'ṅa' },
    { native: 'ച', english: 'ca' },
    { native: 'ഛ', english: 'cha' },
    { native: 'ജ', english: 'ja' },
    { native: 'ഝ', english: 'jha' },
    { native: 'ഞ', english: 'ña' },
    { native: 'ട', english: 'ṭa' },
    { native: 'ഠ', english: 'ṭha' },
    { native: 'ഡ', english: 'ḍa' },
    { native: 'ഢ', english: 'ḍha' },
    { native: 'ണ', english: 'ṇa' },
    { native: 'ത', english: 'ta' },
    { native: 'ഥ', english: 'tha' },
    { native: 'ദ', english: 'da' },
    { native: 'ധ', english: 'dha' },
    { native: 'ന', english: 'na' },
    { native: 'പ', english: 'pa' },
    { native: 'ഫ', english: 'pha' },
    { native: 'ബ', english: 'ba' },
    { native: 'ഭ', english: 'bha' },
    { native: 'മ', english: 'ma' },
    { native: 'യ', english: 'ya' },
    { native: 'ര', english: 'ra' },
    { native: 'ല', english: 'la' },
    { native: 'വ', english: 'va' },
    { native: 'ശ', english: 'śa' },
    { native: 'ഷ', english: 'ṣa' },
    { native: 'സ', english: 'sa' },
    { native: 'ഹ', english: 'ha' },
    { native: 'ള', english: 'ḷa' },
]


const ALPHABET = {
    languageName: 'Malayalam',
    vowels: vowels,
    consonants: consonants,
    omniglotLink: 'https://omniglot.com/writing/malayalam.htm'
}

export default ALPHABET;
