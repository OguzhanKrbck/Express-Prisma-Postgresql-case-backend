import prisma from "../src/database/prisma.js";

export const users = [
  {
    id: "1",
    name: "Ahmet Yılmaz",
    email: "ahmet@example.com",
    createdAt: new Date("2022-01-15"),
    image: "https://randomuser.me/api/portraits/men/1.jpg"
  },
  {
    id: "2",
    name: "Ayşe Demir",
    email: "ayse@example.com",
    createdAt: new Date("2022-03-22"),
    image: "https://randomuser.me/api/portraits/women/2.jpg"
  },
  {
    id: "3",
    name: "Mehmet Kaya",
    email: "mehmet@example.com",
    createdAt: new Date("2021-11-05"),
    image: "https://randomuser.me/api/portraits/men/3.jpg"
  },
  {
    id: "4",
    name: "Zeynep Şahin",
    email: "zeynep@example.com",
    createdAt: new Date("2022-06-10"),
    image: "https://randomuser.me/api/portraits/women/4.jpg"
  },
  {
    id: "5",
    name: "Ali Öztürk",
    email: "ali@example.com",
    createdAt: new Date("2021-08-17"),
    image: "https://randomuser.me/api/portraits/men/5.jpg"
  },
  {
    id: "6",
    name: "Fatma Yıldız",
    email: "fatma@example.com",
    createdAt: new Date("2022-04-30"),
    image: "https://randomuser.me/api/portraits/women/6.jpg"
  },
];

export const books = [
  { id: "1", name: "Suç ve Ceza", author: "Fyodor Dostoyevski", coverImage: "https://picsum.photos/200/300?random=1", year: "1866", rating: 4.8 },
  { id: "2", name: "1984", author: "George Orwell", coverImage: "https://picsum.photos/200/300?random=2", year: "1949", rating: 4.7 },
  { id: "3", name: "Yüzüklerin Efendisi", author: "J.R.R. Tolkien", coverImage: "https://picsum.photos/200/300?random=3", year: "1954", rating: 4.9 },
  { id: "4", name: "Harry Potter", author: "J.K. Rowling", coverImage: "https://picsum.photos/200/300?random=4", year: "1997", rating: 4.6 },
  { id: "5", name: "Satranç", author: "Stefan Zweig", coverImage: "https://picsum.photos/200/300?random=5", year: "1942", rating: 4.5 },
  { id: "6", name: "Dönüşüm", author: "Franz Kafka", coverImage: "https://picsum.photos/200/300?random=6", year: "1915", rating: 4.4 },
  { id: "7", name: "Sefiller", author: "Victor Hugo", coverImage: "https://picsum.photos/200/300?random=7", year: "1862", rating: 4.7 },
  { id: "8", name: "Küçük Prens", author: "Antoine de Saint-Exupéry", coverImage: "https://picsum.photos/200/300?random=8", year: "1943", rating: 4.8 },
  { id: "9", name: "Cesur Yeni Dünya", author: "Aldous Huxley", coverImage: "https://picsum.photos/200/300?random=9", year: "1932", rating: 4.3 },
  { id: "10", name: "Simyacı", author: "Paulo Coelho", coverImage: "https://picsum.photos/200/300?random=10", year: "1988", rating: 4.5 },
  { id: "11", name: "Otomatik Portakal", author: "Anthony Burgess", coverImage: "https://picsum.photos/200/300?random=11", year: "1962", rating: 4.2 },
  { id: "12", name: "Bülbülü Öldürmek", author: "Harper Lee", coverImage: "https://picsum.photos/200/300?random=12", year: "1960", rating: 4.6 },
  { id: "13", name: "Fareler ve İnsanlar", author: "John Steinbeck", coverImage: "https://picsum.photos/200/300?random=13", year: "1937", rating: 4.4 },
  { id: "14", name: "Dorian Gray'in Portresi", author: "Oscar Wilde", coverImage: "https://picsum.photos/200/300?random=14", year: "1890", rating: 4.3 },
  { id: "15", name: "Hayvan Çiftliği", author: "George Orwell", coverImage: "https://picsum.photos/200/300?random=15", year: "1945", rating: 4.5 },
  { id: "16", name: "Uğultulu Tepeler", author: "Emily Brontë", coverImage: "https://picsum.photos/200/300?random=16", year: "1847", rating: 4.2 },
  { id: "17", name: "Aylak Adam", author: "Yusuf Atılgan", coverImage: "https://picsum.photos/200/300?random=17", year: "1959", rating: 4.3 },
  { id: "18", name: "Tutunamayanlar", author: "Oğuz Atay", coverImage: "https://picsum.photos/200/300?random=18", year: "1971", rating: 4.7 },
  { id: "19", name: "Kürk Mantolu Madonna", author: "Sabahattin Ali", coverImage: "https://picsum.photos/200/300?random=19", year: "1943", rating: 4.8 },
  { id: "20", name: "Bin Dokuz Yüz Seksen Dört", author: "George Orwell", coverImage: "https://picsum.photos/200/300?random=20", year: "1949", rating: 4.7 },
];


const loadUser = async () => {
    for await (const user of users) {
      await prisma.user.create({
        data: {
          ...user,
        },
      });
    }
  
    console.log('Users inserted in database successfully');
  };

const loadBook= async () => {
    for await (const book of books) {
      await prisma.book.create({
        data: {
          ...book,
        },
      });
    }
  
    console.log('Books inserted in database successfully');
  };

async function main() {
  await loadUser();
  await loadBook();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async error => {
    console.log(error);
    await prisma.$disconnect();
  });