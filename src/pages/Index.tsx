import { useState, useEffect, useCallback } from "react";
import Icon from "@/components/ui/icon";

const QUOTES = [
  {
    text: "Что природа дала — то и бери, что сам сотворил руками — то и цени",
    source: "Народная мудрость",
  },
  {
    text: "В лесу живёт тот, кто умеет слушать тишину",
    source: "Народная мудрость",
  },
  {
    text: "Трава сухая — не мёртвая: в ней жизнь спит до весны",
    source: "Из травника, XVII век",
  },
  {
    text: "Баня — мать родна: кости распарит, всё исправит",
    source: "Народная поговорка",
  },
  {
    text: "Один корень — сто недугов лечит, если знаешь, как спросить",
    source: "Слова знахаря",
  },
  {
    text: "Мёд — не лекарство, мёд — это солнце, собранное пчелой",
    source: "Народная мудрость",
  },
];

const HERBS = [
  {
    name: "Ромашка аптечная",
    emoji: "🌼",
    properties: "Противовоспалительное, успокаивающее, спазмолитическое",
    use: "Чай при простуде и нервном напряжении, ванны для кожи, припарки при болях",
    recipe: "1 ст. ложку цветков залить стаканом кипятка, настоять 15 минут под крышкой. Пить по 1/2 стакана 3 раза в день.",
    season: "Июнь — Август",
    color: "from-yellow-900/30 to-amber-900/20",
  },
  {
    name: "Мята перечная",
    emoji: "🌿",
    properties: "Охлаждающее, обезболивающее, антисептическое",
    use: "Чаи для пищеварения, банные веники, ингаляции при простуде",
    recipe: "Горсть свежих листьев или 2 ст. ложки сухих на 0.5 л кипятка. Настоять 20 минут. Добавить мёд по вкусу.",
    season: "Июль — Сентябрь",
    color: "from-green-900/30 to-emerald-900/20",
  },
  {
    name: "Зверобой",
    emoji: "🌾",
    properties: "Антидепрессивное, ранозаживляющее, противовирусное",
    use: "Настой при душевном упадке, масло для заживления ран, чай для укрепления иммунитета",
    recipe: "2 ст. ложки травы залить 0.5 л кипятка, кипятить 10 минут, настоять 1 час. Пить по 1/3 стакана до еды.",
    season: "Июнь — Июль",
    color: "from-orange-900/30 to-yellow-900/20",
  },
  {
    name: "Чабрец (Тимьян)",
    emoji: "🌱",
    properties: "Антисептическое, отхаркивающее, тонизирующее",
    use: "Чай при кашле, банные веники, добавка в бани для дыхания",
    recipe: "1 ст. ложку чабреца залить стаканом кипятка, настоять 10 минут. Вдыхать пар при простуде. Пить тёплым с мёдом.",
    season: "Июнь — Август",
    color: "from-purple-900/30 to-violet-900/20",
  },
  {
    name: "Липа",
    emoji: "🌳",
    properties: "Жаропонижающее, потогонное, противовоспалительное",
    use: "Чай при жаре и простуде, мёд для иммунитета, ванны для нервной системы",
    recipe: "3 ст. ложки цветков липы залить 0.5 л кипятка, настоять 30 минут. Пить горячим при температуре. Укрыться одеялом.",
    season: "Июль",
    color: "from-lime-900/30 to-green-900/20",
  },
  {
    name: "Крапива двудомная",
    emoji: "🍃",
    properties: "Кровоостанавливающее, витаминное, укрепляющее",
    use: "Щи и супы, чай для волос и крови, распаривание суставов в бане",
    recipe: "Молодые листья весной — в еду. Сушёные: 1 ст. ложку на стакан кипятка, настоять 15 минут. Пить курсом 2 недели.",
    season: "Май — Июнь",
    color: "from-teal-900/30 to-green-900/20",
  },
  {
    name: "Тысячелистник",
    emoji: "🌸",
    properties: "Кровоостанавливающее, противовоспалительное, желчегонное",
    use: "Остановка кровотечений, лечение ран, улучшение пищеварения, чай при болях в животе",
    recipe: "1 ст. ложку сухой травы залить стаканом кипятка, настоять 20 минут. Процедить. Пить по 1/3 стакана 3 раза в день до еды.",
    season: "Июнь — Сентябрь",
    color: "from-rose-900/30 to-pink-900/20",
  },
  {
    name: "Полынь горькая",
    emoji: "🌿",
    properties: "Противопаразитарное, желчегонное, аппетитное, дезинфицирующее",
    use: "Настойка для аппетита, отвар при глистах, окуривание дома для очищения воздуха",
    recipe: "1 ч. ложку (не больше!) травы на стакан кипятка, настоять 15 минут. Пить по 1 ст. ложке за 30 минут до еды. Не злоупотреблять.",
    season: "Июль — Август",
    color: "from-stone-900/30 to-zinc-900/20",
  },
  {
    name: "Мелисса",
    emoji: "🍋",
    properties: "Успокаивающее, спазмолитическое, противовирусное",
    use: "Чай при тревоге и бессоннице, ванны для расслабления, добавка к бане вместо мяты",
    recipe: "2 ст. ложки свежих или 1 ст. ложку сухих листьев залить стаканом кипятка. Настоять 10 минут. Пить перед сном с мёдом.",
    season: "Июнь — Август",
    color: "from-yellow-900/20 to-lime-900/20",
  },
  {
    name: "Розмарин",
    emoji: "🌿",
    properties: "Тонизирующее, улучшающее память, антисептическое",
    use: "Чай для бодрости и концентрации, банные веники, добавка в масла и мази",
    recipe: "1 веточку свежего или 1 ч. ложку сухого розмарина залить стаканом кипятка, настоять 10 минут. Пить утром вместо кофе.",
    season: "Июнь — Сентябрь",
    color: "from-emerald-900/30 to-teal-900/20",
  },
  {
    name: "Бадьян",
    emoji: "⭐",
    properties: "Отхаркивающее, ветрогонное, антисептическое",
    use: "Чай при кашле и простуде, добавка в глинтвейн, пряность для улучшения пищеварения",
    recipe: "2–3 звёздочки бадьяна залить 0.5 л кипятка, настоять 15 минут. Добавить мёд и имбирь. Пить тёплым при простуде.",
    season: "Сбор: Октябрь — Ноябрь",
    color: "from-amber-900/30 to-orange-900/20",
  },
  {
    name: "Гвоздика",
    emoji: "🌺",
    properties: "Антисептическое, обезболивающее, противовоспалительное",
    use: "Зубная боль, добавка в чаи и настойки, дезинфекция воздуха, пряность",
    recipe: "5–6 бутонов залить стаканом кипятка, настоять 10 минут. Полоскать рот при зубной боли или пить при простуде с корицей.",
    season: "Круглый год (сушёная пряность)",
    color: "from-red-900/30 to-rose-900/20",
  },
  {
    name: "Кора ивы",
    emoji: "🌲",
    properties: "Жаропонижающее, обезболивающее, противовоспалительное",
    use: "Натуральный аспирин: при температуре, головной боли, ревматизме",
    recipe: "1 ст. ложку измельчённой коры залить стаканом холодной воды, довести до кипения, варить 10 минут. Процедить, пить по 1/4 стакана 4 раза в день.",
    season: "Март — Апрель (сбор с молодых веток)",
    color: "from-stone-900/30 to-amber-900/20",
  },
  {
    name: "Хмель",
    emoji: "🍺",
    properties: "Успокаивающее, снотворное, горечегонное",
    use: "Подушки для сна, чай при бессоннице и тревоге, улучшение пищеварения",
    recipe: "1 ст. ложку шишек хмеля залить стаканом кипятка, настоять 20 минут. Пить по 1/2 стакана за час до сна. Не злоупотреблять.",
    season: "Август — Сентябрь",
    color: "from-lime-900/30 to-yellow-900/20",
  },
  {
    name: "Девясил",
    emoji: "🌻",
    properties: "Отхаркивающее, противомикробное, желчегонное",
    use: "Кашель и бронхит, заболевания ЖКТ, укрепление иммунитета зимой",
    recipe: "1 ст. ложку измельчённого корня залить стаканом кипятка, варить 15 минут. Настоять 1 час. Пить по 1/3 стакана 3 раза в день до еды.",
    season: "Сентябрь — Октябрь (корни)",
    color: "from-yellow-900/30 to-amber-900/20",
  },
  {
    name: "Душица (Орегано)",
    emoji: "💜",
    properties: "Успокаивающее, отхаркивающее, антисептическое",
    use: "Чай при кашле и неврозах, банные веники, ванны для нервной системы",
    recipe: "2 ст. ложки травы залить 0.5 л кипятка, настоять 30 минут. Пить по 1/2 стакана 2–3 раза в день. Детям — слабее.",
    season: "Июль — Август",
    color: "from-purple-900/30 to-indigo-900/20",
  },
  {
    name: "Клюква",
    emoji: "🍒",
    properties: "Антибактериальное, жаропонижающее, витаминное",
    use: "Морс при простуде и цистите, варенье для иммунитета, свежие ягоды при жаре",
    recipe: "200 г ягод размять, залить 1 л тёплой воды, добавить 2 ст. ложки мёда. Не кипятить. Пить при температуре и болезнях мочевыводящих путей.",
    season: "Сентябрь — Октябрь",
    color: "from-red-900/30 to-pink-900/20",
  },
  {
    name: "Кукурузные рыльца",
    emoji: "🌽",
    properties: "Мочегонное, желчегонное, кровоостанавливающее",
    use: "Чай при отёках и болезнях почек, желчегонный сбор, при повышенном сахаре",
    recipe: "1 ст. ложку рылец залить стаканом кипятка, настоять 20 минут. Пить по 1/3 стакана 3 раза в день до еды. Курс — 2–4 недели.",
    season: "Август — Сентябрь",
    color: "from-yellow-900/30 to-orange-900/20",
  },
  {
    name: "Малина",
    emoji: "🍓",
    properties: "Жаропонижающее, потогонное, противовирусное",
    use: "Варенье и чай при простуде, листья для полосканий горла, компот при жаре",
    recipe: "2 ст. ложки сушёных ягод или листьев залить стаканом кипятка, настоять 15 минут. Пить горячим при температуре, укрыться одеялом.",
    season: "Июль — Август",
    color: "from-pink-900/30 to-rose-900/20",
  },
  {
    name: "Лук репчатый",
    emoji: "🧅",
    properties: "Антибактериальное, противовирусное, иммуностимулирующее",
    use: "Компрессы при кашле, закапывание в нос при насморке, профилактика в сезон гриппа",
    recipe: "Сок лука смешать с мёдом 1:1. Принимать по 1 ч. ложке 3 раза в день при простуде. Разрезанную луковицу ставить у кровати больного.",
    season: "Круглый год",
    color: "from-amber-900/20 to-yellow-900/20",
  },
  {
    name: "Можжевельник",
    emoji: "🌲",
    properties: "Дезинфицирующее, мочегонное, противовоспалительное",
    use: "Окуривание дома, банные веники, чай при болезнях почек, ягоды как пряность",
    recipe: "10 ягод можжевельника залить стаканом кипятка, настоять 30 минут. Пить по 1 ст. ложке 3 раза в день. Курс — не более 2 недель.",
    season: "Сентябрь — Октябрь",
    color: "from-teal-900/30 to-cyan-900/20",
  },
  {
    name: "Грецкий орех",
    emoji: "🫘",
    properties: "Укрепляющее, противопаразитарное, витаминное",
    use: "Настойка из перегородок при зобе, листья для ванн при кожных болезнях, ядра — для мозга и сосудов",
    recipe: "Перегородки от 20 орехов залить стаканом водки, настоять 2 недели в темноте. Принимать по 20 капель на воде 2 раза в день.",
    season: "Сентябрь — Октябрь",
    color: "from-amber-900/30 to-yellow-900/20",
  },
  {
    name: "Папоротник мужской",
    emoji: "🌿",
    properties: "Противопаразитарное, спазмолитическое (применять осторожно!)",
    use: "Ванны при ревматизме и болях в суставах, традиционное применение при паразитах",
    recipe: "⚠️ Ядовит в больших дозах — только наружно! Ванна: 100 г корневищ варить 1 час в 3 л воды. Добавить в ванну при болях в суставах.",
    season: "Август — Сентябрь (корневища)",
    color: "from-green-900/40 to-emerald-900/30",
  },
  {
    name: "Петрушка",
    emoji: "🌱",
    properties: "Мочегонное, спазмолитическое, витаминное",
    use: "Чай при отёках и болезнях почек, жевание листьев против запаха, маска для лица",
    recipe: "2 ст. ложки измельчённой зелени или корня залить стаканом кипятка, настоять 30 минут. Пить по 1/3 стакана 3 раза в день.",
    season: "Май — Октябрь",
    color: "from-green-900/30 to-lime-900/20",
  },
  {
    name: "Укроп",
    emoji: "🌿",
    properties: "Ветрогонное, спазмолитическое, успокаивающее",
    use: "Вода от колик у детей, чай при вздутии, семена для пищеварения",
    recipe: "1 ч. ложку семян укропа залить стаканом кипятка, настоять 20 минут. Пить по 1/2 стакана после еды. Для грудных детей — 1 ч. ложка настоя.",
    season: "Июнь — Сентябрь",
    color: "from-lime-900/30 to-green-900/20",
  },
  {
    name: "Подорожник",
    emoji: "🍃",
    properties: "Противовоспалительное, ранозаживляющее, отхаркивающее",
    use: "Компрессы на раны и ушибы, сироп от кашля, чай при болях в желудке",
    recipe: "Свежий лист приложить к ране — первая помощь в лесу. Сушёный: 2 ст. ложки на стакан кипятка, настоять 20 минут. Пить при кашле 3 раза в день.",
    season: "Май — Сентябрь",
    color: "from-green-900/30 to-teal-900/20",
  },
  {
    name: "Свёкла",
    emoji: "🟣",
    properties: "Кроветворное, слабительное, снижающее давление",
    use: "Сок при гипертонии, квашеная свёкла для кишечника, компрессы при головной боли",
    recipe: "Свежевыжатый сок развести водой 1:1, дать постоять 1 час. Пить по 1/2 стакана 2 раза в день натощак. Начинать с малых доз.",
    season: "Август — Октябрь",
    color: "from-purple-900/30 to-red-900/20",
  },
  {
    name: "Хрен",
    emoji: "🌿",
    properties: "Антибактериальное, согревающее, мочегонное",
    use: "Компрессы при радикулите и простуде, сок при гайморите, приправа для иммунитета",
    recipe: "Тёртый хрен смешать с мёдом 1:1. Принимать по 1 ч. ложке утром натощак. Компресс: тёртый хрен на ткань, прикладывать к спине на 10–15 минут.",
    season: "Сентябрь — Октябрь",
    color: "from-zinc-900/30 to-stone-900/20",
  },
  {
    name: "Черемша (дикий чеснок)",
    emoji: "🧄",
    properties: "Антибактериальное, противопаразитарное, витаминное",
    use: "Весенний авитаминоз, профилактика атеросклероза, салаты и засолка",
    recipe: "Свежие листья добавлять в салаты весной. Настойка: 50 г измельчённой черемши на 0.5 л водки, настоять 2 недели. По 20 капель 2 раза в день.",
    season: "Апрель — Май",
    color: "from-green-900/30 to-emerald-900/20",
  },
  {
    name: "Чеснок",
    emoji: "🧄",
    properties: "Антибактериальное, противовирусное, снижающее давление",
    use: "Профилактика гриппа, лечение гипертонии, противопаразитарный эффект, при грибке",
    recipe: "2–3 зубчика в день — народная норма для иммунитета. Настойка: 10 зубчиков на стакан водки, 10 дней. По 20 капель на молоко 3 раза в день.",
    season: "Круглый год",
    color: "from-slate-900/30 to-zinc-900/20",
  },
  {
    name: "Чистотел",
    emoji: "🌼",
    properties: "Противовирусное, спазмолитическое (применять осторожно!)",
    use: "Выведение бородавок и папиллом, лечение грибка, экземы — только наружно",
    recipe: "⚠️ Сок ядовит! Только наружно: свежий сок точечно наносить на бородавку 1–2 раза в день. Внутрь — только под наблюдением специалиста.",
    season: "Май — Август",
    color: "from-yellow-900/30 to-green-900/20",
  },
  {
    name: "Маклюра (адамово яблоко)",
    emoji: "🟢",
    properties: "Противоопухолевое, противовоспалительное, иммуномодулирующее",
    use: "Настойка при артрите, радикулите, новообразованиях; растирания при болях в суставах и позвоночнике",
    recipe: "⚠️ Плоды ядовиты в сыром виде! Настойка: нарезать 1 плод, залить 0.5 л водки, настоять 1 месяц в темноте. Растирать больные суставы 2 раза в день. Внутрь — только под наблюдением специалиста.",
    season: "Сентябрь — Октябрь (сбор плодов)",
    color: "from-green-900/40 to-lime-900/30",
  },
];

const BATH_RITUALS = [
  {
    title: "Берёзовый веник",
    emoji: "🌿",
    desc: "Основа банной традиции. Берёза отдаёт дубильные вещества, эфирные масла, укрепляет кожу и открывает поры.",
    tip: "Замачивать в тёплой воде 30 минут, затем окунуть в кипяток на 1-2 минуты. Похлёстывать лёгкими движениями.",
  },
  {
    title: "Дубовый веник",
    emoji: "🍂",
    desc: "Для крепких духом и телом. Дуб успокаивает кожу, снижает давление, подходит тем, кто долго парится.",
    tip: "Замачивать 2-3 часа. Жёсткие листья требуют мягкого движения. Особенно хорош при жирной коже.",
  },
  {
    title: "Травяные отвары для камней",
    emoji: "💧",
    desc: "На раскалённые камни лить не воду, а отвар трав — ромашки, чабреца, эвкалипта. Пар наполняется целебными эфирами.",
    tip: "250 мл крепкого отвара на 3-4 подхода. Не переусердствовать — 2-3 пара достаточно для новичка.",
  },
  {
    title: "Мёд и соль — скраб",
    emoji: "🍯",
    desc: "После первого пара — натереть тело смесью морской соли и мёда. Убирает отмершие клетки, питает и разогревает.",
    tip: "Смешать 3 ст. ложки соли с 2 ст. ложками мёда. Круговыми движениями, избегая лица. Смыть тёплой водой.",
  },
];

const TRADITIONS = [
  {
    title: "Иван Купала",
    period: "7 июля",
    emoji: "🔥",
    desc: "Главный летний праздник. Собирали целебные травы — считалось, что в эту ночь растения обретают особую силу. Прыгали через огонь для очищения, купались для здоровья.",
  },
  {
    title: "Банный день",
    period: "Каждую субботу",
    emoji: "♨️",
    desc: "Суббота — банный день на Руси. Перед баней молились, после — пили травяной чай. Баня считалась местом исцеления тела и духа, почти священным пространством.",
  },
  {
    title: "Сбор трав на Троицу",
    period: "50 дней после Пасхи",
    emoji: "🌿",
    desc: "На Троицу дома украшали ветками берёзы и травами. Собранные в этот день растения — особенно целебны. Старики знали: каждое место, каждый час имеет значение.",
  },
  {
    title: "Масленичные угощения",
    period: "Февраль — Март",
    emoji: "🌾",
    desc: "Перед Великим постом угощали блинами с мёдом, пили травяные чаи. Мёд — дар пчёл, живых существ, связанных с предками.",
  },
];

const sections = ["Главная", "Традиции", "Травы", "Банные", "Контакты"];

export default function Index() {
  const [activeSection, setActiveSection] = useState("Главная");
  const [selectedHerb, setSelectedHerb] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [quoteVisible, setQuoteVisible] = useState(true);

  const goToQuote = useCallback((idx: number) => {
    setQuoteVisible(false);
    setTimeout(() => {
      setQuoteIndex((idx + QUOTES.length) % QUOTES.length);
      setQuoteVisible(true);
    }, 350);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => goToQuote(quoteIndex + 1), 6000);
    return () => clearInterval(timer);
  }, [quoteIndex, goToQuote]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setActiveSection(id === "home" ? "Главная" : id === "traditions" ? "Традиции" : id === "herbs" ? "Травы" : id === "bath" ? "Банные" : "Контакты");
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-earth-900/95 backdrop-blur-sm border-b border-earth-700/50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => scrollTo("home")}
            className="font-cormorant text-xl font-semibold text-earth-200 tracking-wider hover:text-earth-100 transition-colors"
          >
            ✦ Дары Природы
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {[
              { label: "Главная", id: "home" },
              { label: "Традиции", id: "traditions" },
              { label: "Травы", id: "herbs" },
              { label: "Банные", id: "bath" },
              { label: "Контакты", id: "contacts" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`nav-link font-golos text-sm tracking-widest uppercase transition-colors ${
                  activeSection === item.label
                    ? "text-earth-300 active"
                    : "text-earth-400 hover:text-earth-200"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile burger */}
          <button
            className="md:hidden text-earth-300 p-1"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-earth-900 border-t border-earth-700/50 px-4 py-4 flex flex-col gap-4">
            {[
              { label: "Главная", id: "home" },
              { label: "Традиции", id: "traditions" },
              { label: "Травы", id: "herbs" },
              { label: "Банные", id: "bath" },
              { label: "Контакты", id: "contacts" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-earth-300 font-golos text-sm tracking-widest uppercase text-left hover:text-earth-100 transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(https://cdn.poehali.dev/projects/a5c0cb41-3768-4fb7-b314-c1da93baff72/files/b4de6191-fc40-4697-a04b-e5e916a681ad.jpg)`,
          }}
        />
        <div className="hero-overlay absolute inset-0" />

        {/* Decorative corners */}
        <div className="absolute top-20 left-6 text-earth-400/40 font-cormorant text-6xl select-none">❧</div>
        <div className="absolute top-20 right-6 text-earth-400/40 font-cormorant text-6xl select-none" style={{transform:'scaleX(-1)'}}>❧</div>
        <div className="absolute bottom-16 left-6 text-earth-400/40 font-cormorant text-6xl select-none" style={{transform:'scaleY(-1)'}}>❧</div>
        <div className="absolute bottom-16 right-6 text-earth-400/40 font-cormorant text-6xl select-none" style={{transform:'scale(-1)'}}>❧</div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto animate-fade-in">
          <div className="text-earth-400 font-cormorant text-lg tracking-[0.4em] uppercase mb-4 opacity-80">
            ✦ &nbsp; Народная мудрость &nbsp; ✦
          </div>
          <h1 className="font-cormorant text-5xl md:text-7xl lg:text-8xl font-semibold text-earth-50 leading-tight text-shadow-warm mb-6">
            Дары<br />
            <span className="italic text-earth-300">Природы</span>
          </h1>
          <div className="section-divider w-48 mx-auto my-6" />
          <p className="font-golos text-earth-200 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10">
            Восстановление духовности и здоровья без вреда и синтетики.<br />
            Только дары природы и память наших стариков.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollTo("herbs")}
              className="bg-earth-600 hover:bg-earth-500 text-earth-50 font-golos px-8 py-3 tracking-wider uppercase text-sm border border-earth-500 transition-all hover:shadow-lg hover:shadow-earth-900/50"
            >
              Каталог трав
            </button>
            <button
              onClick={() => scrollTo("traditions")}
              className="bg-transparent hover:bg-earth-800/50 text-earth-300 font-golos px-8 py-3 tracking-wider uppercase text-sm border border-earth-600 transition-all"
            >
              Наши традиции
            </button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-earth-400/60 animate-bounce">
          <Icon name="ChevronDown" size={28} />
        </div>
      </section>

      {/* ABOUT ROW */}
      <section className="py-16 bg-earth-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { emoji: "🌿", title: "Только природное", desc: "Никакой химии и синтетики — только то, что дала нам земля и лес" },
              { emoji: "📜", title: "Древние рецепты", desc: "Знания, переданные от бабушек к внукам через поколения" },
              { emoji: "♨️", title: "Банные традиции", desc: "Исконные ритуалы бани как пространства исцеления тела и духа" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-3"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <div className="text-4xl mb-1">{item.emoji}</div>
                <h3 className="font-cormorant text-xl text-earth-200 font-semibold">{item.title}</h3>
                <p className="font-golos text-earth-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRADITIONS */}
      <section id="traditions" className="py-20 bg-background relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="text-earth-600 font-cormorant text-sm tracking-[0.4em] uppercase mb-3">✦ Уклад жизни</div>
            <h2 className="font-cormorant text-4xl md:text-5xl font-semibold text-foreground">Народные Традиции</h2>
            <div className="section-divider w-32 mx-auto mt-5" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TRADITIONS.map((t, i) => (
              <div
                key={i}
                className="bg-card border border-border p-6 card-hover relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 text-6xl opacity-10 font-cormorant select-none pr-3 pt-1">
                  {t.emoji}
                </div>
                <div className="flex items-start gap-4">
                  <div className="text-3xl flex-shrink-0">{t.emoji}</div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-cormorant text-xl font-semibold text-foreground">{t.title}</h3>
                      <span className="text-xs font-golos text-earth-600 bg-earth-100 px-2 py-0.5 border border-earth-200">
                        {t.period}
                      </span>
                    </div>
                    <p className="font-golos text-muted-foreground text-sm leading-relaxed">{t.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 quote-block">

            <div className="parchment-scroll">
              <div className="parchment-inner">

                {/* Стрелки — поверх пергамента */}
                <button
                  onClick={() => goToQuote(quoteIndex - 1)}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 flex items-center justify-center text-earth-600/50 hover:text-earth-800 transition-colors"
                  aria-label="Предыдущая цитата"
                >
                  <Icon name="ChevronLeft" size={24} />
                </button>
                <button
                  onClick={() => goToQuote(quoteIndex + 1)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 flex items-center justify-center text-earth-600/50 hover:text-earth-800 transition-colors"
                  aria-label="Следующая цитата"
                >
                  <Icon name="ChevronRight" size={24} />
                </button>

                <div className="text-center min-h-[280px] flex flex-col items-center justify-center py-8">
                  <div className="quote-ornament-line mb-8 mx-auto" />

                  <div className="quote-mark-top font-cormorant select-none">❝</div>

                  <blockquote
                    className="mt-1 mb-4 transition-all"
                    style={{
                      opacity: quoteVisible ? 1 : 0,
                      transform: quoteVisible ? 'translateY(0)' : 'translateY(10px)',
                      transition: 'opacity 0.35s ease, transform 0.35s ease',
                    }}
                  >
                    <p className="font-cormorant text-2xl md:text-3xl lg:text-4xl font-medium italic leading-snug tracking-wide max-w-2xl mx-auto"
                       style={{ color: '#3d2106' }}>
                      {QUOTES[quoteIndex].text}
                    </p>
                  </blockquote>

                  <div className="quote-mark-bottom font-cormorant select-none">❞</div>

                  <div className="quote-ornament-line mt-8 mx-auto" />

                  <cite
                    className="font-golos text-xs tracking-[0.35em] uppercase mt-6 block not-italic transition-all"
                    style={{
                      color: '#7a5020',
                      opacity: quoteVisible ? 1 : 0,
                      transition: 'opacity 0.35s ease 0.1s',
                    }}
                  >
                    — {QUOTES[quoteIndex].source}
                  </cite>

                  {/* Точки */}
                  <div className="flex gap-2 mt-7">
                    {QUOTES.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => goToQuote(i)}
                        aria-label={`Цитата ${i + 1}`}
                      >
                        <span
                          className="block rounded-full transition-all duration-300"
                          style={{
                            width: i === quoteIndex ? '22px' : '6px',
                            height: '6px',
                            background: i === quoteIndex ? '#7a4f1e' : 'rgba(139,94,42,0.35)',
                          }}
                        />
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* HERBS CATALOG */}
      <section id="herbs" className="py-20 pattern-bg relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="text-earth-400 font-cormorant text-sm tracking-[0.4em] uppercase mb-3">✦ Аптека природы</div>
            <h2 className="font-cormorant text-4xl md:text-5xl font-semibold text-earth-100">Каталог Трав</h2>
            <div className="section-divider w-32 mx-auto mt-5" />
            <p className="font-golos text-earth-400 mt-4 text-sm">Нажмите на траву, чтобы узнать рецепт</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {HERBS.map((herb, i) => (
              <div
                key={i}
                onClick={() => setSelectedHerb(selectedHerb === i ? null : i)}
                className={`cursor-pointer border transition-all duration-300 overflow-hidden ${
                  selectedHerb === i
                    ? "border-earth-400 bg-earth-800/80"
                    : "border-earth-700/50 bg-earth-900/60 hover:border-earth-500 hover:bg-earth-800/50"
                }`}
              >
                <div className={`bg-gradient-to-br ${herb.color} p-5`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-4xl">{herb.emoji}</div>
                    <span className="font-golos text-xs text-earth-400 bg-earth-900/50 px-2 py-1">
                      {herb.season}
                    </span>
                  </div>
                  <h3 className="font-cormorant text-xl font-semibold text-earth-100 mb-2">{herb.name}</h3>
                  <p className="font-golos text-xs text-earth-400 leading-relaxed">{herb.properties}</p>
                </div>

                <div className="p-5">
                  <p className="font-golos text-sm text-earth-300 leading-relaxed mb-3">{herb.use}</p>

                  {selectedHerb === i && (
                    <div className="mt-3 pt-3 border-t border-earth-700 animate-fade-in">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon name="BookOpen" size={14} className="text-earth-400" />
                        <span className="font-cormorant text-sm text-earth-400 italic">Рецепт приготовления</span>
                      </div>
                      <p className="font-golos text-sm text-earth-200 leading-relaxed">{herb.recipe}</p>
                    </div>
                  )}

                  <div className="flex items-center gap-1 mt-3 text-earth-500">
                    <Icon name={selectedHerb === i ? "ChevronUp" : "ChevronDown"} size={14} />
                    <span className="font-golos text-xs">
                      {selectedHerb === i ? "Скрыть рецепт" : "Показать рецепт"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <img
              src="https://cdn.poehali.dev/projects/a5c0cb41-3768-4fb7-b314-c1da93baff72/files/0818afea-268e-46c4-aab5-a77c14786b8e.jpg"
              alt="Травы и коренья"
              className="w-full max-w-2xl mx-auto object-cover"
              style={{ height: "240px", objectFit: "cover" }}
            />
          </div>
        </div>
      </section>

      {/* BATH */}
      <section id="bath" className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="text-earth-600 font-cormorant text-sm tracking-[0.4em] uppercase mb-3">✦ Исцеление паром</div>
            <h2 className="font-cormorant text-4xl md:text-5xl font-semibold text-foreground">Банные Традиции</h2>
            <div className="section-divider w-32 mx-auto mt-5" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {BATH_RITUALS.map((ritual, i) => (
              <div key={i} className="bg-card border border-border p-6 card-hover">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{ritual.emoji}</span>
                  <h3 className="font-cormorant text-xl font-semibold text-foreground">{ritual.title}</h3>
                </div>
                <p className="font-golos text-muted-foreground text-sm leading-relaxed mb-4">{ritual.desc}</p>
                <div className="bg-muted border-l-2 border-earth-500 pl-4 py-2">
                  <div className="flex items-center gap-1 mb-1">
                    <Icon name="Lightbulb" size={12} className="text-earth-600" />
                    <span className="font-cormorant text-xs italic text-earth-600">Совет старины</span>
                  </div>
                  <p className="font-golos text-sm text-muted-foreground">{ritual.tip}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Bath steps */}
          <div className="bg-earth-900 text-earth-100 p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-4 right-4 text-earth-700 font-cormorant text-8xl select-none">♨</div>
            <h3 className="font-cormorant text-2xl md:text-3xl font-semibold text-earth-200 mb-6">
              Традиционный порядок банного ритуала
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { num: "I", title: "Подготовка", desc: "Разогрев тела в предбаннике. Травяной чай. Настрой на тишину и покой." },
                { num: "II", title: "Первый пар", desc: "Краткий заход 8-10 минут. Тело привыкает к жару. Лёгкие похлёстывания веником." },
                { num: "III", title: "Охлаждение", desc: "Выход — отдых 10-15 минут. Питьё воды или морса. Не спешить возвращаться." },
                { num: "IV", title: "Второй пар", desc: "Более долгий заход. Скраб из соли и мёда. Глубокое распаривание веником." },
                { num: "V", title: "Смывание", desc: "Тёплой водой смыть всё лишнее. Тело чистое и открытое, как после дождя." },
                { num: "VI", title: "Отдых", desc: "Травяной чай с мёдом и чабрецом. Тишина. Тело благодарит, душа отдыхает." },
              ].map((step, i) => (
                <div key={i} className="flex gap-4">
                  <div className="font-cormorant text-earth-600 text-2xl font-semibold flex-shrink-0 w-8">{step.num}</div>
                  <div>
                    <h4 className="font-cormorant text-earth-300 font-semibold mb-1">{step.title}</h4>
                    <p className="font-golos text-earth-500 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-20 bg-earth-900 relative">
        <div className="absolute inset-0 slavic-pattern opacity-30" />
        <div className="relative max-w-2xl mx-auto px-6 text-center">
          <div className="text-earth-500 font-cormorant text-sm tracking-[0.4em] uppercase mb-3">✦ Связаться с нами</div>
          <h2 className="font-cormorant text-4xl md:text-5xl font-semibold text-earth-100 mb-4">Контакты</h2>
          <div className="section-divider w-32 mx-auto mb-8" />
          <p className="font-golos text-earth-400 leading-relaxed mb-10">
            Есть вопросы о травах, рецептах или банных традициях? Хотите поделиться своим семейным знанием? Пишите — мы рады каждому.
          </p>

          <div className="bg-earth-800/60 border border-earth-700/50 p-8 text-left mb-8">
            <div className="space-y-4 mb-6">
              <div>
                <label className="font-golos text-xs text-earth-500 uppercase tracking-widest block mb-1">Ваше имя</label>
                <input
                  type="text"
                  placeholder="Как вас зовут?"
                  className="w-full bg-earth-900/50 border border-earth-700 text-earth-200 font-golos px-4 py-3 text-sm placeholder:text-earth-600 focus:outline-none focus:border-earth-500 transition-colors"
                />
              </div>
              <div>
                <label className="font-golos text-xs text-earth-500 uppercase tracking-widest block mb-1">Email или телефон</label>
                <input
                  type="text"
                  placeholder="Как с вами связаться?"
                  className="w-full bg-earth-900/50 border border-earth-700 text-earth-200 font-golos px-4 py-3 text-sm placeholder:text-earth-600 focus:outline-none focus:border-earth-500 transition-colors"
                />
              </div>
              <div>
                <label className="font-golos text-xs text-earth-500 uppercase tracking-widest block mb-1">Сообщение</label>
                <textarea
                  rows={4}
                  placeholder="Ваш вопрос или рассказ..."
                  className="w-full bg-earth-900/50 border border-earth-700 text-earth-200 font-golos px-4 py-3 text-sm placeholder:text-earth-600 focus:outline-none focus:border-earth-500 transition-colors resize-none"
                />
              </div>
            </div>
            <button className="w-full bg-earth-600 hover:bg-earth-500 text-earth-50 font-golos py-3 px-6 uppercase tracking-widest text-sm border border-earth-500 transition-all">
              Отправить
            </button>
          </div>

          <div className="flex items-center justify-center gap-8 text-earth-500">
            <div className="flex items-center gap-2">
              <Icon name="Mail" size={16} className="text-earth-600" />
              <span className="font-golos text-sm">info@dary-prirody.ru</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Phone" size={16} className="text-earth-600" />
              <span className="font-golos text-sm">+7 (900) 000-00-00</span>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-earth-900 border-t border-earth-800 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-cormorant text-earth-500 text-lg">✦ Дары Природы</div>
          <p className="font-golos text-earth-600 text-xs text-center">
            Всё собрано и приготовлено своими руками по древнейшим традициям
          </p>
          <div className="text-earth-700 font-golos text-xs">© 2024</div>
        </div>
      </footer>
    </div>
  );
}