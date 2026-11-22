// Put your photos in /public/images and set the file names here.
// Leave a value empty ('') to show a soft green placeholder instead.
const p = (file: string) => (file ? `${import.meta.env.BASE_URL}images/${file}` : '');

export const images = {
  hero: p('hero.png'),
  about: p('about-1.png'),
  aboutSign: p('about-2.png'),
  aboutGroup: p('about-3.png'),
  birthday: p('birthday.png'),
  wedding: p('wedding.png'),
  anniversary: p('anniversary.png'),
  family: p('family.png'),
};
