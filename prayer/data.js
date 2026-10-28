// ==========================================================================
// تطبيق «سَنَد» - قاعدة بيانات الأذكار والمكتبة الصوتية الحقيقية للأذان والتكبيرات
// ==========================================================================

// 1. مكتبة الأصوات الحقيقية (تسجيلات MP3 حقيقية بأصوات أشهر المؤذنين للحرم المكي وكبار القراء)
const AUDIO_LIBRARY = {
  adhans: [
    {
      id: "adhan_ali_mullah",
      name: "أذان الحرم المكي الشريف (الشيخ علي ملا)",
      mood: "أشهر أذان في العالم الإسلامي",
      url: "https://archive.org/download/MuadhinsMakkah/ADHAAN%2FSheikh%20Ali%20Mullah%2FAli%20Ahmed%20Mullah.mp3"
    },
    {
      id: "adhan_alafasy",
      name: "أذان بصوت الشيخ مشاري راشد العفاسي",
      mood: "صوت شجي خاشع ومؤثر",
      url: "https://cdn.aladhan.com/audio/adhans/a9.mp3"
    },
    {
      id: "adhan_makkah_fajr",
      name: "أذان الفجر من الحرم المكي (الصلاة خير من النوم)",
      mood: "سكينة وروحانية الفجر",
      url: "https://cdn.aladhan.com/audio/adhans/a1.mp3"
    },
    {
      id: "adhan_khoja",
      name: "أذان الحرم المكي (الشيخ أحمد خوجة)",
      mood: "نبرة حجازية كلاسيكية مهيبة",
      url: "https://archive.org/download/MuadhinsMakkah/ADHAAN%2FSheikh%20Ahmed%20Khoja%2FAhmed%20Yunus%20Khoja.mp3"
    },
    {
      id: "adhan_nuhas",
      name: "أذان الحرم المكي (الشيخ أحمد نحاس)",
      mood: "صوت رخيم وخشوع عالي",
      url: "https://archive.org/download/MuadhinsMakkah/ADHAAN%2FSheikh%20Ahmed%20Nuhas%2FAhmad%20Ali%20Nuhas.mp3"
    },
    {
      id: "adhan_baqree",
      name: "أذان الحرم المكي (الشيخ عماد بقري)",
      mood: "أداء حجازي مكي أصيل",
      url: "https://archive.org/download/MuadhinsMakkah/ADHAAN%2FSheikh%20Emad%20Baqree%2FEmad%20Ismaeel%20Baqree.mp3"
    },
    {
      id: "adhan_faydah",
      name: "أذان الحرم المكي (الشيخ نايف فيدة)",
      mood: "جهوري ومميز",
      url: "https://archive.org/download/MuadhinsMakkah/ADHAAN%2FSheikh%20Naif%20Faydah%2FNaif%20Saleh%20Faydah.mp3"
    },
    {
      id: "adhan_saqaf",
      name: "أذان الحرم المكي (الشيخ هاشم سقاف)",
      mood: "طبقات صوتية شجية ونقية",
      url: "https://archive.org/download/MuadhinsMakkah/ADHAAN%2FSheikh%20Hashim%20Saqaf%2FHashim%20Muhammad%20Saqaaf.mp3"
    },
    {
      id: "adhan_turkey",
      name: "أذان مساجد إسطنبول (الشيخ مصطفى أوزجان)",
      mood: "الطراز العثماني التاريخي",
      url: "https://cdn.aladhan.com/audio/adhans/a2.mp3"
    },
    {
      id: "adhan_nafees",
      name: "أذان بصوت الشيخ أحمد النفيس",
      mood: "صوت عذب ندي وخاشع",
      url: "https://cdn.aladhan.com/audio/adhans/a3.mp3"
    }
  ],
  takbeers: [
    {
      id: "takbeer_ali_mullah",
      name: "تكبيرات العيد من الحرم المكي (الشيخ علي ملا)",
      style: "تكبيرات الحرم المكي الشهيرة والمهيبة",
      url: "https://archive.org/download/MuadhinsMakkah/Eid%20Takbeerat%2FSheikh%20Ali%20Mullah%2FAli%20Ahmed%20Mullah.mp3"
    },
    {
      id: "takbeer_alafasy",
      name: "تكبيرات العيد بصوت الشيخ مشاري العفاسي",
      style: "الله أكبر الله أكبر ولله الحمد",
      url: "https://archive.org/download/TakbeeratForEid/EidTakbeer-MisharyAlAfasy-Youtube.mp3"
    },
    {
      id: "takbeer_basnawi",
      name: "تكبيرات العيد (الشيخ أحمد بصنوي - الحرم)",
      style: "أداء مكي خاشع",
      url: "https://archive.org/download/MuadhinsMakkah/Eid%20Takbeerat%2FSheikh%20Ahmed%20Basnawi%2FAhmed%20Abdullah%20Basnawi.mp3"
    },
    {
      id: "takbeer_khoja",
      name: "تكبيرات العيد (الشيخ أحمد خوجة - الحرم)",
      style: "نغمات عيد مبهجة من رحاب مكة",
      url: "https://archive.org/download/MuadhinsMakkah/Eid%20Takbeerat%2FSheikh%20Ahmed%20Khoja%2FAhmed%20Yunus%20Khoja.mp3"
    },
    {
      id: "takbeer_nuhas",
      name: "تكبيرات العيد (الشيخ أحمد نحاس - الحرم)",
      style: "تكبيرات جماعية من الحرم المكي",
      url: "https://archive.org/download/MuadhinsMakkah/Eid%20Takbeerat%2FSheikh%20Ahmed%20Nuhas%2FAhmed%20Ali%20Nuhas.mp3"
    },
    {
      id: "takbeer_baqree",
      name: "تكبيرات العيد (الشيخ عماد بقري - الحرم)",
      style: "أصوات مؤذني الكعبة المشرفة",
      url: "https://archive.org/download/MuadhinsMakkah/Eid%20Takbeerat%2FSheikh%20Emad%20Baqree%2FEmad%20Ismaaeel%20Ali%20Baqree.mp3"
    },
    {
      id: "takbeer_daghreeree",
      name: "تكبيرات العيد (الشيخ حمد دغريري - الحرم)",
      style: "خشوع وسكينة بهيجة",
      url: "https://archive.org/download/MuadhinsMakkah/Eid%20Takbeerat%2FSheikh%20Hamd%20Daghreeree%2FHamd%20Ahmed%20Daghreeree.mp3"
    },
    {
      id: "takbeer_maghribi",
      name: "تكبيرات العيد (الشيخ محمد مغربي - الحرم)",
      style: "تكبير جماعي من صحن المطاف",
      url: "https://archive.org/download/MuadhinsMakkah/Eid%20Takbeerat%2FSheikh%20Muhammad%20Maghribi%2FMuhammad%20Ahmed%20Maghribi.mp3"
    },
    {
      id: "takbeer_fullatah",
      name: "تكبيرات العيد (الشيخ سعيد فلاتة - الحرم)",
      style: "أجواء صبيحة العيد في المسجد الحرام",
      url: "https://archive.org/download/MuadhinsMakkah/Eid%20Takbeerat%2FSheikh%20Saeed%20Fullatah%2FSaeed%20Umar%20Fullatah.mp3"
    },
    {
      id: "takbeer_shahat",
      name: "تكبيرات العيد (الشيخ حسين شحات - الحرم)",
      style: "الله أكبر كبيراً والحمد لله كثيراً",
      url: "https://archive.org/download/MuadhinsMakkah/Eid%20Takbeerat%2FSheikh%20Hussain%20Shahat%2FHussain%20Hassan%20Shahaat.mp3"
    }
  ]
};

// 2. موسوعة الأذكار والأدعية الشاملة
const AZKAR_DATA = {
  morning: [
    {
      id: "m_1",
      text: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ.",
      benefit: "من قالها حين يصبح حُفظ في يومه",
      count: 1
    },
    {
      id: "m_2",
      text: "اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ النُّشُورُ.",
      benefit: "تجديد التوكل على الله في بداية اليوم",
      count: 1
    },
    {
      id: "m_3",
      text: "سَيِّدُ الاِسْتِغْفَارِ: اللَّهُمَّ أَنْتَ رَبِّي لاَ إِلَهَ إِلاَّ أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لاَ يَغْفِرُ الذُّنُوبَ إِلاَّ أَنْتَ.",
      benefit: "من قالها موقناً بها حين يصبح فمات من يومه دخل الجنة",
      count: 1
    },
    {
      id: "m_4",
      text: "بِسْمِ اللَّهِ الَّذِي لاَ يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الأَرْضِ وَلاَ فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ.",
      benefit: "لم يضره شيء من فجأة بلاء",
      count: 3
    },
    {
      id: "m_5",
      text: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، عَدَدَ خَلْقِهِ، وَرِضَا نَفْسِهِ، وَزِنَةَ عَرْشِهِ، وَمِدَادَ كَلِمَاتِهِ.",
      benefit: "تعدل ساعات طويلة من الذكر والتسبيح",
      count: 3
    }
  ],
  evening: [
    {
      id: "e_1",
      text: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ.",
      benefit: "من قالها حين يمسي حُفظ في ليلته",
      count: 1
    },
    {
      id: "e_2",
      text: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ.",
      benefit: "لم تضره حمة ولا لدغة في تلك الليلة",
      count: 3
    },
    {
      id: "e_3",
      text: "اللَّهُمَّ مَا أَمْسَى بِي مِنْ نِعْمَةٍ أَوْ بِأَحَدٍ مِنْ خَلْقِكَ، فَمِنْكَ وَحْدَكَ لاَ شَرِيكَ لَكَ، فَلَكَ الْحَمْدُ وَلَكَ الشُّكْرُ.",
      benefit: "من قالها حين يمسي فقد أدى شكر ليلته",
      count: 1
    }
  ],
  after_prayer: [
    {
      id: "p_1",
      text: "أَسْتَغْفِرُ اللَّهَ (3 مرات)، اللَّهُمَّ أَنْتَ السَّلاَمُ وَمِنْكَ السَّلاَمُ، تَبَارَكْتَ يَا ذَا الْجَلاَلِ وَالإِكْرَامِ.",
      benefit: "سنة نبوية مؤكدة بعد كل صلاة مكتوبة",
      count: 1
    },
    {
      id: "p_2",
      text: "آية الكرسي: ﴿اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ...﴾",
      benefit: "من قرأها دبر كل صلاة مكتوبة لم يمنعه من دخول الجنة إلا أن يموت",
      count: 1
    },
    {
      id: "p_3",
      text: "سُبْحَانَ اللَّهِ (33) | الْحَمْدُ لِلَّهِ (33) | اللَّهُ أَكْبَرُ (33) | لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ (1)",
      benefit: "تُغفر خطاياه ولو كانت مثل زبد البحر",
      count: 33
    }
  ],
  sleep: [
    {
      id: "s_1",
      text: "بِاسْمِكَ رَبِّي وَضَعْتُ جَنْبِي، وَبِكَ أَرْفَعُهُ، فَإِنْ أَمْسَكْتَ نَفْسِي فَارْحَمْهَا، وَإِنْ أَرْسَلْتَهَا فَاحْفَظْهَا بِمَا تَحْفَظُ بِهِ عِبَادَكَ الصَّالِحِينَ.",
      benefit: "حفظ النفس والروح عند النوم",
      count: 1
    },
    {
      id: "s_2",
      text: "اللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ.",
      benefit: "تقال ثلاثاً عند وضع اليد اليمنى تحت الخد الأيمن",
      count: 3
    },
    {
      id: "s_3",
      text: "قراءة المعوذات (الإخلاص، الفلق، الناس) والنفث في الكفين ومسح الجسد بهما ثلاث مرات.",
      benefit: "سنة المصطفى ﷺ للحفظ والتحصين من الكوابيس والشرور",
      count: 3
    }
  ],
  waking: [
    {
      id: "w_1",
      text: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ.",
      benefit: "شكر الله على نعمة استعادة الروح والاستيقاظ في عافية",
      count: 1
    },
    {
      id: "w_2",
      text: "لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، سُبْحَانَ اللَّهِ، وَالْحَمْدُ لِلَّهِ، وَلاَ إِلَهَ إِلاَّ اللَّهُ، وَاللَّهُ أَكْبَرُ، وَلاَ حَوْلَ وَلاَ قُوَّةَ إِلاَّ بِاللَّهِ، رَبِّ اغْفِرْ لِي.",
      benefit: "من تعارّ من الليل فقالها ثم دعا استجيب له وإن صلى قُبلت صلاته",
      count: 1
    }
  ],
  duas: [
    {
      id: "d_1",
      text: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ.",
      benefit: "أجمع دعاء لخيري الدنيا والآخرة",
      count: 3
    },
    {
      id: "d_2",
      text: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَالْعَجْزِ وَالْكَسَلِ، وَالْبُخْلِ وَالْجُبْنِ، وَضَلَعِ الدَّيْنِ وَغَلَبَةِ الرِّجَالِ.",
      benefit: "تفريج الهموم وقضاء الديون والنشاط وانشراح الصدر",
      count: 1
    },
    {
      id: "d_3",
      text: "اللَّهُمَّ اكْفِنِي بِحَلاَلِكَ عَنْ حَرَامِكَ، وَأَغْنِنِي بِفَضْلِكَ عَمَّنْ سِوَاكَ.",
      benefit: "تيسير الرزق الحلال وقضاء الحوائج",
      count: 3
    }
  ]
};
