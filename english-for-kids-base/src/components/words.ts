type Word = {
  word: string,
  translate: string,
  picture: string,
  sound: string,
};

type Category = Word[];

interface Dictionary {
  [key: string]: Category;
}

class Words {
  private readonly words: Dictionary;

  constructor() {
    this.words = {
      'Action (set A)': [
        {
          word: 'cry',
          translate: 'плакать',
          picture: 'action1/cry.jpg',
          sound: 'cry.mp3',
        },
        {
          word: 'dance',
          translate: 'танцевать',
          picture: 'action1/dance.jpg',
          sound: 'dance.mp3',
        },
        {
          word: 'dive',
          translate: 'нырять',
          picture: 'action1/dive.jpg',
          sound: 'dive.mp3',
        },
        {
          word: 'draw',
          translate: 'рисовать',
          picture: 'action1/draw.jpg',
          sound: 'draw.mp3',
        },
        {
          word: 'fish',
          translate: 'плакать',
          picture: 'action1/fish.jpg',
          sound: 'fish.mp3',
        },
        {
          word: 'fly',
          translate: 'летать',
          picture: 'action1/fly.jpg',
          sound: 'fly.mp3',
        },
        {
          word: 'hug',
          translate: 'обнимать',
          picture: 'action1/hug.jpg',
          sound: 'hug.mp3',
        },
        {
          word: 'jump',
          translate: 'прыгать',
          picture: 'action1/jump.jpg',
          sound: 'jump.mp3',
        },
      ],

      'Action (set B)': [
        {
          word: 'open',
          translate: 'открывать',
          picture: 'action2/open.jpg',
          sound: 'open.mp3',
        },
        {
          word: 'play',
          translate: 'играть',
          picture: 'action2/play.jpg',
          sound: 'play.mp3',
        },
        {
          word: 'point',
          translate: 'указывать',
          picture: 'action2/point.jpg',
          sound: 'point.mp3',
        },
        {
          word: 'ride',
          translate: 'ездить',
          picture: 'action2/ride.jpg',
          sound: 'ride.mp3',
        },
        {
          word: 'run',
          translate: 'бежать',
          picture: 'action2/run.jpg',
          sound: 'run.mp3',
        },
        {
          word: 'sing',
          translate: 'петь',
          picture: 'action2/sing.jpg',
          sound: 'sing.mp3',
        },
        {
          word: 'skip',
          translate: 'пропускать, прыгать',
          picture: 'action2/skip.jpg',
          sound: 'skip.mp3',
        },
        {
          word: 'swim',
          translate: 'плавать',
          picture: 'action2/swim.jpg',
          sound: 'swim.mp3',
        },
      ],

      'Action (set C)': [
        {
          word: 'argue',
          translate: 'спорить',
          picture: 'action3/argue.jpg',
          sound: 'argue.mp3',
        },
        {
          word: 'build',
          translate: 'строить',
          picture: 'action3/build.jpg',
          sound: 'build.mp3',
        },
        {
          word: 'carry',
          translate: 'нести',
          picture: 'action3/carry.jpg',
          sound: 'carry.mp3',
        },
        {
          word: 'catch',
          translate: 'ловить',
          picture: 'action3/catch.jpg',
          sound: 'catch.mp3',
        },
        {
          word: 'drive',
          translate: 'водить машину',
          picture: 'action3/drive.jpg',
          sound: 'drive.mp3',
        },
        {
          word: 'drop',
          translate: 'падать',
          picture: 'action3/drop.jpg',
          sound: 'drop.mp3',
        },
        {
          word: 'pull',
          translate: 'тянуть',
          picture: 'action3/pull.jpg',
          sound: 'pull.mp3',
        },
        {
          word: 'push',
          translate: 'толкать',
          picture: 'action3/push.jpg',
          sound: 'push.mp3',
        },
      ],
      Adjective: [
        {
          word: 'big',
          translate: 'большой',
          picture: 'adjective/big.jpg',
          sound: 'big.mp3',
        },
        {
          word: 'dance',
          translate: 'танцевать',
          picture: 'adjective/dance.jpg',
          sound: 'cry.mp3',
        },
        {
          word: 'dive',
          translate: 'нырять',
          picture: 'adjective/dive.jpg',
          sound: 'cry.mp3',
        },
        {
          word: 'draw',
          translate: 'рисовать',
          picture: 'adjective/draw.jpg',
          sound: 'cry.mp3',
        },
        {
          word: 'fish',
          translate: 'плакать',
          picture: 'adjective/fish.jpg',
          sound: 'cry.mp3',
        },
        {
          word: 'fly',
          translate: 'летать',
          picture: 'adjective/fly.jpg',
          sound: 'cry.mp3',
        },
        {
          word: 'hug',
          translate: 'обнимать',
          picture: 'adjective/hug.jpg',
          sound: 'cry.mp3',
        },
        {
          word: 'jump',
          translate: 'прыгать',
          picture: 'adjective/jump.jpg',
          sound: 'cry.mp3',
        },
      ],
      'Animals (set A)': [
        {
          word: 'cat',
          translate: 'кот',
          picture: 'animals1/cat.jpg',
          sound: 'cat.jpg',
        },
        {
          word: 'dance',
          translate: 'танцевать',
          picture: 'animals1/dance.jpg',
          sound: 'cry.jpg',
        },
        {
          word: 'dive',
          translate: 'нырять',
          picture: 'animals1/dive.jpg',
          sound: 'cry.jpg',
        },
        {
          word: 'draw',
          translate: 'рисовать',
          picture: 'animals1/draw.jpg',
          sound: 'cry.jpg',
        },
        {
          word: 'fish',
          translate: 'плакать',
          picture: 'animals1/fish.jpg',
          sound: 'cry.jpg',
        },
        {
          word: 'fly',
          translate: 'летать',
          picture: 'animals1/fly.jpg',
          sound: 'cry.jpg',
        },
        {
          word: 'hug',
          translate: 'обнимать',
          picture: 'animals1/hug.jpg',
          sound: 'cry.jpg',
        },
        {
          word: 'jump',
          translate: 'прыгать',
          picture: 'animals1/jump.jpg',
          sound: 'cry.jpg',
        },
      ],
      'Animals (set B)': [
        {
          word: 'bird',
          translate: 'птица',
          picture: 'animals2/bird.jpg',
          sound: 'bird.jpg',
        },
        {
          word: 'dance',
          translate: 'танцевать',
          picture: 'animals2/dance.jpg',
          sound: 'cry.jpg',
        },
        {
          word: 'dive',
          translate: 'нырять',
          picture: 'animals2/dive.jpg',
          sound: 'cry.jpg',
        },
        {
          word: 'draw',
          translate: 'рисовать',
          picture: 'animals2/draw.jpg',
          sound: 'cry.jpg',
        },
        {
          word: 'fish',
          translate: 'плакать',
          picture: 'animals2/fish.jpg',
          sound: 'cry.jpg',
        },
        {
          word: 'fly',
          translate: 'летать',
          picture: 'animals2/fly.jpg',
          sound: 'cry.jpg',
        },
        {
          word: 'hug',
          translate: 'обнимать',
          picture: 'animals2/hug.jpg',
          sound: 'cry.jpg',
        },
        {
          word: 'jump',
          translate: 'прыгать',
          picture: 'animals2/jump.jpg',
          sound: 'cry.jpg',
        },
      ],
      Clothes: [
        {
          word: 'skirt',
          translate: 'юбка',
          picture: 'clothes/skirt.jpg',
          sound: 'skirt.jpg',
        },
        {
          word: 'dance',
          translate: 'танцевать',
          picture: 'clothes/dance.jpg',
          sound: 'cry.jpg',
        },
        {
          word: 'dive',
          translate: 'нырять',
          picture: 'clothes/dive.jpg',
          sound: 'cry.jpg',
        },
        {
          word: 'draw',
          translate: 'рисовать',
          picture: 'clothes/draw.jpg',
          sound: 'cry.jpg',
        },
        {
          word: 'fish',
          translate: 'плакать',
          picture: 'clothes/fish.jpg',
          sound: 'cry.jpg',
        },
        {
          word: 'fly',
          translate: 'летать',
          picture: 'clothes/fly.jpg',
          sound: 'cry.jpg',
        },
        {
          word: 'hug',
          translate: 'обнимать',
          picture: 'clothes/hug.jpg',
          sound: 'cry.jpg',
        },
        {
          word: 'jump',
          translate: 'прыгать',
          picture: 'clothes/jump.jpg',
          sound: 'cry.jpg',
        },
      ],
      Emotion: [
        {
          word: 'sad',
          translate: 'грустный',
          picture: 'emotion/sad.jpg',
          sound: 'sad.jpg',
        },
        {
          word: 'dance',
          translate: 'танцевать',
          picture: 'emotion/dance.jpg',
          sound: 'cry.jpg',
        },
        {
          word: 'dive',
          translate: 'нырять',
          picture: 'emotion/dive.jpg',
          sound: 'cry.jpg',
        },
        {
          word: 'draw',
          translate: 'рисовать',
          picture: 'emotion/draw.jpg',
          sound: 'cry.jpg',
        },
        {
          word: 'fish',
          translate: 'плакать',
          picture: 'emotion/fish.jpg',
          sound: 'cry.jpg',
        },
        {
          word: 'fly',
          translate: 'летать',
          picture: 'emotion/fly.jpg',
          sound: 'cry.jpg',
        },
        {
          word: 'hug',
          translate: 'обнимать',
          picture: 'emotion/hug.jpg',
          sound: 'cry.jpg',
        },
        {
          word: 'jump',
          translate: 'прыгать',
          picture: 'emotion/jump.jpg',
          sound: 'cry.jpg',
        },
      ],
    };
  }

  // Get all categories names
  getCategories(): string[] {
    return Object.keys(this.words);
  }

  // Get specific category of words
  getCategory(name: string): Category {
    return this.words[name];
  }

  // Add specific category of words
  addCategory(name: string, category: Category): void {
    this.words[name] = category;
  }
}

export { Word, Category, Words };
