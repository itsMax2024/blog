export const data = () => {
  type posts = {
    id: string;
    title: string;
    description: string;
    image: string;
  };
  const posts = [
    {
      id: "1",
      title: "اولین پست من",
      description: "به نام خداوند جان و خرد، کزان برتر اندیشه بر نگذرد",
      image: "/assets/gaming/gallery_1.png",
    },
    {
      id: "2",
      title: "دومین پست من",
      description: "به نام خداوند جان و خرد، کزان برتر اندیشه بر نگذرد",
      image: "/assets/gaming/gallery_2.png",
    },
    {
      id: "3",
      title: "سومین پست من",
      description: "کار عمیق",
      image: "/assets/gaming/gallery_3.png",
    },
    {
      id: "4",
      title: "سومین پست من",
      description: "کار عمیق",
      image: "/assets/gaming/gallery_4.png",
    },
  ];
};
