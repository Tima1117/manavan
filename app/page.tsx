"use client";

import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import Lenis from "lenis";
import { tours, reviews, type Lang } from "./data";
import { HeroRoad, type RoadCopy } from "./hero-road";
import { TourStack, type StackCopy } from "./tour-stack";
import { ReviewsCarousel } from "./reviews-carousel";
import { GalleryParallax } from "./gallery-parallax";

const phone = "+995511718516";
const phonePretty = "+995 511 71 85 16";
const waBase = "https://wa.me/995511718516";
const instagram = "https://www.instagram.com/manavantours/";
const facebook = "https://www.facebook.com/manavantours/";
const email = "manavantours@gmail.com";
const mapsUrl = "https://www.google.com/maps/search/?api=1&query=MA+NA+VAN+TOURS+Batumi&query_place_id=ChIJ25vFldmHZ0ARNWYBcWmVpsQ";
const reviewsUrl = "https://www.google.com/maps/place/MA+NA+VAN+TOURS+-+Batumi+daily+tours/@41.639137,41.632709,17z/data=!4m6!3m5!1s0x406787d995c59bdb:0xc4a6956971016635!8m2!3d41.639137!4d41.632709";
const mapEmbed = "https://www.openstreetmap.org/export/embed.html?bbox=41.6247%2C41.6351%2C41.6407%2C41.6431&layer=mapnik&marker=41.6391%2C41.6327";

const stopPhotos = ["/images/g-batumi-sign.webp", "/images/g-wine.webp", "/images/g-waterfall.webp", "/images/g-feast.webp", "/images/g-falls2.webp"];
const stopAt = [0.1, 0.31, 0.52, 0.73, 0.92];
const sides: ("up" | "down")[] = ["up", "down", "up", "down", "down"];
const mkStops = (list: [string, string][]) => list.map(([time, title], i) => ({ at: stopAt[i], time, title, photo: stopPhotos[i], side: sides[i] }));

const copy = {
  en: {
    nav: ["Tours", "How it works", "Reviews", "Gallery", "Contacts"],
    cta: "WhatsApp",
    road: {
      eyebrow: "Daily group & private tours from Batumi",
      title: ["Hop in.", "Georgia by van."],
      lede: "Waterfalls, canyons, caves and mountain villages in a comfortable van with Nana and her team. Pickup at your hotel at 10:00, back by dinner.",
      cta: "Book a seat in WhatsApp",
      cta2: "See the tours",
      scroll: "Scroll to start the trip",
      hud: "Day tour · Mountains of Adjara",
      km: "km",
      stops: mkStops([["10:00", "Pickup at your hotel"], ["11:00", "Borjgalo ethnographic museum"], ["12:30", "Makhuntseti waterfall"], ["14:00", "Village lunch & wine tasting"], ["16:00", "Mirveti waterfall"]]),
      outroTitle: "Back in Batumi by 18:30.",
      outroText: "Three waterfalls, a museum, a village lunch with wine and Georgian folk music on the way home. That is one of seven days we drive every week.",
      outroCta: "Choose your tour",
      rating: "5.0 · 105 reviews on Google",
    } as RoadCopy,
    strip: ["5.0 on Google · 105 reviews", "Group & private tours", "Pickup at your hotel", "Kids & family discounts", "Card & NFC payments", "Daily from 10:00"],
    toursEyebrow: "Tours",
    toursTitle: "Pick your day",
    toursLede: "Seven routes we drive every week. Join a group departure or take the whole van for your family or company. Keep scrolling: the tours stack up.",
    stack: { from: "from", pp: "/ person", van: "/ van · day", book: "Book in WhatsApp", includes: "Included", stops: "Stops", seats: "Format", time: "Time" } as StackCopy,
    priceNote: "Prices are indicative and depend on the season and group size. The final price is confirmed in WhatsApp before any payment.",
    howEyebrow: "How it works",
    howTitle: "Three messages and you're on the road",
    how: [
      { b: "Write in WhatsApp", s: "Tell us the date, the tour and how many of you. We answer within the hour." },
      { b: "Confirm the day", s: "A 30 % deposit two days before, the rest on the day of the tour. Private vans and corporate groups up to 40 people." },
      { b: "The van is at your door at 10:00", s: "Air conditioning, water on board, Georgian folk music on the way back." },
    ],
    teamTitle: "Meet Nana",
    teamText: "Nana drives and guides. A local from Adjara who knows the history of every village on the road, an excellent driver and, in the words of our guests, “the nicest person we met in Georgia”. Maia and Inga lead the second and third vans on busy days.",
    teamChips: ["Nana", "Maia", "Inga"],
    revEyebrow: "Reviews",
    revTitle: "105 reviews, all five stars",
    revLede: "Drag the cards or use the arrows. Every review is from Google.",
    revAll: "Read all on Google",
    guide: "Guide",
    galEyebrow: "Gallery",
    galTitle: "Where the van goes",
    galLede: "Photos from our tours and of the places on the routes.",
    conEyebrow: "Contacts",
    conTitle: "Hop in",
    addrLabel: "Office",
    addr: "40 Tchaikovsky St, Batumi · we pick you up at your hotel",
    phoneLabel: "Phone / WhatsApp",
    hoursLabel: "Hours",
    hours: "Daily 08:00–23:30",
    call: "Call",
    directions: "Directions",
    bookTitle: "Book a seat",
    bookText: "Choose a tour and a date. We confirm seats and the price in WhatsApp, usually within the hour.",
    fName: "Your name",
    fTour: "Tour",
    fAny: "Help me choose",
    fDate: "Date",
    fPeople: "People",
    send: "Send to WhatsApp",
    bookNote: "No payment on the site. The button opens WhatsApp with a ready message.",
    waMsg: (tour: string, date: string, people: string, name: string) => `Hello! I'd like to book a tour: ${tour}. Date: ${date || "flexible"}. People: ${people || "?"}. ${name ? `My name is ${name}.` : ""}`,
    waTour: (tour: string) => `Hello! I'm interested in the "${tour}" tour. Which dates are available?`,
    waHero: "Hello! I'm in Batumi and would like to join a day tour. Which tours are departing this week?",
    foot: "© 2026 MA NA VAN TOURS · Batumi, Georgia",
    credit: "Photos: the agency's Google Maps and Wikimedia Commons (CC)",
  },
  ru: {
    nav: ["Туры", "Как это работает", "Отзывы", "Галерея", "Контакты"],
    cta: "WhatsApp",
    road: {
      eyebrow: "Групповые и индивидуальные туры из Батуми каждый день",
      title: ["Садитесь.", "Грузия на микроавтобусе."],
      lede: "Водопады, каньоны, пещеры и горные деревни в комфортном микроавтобусе с Наной и её командой. Забираем из отеля в 10:00, возвращаем к ужину.",
      cta: "Забронировать место в WhatsApp",
      cta2: "Смотреть туры",
      scroll: "Листайте, чтобы начать поездку",
      hud: "Однодневный тур · Горная Аджария",
      km: "км",
      stops: mkStops([["10:00", "Забираем из отеля"], ["11:00", "Этномузей «Борджгало»"], ["12:30", "Водопад Махунцети"], ["14:00", "Обед в деревне и дегустация вина"], ["16:00", "Водопад Мирвети"]]),
      outroTitle: "В Батуми к 18:30.",
      outroText: "Три водопада, музей, деревенский обед с вином и грузинская народная музыка на обратном пути. Это один из семи дней, по которым мы ездим каждую неделю.",
      outroCta: "Выбрать тур",
      rating: "5.0 · 105 отзывов в Google",
    } as RoadCopy,
    strip: ["5.0 в Google · 105 отзывов", "Групповые и индивидуальные туры", "Забираем из отеля", "Скидки детям и семьям", "Оплата картой и NFC", "Ежедневно с 10:00"],
    toursEyebrow: "Туры",
    toursTitle: "Выберите свой день",
    toursLede: "Семь маршрутов, по которым мы ездим каждую неделю. Присоединяйтесь к группе или возьмите весь микроавтобус для семьи или компании. Листайте: туры складываются стопкой.",
    stack: { from: "от", pp: "/ чел.", van: "/ микроавтобус · день", book: "Забронировать в WhatsApp", includes: "Включено", stops: "Остановки", seats: "Формат", time: "Время" } as StackCopy,
    priceNote: "Цены ориентировочные и зависят от сезона и размера группы. Итоговую стоимость подтверждаем в WhatsApp до любой оплаты.",
    howEyebrow: "Как это работает",
    howTitle: "Три сообщения, и вы в дороге",
    how: [
      { b: "Напишите в WhatsApp", s: "Дата, тур и сколько вас. Отвечаем в течение часа." },
      { b: "Подтвердите день", s: "Предоплата 30 % за два дня, остальное в день тура. Индивидуальные микроавтобусы и корпоративные группы до 40 человек." },
      { b: "Микроавтобус у отеля в 10:00", s: "Кондиционер, вода в салоне, грузинская народная музыка на обратном пути." },
    ],
    teamTitle: "Знакомьтесь, Нана",
    teamText: "Нана за рулём и у микрофона. Местная, из Аджарии, знает историю каждой деревни по дороге, отличный водитель и, словами гостей, «самый приятный человек, которого мы встретили в Грузии». В загруженные дни второй и третий микроавтобусы ведут Майя и Инга.",
    teamChips: ["Нана", "Майя", "Инга"],
    revEyebrow: "Отзывы",
    revTitle: "105 отзывов, и все на пять звёзд",
    revLede: "Тяните карточки или листайте стрелками. Все отзывы из Google.",
    revAll: "Все отзывы в Google",
    guide: "Гид",
    galEyebrow: "Галерея",
    galTitle: "Куда едет микроавтобус",
    galLede: "Фото с наших туров и мест на маршрутах.",
    conEyebrow: "Контакты",
    conTitle: "Садитесь",
    addrLabel: "Офис",
    addr: "ул. Чайковского 40, Батуми · забираем из вашего отеля",
    phoneLabel: "Телефон / WhatsApp",
    hoursLabel: "Часы",
    hours: "Ежедневно 08:00–23:30",
    call: "Позвонить",
    directions: "Маршрут",
    bookTitle: "Забронировать место",
    bookText: "Выберите тур и дату. Подтвердим места и цену в WhatsApp, обычно в течение часа.",
    fName: "Ваше имя",
    fTour: "Тур",
    fAny: "Помогите выбрать",
    fDate: "Дата",
    fPeople: "Человек",
    send: "Отправить в WhatsApp",
    bookNote: "Оплаты на сайте нет. Кнопка откроет WhatsApp с готовым сообщением.",
    waMsg: (tour: string, date: string, people: string, name: string) => `Здравствуйте! Хочу забронировать тур: ${tour}. Дата: ${date || "гибко"}. Человек: ${people || "?"}. ${name ? `Меня зовут ${name}.` : ""}`,
    waTour: (tour: string) => `Здравствуйте! Интересует тур «${tour}». Какие даты свободны?`,
    waHero: "Здравствуйте! Я в Батуми и хочу присоединиться к однодневному туру. Какие туры выезжают на этой неделе?",
    foot: "© 2026 MA NA VAN TOURS · Батуми, Грузия",
    credit: "Фото: Google Maps агентства и Wikimedia Commons (CC)",
  },
  ka: {
    nav: ["ტურები", "როგორ მუშაობს", "შეფასებები", "გალერეა", "კონტაქტი"],
    cta: "WhatsApp",
    road: {
      eyebrow: "ჯგუფური და კერძო ტურები ბათუმიდან ყოველდღე",
      title: ["ჩაჯექით.", "საქართველო ვენით."],
      lede: "ჩანჩქერები, კანიონები, მღვიმეები და მთის სოფლები კომფორტულ ვენში ნანასა და მის გუნდთან ერთად. სასტუმროდან 10:00-ზე წამოგიყვანთ, ვახშმისთვის დაგაბრუნებთ.",
      cta: "ადგილის დაჯავშნა WhatsApp-ში",
      cta2: "ტურების ნახვა",
      scroll: "გადაახვიეთ მოგზაურობის დასაწყებად",
      hud: "ერთდღიანი ტური · მთიანი აჭარა",
      km: "კმ",
      stops: mkStops([["10:00", "წამოყვანა სასტუმროდან"], ["11:00", "ეთნომუზეუმი „ბორჯღალო“"], ["12:30", "მახუნცეთის ჩანჩქერი"], ["14:00", "სოფლის სადილი და ღვინის დეგუსტაცია"], ["16:00", "მირვეთის ჩანჩქერი"]]),
      outroTitle: "ბათუმში 18:30-ისთვის.",
      outroText: "სამი ჩანჩქერი, მუზეუმი, სოფლის სადილი ღვინით და ქართული ხალხური მუსიკა უკან გზაზე. ეს იმ შვიდი დღიდან ერთ-ერთია, რომლითაც ყოველ კვირა დავდივართ.",
      outroCta: "ტურის არჩევა",
      rating: "5.0 · 105 შეფასება Google-ზე",
    } as RoadCopy,
    strip: ["5.0 Google-ზე · 105 შეფასება", "ჯგუფური და კერძო ტურები", "წამოყვანა სასტუმროდან", "ფასდაკლება ბავშვებსა და ოჯახებს", "ბარათით და NFC გადახდა", "ყოველდღე 10:00-დან"],
    toursEyebrow: "ტურები",
    toursTitle: "აირჩიეთ თქვენი დღე",
    toursLede: "შვიდი მარშრუტი, რომლითაც ყოველ კვირა დავდივართ. შეუერთდით ჯგუფს ან აიღეთ მთელი ვენი ოჯახისთვის ან კომპანიისთვის. გადაახვიეთ: ტურები ერთმანეთზე ლაგდება.",
    stack: { from: "-დან", pp: "/ ადამიანი", van: "/ ვენი · დღე", book: "დაჯავშნა WhatsApp-ში", includes: "შედის", stops: "გაჩერებები", seats: "ფორმატი", time: "დრო" } as StackCopy,
    priceNote: "ფასები სავარაუდოა და დამოკიდებულია სეზონსა და ჯგუფის ზომაზე. საბოლოო ფასს WhatsApp-ში ვადასტურებთ გადახდამდე.",
    howEyebrow: "როგორ მუშაობს",
    howTitle: "სამი შეტყობინება და გზაში ხართ",
    how: [
      { b: "მოგვწერეთ WhatsApp-ში", s: "თარიღი, ტური და რამდენი ხართ. ერთ საათში გიპასუხებთ." },
      { b: "დაადასტურეთ დღე", s: "30 % წინასწარ ორი დღით ადრე, დანარჩენი ტურის დღეს. კერძო ვენები და კორპორატიული ჯგუფები 40 ადამიანამდე." },
      { b: "ვენი სასტუმროსთან 10:00-ზე", s: "კონდიციონერი, წყალი, ქართული ხალხური მუსიკა უკან გზაზე." },
    ],
    teamTitle: "გაიცანით ნანა",
    teamText: "ნანა საჭესთანაც არის და მიკროფონთანაც. ადგილობრივი აჭარიდან, იცის გზაზე ყველა სოფლის ისტორია, შესანიშნავი მძღოლი და, სტუმრების სიტყვებით, „ყველაზე სასიამოვნო ადამიანი, ვინც საქართველოში შევხვდით“. დატვირთულ დღეებში მეორე და მესამე ვენს მაია და ინგა მიჰყავთ.",
    teamChips: ["ნანა", "მაია", "ინგა"],
    revEyebrow: "შეფასებები",
    revTitle: "105 შეფასება, ყველა ხუთვარსკვლავიანი",
    revLede: "გადაათრიეთ ბარათები ან გამოიყენეთ ისრები. ყველა შეფასება Google-დანაა.",
    revAll: "ყველა შეფასება Google-ზე",
    guide: "გიდი",
    galEyebrow: "გალერეა",
    galTitle: "სად მიდის ვენი",
    galLede: "ფოტოები ჩვენი ტურებიდან და მარშრუტის ადგილებიდან.",
    conEyebrow: "კონტაქტი",
    conTitle: "ჩაჯექით",
    addrLabel: "ოფისი",
    addr: "ჩაიკოვსკის ქ. 40, ბათუმი · წამოგიყვანთ თქვენი სასტუმროდან",
    phoneLabel: "ტელეფონი / WhatsApp",
    hoursLabel: "საათები",
    hours: "ყოველდღე 08:00–23:30",
    call: "დარეკვა",
    directions: "მარშრუტი",
    bookTitle: "ადგილის დაჯავშნა",
    bookText: "აირჩიეთ ტური და თარიღი. ადგილებსა და ფასს WhatsApp-ში დავადასტურებთ, ჩვეულებრივ ერთ საათში.",
    fName: "თქვენი სახელი",
    fTour: "ტური",
    fAny: "დამეხმარეთ არჩევაში",
    fDate: "თარიღი",
    fPeople: "ადამიანი",
    send: "გაგზავნა WhatsApp-ში",
    bookNote: "საიტზე გადახდა არ არის. ღილაკი გახსნის WhatsApp-ს მზა შეტყობინებით.",
    waMsg: (tour: string, date: string, people: string, name: string) => `გამარჯობა! მინდა ტურის დაჯავშნა: ${tour}. თარიღი: ${date || "მოქნილი"}. ადამიანი: ${people || "?"}. ${name ? `მე ვარ ${name}.` : ""}`,
    waTour: (tour: string) => `გამარჯობა! მაინტერესებს ტური „${tour}“. რომელი თარიღებია თავისუფალი?`,
    waHero: "გამარჯობა! ბათუმში ვარ და მინდა ერთდღიან ტურს შევუერთდე. რომელი ტურები გადის ამ კვირაში?",
    foot: "© 2026 MA NA VAN TOURS · ბათუმი, საქართველო",
    credit: "ფოტოები: სააგენტოს Google Maps და Wikimedia Commons (CC)",
  },
};
type Copy = typeof copy["en"];

const wa = (text: string) => `${waBase}?text=${encodeURIComponent(text)}`;

const Ico = {
  wa: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>,
  pin: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></svg>,
  phone: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.9 2z" /></svg>,
  clock: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>,
  mail: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="3" /><path d="m3 7 9 6 9-6" /></svg>,
  ig: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>,
};

const Mark = () => (
  <svg viewBox="0 0 32 32" aria-hidden><path d="M3 20 L10 10 L15 17 L20 8 L29 20 Z" fill="#2fb59b" /><path d="M4 24 Q8 21 12 24 T20 24 T28 24" fill="none" stroke="#5fb3ff" strokeWidth="1.6" /><rect x="9" y="17" width="14" height="7" rx="2.5" fill="#ff5a7a" /><rect x="11" y="18.5" width="3" height="2.5" rx=".6" fill="#dff3ff" /><rect x="15.5" y="18.5" width="3" height="2.5" rx=".6" fill="#dff3ff" /><circle cx="12.5" cy="25" r="1.8" fill="#17202b" /><circle cx="19.5" cy="25" r="1.8" fill="#17202b" /></svg>
);

function SmoothScroll() {
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({ autoRaf: true, anchors: true, lerp: 0.09 });
    return () => lenis.destroy();
  }, [reduced]);
  return null;
}

function How({ c }: { c: Copy }) {
  return (
    <section className="how" id="how">
      <div className="container how-grid">
        <div>
          <p className="eyebrow">{c.howEyebrow}</p>
          <h2 className="section-title">{c.howTitle}</h2>
          <ol className="steps">
            <motion.svg className="steps-line" viewBox="0 0 2 100" preserveAspectRatio="none" aria-hidden initial="hidden" whileInView="show" viewport={{ once: true, margin: "-20% 0px" }}>
              <motion.path d="M1 0 V100" stroke="#ff5a7a" strokeWidth="2" strokeDasharray="4 4" variants={{ hidden: { pathLength: 0 }, show: { pathLength: 1, transition: { duration: 1.6, ease: "easeInOut" } } }} />
            </motion.svg>
            {c.how.map((s, i) => (
              <motion.li key={s.b} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-15% 0px" }} transition={{ duration: 0.5, delay: 0.25 * i }}>
                <span className="step-n">{i + 1}</span>
                <div><b>{s.b}</b><p>{s.s}</p></div>
              </motion.li>
            ))}
          </ol>
        </div>
        <motion.aside className="team" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-15% 0px" }} transition={{ duration: 0.6 }}>
          <div className="team-photo"><Image src="/images/hero-mist.webp" alt="" fill sizes="(max-width: 900px) 100vw, 40vw" style={{ objectFit: "cover" }} /></div>
          <div className="team-body">
            <h3>{c.teamTitle}</h3>
            <p>{c.teamText}</p>
            <div className="team-chips">{c.teamChips.map(n => <span key={n}>{n}</span>)}</div>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}

function Contacts({ lang, c }: { lang: Lang; c: Copy }) {
  const [name, setName] = useState("");
  const [tour, setTour] = useState("");
  const [date, setDate] = useState("");
  const [people, setPeople] = useState("2");
  const msg = c.waMsg(tour || c.fAny, date, people, name);
  return (
    <section className="contacts" id="contacts">
      <div className="container">
        <div className="contacts-grid">
          <div>
            <p className="eyebrow">{c.conEyebrow}</p>
            <h2 className="section-title" style={{ marginBottom: 28 }}>{c.conTitle}</h2>
            <div className="contact-list">
              <div className="contact-row"><span className="c-ico">{Ico.pin}</span><div><b>{c.addrLabel}</b><a href={mapsUrl} target="_blank" rel="noopener noreferrer">{c.addr}</a></div></div>
              <div className="contact-row"><span className="c-ico">{Ico.phone}</span><div><b>{c.phoneLabel}</b><a href={`tel:${phone}`}>{phonePretty}</a></div></div>
              <div className="contact-row"><span className="c-ico">{Ico.clock}</span><div><b>{c.hoursLabel}</b><span>{c.hours}</span></div></div>
              <div className="contact-row"><span className="c-ico">{Ico.mail}</span><div><b>Email</b><a href={`mailto:${email}`}>{email}</a></div></div>
              <div className="contact-row"><span className="c-ico">{Ico.ig}</span><div><b>Social</b><span className="socials"><a href={instagram} target="_blank" rel="noopener noreferrer">Instagram</a><a href={facebook} target="_blank" rel="noopener noreferrer">Facebook</a></span></div></div>
            </div>
            <div className="contact-actions">
              <a className="btn btn-wa" href={waBase} target="_blank" rel="noopener noreferrer">{Ico.wa}WhatsApp</a>
              <a className="btn btn-line" href={`tel:${phone}`}>{c.call}</a>
              <a className="btn btn-line" href={mapsUrl} target="_blank" rel="noopener noreferrer">{c.directions} ↗</a>
            </div>
          </div>
          <form className="book" onSubmit={e => { e.preventDefault(); window.open(wa(msg), "_blank", "noopener"); }}>
            <h3>{c.bookTitle}</h3>
            <p>{c.bookText}</p>
            <div className="book-grid">
              <div className="field full"><label htmlFor="f-name">{c.fName}</label><input id="f-name" value={name} onChange={e => setName(e.target.value)} autoComplete="name" /></div>
              <div className="field full"><label htmlFor="f-tour">{c.fTour}</label>
                <select id="f-tour" value={tour} onChange={e => setTour(e.target.value)}>
                  <option value="">{c.fAny}</option>
                  {tours.map(x => <option key={x.id} value={x.name[lang]}>{String(x.n).padStart(2, "0")} · {x.name[lang]}</option>)}
                </select>
              </div>
              <div className="field"><label htmlFor="f-date">{c.fDate}</label><input id="f-date" type="date" value={date} onChange={e => setDate(e.target.value)} /></div>
              <div className="field"><label htmlFor="f-people">{c.fPeople}</label><input id="f-people" type="number" min={1} max={40} value={people} onChange={e => setPeople(e.target.value)} /></div>
            </div>
            <button className="btn btn-wa" type="submit">{Ico.wa}{c.send}</button>
            <p className="book-note">{c.bookNote}</p>
          </form>
        </div>
      </div>
      <div className="map-wrap" data-lenis-prevent>
        <iframe src={mapEmbed} title="MA NA VAN TOURS on the map" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
      </div>
    </section>
  );
}

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const [open, setOpen] = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const c = copy[lang];
  const navIds = useMemo(() => ["tours", "how", "reviews", "gallery", "contacts"], []);

  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setLightbox(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  return (
    <>
      <SmoothScroll />
      <header className={`site-header${scrolled ? " scrolled" : ""}`}>
        <div className="header-inner">
          <a className="brand" href="#top"><i><Mark /></i><span>MA NA VAN<em>tours · Batumi</em></span></a>
          <nav className={`nav${open ? " open" : ""}`}>
            {c.nav.map((label, i) => <a key={navIds[i]} href={`#${navIds[i]}`} onClick={() => setOpen(false)}>{label}</a>)}
          </nav>
          <div className="header-actions">
            <div className="languages">
              {(["en", "ru", "ka"] as Lang[]).map(l => <button key={l} className={lang === l ? "active" : ""} onClick={() => { setLang(l); setOpen(false); }} aria-pressed={lang === l}>{l === "ka" ? "GE" : l.toUpperCase()}</button>)}
            </div>
            <a className="header-cta" href={wa(c.waHero)} target="_blank" rel="noopener noreferrer">{Ico.wa}<span>{c.cta}</span></a>
            <button className="mobile-toggle" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}><span /><span /></button>
          </div>
        </div>
      </header>

      <main>
        <HeroRoad c={c.road} wa={wa(c.waHero)} />

        <div className="strip" aria-hidden>
          <div className="strip-track">
            {[...c.strip, ...c.strip].map((s, i) => <span key={i}>{s}<i>●</i></span>)}
          </div>
        </div>

        <section className="tours" id="tours">
          <div className="container">
            <div className="section-head">
              <div>
                <p className="eyebrow">{c.toursEyebrow}</p>
                <h2 className="section-title">{c.toursTitle}</h2>
              </div>
              <p className="section-lede">{c.toursLede}</p>
            </div>
            <TourStack tours={tours} lang={lang} c={c.stack} wa={s => wa(c.waTour(s))} onPhoto={setLightbox} />
            <p className="price-note">{c.priceNote}</p>
          </div>
        </section>

        <How c={c} />

        <section className="reviews" id="reviews">
          <div className="container">
            <div className="section-head">
              <div>
                <p className="eyebrow light">{c.revEyebrow}</p>
                <h2 className="section-title light">{c.revTitle}</h2>
              </div>
              <div className="rev-side">
                <p className="section-lede light">{c.revLede}</p>
                <a className="btn btn-white" href={reviewsUrl} target="_blank" rel="noopener noreferrer">{c.revAll} ↗</a>
              </div>
            </div>
          </div>
          <div className="container rc-wrap"><ReviewsCarousel reviews={reviews} lang={lang} guideLabel={c.guide} /></div>
        </section>

        <section className="gallery" id="gallery">
          <div className="container">
            <div className="section-head">
              <div>
                <p className="eyebrow">{c.galEyebrow}</p>
                <h2 className="section-title">{c.galTitle}</h2>
              </div>
              <p className="section-lede">{c.galLede}</p>
            </div>
            <GalleryParallax lang={lang} onPhoto={setLightbox} />
          </div>
        </section>

        <Contacts lang={lang} c={c} />
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <a className="brand" href="#top"><i><Mark /></i><span>MA NA VAN<em>tours · Batumi</em></span></a>
          <span>{c.foot} · <a href="/images/CREDITS.txt" target="_blank" rel="noopener noreferrer">{c.credit}</a></span>
          <a href={instagram} target="_blank" rel="noopener noreferrer">Instagram ↗</a>
        </div>
      </footer>

      <AnimatePresence>
        {lightbox && (
          <motion.div className="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} onClick={() => setLightbox(null)}>
            <motion.div className="lightbox-img" initial={{ scale: 0.94 }} animate={{ scale: 1 }} exit={{ scale: 0.94 }} transition={{ duration: 0.2 }} onClick={e => e.stopPropagation()}>
              <Image src={lightbox} alt="" fill style={{ objectFit: "contain" }} sizes="100vw" />
              <button className="lightbox-close" onClick={() => setLightbox(null)} aria-label="Close">×</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
