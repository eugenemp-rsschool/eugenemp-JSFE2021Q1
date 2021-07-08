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

export default class Words {
  private readonly words: Dictionary;

  constructor() {
    this.words = {
      'Action (set A)': [
        {
          word: 'cry',
          translate: 'плакать',
          picture: 'action1/cry.jpg',
          sound: 'action1/cry.mp3',
        },
        {
          word: 'dance',
          translate: 'танцевать',
          picture: 'action1/dance.jpg',
          sound: 'action1/dance.mp3',
        },
        {
          word: 'dive',
          translate: 'нырять',
          picture: 'action1/dive.jpg',
          sound: 'action1/dive.mp3',
        },
        {
          word: 'draw',
          translate: 'рисовать',
          picture: 'action1/draw.jpg',
          sound: 'action1/draw.mp3',
        },
        {
          word: 'fish',
          translate: 'плакать',
          picture: 'action1/fish.jpg',
          sound: 'action1/fish.mp3',
        },
        {
          word: 'fly',
          translate: 'летать',
          picture: 'action1/fly.jpg',
          sound: 'action1/fly.mp3',
        },
        {
          word: 'hug',
          translate: 'обнимать',
          picture: 'action1/hug.jpg',
          sound: 'action1/hug.mp3',
        },
        {
          word: 'jump',
          translate: 'прыгать',
          picture: 'action1/jump.jpg',
          sound: 'action1/jump.mp3',
        },
      ],

      'Action (set B)': [
        {
          word: 'open',
          translate: 'открывать',
          picture: 'action2/open.jpg',
          sound: 'action2/open.mp3',
        },
        {
          word: 'play',
          translate: 'играть',
          picture: 'action2/play.jpg',
          sound: 'action2/play.mp3',
        },
        {
          word: 'point',
          translate: 'указывать',
          picture: 'action2/point.jpg',
          sound: 'action2/point.mp3',
        },
        {
          word: 'ride',
          translate: 'ездить',
          picture: 'action2/ride.jpg',
          sound: 'action2/ride.mp3',
        },
        {
          word: 'run',
          translate: 'бежать',
          picture: 'action2/run.jpg',
          sound: 'action2/run.mp3',
        },
        {
          word: 'sing',
          translate: 'петь',
          picture: 'action2/sing.jpg',
          sound: 'action2/sing.mp3',
        },
        {
          word: 'skip',
          translate: 'пропускать, прыгать',
          picture: 'action2/skip.jpg',
          sound: 'action2/skip.mp3',
        },
        {
          word: 'swim',
          translate: 'плавать',
          picture: 'action2/swim.jpg',
          sound: 'action2/swim.mp3',
        },
      ],

      'Action (set C)': [
        {
          word: 'argue',
          translate: 'спорить',
          picture: 'action3/argue.jpg',
          sound: 'action3/argue.mp3',
        },
        {
          word: 'build',
          translate: 'строить',
          picture: 'action3/build.jpg',
          sound: 'action3/build.mp3',
        },
        {
          word: 'carry',
          translate: 'нести',
          picture: 'action3/carry.jpg',
          sound: 'action3/carry.mp3',
        },
        {
          word: 'catch',
          translate: 'ловить',
          picture: 'action3/catch.jpg',
          sound: 'action3/catch.mp3',
        },
        {
          word: 'drive',
          translate: 'водить машину',
          picture: 'action3/drive.jpg',
          sound: 'action3/drive.mp3',
        },
        {
          word: 'drop',
          translate: 'падать',
          picture: 'action3/drop.jpg',
          sound: 'action3/drop.mp3',
        },
        {
          word: 'pull',
          translate: 'тянуть',
          picture: 'action3/pull.jpg',
          sound: 'action3/pull.mp3',
        },
        {
          word: 'push',
          translate: 'толкать',
          picture: 'action3/push.jpg',
          sound: 'action3/push.mp3',
        },
      ],
      Adjective: [
        {
          word: 'big',
          translate: 'большой',
          picture: 'adjective/big.jpg',
          sound: 'adjective/big.mp3',
        },
        {
          word: 'dance',
          translate: 'танцевать',
          picture: 'adjective/dance.jpg',
          sound: 'adjective/cry.mp3',
        },
        {
          word: 'dive',
          translate: 'нырять',
          picture: 'adjective/dive.jpg',
          sound: 'adjective/cry.mp3',
        },
        {
          word: 'draw',
          translate: 'рисовать',
          picture: 'adjective/draw.jpg',
          sound: 'adjective/cry.mp3',
        },
        {
          word: 'fish',
          translate: 'плакать',
          picture: 'adjective/fish.jpg',
          sound: 'adjective/cry.mp3',
        },
        {
          word: 'fly',
          translate: 'летать',
          picture: 'adjective/fly.jpg',
          sound: 'adjective/cry.mp3',
        },
        {
          word: 'hug',
          translate: 'обнимать',
          picture: 'adjective/hug.jpg',
          sound: 'adjective/cry.mp3',
        },
        {
          word: 'jump',
          translate: 'прыгать',
          picture: 'adjective/jump.jpg',
          sound: 'adjective/cry.mp3',
        },
      ],
      'Animals (set A)': [
        {
          word: 'cat',
          translate: 'кот',
          picture: 'animals1/cat.jpg',
          sound: 'animals1/cat.jpg',
        },
        {
          word: 'dance',
          translate: 'танцевать',
          picture: 'animals1/dance.jpg',
          sound: 'animals1/cry.jpg',
        },
        {
          word: 'dive',
          translate: 'нырять',
          picture: 'animals1/dive.jpg',
          sound: 'animals1/cry.jpg',
        },
        {
          word: 'draw',
          translate: 'рисовать',
          picture: 'animals1/draw.jpg',
          sound: 'animals1/cry.jpg',
        },
        {
          word: 'fish',
          translate: 'плакать',
          picture: 'animals1/fish.jpg',
          sound: 'animals1/cry.jpg',
        },
        {
          word: 'fly',
          translate: 'летать',
          picture: 'animals1/fly.jpg',
          sound: 'animals1/cry.jpg',
        },
        {
          word: 'hug',
          translate: 'обнимать',
          picture: 'animals1/hug.jpg',
          sound: 'animals1/cry.jpg',
        },
        {
          word: 'jump',
          translate: 'прыгать',
          picture: 'animals1/jump.jpg',
          sound: 'animals1/cry.jpg',
        },
      ],
      'Animals (set B)': [
        {
          word: 'bird',
          translate: 'птица',
          picture: 'animals2/bird.jpg',
          sound: 'animals2/bird.jpg',
        },
        {
          word: 'dance',
          translate: 'танцевать',
          picture: 'animals2/dance.jpg',
          sound: 'animals2/cry.jpg',
        },
        {
          word: 'dive',
          translate: 'нырять',
          picture: 'animals2/dive.jpg',
          sound: 'animals2/cry.jpg',
        },
        {
          word: 'draw',
          translate: 'рисовать',
          picture: 'animals2/draw.jpg',
          sound: 'animals2/cry.jpg',
        },
        {
          word: 'fish',
          translate: 'плакать',
          picture: 'animals2/fish.jpg',
          sound: 'animals2/cry.jpg',
        },
        {
          word: 'fly',
          translate: 'летать',
          picture: 'animals2/fly.jpg',
          sound: 'animals2/cry.jpg',
        },
        {
          word: 'hug',
          translate: 'обнимать',
          picture: 'animals2/hug.jpg',
          sound: 'animals2/cry.jpg',
        },
        {
          word: 'jump',
          translate: 'прыгать',
          picture: 'animals2/jump.jpg',
          sound: 'animals2/cry.jpg',
        },
      ],
      Clothes: [
        {
          word: 'skirt',
          translate: 'юбка',
          picture: 'clothes/skirt.jpg',
          sound: 'clothes/skirt.jpg',
        },
        {
          word: 'dance',
          translate: 'танцевать',
          picture: 'clothes/dance.jpg',
          sound: 'clothes/cry.jpg',
        },
        {
          word: 'dive',
          translate: 'нырять',
          picture: 'clothes/dive.jpg',
          sound: 'clothes/cry.jpg',
        },
        {
          word: 'draw',
          translate: 'рисовать',
          picture: 'clothes/draw.jpg',
          sound: 'clothes/cry.jpg',
        },
        {
          word: 'fish',
          translate: 'плакать',
          picture: 'clothes/fish.jpg',
          sound: 'clothes/cry.jpg',
        },
        {
          word: 'fly',
          translate: 'летать',
          picture: 'clothes/fly.jpg',
          sound: 'clothes/cry.jpg',
        },
        {
          word: 'hug',
          translate: 'обнимать',
          picture: 'clothes/hug.jpg',
          sound: 'clothes/cry.jpg',
        },
        {
          word: 'jump',
          translate: 'прыгать',
          picture: 'clothes/jump.jpg',
          sound: 'clothes1/cry.jpg',
        },
      ],
      Emotion: [
        {
          word: 'sad',
          translate: 'грустный',
          picture: 'emotion/sad.jpg',
          sound: 'emotion/sad.jpg',
        },
        {
          word: 'dance',
          translate: 'танцевать',
          picture: 'emotion/dance.jpg',
          sound: 'emotion/cry.jpg',
        },
        {
          word: 'dive',
          translate: 'нырять',
          picture: 'emotion/dive.jpg',
          sound: 'emotion/cry.jpg',
        },
        {
          word: 'draw',
          translate: 'рисовать',
          picture: 'emotion/draw.jpg',
          sound: 'emotion/cry.jpg',
        },
        {
          word: 'fish',
          translate: 'плакать',
          picture: 'emotion/fish.jpg',
          sound: 'emotion/cry.jpg',
        },
        {
          word: 'fly',
          translate: 'летать',
          picture: 'emotion/fly.jpg',
          sound: 'emotion/cry.jpg',
        },
        {
          word: 'hug',
          translate: 'обнимать',
          picture: 'emotion/hug.jpg',
          sound: 'emotion/cry.jpg',
        },
        {
          word: 'jump',
          translate: 'прыгать',
          picture: 'emotion/jump.jpg',
          sound: 'emotion/cry.jpg',
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
