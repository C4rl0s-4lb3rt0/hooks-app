export interface ScrambleWordState {
    
    currentWord: string;
    errorCounter: number;
    guess: string;
    isGameOver: boolean;
    maxAllowErrors: number;
    maxSkips: number;
    points: number;
    scrambledWord: string;
    skipCounter: number;
    words: string[];
    totalWords: number;
}

export type ScrambleWordAction = {
    type : 'No_tengo_la_menor_idea_de_que_Acciones';
};

export const GAME_WORDS = [
    'REACT',
    'JAVASCRIPT',
    'TYPESCRIPT',
    'HTML',
    'ANGULAR',
    'SOLID',
    'NODE',
    'VUEJS',
    'SVELTE',
    'EXPRESS',
    'MONGODB',
    'POSTGRES',
    'DOCKER',
    'KUBERNETES',
    'WEBPACK',
    'VITE',
    'TAILWIND',
];

// Esta función mezcla el arreglo para que siempre sea aleatorio
const shuffleArray = (array: string[]) => {
  return array.sort(() => Math.random() - 0.5);
};

// Esta función mezcla las letras de la palabra
const scrambleWord = (word: string = '') => {
  return word
    .split('')
    .sort(() => Math.random() - 0.5)
    .join('');
};

export const getInitialState = ():ScrambleWordState => {
    const shuffleWords = shuffleArray([...GAME_WORDS]);

    return {
        currentWord: shuffleWords[0],
        errorCounter:0,
        guess:'',
        isGameOver: false,
        maxAllowErrors:3,
        maxSkips:3,
        points:0,
        scrambledWord:scrambleWord(shuffleWords[0]),
        skipCounter:0,
        words: shuffleWords,
        totalWords: shuffleWords.length,
    }
}

export type ScrambleWordsAction = 
    | { type: 'SET_GUESS', payload: string }
    | { type: 'CHECK_ANSWER' }
    | { type: 'SKIP_WORD' }
    | { type: 'START_NEW_GAME', payload: ScrambleWordState }



export const scrambleWordsReducer = (
    state: ScrambleWordState, 
    action: ScrambleWordsAction
    ): ScrambleWordState => {
    switch(action.type){

        case 'SET_GUESS':
            return {
                ...state,
                guess: action.payload.trim().toUpperCase()
            };
        case 'CHECK_ANSWER':
            // Aquí iría la lógica para verificar la respuesta del usuario
            if (state.guess === state.currentWord) {
                const newWord = state.words.slice(1);

                return {
                    ...state,
                    points: state.points + 1,
                    currentWord: newWord[0] || '',
                    scrambledWord: scrambleWord(newWord[0] || ''),
                    guess: '',
                    isGameOver: newWord.length === 0,
                    words: newWord,
                };
            }
            return {
                ...state,
                guess: '',
                errorCounter: state.errorCounter + 1,
                isGameOver: state.errorCounter + 1 >= state.maxAllowErrors,
            };
        case 'SKIP_WORD':{ 
            if (state.skipCounter >= state.maxSkips) return state;

            const updateWords = state.words.slice(1);
            
            return {
                ...state,
                skipCounter: state.skipCounter + 1,
                currentWord: updateWords[0] || '',
                scrambledWord: scrambleWord(updateWords[0] || ''),
                guess: '',
                isGameOver: updateWords.length === 0,
                words: updateWords,
            }; 
        }
        case 'START_NEW_GAME': {
            return action.payload;
        }   
        default:
            return state;
    }
}