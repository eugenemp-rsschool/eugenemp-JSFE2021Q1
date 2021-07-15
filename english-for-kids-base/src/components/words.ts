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
          translate: 'ловить рыбу',
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
          word: 'small',
          translate: 'маленький',
          picture: 'adjective/small.jpg',
          sound: 'small.mp3',
        },
        {
          word: 'fast',
          translate: 'быстрый',
          picture: 'adjective/fast.jpg',
          sound: 'fast.mp3',
        },
        {
          word: 'slow',
          translate: 'медленный',
          picture: 'adjective/slow.jpg',
          sound: 'slow.mp3',
        },
        {
          word: 'friendly',
          translate: 'дружелюбный',
          picture: 'adjective/friendly.jpg',
          sound: 'friendly.mp3',
        },
        {
          word: 'unfriendly',
          translate: 'недружелюбный',
          picture: 'adjective/unfriendly.jpg',
          sound: 'unfriendly.mp3',
        },
        {
          word: 'young',
          translate: 'молодой',
          picture: 'adjective/young.jpg',
          sound: 'young.mp3',
        },
        {
          word: 'old',
          translate: 'старый',
          picture: 'adjective/old.jpg',
          sound: 'old.mp3',
        },
      ],
      'Animal (set A)': [
        {
          word: 'cat',
          translate: 'кот',
          picture: 'animals1/cat.jpg',
          sound: 'cat.mp3',
        },
        {
          word: 'chick',
          translate: 'цыпленок',
          picture: 'animals1/chick.jpg',
          sound: 'chick.mp3',
        },
        {
          word: 'chicken',
          translate: 'курица',
          picture: 'animals1/chicken.jpg',
          sound: 'chicken.mp3',
        },
        {
          word: 'dog',
          translate: 'собака',
          picture: 'animals1/dog.jpg',
          sound: 'dog.mp3',
        },
        {
          word: 'horse',
          translate: 'лошадь',
          picture: 'animals1/horse.jpg',
          sound: 'horse.mp3',
        },
        {
          word: 'pig',
          translate: 'свинья',
          picture: 'animals1/pig.jpg',
          sound: 'pig.mp3',
        },
        {
          word: 'rabbit',
          translate: 'кролик',
          picture: 'animals1/rabbit.jpg',
          sound: 'rabbit.mp3',
        },
        {
          word: 'sheep',
          translate: 'овца',
          picture: 'animals1/sheep.jpg',
          sound: 'sheep.mp3',
        },
      ],
      'Animal (set B)': [
        {
          word: 'bird',
          translate: 'птица',
          picture: 'animals2/bird.jpg',
          sound: 'bird.mp3',
        },
        {
          word: 'fish',
          translate: 'рыба',
          picture: 'animals2/fish1.jpg',
          sound: 'fish.mp3',
        },
        {
          word: 'frog',
          translate: 'лягушка',
          picture: 'animals2/frog.jpg',
          sound: 'frog.mp3',
        },
        {
          word: 'giraffe',
          translate: 'жираф',
          picture: 'animals2/giraffe.jpg',
          sound: 'giraffe.mp3',
        },
        {
          word: 'lion',
          translate: 'лев',
          picture: 'animals2/lion.jpg',
          sound: 'lion.mp3',
        },
        {
          word: 'mouse',
          translate: 'мышь',
          picture: 'animals2/mouse.jpg',
          sound: 'mouse.mp3',
        },
        {
          word: 'turtle',
          translate: 'черепаха',
          picture: 'animals2/turtle.jpg',
          sound: 'turtle.mp3',
        },
        {
          word: 'dolphin',
          translate: 'дельфин',
          picture: 'animals2/dolphin.jpg',
          sound: 'dolphin.mp3',
        },
      ],
      Clothes: [
        {
          word: 'skirt',
          translate: 'юбка',
          picture: 'clothes/skirt.jpg',
          sound: 'skirt.mp3',
        },
        {
          word: 'pants',
          translate: 'штаны',
          picture: 'clothes/pants.jpg',
          sound: 'pants.mp3',
        },
        {
          word: 'blouse',
          translate: 'блузка',
          picture: 'clothes/blouse.jpg',
          sound: 'blouse.mp3',
        },
        {
          word: 'dress',
          translate: 'платье',
          picture: 'clothes/dress.jpg',
          sound: 'dress.mp3',
        },
        {
          word: 'boot',
          translate: 'ботинок',
          picture: 'clothes/boot.jpg',
          sound: 'boot.mp3',
        },
        {
          word: 'shirt',
          translate: 'рубашка',
          picture: 'clothes/shirt.jpg',
          sound: 'shirt.mp3',
        },
        {
          word: 'coat',
          translate: 'пальто',
          picture: 'clothes/coat.jpg',
          sound: 'coat.mp3',
        },
        {
          word: 'shoe',
          translate: 'туфли',
          picture: 'clothes/shoe.jpg',
          sound: 'shoe.mp3',
        },
      ],
      Emotion: [
        {
          word: 'sad',
          translate: 'грустный',
          picture: 'emotion/sad.jpg',
          sound: 'sad.mp3',
        },
        {
          word: 'angry',
          translate: 'сердитый',
          picture: 'emotion/angry.jpg',
          sound: 'angry.mp3',
        },
        {
          word: 'happy',
          translate: 'счастливый',
          picture: 'emotion/happy.jpg',
          sound: 'happy.mp3',
        },
        {
          word: 'tired',
          translate: 'уставший',
          picture: 'emotion/tired.jpg',
          sound: 'tired.mp3',
        },
        {
          word: 'surprised',
          translate: 'удивленный',
          picture: 'emotion/surprised.jpg',
          sound: 'surprised.mp3',
        },
        {
          word: 'scared',
          translate: 'испуганный',
          picture: 'emotion/scared.jpg',
          sound: 'scared.mp3',
        },
        {
          word: 'smile',
          translate: 'улыбка',
          picture: 'emotion/smile.jpg',
          sound: 'smile.mp3',
        },
        {
          word: 'laugh',
          translate: 'смех',
          picture: 'emotion/laugh.jpg',
          sound: 'laugh.mp3',
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
