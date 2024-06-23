type SliderContent = {
  background: string;
  titleAsImage?: string;
  price: string;
  url: string;
  id: string;
}[];

const content: SliderContent = [
  {
    id: `1`,
    background: `/slider/jeddi.jpg`,
    price: `120`,
    url: `http://localhost:3000/`,
    titleAsImage: `/slider/jeddiTitleImage.png`,
  },
  {
    id: `2`,

    background: `/slider/cyperpunk.jpg`,
    price: `120`,
    url: `http://localhost:3000/`,
    titleAsImage: `/slider/cyperTitleImage.png`,
  },
  {
    id: `3`,
    background: `/slider/bg.jpg`,
    price: `120`,
    url: `http://localhost:3000/`,
    titleAsImage: `/slider/spiderTitleImage.png`,
  },
  {
    id: `4`,
    titleAsImage: `/slider/spiderTitleImage.png`,
    background: `/slider/spider.jpg`,
    price: `120`,
    url: `http://localhost:3000/`,
  },
];
export default content;

// /slider/cyperpunk.jpg
// /slider/spider.jpg
// /slider/jeddi.jpg
