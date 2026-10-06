export type Lang = "en" | "ru" | "ka";
export type Text = Record<Lang, string>;
export const t = (en: string, ru: string, ka: string): Text => ({ en, ru, ka });

export type Tour = {
  id: string;
  n: number;
  name: Text;
  kicker: Text;
  photo: string;
  photo2: string;
  duration: Text;
  seats: Text;
  stops: Text[];
  includes: Text;
  price: number;
  priceUnit: "pp" | "van";
  color: string;
};

export const tours: Tour[] = [
  {
    id: "adjara", n: 1, photo: "/images/g-waterfall-wide.webp", photo2: "/images/c-makhuntseti.webp", price: 60, priceUnit: "pp", color: "#2fb59b",
    name: t("Mountains of Adjara & three waterfalls", "Горная Аджария и три водопада", "მთიანი აჭარა და სამი ჩანჩქერი"),
    kicker: t("Our signature day", "Наш главный маршрут", "ჩვენი მთავარი მარშრუტი"),
    duration: t("10:00 – 18:30", "10:00 – 18:30", "10:00 – 18:30"),
    seats: t("Group or private van", "Группа или свой микроавтобус", "ჯგუფი ან კერძო ვენი"),
    stops: [t("Borjgalo ethnographic museum", "Этнографический музей «Борджгало»", "ეთნოგრაფიული მუზეუმი „ბორჯღალო“"), t("Makhuntseti waterfall & Queen Tamar bridge", "Водопад Махунцети и мост царицы Тамары", "მახუნცეთის ჩანჩქერი და თამარის ხიდი"), t("Lunch at a village restaurant, wine tasting", "Обед в деревенском ресторане, дегустация вина", "სადილი სოფლის რესტორანში, ღვინის დეგუსტაცია"), t("Waterfall of Love & Mirveti waterfall", "Водопад Любви и водопад Мирвети", "სიყვარულის ჩანჩქერი და მირვეთის ჩანჩქერი")],
    includes: t("Hotel pickup, van with air conditioning, driver-guide, museum and wine tasting. Lunch paid on site. Georgian folk music on the way back.", "Трансфер от отеля, микроавтобус с кондиционером, водитель-гид, музей и дегустация вина. Обед оплачивается на месте. На обратном пути грузинская народная музыка.", "სასტუმროდან წამოყვანა, ვენი კონდიციონერით, მძღოლი-გიდი, მუზეუმი და ღვინის დეგუსტაცია. სადილი ადგილზე. უკან გზაზე ქართული ხალხური მუსიკა."),
  },
  {
    id: "mtirala", n: 2, photo: "/images/c-mtirala.webp", photo2: "/images/g-river.webp", price: 55, priceUnit: "pp", color: "#1b6fa8",
    name: t("Mtirala national park", "Национальный парк Мтирала", "მტირალას ეროვნული პარკი"),
    kicker: t("Rainforest & rivers", "Колхидский лес и реки", "კოლხური ტყე და მდინარეები"),
    duration: t("10:00 – 17:00", "10:00 – 17:00", "10:00 – 17:00"),
    seats: t("Small groups", "Небольшие группы", "მცირე ჯგუფები"),
    stops: [t("Chakvistavi village", "Село Чаквистави", "სოფელი ჩაქვისთავი"), t("Trail through the Colchic rainforest", "Тропа через колхидский лес", "ბილიკი კოლხურ ტყეში"), t("Tsivtskaro waterfall & suspension bridge", "Водопад Цивцкаро и подвесной мост", "ცივწყაროს ჩანჩქერი და საკიდი ხიდი"), t("Swim stop in the river", "Купание в реке", "ბანაობა მდინარეში")],
    includes: t("Hotel pickup, van, driver-guide, park entrance. Picnic or village lunch on request.", "Трансфер от отеля, микроавтобус, водитель-гид, вход в парк. Пикник или обед в деревне по запросу.", "სასტუმროდან წამოყვანა, ვენი, მძღოლი-გიდი, პარკის შესვლა. პიკნიკი ან სადილი სურვილით."),
  },
  {
    id: "kutaisi", n: 3, photo: "/images/c-martvili.webp", photo2: "/images/c-prometheus.webp", price: 75, priceUnit: "pp", color: "#ff5a7a",
    name: t("Martvili canyon, Prometheus cave & Kutaisi", "Каньон Мартвили, пещера Прометея и Кутаиси", "მარტვილის კანიონი, პრომეთეს მღვიმე და ქუთაისი"),
    kicker: t("Full day to Imereti", "Целый день в Имерети", "მთელი დღე იმერეთში"),
    duration: t("08:00 – 20:00", "08:00 – 20:00", "08:00 – 20:00"),
    seats: t("Group or private van", "Группа или свой микроавтобус", "ჯგუფი ან კერძო ვენი"),
    stops: [t("Boat ride in Martvili canyon", "Лодка по каньону Мартвили", "ნავით მარტვილის კანიონში"), t("Prometheus cave", "Пещера Прометея", "პრომეთეს მღვიმე"), t("Hot sulphur springs", "Горячие серные источники", "ცხელი გოგირდის წყაროები"), t("Kutaisi & Bagrati cathedral", "Кутаиси и храм Баграти", "ქუთაისი და ბაგრატის ტაძარი")],
    includes: t("Hotel pickup, van, driver-guide. Boat and cave tickets paid on site.", "Трансфер от отеля, микроавтобус, водитель-гид. Билеты на лодку и в пещеру на месте.", "სასტუმროდან წამოყვანა, ვენი, მძღოლი-გიდი. ნავისა და მღვიმის ბილეთები ადგილზე."),
  },
  {
    id: "city", n: 4, photo: "/images/c-batumi-coast.webp", photo2: "/images/g-batumi-sign.webp", price: 35, priceUnit: "pp", color: "#ffc94d",
    name: t("Batumi city tour & Petra fortress", "Обзорная по Батуми и крепость Петра", "ბათუმის მიმოხილვითი ტური და პეტრას ციხე"),
    kicker: t("History & coast", "История и побережье", "ისტორია და სანაპირო"),
    duration: t("10:00 – 15:00", "10:00 – 15:00", "10:00 – 15:00"),
    seats: t("Group or private van", "Группа или свой микроавтобус", "ჯგუფი ან კერძო ვენი"),
    stops: [t("Old Batumi, Piazza & the boulevard", "Старый Батуми, Пьяцца и бульвар", "ძველი ბათუმი, პიაცა და ბულვარი"), t("Ali & Nino and the Alphabet tower", "Али и Нино, Башня алфавита", "ალი და ნინო, ანბანის კოშკი"), t("Petra fortress, Tsikhisdziri", "Крепость Петра, Цихисдзири", "პეტრას ციხე, ციხისძირი"), t("Poti and the Black Sea lighthouse on request", "Поти и маяк по запросу", "ფოთი და შუქურა სურვილით")],
    includes: t("Van, driver-guide, photo stops. Entrance tickets paid on site.", "Микроавтобус, водитель-гид, фотостопы. Входные билеты на месте.", "ვენი, მძღოლი-გიდი, ფოტო-გაჩერებები. ბილეთები ადგილზე."),
  },
  {
    id: "garden", n: 5, photo: "/images/g-garden.webp", photo2: "/images/g-parrots.webp", price: 35, priceUnit: "pp", color: "#2fb59b",
    name: t("Botanical garden & Shekvetili dendrological park", "Ботанический сад и дендропарк Шекветили", "ბოტანიკური ბაღი და შეკვეთილის დენდროლოგიური პარკი"),
    kicker: t("The most colourful day", "Самый красочный день", "ყველაზე ფერადი დღე"),
    duration: t("10:00 – 16:00", "10:00 – 16:00", "10:00 – 16:00"),
    seats: t("Small groups", "Небольшие группы", "მცირე ჯგუფები"),
    stops: [t("Batumi botanical garden, Green Cape", "Ботанический сад, Зелёный мыс", "ბათუმის ბოტანიკური ბაღი, მწვანე კონცხი"), t("Shekvetili dendrological park & parrots", "Дендропарк Шекветили и попугаи", "შეკვეთილის დენდროლოგიური პარკი და თუთიყუშები"), t("Black Sea Arena", "Black Sea Arena", "Black Sea Arena"), t("Magnetic sands of Ureki", "Магнитные пески Уреки", "ურეკის მაგნიტური ქვიშა")],
    includes: t("Van, driver-guide, pickup. Entrance tickets paid on site.", "Микроавтобус, водитель-гид, трансфер. Входные билеты на месте.", "ვენი, მძღოლი-გიდი, წამოყვანა. ბილეთები ადგილზე."),
  },
  {
    id: "imereti", n: 6, photo: "/images/c-okatse.webp", photo2: "/images/c-sataplia.webp", price: 75, priceUnit: "pp", color: "#1b6fa8",
    name: t("Imereti: Okatse canyon, Kinchkha waterfall & churchkhela class", "Имерети: каньон Окаце, водопад Кинчха и мастер-класс по чурчхеле", "იმერეთი: ოკაცეს კანიონი, კინჩხას ჩანჩქერი და ჩურჩხელის მასტერკლასი"),
    kicker: t("New this season", "Новинка сезона", "სეზონის სიახლე"),
    duration: t("08:30 – 20:00", "08:30 – 20:00", "08:30 – 20:00"),
    seats: t("Group or private van", "Группа или свой микроавтобус", "ჯგუფი ან კერძო ვენი"),
    stops: [t("Okatse canyon skywalk", "Подвесная тропа над каньоном Окаце", "ოკაცეს კანიონის საკიდი ბილიკი"), t("Kinchkha waterfall", "Водопад Кинчха", "კინჩხას ჩანჩქერი"), t("Family winery with tasting", "Семейная винодельня с дегустацией", "ოჯახური მარანი დეგუსტაციით"), t("Churchkhela-making class", "Мастер-класс по чурчхеле", "ჩურჩხელის დამზადების მასტერკლასი")],
    includes: t("Van, driver-guide, pickup, wine tasting and the class. Park tickets paid on site.", "Микроавтобус, водитель-гид, трансфер, дегустация и мастер-класс. Билеты в парк на месте.", "ვენი, მძღოლი-გიდი, წამოყვანა, დეგუსტაცია და მასტერკლასი. პარკის ბილეთები ადგილზე."),
  },
  {
    id: "multi", n: 7, photo: "/images/c-martvili.webp", photo2: "/images/c-bagrati.webp", price: 150, priceUnit: "van", color: "#ff5a7a",
    name: t("Three days: Adjara, Imereti & Borjomi", "Три дня: Аджария, Имерети и Боржоми", "სამი დღე: აჭარა, იმერეთი და ბორჯომი"),
    kicker: t("Multi-day, your route", "Многодневный, ваш маршрут", "მრავალდღიანი, თქვენი მარშრუტი"),
    duration: t("2–5 days", "2–5 дней", "2–5 დღე"),
    seats: t("Private van, up to 8", "Свой микроавтобус, до 8 человек", "კერძო ვენი, 8 ადამიანამდე"),
    stops: [t("Day 1 · Makhuntseti & Mirveti waterfalls, wine", "День 1 · Водопады Махунцети и Мирвети, вино", "დღე 1 · მახუნცეთისა და მირვეთის ჩანჩქერები, ღვინო"), t("Day 2 · Martvili canyon & Kutaisi", "День 2 · Каньон Мартвили и Кутаиси", "დღე 2 · მარტვილის კანიონი და ქუთაისი"), t("Day 3 · Borjomi national park or Goderdzi", "День 3 · Парк Боржоми или Годердзи", "დღე 3 · ბორჯომის პარკი ან გოდერძი"), t("Tbilisi city tour on request", "Обзорная по Тбилиси по запросу", "თბილისის ტური სურვილით")],
    includes: t("Van with driver-guide for the whole trip, route built around your dates. Corporate and school groups up to 40 people.", "Микроавтобус с водителем-гидом на всю поездку, маршрут под ваши даты. Корпоративные и школьные группы до 40 человек.", "ვენი მძღოლ-გიდით მთელი მოგზაურობისთვის, მარშრუტი თქვენი თარიღებით. კორპორატიული და სასკოლო ჯგუფები 40 ადამიანამდე."),
  },
];

export type Review = { author: string; date: Text; text: Text; guide?: string };

export const reviews: Review[] = [
  {
    author: "Laura Jaaniste", date: t("a month ago", "месяц назад", "ერთი თვის წინ"),
    text: t("We paid 30% upfront two days before. The journey was agreed to start at 10:00 and the van arrived right on time. A museum of mountain village life, a waterfall, lunch at Avaliani restaurant, a second waterfall. On the way back we listened to Georgian folk music.", "Оплатили 30 % за два дня до поездки. Договорились на 10:00, и микроавтобус приехал ровно вовремя. Музей горного быта, водопад, обед в ресторане Авалиани, второй водопад. На обратном пути слушали грузинскую народную музыку.", "30 % წინასწარ გადავიხადეთ ორი დღით ადრე. 10:00-ზე შევთანხმდით და ვენი ზუსტად დროზე მოვიდა. მთის სოფლის მუზეუმი, ჩანჩქერი, სადილი ავალიანის რესტორანში, მეორე ჩანჩქერი. უკან გზაზე ქართულ ხალხურ მუსიკას ვუსმენდით."),
  },
  {
    author: "Liuda Tumiene", guide: "Nana", date: t("a month ago", "месяц назад", "ერთი თვის წინ"),
    text: t("Nana is the most professional local guide. We went on a tour to the waterfalls with her and learned a lot about the local nature and people. She is the nicest person we met in Georgia.", "Нана — самый профессиональный местный гид. Ездили с ней к водопадам и узнали много о природе и людях. Самый приятный человек, которого мы встретили в Грузии.", "ნანა ყველაზე პროფესიონალი ადგილობრივი გიდია. მასთან ერთად ჩანჩქერებზე ვიყავით და ბევრი რამ გავიგეთ ბუნებასა და ადამიანებზე. ყველაზე სასიამოვნო ადამიანი, ვინც საქართველოში შევხვდით."),
  },
  {
    author: "Beqa Phurtskhvanidze", guide: "Nana", date: t("6 months ago", "6 месяцев назад", "6 თვის წინ"),
    text: t("We planned the group tour to Mtirala national park, Petra fortress and a Poti city tour. Nana is a very friendly and wonderful guide, an excellent driver and very knowledgeable in the history of Georgia.", "Групповой тур в парк Мтирала, крепость Петра и обзорная по Поти. Нана — очень дружелюбный и замечательный гид, отличный водитель и прекрасно знает историю Грузии.", "ჯგუფური ტური მტირალას პარკში, პეტრას ციხესა და ფოთში. ნანა ძალიან მეგობრული და შესანიშნავი გიდია, საუკეთესო მძღოლი და კარგად იცის საქართველოს ისტორია."),
  },
  {
    author: "Boris Eliadze", guide: "Nana, Maiko, Inga", date: t("6 months ago", "6 месяцев назад", "6 თვის წინ"),
    text: t("We booked a corporate tour for a group of 40 people. The tour to Martvili canyon and Prometheus cave was organised very well and quite budget-friendly for such a service. The guides, Nana, Maiko and Inga, were super professionals.", "Заказали корпоративный тур на 40 человек. Поездка в каньон Мартвили и пещеру Прометея была организована отлично и по очень разумной цене. Гиды Нана, Маико и Инга — суперпрофессионалы.", "40 კაციანი კორპორატიული ტური დავჯავშნეთ. მარტვილის კანიონისა და პრომეთეს მღვიმის ტური შესანიშნავად იყო ორგანიზებული და საკმაოდ ხელმისაწვდომ ფასად. გიდები ნანა, მაიკო და ინგა სუპერ პროფესიონალები არიან."),
  },
  {
    author: "Augusto Crespo", guide: "Maia", date: t("2 months ago", "2 месяца назад", "2 თვის წინ"),
    text: t("Best tour company ever. Maia is amazing and a very good guide, she took us to Batumi city centre, Kutaisi and Martvili canyon and did it in an amazing way. They are the best in town, 10/10.", "Лучшая тур-компания. Майя — потрясающий гид: показала нам центр Батуми, Кутаиси и каньон Мартвили, и всё на высшем уровне. Лучшие в городе, 10 из 10.", "საუკეთესო ტურისტული კომპანია. მაია საოცარი გიდია: ბათუმის ცენტრი, ქუთაისი და მარტვილის კანიონი გვაჩვენა, და ყველაფერი შესანიშნავად. საუკეთესოები არიან ქალაქში, 10/10."),
  },
  {
    author: "Maia Pagava", date: t("9 months ago", "9 месяцев назад", "9 თვის წინ"),
    text: t("A tour in the mountains of Adjara with responsible, well-organised, fun and knowledgeable guides. They know so many hidden gems and rural stories. Waterfalls, rivers, divine Georgian wine, Adjarian khachapuri and eggplants with walnuts.", "Тур по горной Аджарии с ответственными, организованными, весёлыми и знающими гидами. Они знают столько скрытых мест и деревенских историй. Водопады, реки, божественное грузинское вино, аджарский хачапури и баклажаны с орехами.", "ტური მთიან აჭარაში პასუხისმგებელ, ორგანიზებულ, მხიარულ და მცოდნე გიდებთან ერთად. ამდენი ფარული ადგილი და სოფლის ისტორია იციან. ჩანჩქერები, მდინარეები, ღვთაებრივი ქართული ღვინო, აჭარული ხაჭაპური და ბადრიჯანი ნიგვზით."),
  },
  {
    author: "Walid Maghawry", date: t("7 months ago", "7 месяцев назад", "7 თვის წინ"),
    text: t("An amazing three-day excursion. The organisation was outstanding and everything ran smoothly from start to finish. Every detail was thoughtfully arranged, allowing us to fully relax and enjoy the journey.", "Потрясающая трёхдневная поездка. Организация на высшем уровне, всё прошло гладко от начала до конца. Каждая деталь продумана, можно было просто расслабиться и наслаждаться.", "საოცარი სამდღიანი ექსკურსია. ორგანიზაცია შესანიშნავი იყო და ყველაფერი შეუფერხებლად მიდიოდა. ყველა დეტალი გააზრებული იყო, რათა სრულად დავსვენებულიყავით."),
  },
  {
    author: "Giorgi Sharadze", date: t("5 months ago", "5 месяцев назад", "5 თვის წინ"),
    text: t("Our tour to the mountains of Adjara: Makhuntseti waterfall, Waterfall of Love and Mirveti waterfall. On the way we visited the ethnographic museum Borjgalo. The guide was professional and very friendly.", "Тур по горной Аджарии: водопад Махунцети, водопад Любви и водопад Мирвети. По дороге заехали в этнографический музей «Борджгало». Гид профессиональный и очень дружелюбный.", "ტური მთიან აჭარაში: მახუნცეთის ჩანჩქერი, სიყვარულის ჩანჩქერი და მირვეთის ჩანჩქერი. გზაში ეთნოგრაფიულ მუზეუმ „ბორჯღალოს“ ვესტუმრეთ. გიდი პროფესიონალი და ძალიან მეგობრული იყო."),
  },
  {
    author: "Nutsa A.", date: t("6 months ago", "6 месяцев назад", "6 თვის წინ"),
    text: t("The City Tour was full of history and beautiful sights, while the Botanical Tour was relaxing and stunning with incredible plants and greenery. Our guide was friendly, joyful, and made both tours smooth and enjoyable.", "Обзорная по городу была полна истории и красивых мест, а ботанический тур — расслабляющий и невероятно зелёный. Гид дружелюбный и весёлый, обе поездки прошли легко и с удовольствием.", "ქალაქის ტური ისტორიითა და ლამაზი ხედებით იყო სავსე, ბოტანიკური ტური კი დამამშვიდებელი და საოცრად მწვანე. გიდი მეგობრული და მხიარული იყო, ორივე ტური მსუბუქად და სასიამოვნოდ ჩაიარა."),
  },
  {
    author: "Xatia Shubitidze", guide: "Nana", date: t("6 months ago", "6 месяцев назад", "6 თვის წინ"),
    text: t("We booked the Martvili canyon tour and also went to the hot sulphur springs. Really amazing places, thank you Nana.", "Брали тур в каньон Мартвили и заехали на горячие серные источники. Потрясающие места, спасибо, Нана.", "მარტვილის კანიონის ტური დავჯავშნეთ და ცხელ გოგირდის წყაროებზეც წავედით. ნამდვილად საოცარი ადგილებია, მადლობა ნანა."),
  },
];

export const galleryCols: { src: string; w: number; h: number; cap: Text }[][] = [
  [
    { src: "/images/g-waterfall.webp", w: 900, h: 1600, cap: t("Makhuntseti", "Махунцети", "მახუნცეთი") },
    { src: "/images/c-gonio.webp", w: 1200, h: 800, cap: t("Gonio fortress", "Крепость Гонио", "გონიოს ციხე") },
    { src: "/images/g-feast.webp", w: 1000, h: 1333, cap: t("Lunch in the mountains", "Обед в горах", "სადილი მთებში") },
    { src: "/images/c-okatse.webp", w: 1200, h: 756, cap: t("Okatse canyon", "Каньон Окаце", "ოკაცეს კანიონი") },
  ],
  [
    { src: "/images/c-batumi-night.webp", w: 1200, h: 800, cap: t("Batumi at night", "Ночной Батуми", "ღამის ბათუმი") },
    { src: "/images/g-river.webp", w: 1000, h: 1333, cap: t("Mtirala river", "Река в Мтирале", "მდინარე მტირალაში") },
    { src: "/images/c-sataplia.webp", w: 1200, h: 798, cap: t("Sataplia viewpoint", "Смотровая Сатаплия", "სათაფლიას ხედი") },
    { src: "/images/g-wine.webp", w: 1000, h: 1333, cap: t("Village winery", "Деревенская винодельня", "სოფლის მარანი") },
    { src: "/images/c-bagrati.webp", w: 1200, h: 857, cap: t("Bagrati, Kutaisi", "Баграти, Кутаиси", "ბაგრატი, ქუთაისი") },
  ],
  [
    { src: "/images/g-lighthouse.webp", w: 1000, h: 1333, cap: t("Black Sea lighthouse", "Маяк на Чёрном море", "შავი ზღვის შუქურა") },
    { src: "/images/c-goderdzi.webp", w: 1200, h: 800, cap: t("Goderdzi pass", "Перевал Годердзи", "გოდერძის უღელტეხილი") },
    { src: "/images/g-falls2.webp", w: 900, h: 1200, cap: t("Waterfall of Love", "Водопад Любви", "სიყვარულის ჩანჩქერი") },
    { src: "/images/c-prometheus.webp", w: 1200, h: 675, cap: t("Prometheus cave", "Пещера Прометея", "პრომეთეს მღვიმე") },
  ],
];
