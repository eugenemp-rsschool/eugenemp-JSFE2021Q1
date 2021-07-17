import {
  Dictionary,
  Category,
  Word,
} from './interface';

class Words {
  private readonly words: Dictionary;

  constructor() {
    this.words = {
      'Action (set A)': [
        {
          word: 'cry',
          translate: 'плакать',
          picture: 'action1/cry.jpg',
        },
        {
          word: 'dance',
          translate: 'танцевать',
          picture: 'action1/dance.jpg',
        },
        {
          word: 'dive',
          translate: 'нырять',
          picture: 'action1/dive.jpg',
        },
        {
          word: 'draw',
          translate: 'рисовать',
          picture: 'action1/draw.jpg',
        },
        {
          word: 'fish',
          translate: 'ловить рыбу',
          picture: 'action1/fish.jpg',
        },
        {
          word: 'fly',
          translate: 'летать',
          picture: 'action1/fly.jpg',
        },
        {
          word: 'hug',
          translate: 'обнимать',
          picture: 'action1/hug.jpg',
        },
        {
          word: 'jump',
          translate: 'прыгать',
          picture: 'action1/jump.jpg',
        },
      ],

      'Action (set B)': [
        {
          word: 'open',
          translate: 'открывать',
          picture: 'action2/open.jpg',
        },
        {
          word: 'play',
          translate: 'играть',
          picture: 'action2/play.jpg',
        },
        {
          word: 'point',
          translate: 'указывать',
          picture: 'action2/point.jpg',
        },
        {
          word: 'ride',
          translate: 'ездить',
          picture: 'action2/ride.jpg',
        },
        {
          word: 'run',
          translate: 'бежать',
          picture: 'action2/run.jpg',
        },
        {
          word: 'sing',
          translate: 'петь',
          picture: 'action2/sing.jpg',
        },
        {
          word: 'skip',
          translate: 'пропускать, прыгать',
          picture: 'action2/skip.jpg',
        },
        {
          word: 'swim',
          translate: 'плавать',
          picture: 'action2/swim.jpg',
        },
      ],

      'Action (set C)': [
        {
          word: 'argue',
          translate: 'спорить',
          picture: 'action3/argue.jpg',
        },
        {
          word: 'build',
          translate: 'строить',
          picture: 'action3/build.jpg',
        },
        {
          word: 'carry',
          translate: 'нести',
          picture: 'action3/carry.jpg',
        },
        {
          word: 'catch',
          translate: 'ловить',
          picture: 'action3/catch.jpg',
        },
        {
          word: 'drive',
          translate: 'водить машину',
          picture: 'action3/drive.jpg',
        },
        {
          word: 'drop',
          translate: 'падать',
          picture: 'action3/drop.jpg',
        },
        {
          word: 'pull',
          translate: 'тянуть',
          picture: 'action3/pull.jpg',
        },
        {
          word: 'push',
          translate: 'толкать',
          picture: 'action3/push.jpg',
        },
      ],
      Adjective: [
        {
          word: 'big',
          translate: 'большой',
          picture: 'adjective/big.jpg',
        },
        {
          word: 'small',
          translate: 'маленький',
          picture: 'adjective/small.jpg',
        },
        {
          word: 'fast',
          translate: 'быстрый',
          picture: 'adjective/fast.jpg',
        },
        {
          word: 'slow',
          translate: 'медленный',
          picture: 'adjective/slow.jpg',
        },
        {
          word: 'friendly',
          translate: 'дружелюбный',
          picture: 'adjective/friendly.jpg',
        },
        {
          word: 'unfriendly',
          translate: 'недружелюбный',
          picture: 'adjective/unfriendly.jpg',
        },
        {
          word: 'young',
          translate: 'молодой',
          picture: 'adjective/young.jpg',
        },
        {
          word: 'old',
          translate: 'старый',
          picture: 'adjective/old.jpg',
        },
      ],
      'Animal (set A)': [
        {
          word: 'cat',
          translate: 'кот',
          picture: 'animals1/cat.jpg',
        },
        {
          word: 'chick',
          translate: 'цыпленок',
          picture: 'animals1/chick.jpg',
        },
        {
          word: 'chicken',
          translate: 'курица',
          picture: 'animals1/chicken.jpg',
        },
        {
          word: 'dog',
          translate: 'собака',
          picture: 'animals1/dog.jpg',
        },
        {
          word: 'horse',
          translate: 'лошадь',
          picture: 'animals1/horse.jpg',
        },
        {
          word: 'pig',
          translate: 'свинья',
          picture: 'animals1/pig.jpg',
        },
        {
          word: 'rabbit',
          translate: 'кролик',
          picture: 'animals1/rabbit.jpg',
        },
        {
          word: 'sheep',
          translate: 'овца',
          picture: 'animals1/sheep.jpg',
        },
      ],
      'Animal (set B)': [
        {
          word: 'bird',
          translate: 'птица',
          picture: 'animals2/bird.jpg',
        },
        {
          word: 'fish',
          translate: 'рыба',
          picture: 'animals2/fish1.jpg',
        },
        {
          word: 'frog',
          translate: 'лягушка',
          picture: 'animals2/frog.jpg',
        },
        {
          word: 'giraffe',
          translate: 'жираф',
          picture: 'animals2/giraffe.jpg',
        },
        {
          word: 'lion',
          translate: 'лев',
          picture: 'animals2/lion.jpg',
        },
        {
          word: 'mouse',
          translate: 'мышь',
          picture: 'animals2/mouse.jpg',
        },
        {
          word: 'turtle',
          translate: 'черепаха',
          picture: 'animals2/turtle.jpg',
        },
        {
          word: 'dolphin',
          translate: 'дельфин',
          picture: 'animals2/dolphin.jpg',
        },
      ],
      Clothes: [
        {
          word: 'skirt',
          translate: 'юбка',
          picture: 'clothes/skirt.jpg',
        },
        {
          word: 'pants',
          translate: 'штаны',
          picture: 'clothes/pants.jpg',
        },
        {
          word: 'blouse',
          translate: 'блузка',
          picture: 'clothes/blouse.jpg',
        },
        {
          word: 'dress',
          translate: 'платье',
          picture: 'clothes/dress.jpg',
        },
        {
          word: 'boot',
          translate: 'ботинок',
          picture: 'clothes/boot.jpg',
        },
        {
          word: 'shirt',
          translate: 'рубашка',
          picture: 'clothes/shirt.jpg',
        },
        {
          word: 'coat',
          translate: 'пальто',
          picture: 'clothes/coat.jpg',
        },
        {
          word: 'shoe',
          translate: 'туфли',
          picture: 'clothes/shoe.jpg',
        },
      ],
      Emotion: [
        {
          word: 'sad',
          translate: 'грустный',
          picture: 'emotion/sad.jpg',
        },
        {
          word: 'angry',
          translate: 'сердитый',
          picture: 'emotion/angry.jpg',
        },
        {
          word: 'happy',
          translate: 'счастливый',
          picture: 'emotion/happy.jpg',
        },
        {
          word: 'tired',
          translate: 'уставший',
          picture: 'emotion/tired.jpg',
        },
        {
          word: 'surprised',
          translate: 'удивленный',
          picture: 'emotion/surprised.jpg',
        },
        {
          word: 'scared',
          translate: 'испуганный',
          picture: 'emotion/scared.jpg',
        },
        {
          word: 'smile',
          translate: 'улыбка',
          picture: 'emotion/smile.jpg',
        },
        {
          word: 'laugh',
          translate: 'смех',
          picture: 'emotion/laugh.jpg',
        },
      ],
    };
  }

  // Get all categories names
  async getCategories(): Promise<string[]> {
    return Object.keys(this.words);
  }

  // Get specific category of words
  async getCategory(name: string): Promise<Category> {
    return this.words[name];
  }

  // Add specific category of words
  async addCategory(name: string): Promise<boolean> {
    this.words[name] = [];

    return true;
  }

  // Add word to category
  async addWord(category: string, word: Word): Promise<boolean> {
    this.words[category].push(word);

    return true;
  }
}

export default Words;
