
const books = [
    {
        id: 1,
        title: "新概念英语 1",
        description: "英语初阶 - 适合零基础学习者",
        lessons: 144
    },
    {
        id: 2,
        title: "新概念英语 2",
        description: "实践与进步 - 适合有基础学习者",
        lessons: 96
    }
];

const lessons = [
    {
        id: "1-1",
        bookId: 1,
        lessonNumber: 1,
        title: "Excuse me!",
        englishText: [
            "Excuse me!",
            "Yes?",
            "Is this your handbag?",
            "Pardon?",
            "Is this your handbag?",
            "Yes, it is.",
            "Thank you very much."
        ],
        chineseText: [
            "对不起",
            "什么事？",
            "这是您的手提包吗？",
            "对不起，请再说一遍。",
            "这是您的手提包吗？",
            "是的，是我的。",
            "非常感谢。"
        ]
    },
    {
        id: "1-2",
        bookId: 1,
        lessonNumber: 2,
        title: "Is this your...",
        englishText: [
            "Is this your pen?",
            "Yes, it is.",
            "Is this your pencil?",
            "Yes, it is.",
            "Is this your book?",
            "Yes, it is.",
            "Is this your watch?",
            "Yes, it is."
        ],
        chineseText: [
            "这是您的钢笔吗？",
            "是的，是我的。",
            "这是您的铅笔吗？",
            "是的，是我的。",
            "这是您的书吗？",
            "是的，是我的。",
            "这是您的手表吗？",
            "是的，是我的。"
        ]
    },
    {
        id: "1-3",
        bookId: 1,
        lessonNumber: 3,
        title: "Sorry, sir.",
        englishText: [
            "My coat and my umbrella, please.",
            "Here is my ticket.",
            "Thank you, sir.",
            "Number five.",
            "Here's your umbrella and your coat.",
            "This is not my umbrella.",
            "Sorry, sir.",
            "Is this your umbrella?",
            "No, it isn't.",
            "Is this it?",
            "Yes, it is.",
            "Thank you very much."
        ],
        chineseText: [
            "请把我的大衣和伞拿给我。",
            "这是我（寄存东西）的牌子。",
            "谢谢，先生。",
            "是5号。",
            "这是您的伞和大衣。",
            "这不是我的伞。",
            "对不起，先生。",
            "这是您的伞吗？",
            "不，不是。",
            "这是吗？",
            "是的，是我的。",
            "非常感谢。"
        ]
    },
    {
        id: "1-4",
        bookId: 1,
        lessonNumber: 4,
        title: "Is this your...?",
        englishText: [
            "Is this your suit?",
            "Yes, it is.",
            "Is this your school?",
            "Yes, it is.",
            "Is this your teacher?",
            "Yes, it is.",
            "Is this your son?",
            "Yes, it is.",
            "Is this your daughter?",
            "Yes, it is."
        ],
        chineseText: [
            "这是您的西服吗？",
            "是的，是我的。",
            "这是您的学校吗？",
            "是的，是我的。",
            "这是您的老师吗？",
            "是的，是我的。",
            "这是您的儿子吗？",
            "是的，是我的。",
            "这是您的女儿吗？",
            "是的，是我的。"
        ]
    },
    {
        id: "1-5",
        bookId: 1,
        lessonNumber: 5,
        title: "Nice to meet you.",
        englishText: [
            "Good morning.",
            "Good morning, Mr. Blake.",
            "This is Miss Sophie Dupont.",
            "Sophie is a new student.",
            "She is French.",
            "Sophie, this is Hans.",
            "He is German.",
            "Nice to meet you.",
            "And this is Naoko.",
            "She's Japanese.",
            "Nice to meet you.",
            "And this is Chang-woo.",
            "He's Korean.",
            "Nice to meet you.",
            "And this is Luming.",
            "He's Chinese.",
            "Nice to meet you.",
            "And this is Xiaohui.",
            "She's Chinese, too.",
            "Nice to meet you."
        ],
        chineseText: [
            "早上好。",
            "早上好，布莱克先生。",
            "这位是索菲娅·杜邦小姐。",
            "索菲娅是个新学生。",
            "她是法国人。",
            "索菲娅，这位是汉斯。",
            "他是德国人。",
            "很高兴见到您。",
            "这位是直子。",
            "她是日本人。",
            "很高兴见到您。",
            "这位是昌宇。",
            "他是韩国人。",
            "很高兴见到您。",
            "这位是鲁明。",
            "他是中国人。",
            "很高兴见到您。",
            "这位是晓惠。",
            "她也是中国人。",
            "很高兴见到您。"
        ]
    },
    {
        id: "1-6",
        bookId: 1,
        lessonNumber: 6,
        title: "What make is it?",
        englishText: [
            "What make is it?",
            "It's a Ford.",
            "What colour is it?",
            "It's blue.",
            "What make is it?",
            "It's a Mercedes.",
            "What colour is it?",
            "It's black."
        ],
        chineseText: [
            "它是什么牌子的？",
            "是福特。",
            "它是什么颜色的？",
            "是蓝色的。",
            "它是什么牌子的？",
            "是梅塞德斯。",
            "它是什么颜色的？",
            "是黑色的。"
        ]
    },
    {
        id: "1-7",
        bookId: 1,
        lessonNumber: 7,
        title: "Are you a teacher?",
        englishText: [
            "I am a new student.",
            "My name's Robert.",
            "Nice to meet you.",
            "My name's Sophie.",
            "Are you French?",
            "Yes, I am.",
            "Are you French, too?",
            "No, I'm not.",
            "What nationality are you?",
            "I'm Italian.",
            "Are you a teacher?",
            "No, I'm not.",
            "What's your job?",
            "I'm a keyboard operator.",
            "What's your job?",
            "I'm an engineer."
        ],
        chineseText: [
            "我是个新学生。",
            "我的名字叫罗伯特。",
            "很高兴见到您。",
            "我的名字叫索菲娅。",
            "您是法国人吗？",
            "是的，我是。",
            "您也是法国人吗？",
            "不，我不是。",
            "您是哪国人？",
            "我是意大利人。",
            "您是老师吗？",
            "不，我不是。",
            "您是做什么工作的？",
            "我是电脑录入员。",
            "您是做什么工作的？",
            "我是工程师。"
        ]
    },
    {
        id: "1-8",
        bookId: 1,
        lessonNumber: 8,
        title: "What's your job?",
        englishText: [
            "What's your job?",
            "I'm a policeman.",
            "What's your job?",
            "I'm a policewoman.",
            "What's your job?",
            "I'm a taxi driver.",
            "What's your job?",
            "I'm an air hostess.",
            "What's your job?",
            "I'm a postman.",
            "What's your job?",
            "I'm a nurse.",
            "What's your job?",
            "I'm a mechanic.",
            "What's your job?",
            "I'm a hairdresser."
        ],
        chineseText: [
            "您是做什么工作的？",
            "我是警察。",
            "您是做什么工作的？",
            "我是女警察。",
            "您是做什么工作的？",
            "我是出租车司机。",
            "您是做什么工作的？",
            "我是空中小姐。",
            "您是做什么工作的？",
            "我是邮递员。",
            "您是做什么工作的？",
            "我是护士。",
            "您是做什么工作的？",
            "我是机械师。",
            "您是做什么工作的？",
            "我是理发师。"
        ]
    },
    {
        id: "1-9",
        bookId: 1,
        lessonNumber: 9,
        title: "How are you today?",
        englishText: [
            "Hello, Helen.",
            "Hi, Steven.",
            "How are you today?",
            "I'm very well, thank you.",
            "And you?",
            "I'm fine, thanks.",
            "How is Tony?",
            "He's fine, thanks.",
            "How's Emma?",
            "She's very well, too, Helen.",
            "Goodbye, Helen.",
            "Nice to see you.",
            "Nice to see you, too, Steven.",
            "Goodbye."
        ],
        chineseText: [
            "您好，海伦。",
            "您好，史蒂文。",
            "您好吗？",
            "很好，谢谢您。",
            "您呢？",
            "我很好，谢谢。",
            "托尼好吗？",
            "他很好，谢谢。",
            "埃玛好吗？",
            "她也很好，海伦。",
            "再见，海伦。",
            "见到您真高兴。",
            "见到您我也很高兴，史蒂文。",
            "再见。"
        ]
    },
    {
        id: "1-10",
        bookId: 1,
        lessonNumber: 10,
        title: "Look at...",
        englishText: [
            "Look at that man.",
            "He's very fat.",
            "Look at that woman.",
            "She's very thin.",
            "Look at that policeman.",
            "He's very tall.",
            "Look at that policewoman.",
            "She's very short.",
            "Look at that mechanic.",
            "He's very busy.",
            "Look at that nurse.",
            "She's very clean."
        ],
        chineseText: [
            "看那个男人。",
            "他很胖。",
            "看那个女人。",
            "她很瘦。",
            "看那个警察。",
            "他很高。",
            "看那个女警察。",
            "她很矮。",
            "看那个机械师。",
            "他很忙。",
            "看那个护士。",
            "她很干净。"
        ]
    },
    {
        id: "1-11",
        bookId: 1,
        lessonNumber: 11,
        title: "Is this your shirt?",
        englishText: [
            "Whose shirt is that?",
            "Is this your shirt, Dave?",
            "No, sir. It's not my shirt.",
            "This is my shirt. My shirt's blue.",
            "Is this shirt Tim's?",
            "Perhaps it is, sir. Tim's shirt's white.",
            "Tim!",
            "Yes, sir?",
            "Is this your shirt?",
            "Yes, sir.",
            "Here you are. Catch!",
            "Thank you, sir."
        ],
        chineseText: [
            "那是谁的衬衫？",
            "这是你的衬衫吗，戴夫？",
            "不，先生。这不是我的衬衫。",
            "这是我的衬衫。我的衬衫是蓝色的。",
            "这是蒂姆的衬衫吗？",
            "也许是，先生。蒂姆的衬衫是白色的。",
            "蒂姆！",
            "是，先生？",
            "这是你的衬衫吗？",
            "是的，先生。",
            "给你。接着！",
            "谢谢，先生。"
        ]
    },
    {
        id: "1-12",
        bookId: 1,
        lessonNumber: 12,
        title: "Whose is this...?",
        englishText: [
            "Whose is this umbrella?",
            "It's Steven's.",
            "Whose is this handbag?",
            "It's Sophie's.",
            "Whose is this pen?",
            "It's my son's.",
            "Whose is this dress?",
            "It's my daughter's.",
            "Whose is this suit?",
            "It's my father's.",
            "Whose is this skirt?",
            "It's my mother's."
        ],
        chineseText: [
            "这把伞是谁的？",
            "是史蒂文的。",
            "这个手提包是谁的？",
            "是索菲娅的。",
            "这支钢笔是谁的？",
            "是我儿子的。",
            "这条连衣裙是谁的？",
            "是我女儿的。",
            "这套西装是谁的？",
            "是我父亲的。",
            "这条短裙是谁的？",
            "是我母亲的。"
        ]
    },
    {
        id: "1-13",
        bookId: 1,
        lessonNumber: 13,
        title: "A new dress",
        englishText: [
            "What colour's your new dress?",
            "It's green.",
            "Come upstairs and see it.",
            "Thank you.",
            "Look! Here it is!",
            "That's a nice dress.",
            "It's very smart.",
            "My hat's new, too.",
            "What colour is it?",
            "It's the same colour.",
            "It's green, too.",
            "That's a lovely hat!"
        ],
        chineseText: [
            "您的新连衣裙是什么颜色的？",
            "是绿色的。",
            "到楼上来看看。",
            "谢谢您。",
            "看！就是这件！",
            "这件连衣裙真漂亮。",
            "真好看。",
            "我的帽子也是新的。",
            "它是什么颜色的？",
            "是一样的颜色。",
            "也是绿色的。",
            "这是顶可爱的帽子！"
        ]
    },
    {
        id: "1-14",
        bookId: 1,
        lessonNumber: 14,
        title: "What colour's your...?",
        englishText: [
            "What colour's your tie?",
            "It's orange.",
            "What colour's your shirt?",
            "It's white.",
            "What colour's your coat?",
            "It's black.",
            "What colour's your box?",
            "It's brown.",
            "What colour's your dog?",
            "It's white and black."
        ],
        chineseText: [
            "您的领带是什么颜色的？",
            "是橙色的。",
            "您的衬衫是什么颜色的？",
            "是白色的。",
            "您的外衣是什么颜色的？",
            "是黑色的。",
            "您的箱子是什么颜色的？",
            "是棕色的。",
            "您的狗是什么颜色的？",
            "是黑白相间的。"
        ]
    },
    {
        id: "1-15",
        bookId: 1,
        lessonNumber: 15,
        title: "Your passports, please.",
        englishText: [
            "Are you Swedish?",
            "No, we are not. We are Danish.",
            "Are your friends Danish, too?",
            "No, they aren't. They are Norwegian.",
            "Your passports, please.",
            "Here they are.",
            "Are these your cases?",
            "No, they aren't.",
            "Our cases are brown. Here they are.",
            "Are you tourists?",
            "Yes, we are.",
            "Are your friends tourists, too?",
            "Yes, they are.",
            "That's fine.",
            "Thank you very much."
        ],
        chineseText: [
            "你们是瑞典人吗？",
            "不，我们不是。我们是丹麦人。",
            "你们的朋友也是丹麦人吗？",
            "不，他们不是。他们是挪威人。",
            "请出示你们的护照。",
            "给您。",
            "这些是你们的箱子吗？",
            "不，不是。",
            "我们的箱子是棕色的。在这儿呢。",
            "你们是来旅游的吗？",
            "是的，我们是来旅游的。",
            "你们的朋友也是来旅游的吗？",
            "是的，他们也是。",
            "好的。",
            "非常感谢。"
        ]
    },
    {
        id: "1-16",
        bookId: 1,
        lessonNumber: 16,
        title: "Are you...?",
        englishText: [
            "Are you English?",
            "No, we're Chinese.",
            "Are you French?",
            "No, we are German.",
            "Are you Japanese?",
            "Yes, I am.",
            "Are you Korean?",
            "No, we are Chinese.",
            "Are you Swedish?",
            "Yes, we are."
        ],
        chineseText: [
            "你们是英国人吗？",
            "不，我们是中国人。",
            "你们是法国人吗？",
            "不，我们是德国人。",
            "您是日本人吗？",
            "是的，我是。",
            "你们是韩国人吗？",
            "不，我们是中国人。",
            "你们是瑞典人吗？",
            "是的，我们是。"
        ]
    },
    {
        id: "1-17",
        bookId: 1,
        lessonNumber: 17,
        title: "How do you do?",
        englishText: [
            "Come and meet our employees, Mr. Richards.",
            "Thank you, Mr. Jackson.",
            "This is Nicola Grey, and this is Claire Taylor.",
            "How do you do?",
            "These women are very hard-working. What are their jobs?",
            "They are keyboard operators.",
            "This is Michael Baker, and this is Jeremy Short.",
            "How do you do?",
            "They aren't very busy! What are their jobs?",
            "They are sales reps. They are very lazy.",
            "Who is this young man?",
            "This is Jim. He is our office assistant!"
        ],
        chineseText: [
            "来见见我们的雇员，理查兹先生。",
            "谢谢，杰克逊先生。",
            "这位是尼古拉·格雷，这位是克莱尔·泰勒。",
            "您好！",
            "这些女士工作很勤奋。她们是做什么工作的？",
            "她们是电脑录入员。",
            "这位是迈克尔·贝克，这位是杰里米·肖特。",
            "您好！",
            "他们不怎么忙！他们是做什么工作的？",
            "他们是推销员，非常懒。",
            "这个年轻人是谁？",
            "这是吉姆，他是我们的办公室助手！"
        ]
    },
    {
        id: "1-18",
        bookId: 1,
        lessonNumber: 18,
        title: "What are their jobs?",
        englishText: [
            "What are their jobs?",
            "They are sales reps.",
            "What are their jobs?",
            "They are teachers.",
            "What are their jobs?",
            "They are mechanics.",
            "What are their jobs?",
            "They are shop assistants.",
            "What are their jobs?",
            "They are policemen."
        ],
        chineseText: [
            "他们是做什么工作的？",
            "他们是推销员。",
            "他们是做什么工作的？",
            "他们是老师。",
            "他们是做什么工作的？",
            "他们是机械师。",
            "他们是做什么工作的？",
            "他们是店员。",
            "他们是做什么工作的？",
            "他们是警察。"
        ]
    },
    {
        id: "1-19",
        bookId: 1,
        lessonNumber: 19,
        title: "Tired and thirsty",
        englishText: [
            "What's the matter, children?",
            "We are tired...",
            "and thirsty, Mum.",
            "Sit down here.",
            "Are you all right now?",
            "No, we aren't.",
            "Look! There's an ice cream man.",
            "Two ice creams, please.",
            "Here you are, children.",
            "Thanks, Mum.",
            "These ice creams are nice.",
            "Are you all right now?",
            "Yes, we are, thank you!"
        ],
        chineseText: [
            "孩子们，怎么啦？",
            "我们累了……",
            "还很渴，妈妈。",
            "坐这儿吧。",
            "你们现在好些了吗？",
            "不，我们还没好。",
            "看！有个卖冰淇淋的人。",
            "请拿两份冰淇淋。",
            "给你们，孩子们。",
            "谢谢，妈妈。",
            "这冰淇淋很好吃。",
            "你们现在好了吗？",
            "是的，我们好了，谢谢您！"
        ]
    },
    {
        id: "1-20",
        bookId: 1,
        lessonNumber: 20,
        title: "Look at them!",
        englishText: [
            "Look at them.",
            "They are clean.",
            "Look at them.",
            "They are dirty.",
            "Look at them.",
            "They are hot.",
            "Look at them.",
            "They are cold.",
            "Look at them.",
            "They are heavy.",
            "Look at them.",
            "They are light."
        ],
        chineseText: [
            "看看他们。",
            "他们很干净。",
            "看看他们。",
            "他们很脏。",
            "看看他们。",
            "他们很热。",
            "看看他们。",
            "他们很冷。",
            "看看他们。",
            "他们很重。",
            "看看他们。",
            "他们很轻。"
        ]
    },
    {
        id: "1-21",
        bookId: 1,
        lessonNumber: 21,
        title: "Which book?",
        englishText: [
            "Give me a book, please, Jane.",
            "Which book?",
            "This one?",
            "No, not that one. The red one.",
            "This one?",
            "Yes, please.",
            "Here you are.",
            "Thank you."
        ],
        chineseText: [
            "请给我一本书，简。",
            "哪一本？",
            "这本吗？",
            "不，不是那本。红色的那本。",
            "这本吗？",
            "是的，请给我。",
            "给您。",
            "谢谢。"
        ]
    },
    {
        id: "1-22",
        bookId: 1,
        lessonNumber: 22,
        title: "Give me/him/her/us/them a...",
        englishText: [
            "Give me some glasses, please.",
            "Which glasses? These?",
            "No, not those. The ones on the table.",
            "These?",
            "Yes, please.",
            "Here you are.",
            "Thanks."
        ],
        chineseText: [
            "请给我几只玻璃杯。",
            "哪几只？这几只吗？",
            "不，不是那几只。桌子上的那几只。",
            "这几只吗？",
            "是的，请给我。",
            "给您。",
            "谢谢。"
        ]
    },
    {
        id: "1-23",
        bookId: 1,
        lessonNumber: 23,
        title: "Which glasses?",
        englishText: [
            "Which glasses?",
            "The ones on the table.",
            "Which magazines?",
            "The ones on the desk.",
            "Which plates?",
            "The ones on the cupboard.",
            "Which books?",
            "The ones on the shelf."
        ],
        chineseText: [
            "哪几只玻璃杯？",
            "桌子上的那几只。",
            "哪几本杂志？",
            "书桌上的那几本。",
            "哪几个盘子？",
            "食橱上的那几个。",
            "哪几本书？",
            "书架上的那几本。"
        ]
    },
    {
        id: "1-24",
        bookId: 1,
        lessonNumber: 24,
        title: "Give me/him/her/us/them some...",
        englishText: [
            "Give him some pens.",
            "Which pens? These?",
            "No, not those. The ones on the table.",
            "These?",
            "Yes, please.",
            "Here you are.",
            "Thanks."
        ],
        chineseText: [
            "给他几支钢笔。",
            "哪几支？这几支吗？",
            "不，不是那几支。桌子上的那几支。",
            "这几支吗？",
            "是的，请给我。",
            "给您。",
            "谢谢。"
        ]
    },
    {
        id: "1-25",
        bookId: 1,
        lessonNumber: 25,
        title: "Mrs. Smith's kitchen",
        englishText: [
            "Mrs. Smith's kitchen is small.",
            "There is a refrigerator in the kitchen.",
            "The refrigerator is white.",
            "It is on the right.",
            "There is an electric cooker in the kitchen.",
            "The cooker is blue.",
            "It is on the left.",
            "There is a table in the middle of the room.",
            "There is a bottle on the table.",
            "The bottle is empty.",
            "There is a cup on the table, too.",
            "The cup is clean."
        ],
        chineseText: [
            "史密斯夫人的厨房很小。",
            "厨房里有一个电冰箱。",
            "电冰箱是白色的。",
            "它在右边。",
            "厨房里有一个电灶。",
            "电灶是蓝色的。",
            "它在左边。",
            "房间中间有一张桌子。",
            "桌子上有一个瓶子。",
            "瓶子是空的。",
            "桌子上还有一只杯子。",
            "杯子很干净。"
        ]
    },
    {
        id: "1-26",
        bookId: 1,
        lessonNumber: 26,
        title: "Where is it?",
        englishText: [
            "Where is the cup?",
            "It's on the table.",
            "Where is the television?",
            "It's near the window.",
            "Where is the picture?",
            "It's on the wall.",
            "Where is the armchair?",
            "It's near the table."
        ],
        chineseText: [
            "杯子在哪里？",
            "它在桌子上。",
            "电视机在哪里？",
            "它靠近窗户。",
            "画在哪里？",
            "它在墙上。",
            "扶手椅在哪里？",
            "它在桌子附近。"
        ]
    },
    {
        id: "1-27",
        bookId: 1,
        lessonNumber: 27,
        title: "Mrs. Smith's living room",
        englishText: [
            "Mrs. Smith's living room is large.",
            "There is a television in the room.",
            "The television is near the window.",
            "There are some magazines on the television.",
            "There is a table in the room.",
            "There are some newspapers on the table.",
            "There are some armchairs in the room.",
            "The armchairs are near the table.",
            "There is a stereo in the room.",
            "The stereo is near the door.",
            "There are some books on the stereo.",
            "There are some pictures in the room.",
            "The pictures are on the wall."
        ],
        chineseText: [
            "史密斯夫人的客厅很大。",
            "客厅里有一台电视机。",
            "电视机靠近窗户。",
            "电视机上有几本杂志。",
            "客厅里有一张桌子。",
            "桌子上有几份报纸。",
            "客厅里有几把扶手椅。",
            "扶手椅靠近桌子。",
            "客厅里有一个立体声音响。",
            "音响靠近门。",
            "音响上有一些书。",
            "客厅里有几幅画。",
            "画都挂在墙上。"
        ]
    },
    {
        id: "1-28",
        bookId: 1,
        lessonNumber: 28,
        title: "Where are they?",
        englishText: [
            "Where are the books?",
            "They are on the shelf.",
            "Where are the shoes?",
            "They are near the bed.",
            "Where are the pictures?",
            "They are on the wall.",
            "Where are the chairs?",
            "They are near the table."
        ],
        chineseText: [
            "书在哪里？",
            "它们在书架上。",
            "鞋在哪里？",
            "它们在床的旁边。",
            "画在哪里？",
            "它们在墙上。",
            "椅子在哪里？",
            "它们在桌子旁边。"
        ]
    },
    {
        id: "1-29",
        bookId: 1,
        lessonNumber: 29,
        title: "Come in, Amy.",
        englishText: [
            "Come in, Amy.",
            "Shut the door, please.",
            "This bedroom's very untidy.",
            "What must I do, Mrs. Jones?",
            "Open the window and air the room.",
            "Then put these clothes in the wardrobe.",
            "Then make the bed.",
            "Dust the dressing-table.",
            "Then sweep the floor."
        ],
        chineseText: [
            "进来，埃米。",
            "请把门关上。",
            "这间卧室太乱了。",
            "我应该做些什么，琼斯夫人？",
            "打开窗户，给房间通通风。",
            "然后把这些衣服放进衣柜里。",
            "再把床整理好。",
            "给梳妆台掸掸灰。",
            "然后拖地板。"
        ]
    },
    {
        id: "1-30",
        bookId: 1,
        lessonNumber: 30,
        title: "What must I do?",
        englishText: [
            "What must I do?",
            "Sweep the floor.",
            "What must I do?",
            "Clean the window.",
            "What must I do?",
            "Open the door.",
            "What must I do?",
            "Turn off the light.",
            "What must I do?",
            "Put on your shirt.",
            "What must I do?",
            "Take off your shoes."
        ],
        chineseText: [
            "我应该做什么？",
            "拖地板。",
            "我应该做什么？",
            "擦窗户。",
            "我应该做什么？",
            "开门。",
            "我应该做什么？",
            "关灯。",
            "我应该做什么？",
            "穿上您的衬衫。",
            "我应该做什么？",
            "脱掉您的鞋子。"
        ]
    },
    {
        id: "1-31",
        bookId: 1,
        lessonNumber: 31,
        title: "Where's Sally?",
        englishText: [
            "Where's Sally, Jack?",
            "She's in the garden, Jane.",
            "What's she doing?",
            "She's sitting under the tree.",
            "Is Tim in the garden, too?",
            "Yes, he is.",
            "He's climbing the tree.",
            "I beg your pardon?",
            "Tim's climbing the tree.",
            "What about the dog?",
            "It's running across the grass.",
            "It's running after a cat!"
        ],
        chineseText: [
            "杰克，萨莉在哪里？",
            "她在花园里，简。",
            "她在干什么？",
            "她正坐在树下。",
            "蒂姆也在花园里吗？",
            "是的，他也在。",
            "他正在爬树。",
            "您说什么？",
            "蒂姆正在爬树。",
            "那狗呢？",
            "它正在草地上跑呢。",
            "它在追一只猫呢！"
        ]
    },
    {
        id: "1-32",
        bookId: 1,
        lessonNumber: 32,
        title: "What's he/she/it doing?",
        englishText: [
            "What's he doing?",
            "He's reading a book.",
            "What's she doing?",
            "She's making the bed.",
            "What's he doing?",
            "He's shaving.",
            "What's she doing?",
            "She's cooking a meal.",
            "What's he doing?",
            "He's washing the dishes.",
            "What's she doing?",
            "She's typing a letter."
        ],
        chineseText: [
            "他在做什么？",
            "他正在看书。",
            "她在做什么？",
            "她在整理床铺。",
            "他在做什么？",
            "他在刮胡子。",
            "她在做什么？",
            "她在做饭。",
            "他在做什么？",
            "他在洗碗碟。",
            "她在做什么？",
            "她在打一封信。"
        ]
    },
    {
        id: "1-33",
        bookId: 1,
        lessonNumber: 33,
        title: "A fine day",
        englishText: [
            "It is a fine day today.",
            "There are some clouds in the sky, but the sun is shining.",
            "Mr. Jones is with his family.",
            "They are walking over the bridge.",
            "There are some boats on the river.",
            "Mr. Jones and his wife are looking at them.",
            "Sally is looking at a big ship.",
            "The ship is going under the bridge.",
            "Tim is looking at an aeroplane.",
            "The aeroplane is flying over the river."
        ],
        chineseText: [
            "今天天气很好。",
            "天空中飘着几朵云，但阳光灿烂。",
            "琼斯先生和他的家人在一起。",
            "他们正在桥上走。",
            "河上有几艘船。",
            "琼斯先生和他的妻子正在看那些船。",
            "萨莉正在看一艘大船。",
            "那艘船正从桥下驶过。",
            "蒂姆正在看一架飞机。",
            "飞机正从河上飞过。"
        ]
    },
    {
        id: "1-34",
        bookId: 1,
        lessonNumber: 34,
        title: "What are they doing?",
        englishText: [
            "What are they doing?",
            "They are sleeping.",
            "What are they doing?",
            "They are shaving.",
            "What are they doing?",
            "They are washing dishes.",
            "What are they doing?",
            "They are cooking.",
            "What are they doing?",
            "They are walking in the garden.",
            "What are they doing?",
            "They are typing letters."
        ],
        chineseText: [
            "他们在做什么？",
            "他们在睡觉。",
            "他们在做什么？",
            "他们在刮胡子。",
            "他们在做什么？",
            "他们在洗碗。",
            "他们在做什么？",
            "他们在做饭。",
            "他们在做什么？",
            "他们在花园里散步。",
            "他们在做什么？",
            "他们在打信。"
        ]
    },
    {
        id: "1-35",
        bookId: 1,
        lessonNumber: 35,
        title: "Our village",
        englishText: [
            "This is a photograph of our village.",
            "Our village is in a valley.",
            "It is between two hills.",
            "The village is near a river.",
            "Here is another photograph of the village.",
            "My wife and I are walking along the banks of the river.",
            "We are on the left.",
            "There is a boy in the water.",
            "He is swimming across the river.",
            "Here is another photograph.",
            "This is the school building.",
            "It is beside a park.",
            "The park is on the right.",
            "Some children are coming out of the building.",
            "Some of them are going into the park."
        ],
        chineseText: [
            "这是我们村庄的一张照片。",
            "我们的村庄坐落在一个山谷里。",
            "它位于两座小山之间。",
            "村庄靠近一条小河。",
            "这是我们村庄的另一张照片。",
            "我和我的妻子正在沿着河边走。",
            "我们在左边。",
            "水里面有个男孩。",
            "他正在横渡小河。",
            "这是另一张照片。",
            "这是教学楼。",
            "它在一个公园旁边。",
            "公园在右边。",
            "有些孩子正从楼里走出来。",
            "他们中有几个正走进公园。"
        ]
    },
    {
        id: "1-36",
        bookId: 1,
        lessonNumber: 36,
        title: "Where...?",
        englishText: [
            "Where is the man going?",
            "He is going into the shop.",
            "Where are they going?",
            "They are going to school.",
            "Where is the cat jumping?",
            "It is jumping off the wall.",
            "Where is the girl sitting?",
            "She is sitting near the tree."
        ],
        chineseText: [
            "那个男人往哪里去？",
            "他往商店里去。",
            "他们往哪里去？",
            "他们往学校去。",
            "那只猫正在往哪里跳？",
            "它正从墙上往下跳。",
            "那个女孩坐在哪里？",
            "她坐在树的附近。"
        ]
    },
    {
        id: "1-37",
        bookId: 1,
        lessonNumber: 37,
        title: "Making a bookcase",
        englishText: [
            "You're working hard, George.",
            "What are you doing?",
            "I'm making a bookcase.",
            "Give me that hammer, please, Dan.",
            "Which hammer? This one?",
            "No, not that one. The big one.",
            "Here you are.",
            "Thanks, Dan.",
            "What are you going to do now, George?",
            "I'm going to paint it.",
            "What colour are you going to paint it?",
            "I'm going to paint it pink.",
            "Pink!",
            "This bookcase isn't for me.",
            "It's for my daughter, Susan.",
            "Pink's her favourite colour."
        ],
        chineseText: [
            "您干得真辛苦，乔治。",
            "您在干什么呢？",
            "我在做书架。",
            "丹，请把那把锤子给我。",
            "哪一把锤子？这一把吗？",
            "不，不是那一把。是那把大的。",
            "给您。",
            "谢谢，丹。",
            "您现在打算干什么，乔治？",
            "我打算把书架漆一下。",
            "您打算把它漆成什么颜色？",
            "我打算把它漆成粉红色。",
            "粉红色！",
            "这个书架不是给我自己的。",
            "是给我女儿苏珊的。",
            "粉红色是她最喜欢的颜色。"
        ]
    },
    {
        id: "1-38",
        bookId: 1,
        lessonNumber: 38,
        title: "What are you going to do?",
        englishText: [
            "What are you going to do?",
            "I'm going to shave.",
            "What are you going to do?",
            "I'm going to wait for a bus.",
            "What are you going to do?",
            "I'm going to do my homework.",
            "What are you going to do?",
            "I'm going to listen to the stereo.",
            "What are you going to do?",
            "I'm going to wash the dishes.",
            "What are you going to do?",
            "I'm going to paint this chair."
        ],
        chineseText: [
            "您打算做什么？",
            "我打算刮胡子。",
            "您打算做什么？",
            "我打算等公共汽车。",
            "您打算做什么？",
            "我打算做作业。",
            "您打算做什么？",
            "我打算听立体声音响。",
            "您打算做什么？",
            "我打算洗碗。",
            "您打算做什么？",
            "我打算给这把椅子漆一下。"
        ]
    },
    {
        id: "1-39",
        bookId: 1,
        lessonNumber: 39,
        title: "Don't drop it!",
        englishText: [
            "What are you going to do with that vase, Penny?",
            "I'm going to put it on this table, Sam.",
            "Don't do that.",
            "Give it to me.",
            "What are you going to do with it?",
            "I'm going to put it here, in front of the window.",
            "Be careful!",
            "Don't drop it!",
            "Don't put it there, Sam.",
            "Put it here, on this shelf.",
            "There we are!",
            "It's a lovely vase.",
            "Those flowers are lovely, too."
        ],
        chineseText: [
            "彭妮，您打算把那个花瓶怎么办？",
            "我打算把它放在这张桌子上，萨姆。",
            "别那样做。",
            "把它给我。",
            "您打算把它怎么办？",
            "我打算把它放在这儿，窗前。",
            "小心点！",
            "别摔了！",
            "别放那儿，萨姆。",
            "放在这儿，这个架子上。",
            "就放在那儿！",
            "这是个漂亮的花瓶。",
            "那些花也很漂亮。"
        ]
    },
    {
        id: "1-40",
        bookId: 1,
        lessonNumber: 40,
        title: "What are you going to do?",
        englishText: [
            "What are you going to do with that letter?",
            "I'm going to post it.",
            "What are you going to do with that picture?",
            "I'm going to put it on the wall.",
            "What are you going to do with that hammer?",
            "I'm going to show you.",
            "What are you going to do with those shoes?",
            "I'm going to put them in the wardrobe.",
            "What are you going to do with those magazines?",
            "I'm going to take them to my friend."
        ],
        chineseText: [
            "您打算把那封信怎么办？",
            "我打算把它寄了。",
            "您打算把那幅画怎么办？",
            "我打算把它挂在墙上。",
            "您打算把那把锤子怎么办？",
            "我打算给您看看。",
            "您打算把那些鞋怎么办？",
            "我打算把它们放进衣柜里。",
            "您打算把那些杂志怎么办？",
            "我打算把它们带给我的朋友。"
        ]
    },
    {
        id: "1-41",
        bookId: 1,
        lessonNumber: 41,
        title: "Penny's bag",
        englishText: [
            "Is that bag heavy, Penny?",
            "Not very.",
            "Here!",
            "Put it on this chair.",
            "What's in it?",
            "A piece of cheese.",
            "A loaf of bread.",
            "A bar of soap.",
            "A bar of chocolate.",
            "A bottle of milk.",
            "A pound of sugar.",
            "Half a pound of coffee.",
            "A quarter of a pound of tea.",
            "And a tin of tobacco.",
            "Is that tin of tobacco for me?",
            "Well, it's certainly not for me!"
        ],
        chineseText: [
            "那个包重吗，彭妮？",
            "不怎么重。",
            "喂！",
            "把它放在这把椅子上。",
            "里面有什么？",
            "一块乳酪。",
            "一条面包。",
            "一块肥皂。",
            "一块巧克力。",
            "一瓶牛奶。",
            "一磅糖。",
            "半磅咖啡。",
            "四分之一磅茶叶。",
            "还有一听烟丝。",
            "那听烟丝是给我的吗？",
            "嗯，当然不是给我的！"
        ]
    },
    {
        id: "1-42",
        bookId: 1,
        lessonNumber: 42,
        title: "Is there any...?",
        englishText: [
            "Is there any bread here?",
            "Yes, there is. There's some on the table.",
            "Is there any milk here?",
            "No, there isn't any milk.",
            "Is there any soap here?",
            "Yes, there is. There's some in the bathroom.",
            "Is there any chocolate here?",
            "No, there isn't any chocolate.",
            "Is there any cheese here?",
            "Yes, there is. There's some in the kitchen."
        ],
        chineseText: [
            "这儿有面包吗？",
            "是的，有。桌子上有一些。",
            "这儿有牛奶吗？",
            "不，没有牛奶。",
            "这儿有肥皂吗？",
            "是的，有。浴室里有一些。",
            "这儿有巧克力吗？",
            "不，没有巧克力。",
            "这儿有乳酪吗？",
            "是的，有。厨房里有一些。"
        ]
    },
    {
        id: "1-43",
        bookId: 1,
        lessonNumber: 43,
        title: "Hurry up!",
        englishText: [
            "Can you make the tea, Sam?",
            "Yes, of course I can, Penny.",
            "Is there any water in this kettle?",
            "Yes, there is.",
            "Where's the tea?",
            "It's over there, behind the teapot.",
            "Can you see it?",
            "I can see the teapot, but I can't see the tea.",
            "There it is!",
            "It's in front of you!",
            "Ah, yes, I can see it now.",
            "Where are the cups?",
            "There are some in the cupboard.",
            "Can you find them?",
            "Yes. Here they are!",
            "Hurry up, Sam!",
            "The kettle's boiling!"
        ],
        chineseText: [
            "萨姆，您会沏茶吗？",
            "是的，当然会，彭妮。",
            "这壶里有水吗？",
            "是的，有。",
            "茶叶在哪里？",
            "就在那儿，茶壶后面。",
            "您能看见吗？",
            "我能看见茶壶，但我看不见茶叶。",
            "茶叶就在那儿！",
            "就在您的面前！",
            "啊，是的，我现在看见了。",
            "茶杯在哪里？",
            "碗橱里有几只。",
            "您能找到它们吗？",
            "能。找到了！",
            "快一点，萨姆！",
            "水开了！"
        ]
    },
    {
        id: "1-44",
        bookId: 1,
        lessonNumber: 44,
        title: "Are there any...?",
        englishText: [
            "Are there any tickets here?",
            "Yes, there are. There are some on the table.",
            "Are there any books here?",
            "No, there aren't any books.",
            "Are there any forks here?",
            "Yes, there are. There are some in the drawer.",
            "Are there any cups here?",
            "No, there aren't any cups.",
            "Are there any spoons here?",
            "Yes, there are. There are some on the table."
        ],
        chineseText: [
            "这儿有票吗？",
            "是的，有。桌子上有一些。",
            "这儿有书吗？",
            "不，没有书。",
            "这儿有叉子吗？",
            "是的，有。抽屉里有一些。",
            "这儿有杯子吗？",
            "不，没有杯子。",
            "这儿有勺子吗？",
            "是的，有。桌子上有一些。"
        ]
    },
    {
        id: "1-45",
        bookId: 1,
        lessonNumber: 45,
        title: "The boss's letter",
        englishText: [
            "Can you come here a minute please, Bob?",
            "Yes, sir?",
            "Where's Pamela?",
            "She's in the office, sir.",
            "Can she type this letter for me?",
            "Ask her please.",
            "Yes, sir.",
            "Can you type this letter for the boss please, Pamela?",
            "Yes, of course I can.",
            "Here you are.",
            "Thank you, Bob.",
            "Bob!",
            "Yes?",
            "What's the matter?",
            "I can't type this letter.",
            "I can't read it!",
            "The boss's handwriting is terrible!"
        ],
        chineseText: [
            "请您过来一下好吗，鲍勃？",
            "什么事，先生？",
            "帕梅拉在哪里？",
            "她在办公室里，先生。",
            "她能为我打这封信吗？",
            "请问她一下。",
            "好的，先生。",
            "帕梅拉，请您为老板打这封信好吗？",
            "好的，当然可以。",
            "给您。",
            "谢谢您，鲍勃。",
            "鲍勃！",
            "什么事？",
            "怎么啦？",
            "我打不了这封信。",
            "我看不懂这字！",
            "老板的字写得太糟了！"
        ]
    },
    {
        id: "1-46",
        bookId: 1,
        lessonNumber: 46,
        title: "Can you...?",
        englishText: [
            "Can you make the tea?",
            "Yes, I can.",
            "Can you open the window?",
            "No, I can't.",
            "Can you paint this bookcase?",
            "Yes, I can.",
            "Can you sweep the floor?",
            "No, I can't.",
            "Can you see that aeroplane?",
            "Yes, I can.",
            "Can you read this book?",
            "No, I can't."
        ],
        chineseText: [
            "您会沏茶吗？",
            "是的，我会。",
            "您能打开窗户吗？",
            "不，我不能。",
            "您能给这个书架上漆吗？",
            "是的，我能。",
            "您能扫地吗？",
            "不，我不能。",
            "您能看见那架飞机吗？",
            "是的，我能看见。",
            "您能读这本书吗？",
            "不，我不能。"
        ]
    },
    {
        id: "1-47",
        bookId: 1,
        lessonNumber: 47,
        title: "A cup of coffee",
        englishText: [
            "Do you like coffee, Ann?",
            "Yes, I do.",
            "Do you want a cup?",
            "Yes, please, Christine.",
            "Do you want any sugar?",
            "Yes, please.",
            "Do you want any milk?",
            "No, thank you.",
            "I don't like milk in my coffee.",
            "I like black coffee.",
            "Do you like biscuits?",
            "Yes, I do.",
            "Do you want one?",
            "Yes, please."
        ],
        chineseText: [
            "安，您喜欢咖啡吗？",
            "是的，我喜欢。",
            "您要一杯吗？",
            "好的，请给我一杯，克里斯廷。",
            "您要放些糖吗？",
            "好的，请放些。",
            "您要放些牛奶吗？",
            "不，谢谢。",
            "我不喜欢咖啡里放牛奶。",
            "我喜欢黑咖啡。",
            "您喜欢饼干吗？",
            "是的，我喜欢。",
            "您要一块吗？",
            "好的，请给我一块。"
        ]
    },
    {
        id: "1-48",
        bookId: 1,
        lessonNumber: 48,
        title: "Do you like...?",
        englishText: [
            "Do you like butter?",
            "Yes, I do. I like butter, but I don't want any.",
            "Do you like honey?",
            "Yes, I do. I like honey, but I don't want any.",
            "Do you like eggs?",
            "Yes, I do. I like eggs, but I don't want one.",
            "Do you like jam?",
            "Yes, I do. I like jam, but I don't want any.",
            "Do you like wine?",
            "Yes, I do. I like wine, but I don't want any."
        ],
        chineseText: [
            "您喜欢黄油吗？",
            "是的，我喜欢。我喜欢黄油，但我现在不要。",
            "您喜欢蜂蜜吗？",
            "是的，我喜欢。我喜欢蜂蜜，但我现在不要。",
            "您喜欢鸡蛋吗？",
            "是的，我喜欢。我喜欢鸡蛋，但我现在不要一个。",
            "您喜欢果酱吗？",
            "是的，我喜欢。我喜欢果酱，但我现在不要。",
            "您喜欢葡萄酒吗？",
            "是的，我喜欢。我喜欢葡萄酒，但我现在不要。"
        ]
    },
    {
        id: "1-49",
        bookId: 1,
        lessonNumber: 49,
        title: "At the butcher's",
        englishText: [
            "Do you want any meat today, Mrs. Bird?",
            "Yes, please.",
            "Do you want beef or lamb?",
            "Beef, please.",
            "This lamb's very good.",
            "I like lamb, but my husband doesn't.",
            "What about some steak?",
            "This is a nice piece.",
            "Give me that piece, please.",
            "And a pound of mince, too.",
            "Do you want a chicken, Mrs. Bird?",
            "They are very nice.",
            "No, thank you.",
            "My husband likes steak, but he doesn't like chicken.",
            "To tell you the truth, Mrs. Bird, I don't like chicken either!"
        ],
        chineseText: [
            "伯德夫人，您今天要买点肉吗？",
            "好的，请给我一些。",
            "您要牛肉还是羊肉？",
            "请给我牛肉。",
            "这块羊肉很好。",
            "我喜欢羊肉，但我丈夫不喜欢。",
            "来些牛排怎么样？",
            "这是块好肉。",
            "请给我那块。",
            "再来一磅肉馅。",
            "伯德夫人，您要只鸡吗？",
            "这些鸡很好。",
            "不，谢谢。",
            "我丈夫喜欢牛排，但他不喜欢鸡。",
            "跟您说实话，伯德夫人，我也不喜欢鸡！"
        ]
    },
    {
        id: "1-50",
        bookId: 1,
        lessonNumber: 50,
        title: "He likes...",
        englishText: [
            "Does he like beans?",
            "Yes, he does. He likes beans, but he doesn't want any.",
            "Does she like bananas?",
            "Yes, she does. She likes bananas, but she doesn't want any.",
            "Do they like oranges?",
            "Yes, they do. They like oranges, but they don't want any.",
            "Does he like tea?",
            "Yes, he does. He likes tea, but he doesn't want any.",
            "Does she like apples?",
            "Yes, she does. She likes apples, but she doesn't want any."
        ],
        chineseText: [
            "他喜欢豆子吗？",
            "是的，他喜欢。他喜欢豆子，但他现在不要。",
            "她喜欢香蕉吗？",
            "是的，她喜欢。她喜欢香蕉，但她现在不要。",
            "他们喜欢橙子吗？",
            "是的，他们喜欢。他们喜欢橙子，但他们现在不要。",
            "他喜欢茶吗？",
            "是的，他喜欢。他喜欢茶，但他现在不要。",
            "她喜欢苹果吗？",
            "是的，她喜欢。她喜欢苹果，但她现在不要。"
        ]
    },
    {
        id: "1-51",
        bookId: 1,
        lessonNumber: 51,
        title: "A pleasant climate",
        englishText: [
            "Where do you come from?",
            "I come from England.",
            "What's the climate like in your country?",
            "It's mild, but it's not always pleasant.",
            "The weather's often cold in the North and windy in the East.",
            "It's often wet in the West and sometimes warm in the South.",
            "Which seasons do you like best?",
            "I like spring and summer.",
            "The days are long and the nights are short.",
            "The sun rises early and sets late.",
            "I don't like autumn and winter.",
            "The days are short and the nights are long.",
            "The sun rises late and sets early.",
            "Our climate is not very good, but it's certainly interesting.",
            "It's our favourite subject of conversation."
        ],
        chineseText: [
            "你是哪国人？",
            "我是英国人。",
            "你们国家的气候怎么样？",
            "气候温和，但也不总是宜人的。",
            "北部的天气常常寒冷，东部则常常刮风。",
            "西部常下雨，南部有时则很暖和。",
            "你最喜欢哪些季节？",
            "我最喜欢春季和夏季。",
            "白天长而夜晚短。",
            "太阳升得早而落得晚。",
            "我不喜欢秋季和冬季。",
            "白天短而夜晚长。",
            "太阳升得晚而落得早。",
            "我们的气候并不很好，但确实很有意思。",
            "天气是我们最喜欢谈论的话题。"
        ]
    },
    {
        id: "1-52",
        bookId: 1,
        lessonNumber: 52,
        title: "What nationality are they?",
        englishText: [
            "Where do you come from?",
            "I come from Brazil.",
            "What nationality are you?",
            "I'm Brazilian.",
            "Where does he come from?",
            "He comes from Germany.",
            "What nationality is he?",
            "He's German.",
            "Where do they come from?",
            "They come from France.",
            "What nationality are they?",
            "They're French."
        ],
        chineseText: [
            "你是哪国人？",
            "我是巴西人。",
            "你是什么国籍的？",
            "我是巴西人。",
            "他是哪国人？",
            "他是德国人。",
            "他是什么国籍的？",
            "他是德国人。",
            "他们是哪国人？",
            "他们是法国人。",
            "他们是什么国籍的？",
            "他们是法国人。"
        ]
    },
    {
        id: "1-53",
        bookId: 1,
        lessonNumber: 53,
        title: "An interesting climate",
        englishText: [
            "Where do you come from?",
            "I come from Greece.",
            "What's the climate like in your country?",
            "It's very pleasant.",
            "What's the weather like in spring?",
            "It's often windy in March.",
            "It's always warm in April and May, but it rains sometimes.",
            "What's it like in summer?",
            "It's always hot in June, July and August.",
            "The sun shines every day.",
            "Is it cold or warm in autumn?",
            "It's always warm in September and October.",
            "It's often cold in November and it rains sometimes.",
            "Is it very cold in winter?",
            "It's often cold in December, January and February.",
            "It snows sometimes."
        ],
        chineseText: [
            "你是哪国人？",
            "我是希腊人。",
            "你们国家的气候怎么样？",
            "气候非常宜人。",
            "春季的天气怎么样？",
            "三月份常常刮风。",
            "四月和五月总是很暖和，但有时下雨。",
            "夏季的天气怎么样？",
            "六、七、八月总是很热。",
            "每天都出太阳。",
            "秋季的天气是冷还是暖和？",
            "九月和十月总是很暖和。",
            "十一月常常很冷，有时下雨。",
            "冬季很冷吗？",
            "十二月、一月和二月常常很冷。",
            "有时还下雪。"
        ]
    },
    {
        id: "1-54",
        bookId: 1,
        lessonNumber: 54,
        title: "What nationality are they?",
        englishText: [
            "Where does she come from?",
            "She comes from Spain.",
            "What nationality is she?",
            "She's Spanish.",
            "Where does he come from?",
            "He comes from Russia.",
            "What nationality is he?",
            "He's Russian.",
            "Where do they come from?",
            "They come from India.",
            "What nationality are they?",
            "They're Indian."
        ],
        chineseText: [
            "她是哪国人？",
            "她是西班牙人。",
            "她是什么国籍的？",
            "她是西班牙人。",
            "他是哪国人？",
            "他是俄罗斯人。",
            "他是什么国籍的？",
            "他是俄罗斯人。",
            "他们是哪国人？",
            "他们是印度人。",
            "他们是什么国籍的？",
            "他们是印度人。"
        ]
    },
    {
        id: "1-55",
        bookId: 1,
        lessonNumber: 55,
        title: "The Sawyer family",
        englishText: [
            "This is the Sawyer family.",
            "They live at 87 King Street.",
            "In the morning, Mr. Sawyer goes to work and the children go to school.",
            "Their father takes them to school every day.",
            "Mrs. Sawyer stays at home every day.",
            "She does the housework.",
            "She always eats her lunch at noon.",
            "In the afternoon, she usually sees her friends.",
            "They often drink tea together.",
            "In the evening, the children come home from school.",
            "They arrive home early.",
            "Mr. Sawyer comes home from work.",
            "He arrives home late.",
            "At night, the children always do their homework.",
            "Then they go to bed.",
            "Mr. Sawyer usually reads his newspaper, but sometimes he and his wife watch television."
        ],
        chineseText: [
            "这是索耶一家。",
            "他们住在国王街87号。",
            "早上，索耶先生去上班，孩子们去上学。",
            "他们的父亲每天送他们去上学。",
            "索耶夫人每天待在家里。",
            "她料理家务。",
            "她总是在正午吃午饭。",
            "下午，她通常会见她的朋友。",
            "她们经常一起喝茶。",
            "傍晚，孩子们放学回家。",
            "他们到家很早。",
            "索耶先生下班回家。",
            "他到家很晚。",
            "晚上，孩子们总是做作业。",
            "然后他们去睡觉。",
            "索耶先生通常读报纸，但有时他和他的妻子看电视。"
        ]
    },
    {
        id: "1-56",
        bookId: 1,
        lessonNumber: 56,
        title: "What do they usually do?",
        englishText: [
            "What do you usually do in the morning?",
            "I usually shave at 7:00.",
            "What does she usually do in the morning?",
            "She usually drinks tea in the morning.",
            "What do they usually do in the evening?",
            "They usually watch television at night."
        ],
        chineseText: [
            "你早上通常做什么？",
            "我通常7点刮脸。",
            "她早上通常做什么？",
            "她早上通常喝茶。",
            "他们晚上通常做什么？",
            "他们晚上通常看电视。"
        ]
    },
    {
        id: "1-57",
        bookId: 1,
        lessonNumber: 57,
        title: "An unusual day",
        englishText: [
            "It is eight o'clock.",
            "The children go to school by car every day, but today, they are going to school on foot.",
            "It is ten o'clock.",
            "Mrs. Sawyer usually stays at home in the morning, but this morning, she is going to the shops.",
            "It is four o'clock.",
            "In the afternoon, Mrs. Sawyer usually drinks tea in the living room, but this afternoon, she is drinking tea in the garden.",
            "It is six o'clock.",
            "In the evening, the children usually do their homework, but this evening, they are not doing their homework.",
            "At the moment, they are playing in the garden.",
            "It is nine o'clock.",
            "Mr. Sawyer usually reads his newspaper at night, but tonight he is not reading his newspaper.",
            "At the moment, he is reading an interesting book."
        ],
        chineseText: [
            "现在是8点钟。",
            "孩子们每天都乘小汽车去上学，而今天，他们正步行去上学。",
            "现在是10点钟。",
            "索耶夫人通常上午待在家里，但今天上午，她正去商店买东西。",
            "现在是4点钟。",
            "下午，索耶夫人通常在客厅喝茶，但今天下午，她正在花园里喝茶。",
            "现在是6点钟。",
            "晚上，孩子们通常做作业，但今天晚上，他们没做作业。",
            "此刻，他们正在花园里玩耍。",
            "现在是9点钟。",
            "索耶先生通常晚上看报，但今天晚上他没看报。",
            "此刻，他正在看一本有趣的书。"
        ]
    },
    {
        id: "1-58",
        bookId: 1,
        lessonNumber: 58,
        title: "What's the time?",
        englishText: [
            "What's the time?",
            "It's 7 o'clock.",
            "What's the time?",
            "It's 7:30.",
            "What's the time?",
            "It's 8 o'clock.",
            "What's the time?",
            "It's 8:15.",
            "What's the time?",
            "It's 9 o'clock."
        ],
        chineseText: [
            "几点钟了？",
            "7点。",
            "几点钟了？",
            "7点半。",
            "几点钟了？",
            "8点。",
            "几点钟了？",
            "8点15分。",
            "几点钟了？",
            "9点。"
        ]
    },
    {
        id: "1-59",
        bookId: 1,
        lessonNumber: 59,
        title: "Is that all?",
        englishText: [
            "What do you want, madam?",
            "I want some envelopes, please.",
            "Do you want the large size or the small size?",
            "The large size, please.",
            "Do you have any writing paper?",
            "Yes, we do.",
            "I don't have any small pads. I only have large ones.",
            "Do you want a pad?",
            "Yes, please.",
            "And I want some glue.",
            "A bottle of glue.",
            "And I want a large box of chalk, too.",
            "I only have small boxes. Do you want one?",
            "No, thank you.",
            "Is that all?",
            "That's all, thank you.",
            "What else do you want?",
            "I want my change."
        ],
        chineseText: [
            "您想要点什么，夫人？",
            "请给我拿一些信封。",
            "您要大号的还是小号的？",
            "请给我大号的。",
            "您有信纸吗？",
            "是的，我们有。",
            "我没有小本的信纸，只有大本的。",
            "您要一本吗？",
            "好的，请拿一本。",
            "我还要一些胶水。",
            "一瓶胶水。",
            "我还要一大盒粉笔。",
            "我只有小盒的。您要一盒吗？",
            "不了，谢谢。",
            "就要这些吗？",
            "就要这些，谢谢。",
            "您还要什么吗？",
            "我要找的钱。"
        ]
    },
    {
        id: "1-60",
        bookId: 1,
        lessonNumber: 60,
        title: "What do you want?",
        englishText: [
            "Do you want any meat today, Mrs. Bird?",
            "Yes, please.",
            "Do you want beef or lamb?",
            "Beef, please.",
            "This lamb's very good.",
            "I like lamb, but my husband doesn't.",
            "What about some steak?",
            "This is a nice piece.",
            "Give me that piece, please.",
            "And a pound of mince, too.",
            "Do you want a chicken, Mrs. Bird?",
            "They are very nice.",
            "No, thank you.",
            "My husband likes steak, but he doesn't like chicken.",
            "To tell you the truth, Mrs. Bird, I don't like chicken either!"
        ],
        chineseText: [
            "伯德夫人，您今天想买些肉吗？",
            "是的。",
            "您想要牛肉还是羊肉？",
            "请给我牛肉。",
            "这羊肉很好。",
            "我喜欢羊肉，但我丈夫不喜欢。",
            "来点牛排怎么样？",
            "这块很好。",
            "请给我那块。",
            "再来一磅肉馅。",
            "伯德夫人，您想要一只鸡吗？",
            "这些鸡很好。",
            "不了，谢谢。",
            "我丈夫喜欢牛排，但他不喜欢鸡。",
            "说实话，伯德夫人，我也不喜欢鸡！"
        ]
    },
    {
        id: "1-61",
        bookId: 1,
        lessonNumber: 61,
        title: "A bad cold",
        englishText: [
            "What's the matter with you, children?",
            "We've got a cold.",
            "You must stay in bed for a week.",
            "That's good news for Jimmy.",
            "Why?",
            "Because he doesn't like school!"
        ],
        chineseText: [
            "孩子们，你们怎么了？",
            "我们感冒了。",
            "你们必须卧床一周。",
            "对吉米来说，这可是好消息。",
            "为什么？",
            "因为他不喜欢上学！"
        ]
    },
    {
        id: "1-62",
        bookId: 1,
        lessonNumber: 62,
        title: "What's the matter with them?",
        englishText: [
            "What's the matter with him?",
            "He feels ill.",
            "He must see a doctor.",
            "What's the matter with her?",
            "She has a headache.",
            "She must take an aspirin.",
            "What's the matter with them?",
            "They have a cold.",
            "They must stay in bed."
        ],
        chineseText: [
            "他怎么了？",
            "他感觉不舒服。",
            "他必须去看医生。",
            "她怎么了？",
            "她头痛。",
            "她必须吃一片阿司匹林。",
            "他们怎么了？",
            "他们感冒了。",
            "他们必须卧床休息。"
        ]
    },
    {
        id: "1-63",
        bookId: 1,
        lessonNumber: 63,
        title: "Thank you, doctor.",
        englishText: [
            "How's Jimmy today?",
            "He's very well, thank you, doctor.",
            "Can I see him please, Mrs. Williams?",
            "Certainly, doctor. Come upstairs.",
            "You look very well, Jimmy. You are better now, but you mustn't get up yet.",
            "You must stay in bed for another two days.",
            "The boy mustn't go to school yet, Mrs. Williams.",
            "And he mustn't eat rich food.",
            "Does he have a temperature, doctor?",
            "No, he doesn't.",
            "Must he stay in bed?",
            "Yes. He must remain in bed for another two days.",
            "He can get up for about two hours each day, but you must keep the room warm.",
            "Where's Mr. Williams this evening?",
            "He's in bed, doctor. Can you see him please? He has a bad cold, too!"
        ],
        chineseText: [
            "吉米今天怎么样？",
            "他很好，谢谢您，医生。",
            "威廉斯夫人，我可以看看他吗？",
            "当然可以，医生。上楼吧。",
            "吉米，你看起来很好。你现在好些了，但你还不能起床。",
            "你必须再卧床两天。",
            "这孩子还不能去上学，威廉斯夫人。",
            "而且不能吃油腻的食物。",
            "他还发烧吗，医生？",
            "不，不发烧了。",
            "他必须卧床吗？",
            "是的，他必须再卧床两天。",
            "他每天可以起来活动大约两小时，但您必须保持房间温暖。",
            "威廉斯先生今晚在哪儿？",
            "他也在床上，医生。您能看看他吗？他也得了重感冒！"
        ]
    },
    {
        id: "1-64",
        bookId: 1,
        lessonNumber: 64,
        title: "Don't ...!",
        englishText: [
            "You mustn't talk in the library.",
            "You must be quiet.",
            "You mustn't drive so quickly.",
            "You must drive slowly.",
            "You mustn't break this vase.",
            "You must be careful."
        ],
        chineseText: [
            "你不能在图书馆里说话。",
            "你必须保持安静。",
            "你开车不能这么快。",
            "你必须开慢一点。",
            "你不能打碎这个花瓶。",
            "你必须小心。"
        ]
    },
    {
        id: "1-65",
        bookId: 1,
        lessonNumber: 65,
        title: "Not a baby",
        englishText: [
            "What's the matter, Betty?",
            "I'm very hot.",
            "What's the matter, David?",
            "I'm very cold.",
            "What's the matter, Jimmy?",
            "I'm very thirsty.",
            "What's the matter, Sandy?",
            "I'm very hungry.",
            "What's the matter, Tim?",
            "I'm very tired."
        ],
        chineseText: [
            "怎么了，贝蒂？",
            "我很热。",
            "怎么了，戴维？",
            "我很冷。",
            "怎么了，吉米？",
            "我很渴。",
            "怎么了，桑迪？",
            "我很饿。",
            "怎么了，蒂姆？",
            "我很累。"
        ]
    },
    {
        id: "1-66",
        bookId: 1,
        lessonNumber: 66,
        title: "What's the time?",
        englishText: [
            "When do you get up every day?",
            "I get up at 7 o'clock every day.",
            "When do you go to bed?",
            "I go to bed at 10 o'clock every night.",
            "When do you have breakfast?",
            "I have breakfast at 8 o'clock every morning."
        ],
        chineseText: [
            "你每天什么时候起床？",
            "我每天7点起床。",
            "你什么时候睡觉？",
            "我每天晚上10点睡觉。",
            "你什么时候吃早饭？",
            "我每天早上8点吃早饭。"
        ]
    },
    {
        id: "1-67",
        bookId: 1,
        lessonNumber: 67,
        title: "The weekend",
        englishText: [
            "What are you going to do this weekend?",
            "I'm going to stay at home.",
            "What are you going to do this weekend?",
            "I'm going to visit my friends.",
            "What are you going to do this weekend?",
            "I'm going to read some books.",
            "What are you going to do this weekend?",
            "I'm going to write some letters."
        ],
        chineseText: [
            "这个周末你打算干什么？",
            "我打算待在家里。",
            "这个周末你打算干什么？",
            "我打算去看望我的朋友。",
            "这个周末你打算干什么？",
            "我打算读一些书。",
            "这个周末你打算干什么？",
            "我打算写一些信。"
        ]
    },
    {
        id: "1-68",
        bookId: 1,
        lessonNumber: 68,
        title: "What are you going to do?",
        englishText: [
            "I'm going to paint this bookcase.",
            "What colour are you going to paint it?",
            "I'm going to paint it pink.",
            "I'm going to wash the car.",
            "Are you going to wash it?",
            "Yes, I am.",
            "I'm going to clean the windows.",
            "Are you going to clean them?",
            "Yes, I am."
        ],
        chineseText: [
            "我打算给这个书架刷漆。",
            "你打算把它漆成什么颜色？",
            "我打算把它漆成粉红色。",
            "我打算洗车。",
            "你打算洗它吗？",
            "是的。",
            "我打算擦窗户。",
            "你打算擦它们吗？",
            "是的。"
        ]
    },
    {
        id: "1-69",
        bookId: 1,
        lessonNumber: 69,
        title: "The car race",
        englishText: [
            "There is a car race near our town every year.",
            "In 1995, there was a very big race.",
            "There were hundreds of people there.",
            "My wife and I were at the race.",
            "Our friends Julie and Jack were there, too.",
            "You can see us in the crowd.",
            "We are standing on the left.",
            "There were twenty cars in the race.",
            "There were English cars, French cars, German cars, Italian cars, American cars and Japanese cars.",
            "It was an exciting finish.",
            "The winner was Billy Stewart.",
            "He was in car number fifteen.",
            "Five other cars were just behind him.",
            "On the way home, my wife said to me, 'Don't drive so quickly! You're not Billy Stewart!'"
        ],
        chineseText: [
            "每年我们城镇附近都有一场汽车比赛。",
            "1995年举行了一次盛大的比赛。",
            "有数百人到场观看。",
            "我和我的妻子也去了。",
            "我们的朋友朱莉和杰克也去了。",
            "你可以在人群中看到我们。",
            "我们站在左边。",
            "比赛中有二十辆汽车。",
            "有英国车、法国车、德国车、意大利车、美国车和日本车。",
            "比赛的结尾是激动人心的。",
            "获胜者是比利·斯图尔特。",
            "他在第15号车里。",
            "另外五辆车紧跟在他后面。",
            "在回家的路上，我妻子对我说：“别开得这么快！你可不是比利·斯图尔特！”"
        ]
    },
    {
        id: "1-70",
        bookId: 1,
        lessonNumber: 70,
        title: "When were you at the ...?",
        englishText: [
            "When were you at the butcher's?",
            "I was at the butcher's on Monday.",
            "When were you at the hairdresser's?",
            "I was at the hairdresser's on Thursday.",
            "When were you at the office?",
            "I was at the office on Tuesday.",
            "When were you at the baker's?",
            "I was at the baker's on Friday.",
            "When were you at school?",
            "I was at school on Wednesday."
        ],
        chineseText: [
            "你什么时候在肉店的？",
            "我周一在肉店。",
            "你什么时候在理发店的？",
            "我周四在理发店。",
            "你什么时候在办公室的？",
            "我周二在办公室。",
            "你什么时候在面包店的？",
            "我周五在面包店。",
            "你什么时候在学校的？",
            "我周三在学校。"
        ]
    },
    {
        id: "1-71",
        bookId: 1,
        lessonNumber: 71,
        title: "He's awful!",
        englishText: [
            "Hello, Helen.",
            "Hi, Steven.",
            "How was your weekend?",
            "It was very nice, thank you.",
            "Did you do anything interesting?",
            "Yes, I did. I went to the cinema.",
            "Did you enjoy the film?",
            "It was very interesting. What about you?",
            "I stayed at home.",
            "Did you have a good weekend?",
            "No, I didn't. I had a terrible weekend.",
            "Why? What did you do?",
            "I stayed at home, too.",
            "But I watched television all day.",
            "Did you watch a good programme?",
            "No, I didn't. I watched a very bad programme."
        ],
        chineseText: [
            "你好，海伦。",
            "你好，史蒂文。",
            "周末过得好吗？",
            "很好，谢谢。",
            "你做了什么有趣的事吗？",
            "是的，我去看电影了。",
            "你喜欢那部电影吗？",
            "非常有趣。你呢？",
            "我待在家里。",
            "周末过得愉快吗？",
            "不，不愉快。我过了一个很糟糕的周末。",
            "为什么？你做了什么？",
            "我也待在家里。",
            "但我一整天都在看电视。",
            "你看了好节目吗？",
            "没有，我看了一个非常糟糕的节目。"
        ]
    },
    {
        id: "1-72",
        bookId: 1,
        lessonNumber: 72,
        title: "When did you...?",
        englishText: [
            "When did you meet him?",
            "I met him the day before yesterday.",
            "When did you phone him?",
            "I phoned him yesterday.",
            "When did you see him?",
            "I saw him this morning.",
            "When did you lose your pen?",
            "I lost my pen last week.",
            "When did you buy that car?",
            "I bought that car three years ago."
        ],
        chineseText: [
            "你什么时候见到他的？",
            "我前天见到他的。",
            "你什么时候给他打电话的？",
            "我昨天给他打电话的。",
            "你什么时候见到他的？",
            "我今天早上见到他的。",
            "你什么时候丢的钢笔？",
            "我上星期丢的钢笔。",
            "你什么时候买的那辆车？",
            "我三年前买的那辆车。"
        ]
    },
    {
        id: "1-73",
        bookId: 1,
        lessonNumber: 73,
        title: "The way to King Street",
        englishText: [
            "Last week Mrs. Mills went to London.",
            "She does not know London very well, and she lost her way.",
            "Suddenly, she saw a man near a bus stop.",
            "I can ask him the way, she said to herself.",
            "Excuse me, she said. Can you tell me the way to King Street, please?",
            "The man smiled pleasantly.",
            "He did not understand English!",
            "He spoke German.",
            "He was a tourist.",
            "Then he put his hand into his pocket, and took out a phrasebook.",
            "He opened the book and found a phrase.",
            "He read the phrase slowly.",
            "I am sorry, he said. I do not speak English."
        ],
        chineseText: [
            "上星期米尔斯夫人去了伦敦。",
            "她对伦敦不太熟悉，迷了路。",
            "突然，她在公共汽车站附近看到一个男人。",
            "“我可以向他问路，”她自言自语地说。",
            "“打扰一下，”她说。“请问去国王街怎么走？”",
            "那个男人友好地笑了笑。",
            "他不懂英语！",
            "他讲德语。",
            "他是个游客。",
            "然后他把手伸进衣袋，掏出一本常用语手册。",
            "他翻开书找到了一条短语。",
            "他缓慢地读着短语。",
            "“很抱歉，”他说。“我不会讲英语。”"
        ]
    },
    {
        id: "1-74",
        bookId: 1,
        lessonNumber: 74,
        title: "What did they do?",
        englishText: [
            "What did he do yesterday?",
            "He cleaned his shoes yesterday.",
            "What did she do yesterday?",
            "She typed a letter yesterday.",
            "What did they do yesterday?",
            "They played football yesterday.",
            "What did he do the day before yesterday?",
            "He painted the bookcase the day before yesterday.",
            "What did she do the day before yesterday?",
            "She boiled an egg the day before yesterday."
        ],
        chineseText: [
            "他昨天做了什么？",
            "他昨天擦了鞋。",
            "她昨天做了什么？",
            "她昨天打了一封信。",
            "他们昨天做了什么？",
            "他们昨天踢了足球。",
            "他前天做了什么？",
            "他前天给书架刷了漆。",
            "她前天做了什么？",
            "她前天煮了一个鸡蛋。"
        ]
    },
    {
        id: "1-75",
        bookId: 1,
        lessonNumber: 75,
        title: "Uncomfortable shoes",
        englishText: [
            "Do you have any shoes like these?",
            "What size?",
            "Size five.",
            "What colour?",
            "Black.",
            "I'm sorry. We don't have any.",
            "But my sister bought this pair last month.",
            "Did she buy them here?",
            "No, she bought them in the U.S.",
            "We had some like those a month ago, but we don't have any now.",
            "Can you get a pair for me, please?",
            "I'm afraid that I can't.",
            "They were in fashion last year and the year before last.",
            "But they're not in fashion this year.",
            "These shoes are in fashion now.",
            "They look very uncomfortable.",
            "They are very uncomfortable. But women always wear uncomfortable shoes!"
        ],
        chineseText: [
            "你们有这种鞋子吗？",
            "什么尺码？",
            "5码的。",
            "什么颜色？",
            "黑色的。",
            "很抱歉，我们没有。",
            "但是我姐姐上个月买了这样一双。",
            "她是在这里买的吗？",
            "不，她是在美国买的。",
            "一个月前我们有一些像那样的，但现在没有了。",
            "请你为我找一双好吗？",
            "恐怕不行。",
            "它们去年和前年流行。",
            "但今年不流行了。",
            "这种鞋子现在很流行。",
            "它们看起来很不舒服。",
            "确实很不舒服。可是女人们总是穿不舒服的鞋子！"
        ]
    },
    {
        id: "1-76",
        bookId: 1,
        lessonNumber: 76,
        title: "When did you...?",
        englishText: [
            "When did you last see him?",
            "I last saw him three months ago.",
            "When did you last go to the cinema?",
            "I last went to the cinema two weeks ago.",
            "When did you last read this book?",
            "I last read this book a year ago.",
            "When did you last meet him?",
            "I last met him five days ago.",
            "When did you last write to him?",
            "I last wrote to him six months ago."
        ],
        chineseText: [
            "你最后一次见到他是什么时候？",
            "我最后一次见到他是三个月前。",
            "你最后一次去看电影是什么时候？",
            "我最后一次去看电影是两周前。",
            "你最后一次读这本书是什么时候？",
            "我最后一次读这本书是一年前。",
            "你最后一次见到他是什么时候？",
            "我最后一次见到他是五天前。",
            "你最后一次给他写信是什么时候？",
            "我最后一次给他写信是六个月前。"
        ]
    },
    {
        id: "1-77",
        bookId: 1,
        lessonNumber: 77,
        title: "Terrible toothache",
        englishText: [
            "What's the matter, Mr. Croft?",
            "I have a terrible toothache.",
            "When did it start?",
            "It started yesterday.",
            "You must see a dentist.",
            "I can't!",
            "Why not?",
            "Because he says I'm too old!",
            "He says I'm eighty-seven years old, and he doesn't want to treat me!",
            "That's absurd!",
            "He's very rude!",
            "I'm going to see him myself."
        ],
        chineseText: [
            "怎么了，克罗夫特先生？",
            "我牙痛得厉害。",
            "什么时候开始的？",
            "昨天开始的。",
            "你必须去看牙医。",
            "我不能去！",
            "为什么不能？",
            "因为他说我太老了！",
            "他说我八十七岁了，他不想给我治疗！",
            "太荒唐了！",
            "他太粗鲁了！",
            "我打算亲自去看看他。"
        ]
    },
    {
        id: "1-78",
        bookId: 1,
        lessonNumber: 78,
        title: "When did you...?",
        englishText: [
            "When did you have a holiday?",
            "I had a holiday last month.",
            "When did you have a bath?",
            "I had a bath the day before yesterday.",
            "When did you have a haircut?",
            "I had a haircut yesterday.",
            "When did you have a lesson?",
            "I had a lesson last week.",
            "When did you have a party?",
            "I had a party last night."
        ],
        chineseText: [
            "你什么时候度假的？",
            "我上个月度假的。",
            "你什么时候洗澡的？",
            "我前天洗澡的。",
            "你什么时候理发的？",
            "我昨天理发的。",
            "你什么时候上课的？",
            "我上周上课的。",
            "你什么时候举办聚会的？",
            "我昨晚举办聚会的。"
        ]
    },
    {
        id: "1-79",
        bookId: 1,
        lessonNumber: 79,
        title: "Carol's shopping list",
        englishText: [
            "Are you going to the shops, Carol?",
            "Yes, I am. I'm going to get some eggs.",
            "Do you need any flour?",
            "Yes, I do. I need a lot of flour.",
            "What about butter?",
            "I need some butter, too.",
            "I'm going to get a lot of things.",
            "I'm going to get a bottle of milk, a pound of sugar, and a loaf of bread.",
            "Do you need any tea?",
            "Yes, I do. I need a quarter of a pound of tea.",
            "And I need some coffee, too.",
            "I need a half a pound of coffee.",
            "And I need some cheese.",
            "I need a pound of cheese.",
            "That's a lot of things.",
            "Yes, I know. I'm going to have a busy morning!"
        ],
        chineseText: [
            "卡罗尔，你要去买东西吗？",
            "是的，我去买些鸡蛋。",
            "你需要面粉吗？",
            "是的，我需要很多面粉。",
            "黄油呢？",
            "我也需要一些黄油。",
            "我要买很多东西。",
            "我要买一瓶牛奶、一磅糖和一条面包。",
            "你需要茶叶吗？",
            "是的，我需要四分之一磅茶叶。",
            "我还需要一些咖啡。",
            "我需要半磅咖啡。",
            "我还需要一些奶酪。",
            "我需要一磅奶酪。",
            "东西真多。",
            "是的，我知道。我将有一个忙碌的上午！"
        ]
    },
    {
        id: "1-80",
        bookId: 1,
        lessonNumber: 80,
        title: "I must go to the grocer's",
        englishText: [
            "I must go to the grocer's.",
            "We need a lot of things.",
            "I must get some bread.",
            "We haven't got much bread.",
            "I must get some milk.",
            "We haven't got much milk.",
            "I must get some eggs.",
            "We haven't got many eggs.",
            "I must get some cheese.",
            "We haven't got much cheese."
        ],
        chineseText: [
            "我必须去食品店。",
            "我们需要很多东西。",
            "我必须买些面包。",
            "我们面包不多了。",
            "我必须买些牛奶。",
            "我们牛奶不多了。",
            "我必须买些鸡蛋。",
            "我们鸡蛋不多了。",
            "我必须买些奶酪。",
            "我们奶酪不多了。"
        ]
    },
    {
        id: "1-81",
        bookId: 1,
        lessonNumber: 81,
        title: "Roast beef and potatoes",
        englishText: [
            "Where's Mrs. Smith? She's in the kitchen.",
            "Is she cooking a meal?",
            "Yes, she is. She's making some coffee.",
            "Where's Mr. Smith? He's in the kitchen, too.",
            "Is he helping her?",
            "No, he isn't. He's sitting in a chair.",
            "He's reading a newspaper.",
            "What are the children doing?",
            "They're playing in the garden.",
            "What about the dog?",
            "The dog's in the garden, too. It's running across the grass."
        ],
        chineseText: [
            "史密斯夫人在哪里？她在厨房里。",
            "她在做饭吗？",
            "是的，她在煮咖啡。",
            "史密斯先生在哪里？他也在厨房里。",
            "他在帮她吗？",
            "不，他没有。他正坐在椅子上。",
            "他正在看报纸。",
            "孩子们在做什么？",
            "他们正在花园里玩。",
            "狗呢？",
            "狗也在花园里。它正在草地上跑。"
        ]
    },
    {
        id: "1-82",
        bookId: 1,
        lessonNumber: 82,
        title: "I had...",
        englishText: [
            "I had a cup of tea.",
            "I had a glass of milk.",
            "I had a piece of bread.",
            "I had a bar of chocolate.",
            "I had a bottle of lemonade.",
            "I had a pound of sugar."
        ],
        chineseText: [
            "我喝了一杯茶。",
            "我喝了一杯牛奶。",
            "我吃了一片面包。",
            "我吃了一块巧克力。",
            "我喝了一瓶柠檬水。",
            "我买了一磅糖。"
        ]
    },
    {
        id: "1-83",
        bookId: 1,
        lessonNumber: 83,
        title: "Going on holiday",
        englishText: [
            "Hello, Sam. Come in.",
            "Hi, Sam. We're having lunch. Do you want to have lunch with us?",
            "No, thank you, Tom. I've already had lunch.",
            "Have a cup of coffee then.",
            "I've just had a cup, thank you.",
            "Let's go into the living room, Carol.",
            "Excuse the mess. This room's very untidy.",
            "We're packing our suitcases. We're going to leave tomorrow.",
            "Tom and I are going to have a holiday.",
            "Aren't you lucky!",
            "When are you going to have a holiday, Sam?",
            "I don't know. I've already had my holiday this year.",
            "Where did you go?",
            "I stayed at home!"
        ],
        chineseText: [
            "你好，萨姆。进来吧。",
            "你好，萨姆。我们正在吃午饭。你想和我们一起吃午饭吗？",
            "不了，谢谢，汤姆。我已经吃过午饭了。",
            "那么喝杯咖啡吧。",
            "我刚喝了一杯，谢谢。",
            "我们到客厅里去吧，卡罗尔。",
            "请原谅这里乱七八糟。这个房间太乱了。",
            "我们正在收拾行李。我们明天就要走了。",
            "汤姆和我准备去度假。",
            "你们真幸运！",
            "萨姆，你什么时候去度假？",
            "我不知道。我今年已经度过假了。",
            "你去哪儿了？",
            "我待在家里了！"
        ]
    },
    {
        id: "1-84",
        bookId: 1,
        lessonNumber: 84,
        title: "Have you had...?",
        englishText: [
            "Have you had any beer?",
            "Yes, I have.",
            "Have you had any wine?",
            "No, I haven't.",
            "Have you had any milk?",
            "Yes, I have.",
            "Have you had any coffee?",
            "No, I haven't.",
            "Have you had any tea?",
            "Yes, I have."
        ],
        chineseText: [
            "你喝过啤酒吗？",
            "是的，我喝过。",
            "你喝过葡萄酒吗？",
            "不，我没喝过。",
            "你喝过牛奶吗？",
            "是的，我喝过。",
            "你喝过咖啡吗？",
            "不，我没喝过。",
            "你喝过茶吗？",
            "是的，我喝过。"
        ]
    },
    {
        id: "1-85",
        bookId: 1,
        lessonNumber: 85,
        title: "Paris in the spring",
        englishText: [
            "Have you ever been to Paris, Ken?",
            "Yes, I have. I was there in April.",
            "Paris in the spring, eh?",
            "It was spring, but the weather was awful.",
            "It rained all the time.",
            "Just like London!",
            "What did you do there?",
            "We went to a lot of museums.",
            "Did you enjoy yourself?",
            "Yes, I did. We had a lovely time.",
            "When did you go?",
            "We went on April 14th.",
            "And when did you come back?",
            "We came back on April 18th."
        ],
        chineseText: [
            "肯，你去过巴黎吗？",
            "是的，我去过。我四月份在那里。",
            "巴黎的春天，是吗？",
            "是春天，但天气太糟了。",
            "一直下雨。",
            "就像伦敦一样！",
            "你在那里做了什么？",
            "我们去了很多博物馆。",
            "你玩得开心吗？",
            "是的，很开心。我们玩得很愉快。",
            "你们什么时候去的？",
            "我们4月14日去的。",
            "你们什么时候回来的？",
            "我们4月18日回来的。"
        ]
    },
    {
        id: "1-86",
        bookId: 1,
        lessonNumber: 86,
        title: "What have you done?",
        englishText: [
            "What have you done?",
            "I've just cleaned my shoes.",
            "What has she done?",
            "She's just boiled an egg.",
            "What have they done?",
            "They've just painted the bookcase.",
            "What has he done?",
            "He's just typed a letter.",
            "What have you done?",
            "I've just dusted the table."
        ],
        chineseText: [
            "你做了什么？",
            "我刚擦完鞋。",
            "她做了什么？",
            "她刚煮了一个鸡蛋。",
            "他们做了什么？",
            "他们刚给书架刷完漆。",
            "他做了什么？",
            "他刚打完一封信。",
            "你做了什么？",
            "我刚掸完桌子上的灰尘。"
        ]
    },
    {
        id: "1-87",
        bookId: 1,
        lessonNumber: 87,
        title: "A car crash",
        englishText: [
            "Is my car ready yet?",
            "I don't know, sir. What's the number of your car?",
            "It's LFZ 312G.",
            "When did you bring it to us?",
            "I brought it here three days ago.",
            "Ah yes, I remember now.",
            "Have your mechanics finished yet?",
            "No, they're still working on it.",
            "Let's go into the garage and have a look at it.",
            "Isn't that your car?",
            "Well, it was my car.",
            "Didn't you have a crash?",
            "That's right. I drove it into a lamp-post.",
            "Can your mechanics repair it?",
            "Well, they're trying to repair it, sir.",
            "But to tell you the truth, you need a new car!"
        ],
        chineseText: [
            "我的车修好了吗？",
            "我不知道，先生。您的车号码是多少？",
            "是LFZ 312G。",
            "您什么时候把它送来的？",
            "三天前送来的。",
            "啊，是的，我现在记起来了。",
            "你们的机械师修好了吗？",
            "没有，他们还在修。",
            "我们到车库去看看吧。",
            "那不是您的车吗？",
            "嗯，曾经是我的车。",
            "您出车祸了吗？",
            "是的。我把它撞到灯柱上了。",
            "你们的机械师能修好吗？",
            "嗯，他们正在设法修，先生。",
            "不过说实话，您需要一辆新车！"
        ]
    },
    {
        id: "1-88",
        bookId: 1,
        lessonNumber: 88,
        title: "Have you finished yet?",
        englishText: [
            "Have you finished yet?",
            "No, I haven't finished yet.",
            "Has he finished yet?",
            "Yes, he has finished already.",
            "Have they finished yet?",
            "No, they haven't finished yet.",
            "Has she finished yet?",
            "Yes, she has finished already.",
            "Have you finished yet?",
            "Yes, I have finished already."
        ],
        chineseText: [
            "你做完了吗？",
            "不，我还没做完。",
            "他做完了吗？",
            "是的，他已经做完了。",
            "他们做完了吗？",
            "不，他们还没做完。",
            "她做完了吗？",
            "是的，她已经做完了。",
            "你做完了吗？",
            "是的，我已经做完了。"
        ]
    },
    {
        id: "1-89",
        bookId: 1,
        lessonNumber: 89,
        title: "For sale",
        englishText: [
            "Good afternoon. I believe that this house is for sale.",
            "That's right.",
            "May I have a look at it, please?",
            "Yes, of course. Come in.",
            "How long have you lived here?",
            "I've lived here for twenty years.",
            "Twenty years! That's a long time.",
            "Yes, I've been here since 1976.",
            "Then why do you want to sell it?",
            "Because I've just retired.",
            "I want to buy a small house in the country.",
            "How much does this house cost?",
            "￡68,500.",
            "That's a lot of money!",
            "It's worth every penny of it.",
            "Well, I like the house, but I can't decide yet.",
            "My wife must see it first.",
            "Women always have the last word."
        ],
        chineseText: [
            "下午好。我想这房子是要出售的吧。",
            "是的。",
            "我可以看一看吗？",
            "当然可以。进来吧。",
            "您在这里住了多久？",
            "我在这里住了二十年了。",
            "二十年！那是很长一段时间了。",
            "是的，从1976年起我就住在这里。",
            "那么您为什么要卖掉它呢？",
            "因为我刚退休。",
            "我想在乡下买一栋小房子。",
            "这房子卖多少钱？",
            "68,500英镑。",
            "那可真是一大笔钱啊！",
            "它确实值这么多钱。",
            "啊，我喜欢这房子，但我还不能决定。",
            "我妻子必须先来看一看。",
            "女人总是最后说了算的。"
        ]
    },
    {
        id: "1-90",
        bookId: 1,
        lessonNumber: 90,
        title: "Have you... yet?",
        englishText: [
            "Have you met him yet?",
            "Yes, I've already met him.",
            "Have you had breakfast yet?",
            "No, I haven't had breakfast yet.",
            "Have you seen the new play yet?",
            "Yes, I've already seen it.",
            "Have you done your homework yet?",
            "No, I haven't done it yet.",
            "Have you read this book yet?",
            "Yes, I've already read it."
        ],
        chineseText: [
            "你见过他了吗？",
            "是的，我已经见过他了。",
            "你吃过早饭了吗？",
            "不，我还没吃早饭。",
            "你看过那出新戏了吗？",
            "是的，我已经看过了。",
            "你做完作业了吗？",
            "不，我还没做完。",
            "你读过这本书了吗？",
            "是的，我已经读过了。"
        ]
    },
    {
        id: "1-91",
        bookId: 1,
        lessonNumber: 91,
        title: "Poor Ian!",
        englishText: [
            "Has Ian sold his house yet?",
            "Yes, he has. He sold it last week.",
            "Has he moved to his new house yet?",
            "No, not yet. He's still here.",
            "He's going to move tomorrow.",
            "When? Tomorrow morning?",
            "No, tomorrow afternoon. I'll miss him.",
            "He has always been a good neighbor.",
            "He's a very nice person. We'll all miss him.",
            "When will the new people move into this house?",
            "I think that they'll move in the day after tomorrow.",
            "Will you see Ian today?",
            "Yes, I will.",
            "Please give him my regards.",
            "Poor Ian! He didn't want to leave this house.",
            "No, he didn't want to leave, but his wife did!"
        ],
        chineseText: [
            "伊恩把他的房子卖掉了吗？",
            "是的，卖掉了。他上星期卖掉的。",
            "他已经迁进新居了吗？",
            "不，还没有。他仍然在这里。",
            "他打算明天搬家。",
            "什么时候？明天上午吗？",
            "不，明天下午。我会想念他的。",
            "他一直是个好邻居。",
            "他是个非常好的人。我们大家都会想念他的。",
            "新住户什么时候搬进这所房子？",
            "我想他们将在后天搬进来。",
            "你今天会见到伊恩吗？",
            "是的，我会见到他。",
            "请代我问候他。",
            "可怜的伊恩！他本不想离开这幢房子。",
            "是啊，他是不想离开，可是他妻子想离开！"
        ]
    },
    {
        id: "1-92",
        bookId: 1,
        lessonNumber: 92,
        title: "When will...?",
        englishText: [
            "When will he arrive?",
            "He'll arrive tomorrow.",
            "When will she come?",
            "She'll come next week.",
            "When will they leave?",
            "They'll leave the day after tomorrow.",
            "When will you go?",
            "I'll go in an hour.",
            "When will he finish?",
            "He'll finish in a week."
        ],
        chineseText: [
            "他什么时候到达？",
            "他明天到达。",
            "她什么时候来？",
            "她下周来。",
            "他们什么时候离开？",
            "他们后天离开。",
            "你什么时候走？",
            "我一小时后走。",
            "他什么时候完成？",
            "他一周后完成。"
        ]
    },
    {
        id: "1-93",
        bookId: 1,
        lessonNumber: 93,
        title: "Our new neighbor",
        englishText: [
            "Do you know our new neighbor, Mr. Hill?",
            "Yes, I do.",
            "He's a pilot.",
            "Really?",
            "What's his name?",
            "His name is John Hill.",
            "Is he married?",
            "Yes, he is.",
            "How many people are there in his family?",
            "There are four people in his family.",
            "They're his wife, his two children and himself.",
            "Where does he come from?",
            "He comes from Australia.",
            "Where does he live now?",
            "He lives next door."
        ],
        chineseText: [
            "你认识我们的新邻居希尔先生吗？",
            "是的，我认识。",
            "他是个飞行员。",
            "真的吗？",
            "他叫什么名字？",
            "他叫约翰·希尔。",
            "他结婚了吗？",
            "是的，他结婚了。",
            "他家有几口人？",
            "他家有四口人。",
            "他们是他的妻子、他的两个孩子和他自己。",
            "他是哪里人？",
            "他是澳大利亚人。",
            "他现在住在哪里？",
            "他住在隔壁。"
        ]
    },
    {
        id: "1-94",
        bookId: 1,
        lessonNumber: 94,
        title: "When did you...?",
        englishText: [
            "When did you arrive?",
            "I arrived yesterday.",
            "When did he leave?",
            "He left the day before yesterday.",
            "When did they come?",
            "They came last week.",
            "When did she go?",
            "She went an hour ago.",
            "When did you finish?",
            "I finished a week ago."
        ],
        chineseText: [
            "你什么时候到达的？",
            "我昨天到达的。",
            "他什么时候离开的？",
            "他前天离开的。",
            "他们什么时候来的？",
            "他们上周来的。",
            "她什么时候走的？",
            "她一小时前走的。",
            "你什么时候完成的？",
            "我一周前完成的。"
        ]
    },
    {
        id: "1-95",
        bookId: 1,
        lessonNumber: 95,
        title: "Tickets, please",
        englishText: [
            "Two return tickets to London, please.",
            "When do you want to travel?",
            "On September 1st.",
            "I'll get the tickets for you.",
            "Single or return?",
            "Return, please.",
            "What time will the next train leave?",
            "At nineteen minutes past eight.",
            "Which platform?",
            "Platform Two.",
            "What time will it arrive in London?",
            "At eleven minutes past eleven.",
            "Thank you very much.",
            "You're welcome."
        ],
        chineseText: [
            "请买两张到伦敦的往返票。",
            "你们想什么时候走？",
            "9月1日。",
            "我来给你们买票。",
            "单程票还是往返票？",
            "请给往返票。",
            "下一班火车什么时候开？",
            "8点19分。",
            "哪个站台？",
            "2号站台。",
            "几点到达伦敦？",
            "11点11分。",
            "非常感谢。",
            "不客气。"
        ]
    },
    {
        id: "1-96",
        bookId: 1,
        lessonNumber: 96,
        title: "What's the exact time?",
        englishText: [
            "What time is it?",
            "It's ten minutes past three.",
            "What time is it?",
            "It's twenty-five minutes past four.",
            "What time is it?",
            "It's ten minutes to six.",
            "What time is it?",
            "It's five minutes to eight.",
            "What time is it?",
            "It's half past nine."
        ],
        chineseText: [
            "几点钟了？",
            "3点10分。",
            "几点钟了？",
            "4点25分。",
            "几点钟了？",
            "5点50分。",
            "几点钟了？",
            "7点55分。",
            "几点钟了？",
            "9点半。"
        ]
    },
    {
        id: "1-97",
        bookId: 1,
        lessonNumber: 97,
        title: "A small blue case",
        englishText: [
            "I left a suitcase on the train to London the other day.",
            "Can you describe it, sir?",
            "It's a small blue case and it's got a zip.",
            "There's a label on the handle with my name and address on it.",
            "Is this case yours?",
            "No, that's not mine.",
            "What about this one?",
            "This one's got a label.",
            "Let me check it.",
            "What's your name and address?",
            "David Hall, 83 Bridge Street.",
            "That's right. D.N. Hall, 83 Bridge Street.",
            "Three pounds fifty, please.",
            "Here you are.",
            "Thank you.",
            "Key?"
        ],
        chineseText: [
            "几天前我把一只手提箱忘在开往伦敦的火车上了。",
            "先生，您能描述一下它是什么样子吗？",
            "是一只蓝色的小箱子，上面有拉链。",
            "箱把上有一张标签，上面写着我的姓名和地址。",
            "这箱子是您的吗？",
            "不，那不是我的。",
            "这只箱子呢？",
            "这只箱子有标签。",
            "让我查一下。",
            "您的姓名和地址是什么？",
            "大卫·霍尔，大桥街83号。",
            "那就对了。D.N.霍尔，大桥街83号。",
            "请付3英镑50便士。",
            "给你。",
            "谢谢。",
            "钥匙呢？"
        ]
    },
    {
        id: "1-98",
        bookId: 1,
        lessonNumber: 98,
        title: "Whose is it?",
        englishText: [
            "Whose is this bag?",
            "It's Jim's bag.",
            "Whose is this coat?",
            "It's Sophie's coat.",
            "Whose is this tie?",
            "It's my father's tie.",
            "Whose is this umbrella?",
            "It's my mother's umbrella.",
            "Whose is this pen?",
            "It's my brother's pen."
        ],
        chineseText: [
            "这是谁的包？",
            "是吉姆的包。",
            "这是谁的外套？",
            "是索菲的外套。",
            "这是谁的领带？",
            "是我父亲的领带。",
            "这是谁的伞？",
            "是我母亲的伞。",
            "这是谁的钢笔？",
            "是我兄弟的钢笔。"
        ]
    },
    {
        id: "1-99",
        bookId: 1,
        lessonNumber: 99,
        title: "Ow!",
        englishText: [
            "What's the matter, Andy?",
            "I slipped and fell downstairs.",
            "Have you hurt yourself?",
            "Yes, I have. I think that I've hurt my back.",
            "Try and stand up.",
            "Can you stand up?",
            "I'm afraid that I can't stand up.",
            "I think that the doctor had better see you.",
            "Can you get up?",
            "I'm afraid I can't get up.",
            "I'll phone the doctor."
        ],
        chineseText: [
            "怎么了，安迪？",
            "我滑倒了，从楼梯上摔下来了。",
            "你摔伤了没有？",
            "是的，摔伤了。我想我伤了背。",
            "试着站起来。",
            "你能站起来吗？",
            "恐怕我站不起来。",
            "我想最好请医生来给你看一下。",
            "你能起来吗？",
            "恐怕我起不来。",
            "我去给医生打电话。"
        ]
    },
    {
        id: "1-100",
        bookId: 1,
        lessonNumber: 100,
        title: "He says that...",
        englishText: [
            "He says that he is ill.",
            "He says that he feels ill.",
            "He says that he has a headache.",
            "He says that he wants a haircut.",
            "He says that he is going to sell his house.",
            "He says that he is busy."
        ],
        chineseText: [
            "他说他病了。",
            "他说他觉得不舒服。",
            "他说他头痛。",
            "他说他想理发。",
            "他说他打算把房子卖掉。",
            "他说他很忙。"
        ]
    },
    {
        id: "1-101",
        bookId: 1,
        lessonNumber: 101,
        title: "A card from Jimmy",
        englishText: [
            "Read Jimmy's card to me, please, Penny.",
            "'I have just arrived in Scotland and I'm staying at a Youth Hostel.'",
            "Eh?",
            "He says he's just arrived in Scotland.",
            "He says he's staying at a Youth Hostel.",
            "You know he's a member of the Y.H.A.",
            "The Y.H.A.?",
            "The Youth Hostels Association.",
            "What else does he say?",
            "'I'll write a letter soon. I hope you are all well.'",
            "What did he say?",
            "He says he'll write a letter soon.",
            "He hopes we are all well.",
            "That's good news."
        ],
        chineseText: [
            "请把吉米的明信片念给我听听，彭妮。",
            "“我刚到苏格兰，现住在一家青年招待所。”",
            "啊？",
            "他说他刚到苏格兰。",
            "他说他住在一家青年招待所。",
            "你知道他是青年招待所协会的会员。",
            "青年招待所协会？",
            "青年招待所协会。",
            "他还说了些什么？",
            "“我很快就会写信的。祝你们大家身体都好。”",
            "他说什么？",
            "他说他很快就会写信的。",
            "他祝我们大家身体都好。",
            "这是个好消息。"
        ]
    },
    {
        id: "1-102",
        bookId: 1,
        lessonNumber: 102,
        title: "He says he... She says she... They say they...",
        englishText: [
            "He says he is tired.",
            "She says she is tired.",
            "They say they are tired.",
            "He says he has a cold.",
            "She says she has a cold.",
            "They say they have a cold.",
            "He says he will write a letter.",
            "She says she will write a letter.",
            "They say they will write a letter."
        ],
        chineseText: [
            "他说他累了。",
            "她说她累了。",
            "他们说他们累了。",
            "他说他感冒了。",
            "她说她感冒了。",
            "他们说他们感冒了。",
            "他说他将写一封信。",
            "她说她将写一封信。",
            "他们说他们将写一封信。"
        ]
    },
    {
        id: "1-103",
        bookId: 1,
        lessonNumber: 103,
        title: "The French test",
        englishText: [
            "How was the exam, Richard?",
            "Not too bad.",
            "I think I passed in English and Mathematics.",
            "The questions were very easy.",
            "How about you, Gary?",
            "The English and Maths papers weren't easy enough for me.",
            "I hope I didn't fail.",
            "I think I failed the French paper.",
            "I could answer sixteen of the questions.",
            "They were very easy.",
            "But I couldn't answer the rest.",
            "They were too difficult for me.",
            "French tests are awful, aren't they?",
            "I hate them.",
            "I'm sure I've got a low mark.",
            "Oh, cheer up!",
            "Perhaps we didn't do too badly.",
            "The guy next to me wrote his name at the top of the paper.",
            "Then he sat there and looked at it for three hours!",
            "He didn't write a word!"
        ],
        chineseText: [
            "考试考得怎么样，理查德？",
            "不算太坏。",
            "我想我的英语和数学及格了。",
            "题目很容易。",
            "你呢，加里？",
            "英语和数学试题对我来说不很容易。",
            "我希望我没有不及格。",
            "我想我的法语及不了格。",
            "我能回答16道题。",
            "这些题很容易。",
            "但我回答不出其他的题。",
            "那些题对我来说太难了。",
            "法语考试真讨厌，不是吗？",
            "我讨厌法语考试。",
            "我肯定我的分数很低。",
            "啊，别灰心！",
            "或许我们考得还不太糟。",
            "坐在我旁边的那个人只在试卷顶端写了自己的名字。",
            "然后他就坐在那里，对着试卷看了3个小时！",
            "一个字也没写！"
        ]
    },
    {
        id: "1-104",
        bookId: 1,
        lessonNumber: 104,
        title: "Too, very, enough",
        englishText: [
            "It's too small.",
            "It's very small.",
            "Is it small enough?",
            "It's too big.",
            "It's very big.",
            "Is it big enough?",
            "It's too hot.",
            "It's very hot.",
            "Is it hot enough?",
            "It's too cold.",
            "It's very cold.",
            "Is it cold enough?"
        ],
        chineseText: [
            "它太小了。",
            "它很小。",
            "它够小吗？",
            "它太大了。",
            "它很大。",
            "它够大吗？",
            "太热了。",
            "很热。",
            "够热吗？",
            "太冷了。",
            "很冷。",
            "够冷吗？"
        ]
    },
    {
        id: "1-105",
        bookId: 1,
        lessonNumber: 105,
        title: "Full of mistakes",
        englishText: [
            "What's the matter, Mrs. Jones?",
            "I've got a terrible headache.",
            "I'm sorry to hear that.",
            "What did you do?",
            "I went to bed very late last night.",
            "You look very tired.",
            "Yes, I do.",
            "You must go to bed early tonight.",
            "You mustn't go to bed late.",
            "Thank you, doctor.",
            "Goodbye.",
            "Goodbye."
        ],
        chineseText: [
            "怎么了，琼斯夫人？",
            "我头痛得厉害。",
            "听到这个消息我很抱歉。",
            "你做什么了？",
            "我昨晚睡得很晚。",
            "你看起来很疲惫。",
            "是的。",
            "你今晚必须早点上床睡觉。",
            "你不能睡得太晚。",
            "谢谢你，医生。",
            "再见。",
            "再见。"
        ]
    },
    {
        id: "1-106",
        bookId: 1,
        lessonNumber: 106,
        title: "I want you to...",
        englishText: [
            "I want you to type this letter.",
            "I want you to read this book.",
            "I want you to carry this bag.",
            "I want you to do your homework.",
            "I want you to wash these clothes.",
            "I want you to listen to the radio."
        ],
        chineseText: [
            "我要你把这封信打出来。",
            "我要你读这本书。",
            "我要你拎这个包。",
            "我要你做作业。",
            "我要你把这些衣服洗了。",
            "我要你听收音机。"
        ]
    },
    {
        id: "1-107",
        bookId: 1,
        lessonNumber: 107,
        title: "It's too small",
        englishText: [
            "Do you like this dress, madam?",
            "I like the colour very much.",
            "It's a lovely dress, but it's too small for me.",
            "What about this one?",
            "It's lovely, but it's too large.",
            "What about this one?",
            "It's the same size.",
            "I don't like the pattern.",
            "It's too loud.",
            "I want a dress like that one, but it must be my size.",
            "I'm afraid I haven't got a larger dress.",
            "Have you got any other dress?",
            "No, we haven't.",
            "I think I'll take this one."
        ],
        chineseText: [
            "夫人，您喜欢这件连衣裙吗？",
            "我很喜欢这个颜色。",
            "这件连衣裙很漂亮，但对我来说太小了。",
            "这件怎么样？",
            "很漂亮，但太大了。",
            "这件怎么样？",
            "尺码一样。",
            "我不喜欢这种图案。",
            "太花哨了。",
            "我想要一件和那件一样的，但必须是我的尺码。",
            "恐怕没有更大的了。",
            "你们还有其他连衣裙吗？",
            "没有了。",
            "我想我就买这件吧。"
        ]
    },
    {
        id: "1-108",
        bookId: 1,
        lessonNumber: 108,
        title: "How do they compare?",
        englishText: [
            "This dress is smaller than that one.",
            "This dress is larger than that one.",
            "This dress is more expensive than that one.",
            "This dress is cheaper than that one.",
            "This dress is more beautiful than that one.",
            "This dress is less beautiful than that one."
        ],
        chineseText: [
            "这件连衣裙比那件小。",
            "这件连衣裙比那件大。",
            "这件连衣裙比那件贵。",
            "这件连衣裙比那件便宜。",
            "这件连衣裙比那件漂亮。",
            "这件连衣裙不如那件漂亮。"
        ]
    },
    {
        id: "1-109",
        bookId: 1,
        lessonNumber: 109,
        title: "A good idea",
        englishText: [
            "What's the matter, Betty?",
            "I'm very hot.",
            "Why don't you take off your coat?",
            "That's a good idea.",
            "What's the matter, Tim?",
            "I'm very cold.",
            "Why don't you put on your coat?",
            "That's a good idea.",
            "What's the matter, Sam?",
            "I'm very thirsty.",
            "Why don't you have a drink?",
            "That's a good idea."
        ],
        chineseText: [
            "怎么了，贝蒂？",
            "我很热。",
            "你为什么不脱掉外套呢？",
            "好主意。",
            "怎么了，蒂姆？",
            "我很冷。",
            "你为什么不穿上外套呢？",
            "好主意。",
            "怎么了，萨姆？",
            "我很渴。",
            "你为什么不喝点东西呢？",
            "好主意。"
        ]
    },
    {
        id: "1-110",
        bookId: 1,
        lessonNumber: 110,
        title: "How do they compare?",
        englishText: [
            "I've got less money than you have.",
            "I've got fewer books than you have.",
            "I've got more money than you have.",
            "I've got more books than you have.",
            "I've got the least money.",
            "I've got the fewest books.",
            "I've got the most money.",
            "I've got the most books."
        ],
        chineseText: [
            "我的钱比你少。",
            "我的书比你少。",
            "我的钱比你多。",
            "我的书比你多。",
            "我的钱最少。",
            "我的书最少。",
            "我的钱最多。",
            "我的书最多。"
        ]
    },
    {
        id: "1-111",
        bookId: 1,
        lessonNumber: 111,
        title: "The most expensive model",
        englishText: [
            "Which model did you buy?",
            "The latest model.",
            "Is it the most expensive model in the shop?",
            "Yes, it is.",
            "It costs five hundred pounds.",
            "That's very expensive.",
            "It's the most expensive model we've got.",
            "I don't think we need the latest model.",
            "A cheaper model will do."
        ],
        chineseText: [
            "你买的是哪种型号的？",
            "最新的那种。",
            "是店里最贵的型号吗？",
            "是的。",
            "它值500英镑。",
            "那很贵啊。",
            "这是我们店里最贵的型号。",
            "我想我们不需要最新的型号。",
            "较便宜的那种就可以了。"
        ]
    },
    {
        id: "1-112",
        bookId: 1,
        lessonNumber: 112,
        title: "How do they compare?",
        englishText: [
            "This is the cheapest.",
            "This is the most expensive.",
            "This is the largest.",
            "This is the smallest.",
            "This is the best.",
            "This is the worst.",
            "This is the most interesting.",
            "This is the least interesting."
        ],
        chineseText: [
            "这是最便宜的。",
            "这是最贵的。",
            "这是最大的。",
            "这是最小的。",
            "这是最好的。",
            "这是最差的。",
            "这是最有趣的。",
            "这是最没意思的。"
        ]
    },
    {
        id: "1-113",
        bookId: 1,
        lessonNumber: 113,
        title: "Small change",
        englishText: [
            "I'm afraid I haven't got any small change.",
            "I've got some small change.",
            "Have you got any small change?",
            "Yes, I have.",
            "No, I haven't.",
            "I need some small change.",
            "I don't need any small change."
        ],
        chineseText: [
            "恐怕我没有零钱。",
            "我有一些零钱。",
            "你有零钱吗？",
            "是的，我有。",
            "不，我没有。",
            "我需要一些零钱。",
            "我不需要零钱。"
        ]
    },
    {
        id: "1-114",
        bookId: 1,
        lessonNumber: 114,
        title: "I've got none",
        englishText: [
            "I've got some coffee.",
            "I've got none.",
            "I've got some tea.",
            "I've got none.",
            "I've got some milk.",
            "I've got none.",
            "I've got some bread.",
            "I've got none.",
            "I've got some cheese.",
            "I've got none."
        ],
        chineseText: [
            "我有一些咖啡。",
            "我一点都没有。",
            "我有一些茶。",
            "我一点都没有。",
            "我有一些牛奶。",
            "我一点都没有。",
            "我有一些面包。",
            "我一点都没有。",
            "我有一些奶酪。",
            "我一点都没有。"
        ]
    },
    {
        id: "1-115",
        bookId: 1,
        lessonNumber: 115,
        title: "Knock, knock!",
        englishText: [
            "Who's there?",
            "It's me.",
            "Come in.",
            "Is everyone here?",
            "Yes, everyone's here.",
            "No, everyone isn't here.",
            "Is there anyone at home?",
            "Yes, there's someone at home.",
            "No, there's no one at home.",
            "Is there anything in the box?",
            "Yes, there's something in the box.",
            "No, there's nothing in the box."
        ],
        chineseText: [
            "谁在那儿？",
            "是我。",
            "进来。",
            "大家都来了吗？",
            "是的，大家都来了。",
            "不，不是每个人都来了。",
            "有人在家吗？",
            "是的，有人在家。",
            "不，没有人在家。",
            "盒子里有东西吗？",
            "是的，盒子里有东西。",
            "不，盒子里什么都没有。"
        ]
    },
    {
        id: "1-116",
        bookId: 1,
        lessonNumber: 116,
        title: "Every, no, any and some",
        englishText: [
            "Everyone is here.",
            "No one is here.",
            "Is anyone here?",
            "Someone is here.",
            "Everything is ready.",
            "Nothing is ready.",
            "Is anything ready?",
            "Something is ready.",
            "Everyone is tired.",
            "No one is tired.",
            "Is anyone tired?",
            "Someone is tired."
        ],
        chineseText: [
            "每个人都在这儿。",
            "没有人在这儿。",
            "有人在这儿吗？",
            "有人在这儿。",
            "一切都准备好了。",
            "什么都没准备好。",
            "有什么准备好了吗？",
            "有一些东西准备好了。",
            "每个人都累了。",
            "没有人累。",
            "有人累吗？",
            "有人累了。"
        ]
    },
    {
        id: "1-117",
        bookId: 1,
        lessonNumber: 117,
        title: "Tom's breakfast",
        englishText: [
            "When Tom woke up, it was already half past seven.",
            "He got up quickly.",
            "He washed and dressed.",
            "Then he ran to the bus stop.",
            "He got on the bus just in time.",
            "He arrived at the office at eight o'clock.",
            "He was not late."
        ],
        chineseText: [
            "当汤姆醒来时，已经7点半了。",
            "他迅速起床。",
            "他洗了脸，穿好了衣服。",
            "然后他跑向公共汽车站。",
            "他刚好赶上公共汽车。",
            "他8点钟到达办公室。",
            "他没有迟到。"
        ]
    },
    {
        id: "1-118",
        bookId: 1,
        lessonNumber: 118,
        title: "What were you doing?",
        englishText: [
            "What were you doing when he arrived?",
            "I was reading a book.",
            "What were you doing when he arrived?",
            "I was washing dishes.",
            "What were you doing when he arrived?",
            "I was watching television.",
            "What were you doing when he arrived?",
            "I was cooking a meal.",
            "What were you doing when he arrived?",
            "I was writing a letter."
        ],
        chineseText: [
            "他到达时你在做什么？",
            "我在看书。",
            "他到达时你在做什么？",
            "我在洗碗。",
            "他到达时你在做什么？",
            "我在看电视。",
            "他到达时你在做什么？",
            "我在做饭。",
            "他到达时你在做什么？",
            "我在写信。"
        ]
    },
    {
        id: "1-119",
        bookId: 1,
        lessonNumber: 119,
        title: "A true story",
        englishText: [
            "Do you like stories?",
            "I want to tell you a true story.",
            "It happened to a friend of mine a year ago.",
            "While my friend, George, was reading in bed, two thieves climbed into his kitchen.",
            "After they had entered the house, they went into the dining room.",
            "It was very dark, so they turned on a torch.",
            "Suddenly, they heard a voice behind them.",
            "What's up? What's up?",
            "someone called.",
            "The thieves dropped the torch and ran away as quickly as they could.",
            "George heard the noise and came downstairs quickly.",
            "He turned on the light, but he couldn't see anyone.",
            "The thieves had already gone.",
            "But George's parrot, Henry, was still there.",
            "What's up, George?",
            "he called.",
            "Nothing, Henry.",
            "George said and smiled.",
            "Go back to sleep."
        ],
        chineseText: [
            "你喜欢听故事吗？",
            "我想给你讲一个真实的故事。",
            "这是一年前发生在我的一个朋友身上的故事。",
            "当我的朋友乔治在床上看书时，两个小偷爬进了他的厨房。",
            "他们进入房子后，就走进了餐厅。",
            "里面很黑，于是他们打开了手电筒。",
            "突然，他们听到身后有声音。",
            "“什么事？什么事？”",
            "有人喊。",
            "小偷扔下手电筒，飞快地逃走了。",
            "乔治听到声音后，迅速下楼。",
            "他打开灯，但一个人也没看见。",
            "小偷已经逃走了。",
            "但乔治的鹦鹉亨利仍在那里。",
            "“什么事，乔治？”",
            "它喊着。",
            "“没什么，亨利。”",
            "乔治笑着说。",
            "“接着睡觉吧。”"
        ]
    },
    {
        id: "1-120",
        bookId: 1,
        lessonNumber: 120,
        title: "It had already happened",
        englishText: [
            "The moment he had said this, he regretted it.",
            "He had no sooner returned than he bought a house and went to live there.",
            "He had been there for six months before I heard from him.",
            "I had no sooner left the house than it began to rain.",
            "She had no sooner finished the letter than she went to post it.",
            "The play had already started when we got to the theatre."
        ],
        chineseText: [
            "他一说这话就后悔了。",
            "他刚一回来就买了一幢房子住了进去。",
            "他在那里住了六个月我才收到他的信。",
            "我刚离开房子天就开始下雨了。",
            "她刚写完信就去寄了。",
            "我们到达剧院时戏已经开始了。"
        ]
    },
    {
        id: "1-121",
        bookId: 1,
        lessonNumber: 121,
        title: "The man in a hat",
        englishText: [
            "Excuse me, but I think that this is my coat.",
            "Sorry, sir.",
            "Is this your coat?",
            "No, it isn't.",
            "Is this your coat?",
            "Yes, it is.",
            "Thank you very much."
        ],
        chineseText: [
            "对不起，我想这是我的外套。",
            "对不起，先生。",
            "这是您的外套吗？",
            "不，不是。",
            "这是您的外套吗？",
            "是的，是我的。",
            "非常感谢。"
        ]
    },
    {
        id: "1-122",
        bookId: 1,
        lessonNumber: 122,
        title: "Who is he?",
        englishText: [
            "Who is that man?",
            "He's the man who helped me.",
            "Who is that woman?",
            "She's the woman who met me.",
            "Who is that boy?",
            "He's the boy who sat here.",
            "Who is that girl?",
            "She's the girl who opened the door.",
            "Who is that man?",
            "He's the man who phoned me."
        ],
        chineseText: [
            "那个男人是谁？",
            "他是帮助过我的那个人。",
            "那个女人是谁？",
            "她是见过我的那个人。",
            "那个男孩是谁？",
            "他是坐在这里的那个男孩。",
            "那个女孩是谁？",
            "她是开门的那个女孩。",
            "那个男人是谁？",
            "他是给我打电话的那个人。"
        ]
    },
    {
        id: "1-123",
        bookId: 1,
        lessonNumber: 123,
        title: "A trip to Australia",
        englishText: [
            "Look, Gary!",
            "That's a photograph of our village.",
            "Yes, I know.",
            "It's a beautiful village.",
            "Who is this man?",
            "That's Mr. Jones.",
            "He's the one who bought our house.",
            "And who is this woman?",
            "That's Mrs. Jones.",
            "And who are these people?",
            "They're the people who live next door.",
            "Who is this young man?",
            "That's Robert.",
            "He's the one who gave me this book.",
            "And this?",
            "That's the dog that helped him."
        ],
        chineseText: [
            "看，加里！",
            "这是我们村庄的一张照片。",
            "是的，我知道。",
            "这是个美丽的村庄。",
            "这个男人是谁？",
            "那是琼斯先生。",
            "他就是买我们房子的那个人。",
            "这个女人是谁？",
            "那是琼斯夫人。",
            "这些人是谁？",
            "他们是住在隔壁的人。",
            "这个年轻人是谁？",
            "那是罗伯特。",
            "他就是给我这本书的人。",
            "这呢？",
            "那是帮助他的那条狗。"
        ]
    },
    {
        id: "1-124",
        bookId: 1,
        lessonNumber: 124,
        title: "That's the one!",
        englishText: [
            "Which book did you buy?",
            "The one that is on the table.",
            "Which pen did you buy?",
            "The one that is on the desk.",
            "Which dress did you buy?",
            "The one that is in the window.",
            "Which car did you buy?",
            "The one that is in the garage.",
            "Which umbrella did you buy?",
            "The one that is on the chair."
        ],
        chineseText: [
            "你买了哪本书？",
            "桌子上的那本。",
            "你买了哪支钢笔？",
            "书桌上的那支。",
            "你买了哪件连衣裙？",
            "橱窗里的那件。",
            "你买了哪辆车？",
            "车库里的那辆。",
            "你买了哪把伞？",
            "椅子上的那把。"
        ]
    },
    {
        id: "1-125",
        bookId: 1,
        lessonNumber: 125,
        title: "Tea for two",
        englishText: [
            "Do you like coffee, Mrs. Jones?",
            "Yes, I do.",
            "Do you want a cup?",
            "Yes, please, Mrs. Smith.",
            "Do you want any sugar?",
            "Yes, please.",
            "Do you want any milk?",
            "No, thank you.",
            "I don't like milk in my coffee.",
            "I like black coffee."
        ],
        chineseText: [
            "您喜欢咖啡吗，琼斯夫人？",
            "是的，我喜欢。",
            "您想要一杯吗？",
            "好的，谢谢，史密斯夫人。",
            "您要加糖吗？",
            "好的，请加。",
            "您要加牛奶吗？",
            "不，谢谢。",
            "我不喜欢咖啡里加牛奶。",
            "我喜欢黑咖啡。"
        ]
    },
    {
        id: "1-126",
        bookId: 1,
        lessonNumber: 126,
        title: "Have you...?",
        englishText: [
            "Have you finished your work?",
            "Yes, I have.",
            "Have you read this book?",
            "Yes, I have.",
            "Have you met him?",
            "Yes, I have.",
            "Have you been there?",
            "Yes, I have.",
            "Have you written to him?",
            "Yes, I have."
        ],
        chineseText: [
            "你做完工作了吗？",
            "是的，做完了。",
            "你读过这本书了吗？",
            "是的，读过了。",
            "你见过他了吗？",
            "是的，见过了。",
            "你去过那里了吗？",
            "是的，去过了。",
            "你给他写信了吗？",
            "是的，写过了。"
        ]
    },
    {
        id: "1-127",
        bookId: 1,
        lessonNumber: 127,
        title: "A famous actress",
        englishText: [
            "Can you recognize that woman, Millie?",
            "I think I can, Karen.",
            "It must be Karen Marsh, the actress.",
            "I thought so.",
            "Who's that beside her?",
            "That must be Conrad Reeves.",
            "Conrad Reeves, the actor?",
            "It can't be.",
            "Let me have another look.",
            "I think you're right!",
            "Isn't he her third husband?",
            "No, he must be her fourth or fifth.",
            "Doesn't Karen Marsh look old!",
            "She does, doesn't she!",
            "I read she's twenty-nine, but she must be at least forty.",
            "I'm sure she is.",
            "She was a famous actress when I was still at school.",
            "That was a long time ago, wasn't it?",
            "Not that long ago!"
        ],
        chineseText: [
            "你能认出那个女人吗，米莉？",
            "我想我能，卡伦。",
            "那一定是女演员卡伦·马什。",
            "我也这样想。",
            "她旁边那个人是谁？",
            "那一定是康拉德·里夫斯。",
            "康拉德·里夫斯，那个男演员？",
            "不可能是。",
            "让我再看一看。",
            "我想你是对的！",
            "他不是她的第三任丈夫吗？",
            "不，他一定是她的第四任或第五任丈夫。",
            "卡伦·马什看起来真老啊！",
            "是的，确实老了！",
            "我从报上看到她29岁，但她一定至少有40岁了。",
            "我肯定她有40岁了。",
            "当我还在上学时，她就是个著名的女演员了。",
            "那是很久以前的事了，是吗？",
            "没有那么久！"
        ]
    },
    {
        id: "1-128",
        bookId: 1,
        lessonNumber: 128,
        title: "He can't be...",
        englishText: [
            "He can't be a policeman.",
            "He must be a taxi driver.",
            "She can't be a mechanic.",
            "She must be an engineer.",
            "He can't be a student.",
            "He must be a teacher.",
            "She can't be a housewife.",
            "She must be a secretary.",
            "He can't be a doctor.",
            "He must be a dentist."
        ],
        chineseText: [
            "他不可能是警察。",
            "他一定是出租车司机。",
            "她不可能是机械师。",
            "她一定是工程师。",
            "他不可能是学生。",
            "他一定是老师。",
            "她不可能是家庭主妇。",
            "她一定是秘书。",
            "他不可能是医生。",
            "他一定是牙医。"
        ]
    },
    {
        id: "1-129",
        bookId: 1,
        lessonNumber: 129,
        title: "Seventy miles an hour",
        englishText: [
            "Look, that policeman's waving to you.",
            "He wants you to stop.",
            "Where do you think you are?",
            "On a race track?",
            "You must have been driving at seventy miles an hour.",
            "I can't have been.",
            "I was doing eighty when I overtook you.",
            "Didn't you see the speed limit?",
            "I'm afraid I didn't, officer.",
            "I must have been dreaming.",
            "He wasn't dreaming, officer.",
            "I was telling him to drive slowly."
        ],
        chineseText: [
            "看，那个警察在向你招手。",
            "他要你停下来。",
            "你以为你在哪里？",
            "在赛车道上吗？",
            "你一定是以每小时70英里的速度开车。",
            "我不可能开得那么快。",
            "我超车时正以每小时80英里的速度行驶。",
            "你难道没看见限速标志吗？",
            "恐怕我没有看到，警官。",
            "我一定是在做梦。",
            "他不是在做梦，警官。",
            "我刚才正告诉他开慢点。"
        ]
    },
    {
        id: "1-130",
        bookId: 1,
        lessonNumber: 130,
        title: "He may be...",
        englishText: [
            "He may be a doctor.",
            "He may be a dentist.",
            "He may be a student.",
            "He may be a teacher.",
            "She may be a housewife.",
            "She may be a secretary.",
            "They may be mechanics.",
            "They may be engineers."
        ],
        chineseText: [
            "他可能是医生。",
            "他可能是牙医。",
            "他可能是学生。",
            "他可能是老师。",
            "她可能是家庭主妇。",
            "她可能是秘书。",
            "他们可能是机械师。",
            "他们可能是工程师。"
        ]
    },
    {
        id: "1-131",
        bookId: 1,
        lessonNumber: 131,
        title: "Don't be so sure!",
        englishText: [
            "Are you going to spend your holidays abroad this year, Mr. Hill?",
            "We may go abroad.",
            "I'm not sure.",
            "My wife wants to go to Egypt.",
            "I'd like to go there, too.",
            "We can't make up our minds.",
            "Will you travel by sea or by air?",
            "We may travel by sea.",
            "It's cheaper, isn't it?",
            "It may be cheaper, but it takes a long time.",
            "I'm sure you'll enjoy yourselves.",
            "Don't be so sure.",
            "We might not go anywhere!"
        ],
        chineseText: [
            "希尔先生，您今年打算去国外度假吗？",
            "我们可能去国外。",
            "我还不确定。",
            "我妻子想去埃及。",
            "我也想去那里。",
            "我们还拿不定主意。",
            "你们将乘船还是乘飞机去旅行？",
            "我们可能乘船去。",
            "这更便宜，是吗？",
            "可能是便宜些，但花的时间长。",
            "我肯定你们会玩得很愉快。",
            "别那么肯定。",
            "我们可能哪里也去不了！"
        ]
    },
    {
        id: "1-132",
        bookId: 1,
        lessonNumber: 132,
        title: "He might be...",
        englishText: [
            "He might be a doctor.",
            "He might be a dentist.",
            "He might be a student.",
            "He might be a teacher.",
            "She might be a housewife.",
            "She might be a secretary.",
            "They might be mechanics.",
            "They might be engineers."
        ],
        chineseText: [
            "他可能是医生。",
            "他可能是牙医。",
            "他可能是学生。",
            "他可能是老师。",
            "她可能是家庭主妇。",
            "她可能是秘书。",
            "他们可能是机械师。",
            "他们可能是工程师。"
        ]
    },
    {
        id: "1-133",
        bookId: 1,
        lessonNumber: 133,
        title: "Sensational news!",
        englishText: [
            "Listen to this, Sally.",
            "Sensational news!",
            "What is it, Michael?",
            "Have you just heard the news?",
            "No, what's it about?",
            "It's about a football match.",
            "Our team has won the championship!",
            "That's wonderful!",
            "When did it happen?",
            "It happened yesterday.",
            "Who told you?",
            "My brother told me.",
            "He works at the stadium.",
            "That's sensational news!"
        ],
        chineseText: [
            "听这个，萨莉。",
            "爆炸性新闻！",
            "是什么事，迈克尔？",
            "你刚听到消息了吗？",
            "没有，是关于什么的？",
            "是关于一场足球赛的。",
            "我们队赢得了冠军！",
            "太棒了！",
            "什么时候的事？",
            "昨天发生的。",
            "谁告诉你的？",
            "我哥哥告诉我的。",
            "他在体育馆工作。",
            "真是爆炸性新闻！"
        ]
    },
    {
        id: "1-134",
        bookId: 1,
        lessonNumber: 134,
        title: "A walk through the woods",
        englishText: [
            "I went for a walk through the woods yesterday.",
            "What did you see?",
            "I saw a lot of beautiful birds and flowers.",
            "Did you see any animals?",
            "Yes, I did.",
            "I saw a deer and a squirrel.",
            "That's nice.",
            "Did you have a good time?",
            "Yes, I did.",
            "I had a wonderful time."
        ],
        chineseText: [
            "我昨天去树林里散步了。",
            "你看到了什么？",
            "我看到了很多美丽的鸟和花。",
            "你看到动物了吗？",
            "是的，看到了。",
            "我看到了一只鹿和一只松鼠。",
            "真不错。",
            "你玩得开心吗？",
            "是的，很开心。",
            "我玩得非常愉快。"
        ]
    },
    {
        id: "1-135",
        bookId: 1,
        lessonNumber: 135,
        title: "The latest report",
        englishText: [
            "Have you read the latest report about the accident?",
            "No, I haven't.",
            "What does it say?",
            "It says that the driver was driving too fast.",
            "Was anyone hurt?",
            "Fortunately, no one was seriously hurt.",
            "That's lucky.",
            "Yes, it is.",
            "The police are investigating the cause of the accident."
        ],
        chineseText: [
            "你读过关于那次事故的最新报告吗？",
            "没有。",
            "报告怎么说？",
            "报告说司机开得太快了。",
            "有人受伤吗？",
            "幸运的是，没有人受重伤。",
            "那真幸运。",
            "是的。",
            "警方正在调查事故的原因。"
        ]
    },
    {
        id: "1-136",
        bookId: 1,
        lessonNumber: 136,
        title: "A famous actress",
        englishText: [
            "Is that woman really famous?",
            "She must be.",
            "Everyone knows her face.",
            "Do you know her name?",
            "I think her name is Karen Marsh.",
            "That's right.",
            "She's a famous actress.",
            "Is she still working?",
            "I think so.",
            "She was in a film last year."
        ],
        chineseText: [
            "那个女人真的很有名吗？",
            "她一定很有名。",
            "每个人都认识她的脸。",
            "你知道她的名字吗？",
            "我想她叫卡伦·马什。",
            "对的。",
            "她是一位著名的女演员。",
            "她还在工作吗？",
            "我想是的。",
            "她去年还拍过一部电影。"
        ]
    },
    {
        id: "1-137",
        bookId: 1,
        lessonNumber: 137,
        title: "A pleasant dream",
        englishText: [
            "Do you like football, Bill?",
            "Yes, I do.",
            "I like football and I like rugby.",
            "Do you like watching football matches?",
            "Yes, I do.",
            "I watch them every Saturday.",
            "Do you ever go to the stadium?",
            "Yes, I do.",
            "I go every week.",
            "Which team do you support?",
            "I support the local team.",
            "They're very good."
        ],
        chineseText: [
            "比尔，你喜欢足球吗？",
            "是的，我喜欢。",
            "我喜欢足球，也喜欢橄榄球。",
            "你喜欢看足球比赛吗？",
            "是的，我喜欢。",
            "我每个星期六都看。",
            "你去过体育馆吗？",
            "是的，去过。",
            "我每周都去。",
            "你支持哪个队？",
            "我支持本地队。",
            "他们非常棒。"
        ]
    },
    {
        id: "1-138",
        bookId: 1,
        lessonNumber: 138,
        title: "He wants to be...",
        englishText: [
            "What does he want to be?",
            "He wants to be a doctor.",
            "What does she want to be?",
            "She wants to be a nurse.",
            "What does he want to be?",
            "He wants to be a teacher.",
            "What does she want to be?",
            "She wants to be a secretary.",
            "What do they want to be?",
            "They want to be engineers."
        ],
        chineseText: [
            "他想成为什么？",
            "他想成为医生。",
            "她想成为什么？",
            "她想成为护士。",
            "他想成为什么？",
            "他想成为老师。",
            "她想成为什么？",
            "她想成为秘书。",
            "他们想成为什么？",
            "他们想成为工程师。"
        ]
    },
    {
        id: "1-139",
        bookId: 1,
        lessonNumber: 139,
        title: "Is that you, John?",
        englishText: [
            "Is that you, John?",
            "Yes, speaking.",
            "Tell Mary we'll be late for dinner this evening.",
            "I'm afraid I don't understand.",
            "This is Susan speaking.",
            "Who's calling, please?",
            "Susan.",
            "Susan Brooks.",
            "Oh, hello, Susan.",
            "I'm sorry, I didn't recognize your voice.",
            "That's all right."
        ],
        chineseText: [
            "是你吗，约翰？",
            "是的，我是。",
            "告诉玛丽我们今晚晚餐要晚到。",
            "我恐怕没听懂。",
            "我是苏珊。",
            "请问是谁？",
            "苏珊。",
            "苏珊·布鲁克斯。",
            "哦，你好，苏珊。",
            "对不起，我没听出你的声音。",
            "没关系。"
        ]
    },
    {
        id: "1-140",
        bookId: 1,
        lessonNumber: 140,
        title: "He wants her to...",
        englishText: [
            "He wants her to come.",
            "He wants her to stay.",
            "He wants her to go.",
            "He wants her to wait.",
            "He wants her to call.",
            "He wants her to write."
        ],
        chineseText: [
            "他想要她来。",
            "他想要她留下。",
            "他想要她走。",
            "他想要她等。",
            "他想要她打电话。",
            "他想要她写信。"
        ]
    },
    {
        id: "1-141",
        bookId: 1,
        lessonNumber: 141,
        title: "Sally's first train ride",
        englishText: [
            "Last week, my four-year-old daughter, Sally, was invited to a children's party.",
            "I decided to take her by train.",
            "Sally was very excited because she had never traveled on a train before.",
            "She sat near the window and asked a lot of questions.",
            "Suddenly, a middle-aged lady got on the train and sat opposite Sally.",
            "Hello, little girl, she said.",
            "Sally did not answer, but looked at her curiously.",
            "The lady was dressed in a blue coat and a large, funny hat.",
            "After the train had left the station, the lady opened her handbag and took out her powder compact.",
            "She then began to make up her face.",
            "\"Why are you doing that?\" Sally asked.",
            "To make myself beautiful, the lady answered.",
            "She put away her compact and smiled kindly.",
            "But you are still ugly, Sally said."
        ],
        chineseText: [
            "上周，我四岁的女儿萨莉被邀请去参加一个儿童聚会。",
            "我决定带她乘火车去。",
            "萨莉非常兴奋，因为她以前从未乘过火车。",
            "她坐在靠窗的位置，问了很多问题。",
            "突然，一位中年女士上了火车，坐在萨莉对面。",
            "“你好，小姑娘，”她说。",
            "萨莉没有回答，但好奇地看着她。",
            "那位女士穿着一件蓝色外套，戴着一顶大而滑稽的帽子。",
            "火车开出车站后，那位女士打开手提包，拿出了她的粉盒。",
            "然后她开始化妆。",
            "“你为什么要那样做？”萨莉问。",
            "“为了使自己漂亮，”那位女士回答。",
            "她收好粉盒，和蔼地笑了笑。",
            "“可你还是很难看，”萨莉说。"
        ]
    },
    {
        id: "1-142",
        bookId: 1,
        lessonNumber: 142,
        title: "Someone invited Sally to a party",
        englishText: [
            "Someone invited Sally to a party.",
            "Sally was invited to a party.",
            "Someone told me to wait.",
            "I was told to wait.",
            "Someone gave her a present.",
            "She was given a present.",
            "Someone showed me the way.",
            "I was shown the way.",
            "Someone sent him a letter.",
            "He was sent a letter."
        ],
        chineseText: [
            "有人邀请萨莉参加聚会。",
            "萨莉被邀请参加聚会。",
            "有人叫我等。",
            "我被叫等。",
            "有人给了她一份礼物。",
            "她得到了一份礼物。",
            "有人给我指路。",
            "我得到了指路。",
            "有人给他寄了一封信。",
            "他收到了一封信。"
        ]
    },
    {
        id: "1-143",
        bookId: 1,
        lessonNumber: 143,
        title: "A walk through the woods",
        englishText: [
            "I live in a very old town which is surrounded by beautiful woods.",
            "It is a famous beauty spot.",
            "On Sundays, hundreds of people come from the city to see our town and to walk through the woods.",
            "Visitors have been asked to keep the woods clean and tidy.",
            "Litter baskets have been placed under the trees, but people still throw their rubbish everywhere.",
            "Last Wednesday, I went for a walk in the woods.",
            "What I saw made me very sad.",
            "I counted seven old cars and three old refrigerators.",
            "The litter baskets were empty and the ground was covered with pieces of paper, cigarette ends, old tyres, empty bottles and rusty tins.",
            "Among the rubbish, I found a sign which said, 'Anyone who leaves litter in these woods will be prosecuted!'",
            "I will put up more signs and I will have to go out every day to collect the rubbish.",
            "But the visitors will continue to come.",
            "What can I do?"
        ],
        chineseText: [
            "我住在一个被美丽树林环绕的古老城镇里。",
            "这是一个著名的风景胜地。",
            "每逢星期天，成百上千的人从城里来参观我们的城镇，并在树林中散步。",
            "游客们被要求保持树林整洁。",
            "树下已放置了废物筐，但人们仍然到处扔垃圾。",
            "上星期三，我在树林里散步。",
            "我所见到的一切使我非常难过。",
            "我数了一下，有7辆旧汽车和3个旧冰箱。",
            "废物筐是空的，而地上却铺满了纸片、烟头、旧轮胎、空瓶子和生锈的罐头盒。",
            "在垃圾堆中我发现了一块牌子，上面写着：“凡在此树林里丢弃垃圾者，将依法处置！”",
            "我将再树一些告示牌，而且每天都要出去捡垃圾。",
            "但游客们还会继续来。",
            "我该怎么办呢？"
        ]
    },
    {
        id: "1-144",
        bookId: 1,
        lessonNumber: 144,
        title: "He hasn't been served yet",
        englishText: [
            "Has he been served yet?",
            "No, he hasn't been served yet.",
            "Has she been invited yet?",
            "No, she hasn't been invited yet.",
            "Has it been done yet?",
            "No, it hasn't been done yet.",
            "Have they been told yet?",
            "No, they haven't been told yet.",
            "Has the letter been sent yet?",
            "No, it hasn't been sent yet."
        ],
        chineseText: [
            "他得到服务了吗？",
            "不，他还没有得到服务。",
            "她被邀请了吗？",
            "不，她还没有被邀请。",
            "它做完了吗？",
            "不，还没有做完。",
            "他们被告知了吗？",
            "不，他们还没有被告知。",
            "信寄出去了吗？",
            "不，还没有寄出去。"
        ]
    },
    {
        id: "2-1",
        bookId: 2,
        lessonNumber: 1,
        title: "A private conversation",
        englishText: [
            "Last week I went to the theatre.",
            "I had a very good seat.",
            "The play was very interesting.",
            "I did not enjoy it.",
            "A young man and a young woman were sitting behind me.",
            "They were talking loudly.",
            "I got very angry.",
            "I could not hear the actors.",
            "I turned round.",
            "I looked at the man and the woman angrily.",
            "They did not pay any attention.",
            "In the end, I could not bear it.",
            "I turned round again.",
            "I can't hear a word! I said angrily.",
            "It's none of your business, the young man said rudely.",
            "This is a private conversation!"
        ],
        chineseText: [
            "上星期我去看戏。",
            "我的座位很好。",
            "戏很有意思。",
            "但我无法欣赏。",
            "一位青年男子与一位青年女子坐在我的身后。",
            "他们在大声地交谈。",
            "我非常生气。",
            "我听不见演员在说什么。",
            "我回过头去，怒视着那一男一女。",
            "他们却毫不理会。",
            "最后，我忍不住了。",
            "我又一次回过头去。",
            "我一个字也听不见了！我生气地说。",
            "不管你的事，那男的毫不客气地说。",
            "这是私人间的谈话！"
        ]
    },
    {
        id: "2-2",
        bookId: 2,
        lessonNumber: 2,
        title: "Breakfast or lunch?",
        englishText: [
            "It was Sunday.",
            "I never get up early on Sundays.",
            "I sometimes stay in bed until lunchtime.",
            "Last Sunday I got up very late.",
            "I looked out of the window.",
            "It was dark outside.",
            "What a day! I thought.",
            "It's raining again.",
            "Just then, the telephone rang.",
            "It was my aunt Lucy.",
            "I've just arrived by train, she said.",
            "I'm coming to see you.",
            "But I'm still having breakfast, I said.",
            "What are you doing? she asked.",
            "I'm having breakfast, I repeated.",
            "Dear me, she said.",
            "Do you always get up so late?",
            "It's one o'clock!"
        ],
        chineseText: [
            "那是个星期天。",
            "而在星期天我是从来不早起的。",
            "有时我要一直躺到吃午饭的时候。",
            "上个星期天我起得很晚。",
            "我望望窗外。",
            "外面一片昏暗。",
            "鬼天气！我想。",
            "又下雨了。",
            "正在这时，电话铃响了。",
            "是我姑母露西打来的。",
            "我刚下火车，她说。",
            "我这就来看你。",
            "但我还在吃早饭，我说。",
            "你在干什么？她问道。",
            "我正在吃早饭，我又说了一遍。",
            "天哪，她说。",
            "你总是起得这么晚吗？",
            "现在已经1点钟了！"
        ]
    },
    {
        id: "2-3",
        bookId: 2,
        lessonNumber: 3,
        title: "Please send me a card",
        englishText: [
            "Postcards always spoil my holidays.",
            "Last summer, I went to Italy.",
            "I visited museums and sat in public gardens.",
            "A friendly waiter taught me a few words of Italian.",
            "Then he lent me a book.",
            "I read a few lines, but I did not understand a word.",
            "Every day I thought about postcards.",
            "My holidays passed quickly, but I did not send cards to my friends.",
            "On the last day I made a big decision.",
            "I got up early and bought thirty-seven cards.",
            "I spent the whole day in my room, but I did not write a single card!"
        ],
        chineseText: [
            "明信片总搅得我假日不得安宁。",
            "去年夏天，我去了意大利。",
            "我参观了博物馆，还去了公园。",
            "一位好客的服务员教了我几句意大利语。",
            "之后还借给我一本书。",
            "我读了几行，但一个字也不懂。",
            "我每天都想着明信片的事。",
            "假期过得真快，可我还没有给我的朋友们寄过一张明信片。",
            "到了最后一天，我作出了一项重大决定。",
            "我早早起了床，买来了37张明信片。",
            "我在房间里关了整整一天，然而竟连一张明信片也没写成！"
        ]
    },
    {
        id: "2-4",
        bookId: 2,
        lessonNumber: 4,
        title: "An exciting trip",
        englishText: [
            "I have just received a letter from my brother, Tim.",
            "He is in Australia.",
            "He has been there for six months.",
            "Tim is an engineer.",
            "He is working for a big firm and he has already visited a great number of different places in Australia.",
            "He has just bought an Australian car and has gone to Alice Springs, a small town in the centre of Australia.",
            "He will soon visit Darwin.",
            "From there, he will fly to Perth.",
            "My brother has never been abroad before, so he is finding this trip very exciting."
        ],
        chineseText: [
            "我刚刚收到弟弟蒂姆的来信。",
            "他正在澳大利亚。",
            "他在那儿已经住了6个月了。",
            "蒂姆是个工程师。",
            "他正在为一家大公司工作，并且已经去过澳大利亚的不少地方了。",
            "他刚买了一辆澳大利亚小汽车，现在去了澳大利亚中部的小镇艾利斯斯普林斯。",
            "他不久还将到达尔文去。",
            "从那里，他再飞往珀斯。",
            "我弟弟以前从未出过国，因此，他觉得这次旅行非常激动人心。"
        ]
    },
    {
        id: "2-5",
        bookId: 2,
        lessonNumber: 5,
        title: "No wrong numbers",
        englishText: [
            "Mr. James Scott has a garage in Silbury and now he has just bought another garage in Pinhurst.",
            "Pinhurst is only five miles from Silbury, but Mr. Scott cannot get a telephone for his new garage, so he has just bought twelve pigeons.",
            "Yesterday, a pigeon carried the first message from Pinhurst to Silbury.",
            "The bird covered the distance in three minutes.",
            "Up to now, Mr. Scott has sent a great many requests for spare parts and other urgent messages from one garage to the other.",
            "In this way, he has begun his own private telephone service."
        ],
        chineseText: [
            "詹姆斯·斯科特先生在锡尔伯里有一个汽车修理部，现在他刚在平赫斯特买了另一个汽车修理部。",
            "平赫斯特离锡尔伯里只有5英里，但詹姆斯·斯科特先生未能为他新的汽车修理部搞到一部电话机，所以他买了12只鸽子。",
            "昨天，一只鸽子把第一封信从平赫斯特带到锡尔伯里。",
            "这只鸟只用了3分钟就飞完了全程。",
            "到目前为止，斯科特先生从一个汽车修理部向另一个发送了大量索取备件的信件和其他紧急函件。",
            "就这样，他开始了自己的私人电话业务。"
        ]
    },
    {
        id: "2-6",
        bookId: 2,
        lessonNumber: 6,
        title: "Percy Buttons",
        englishText: [
            "I have just moved to a house in Bridge Street.",
            "Yesterday a beggar knocked at my door.",
            "He asked me for a meal and a glass of beer.",
            "In return for this, the beggar stood on his head and sang songs.",
            "I gave him a meal.",
            "He ate the food and drank the beer.",
            "Then he put a piece of cheese in his pocket and went away.",
            "Later a neighbour told me about him.",
            "Everybody knows him.",
            "His name is Percy Buttons.",
            "He calls at every house in the street once a month and always asks for a meal and a glass of beer."
        ],
        chineseText: [
            "我刚刚搬进了大桥街的一所房子。",
            "昨天一个乞丐来敲我的门。",
            "问我要一顿饭和一杯啤酒。",
            "作为回报，那乞丐头顶地倒立起来，嘴里还唱着歌。",
            "我给了他一顿饭。",
            "他把食物吃完，又喝了酒。",
            "然后把一块乳酪装进衣袋里走了。",
            "后来，一位邻居告诉了我他的情况。",
            "大家都认识他。",
            "他叫珀西·巴顿斯。",
            "他每月对这条街上的每户人家光顾一次，总是请求给他一顿饭和一杯啤酒。"
        ]
    },
    {
        id: "2-7",
        bookId: 2,
        lessonNumber: 7,
        title: "Too late",
        englishText: [
            "The plane was late and detectives were waiting at the airport all morning.",
            "They were expecting a valuable parcel of diamonds from South Africa.",
            "A few hours earlier, someone had told the police that thieves would try to steal the diamonds.",
            "When the plane arrived, some of the detectives were waiting inside the main building while others were waiting on the airfield.",
            "Two men took the parcel off the plane and carried it into the Customs House.",
            "While two detectives were keeping guard at the door, two others opened the parcel.",
            "To their surprise, the precious parcel was full of stones and sand!"
        ],
        chineseText: [
            "飞机误点了，侦探们在机场等了整整一个上午。",
            "他们正期待从南非来的一个装着钻石的贵重包裹。",
            "数小时以前，有人向警方报告，说有人企图偷走这些钻石。",
            "当飞机到达时，一些侦探等候在主楼内，另一些侦探则守候在停机坪上。",
            "有两个人把包裹拿下飞机，进了海关。",
            "这时两个侦探把住门口，另外两个侦探打开了包裹。",
            "令他们吃惊的是，那珍贵的包裹里面装的全是石头和沙子！"
        ]
    },
    {
        id: "2-8",
        bookId: 2,
        lessonNumber: 8,
        title: "The best and the worst",
        englishText: [
            "Joe Sanders has the most beautiful garden in our town.",
            "Nearly everybody enters for 'The Nicest Garden Competition' each year, but Joe wins every time.",
            "Bill Frith's garden is larger than Joe's.",
            "Bill works harder than Joe and grows more flowers and vegetables, but Joe's garden is more interesting.",
            "He has made neat paths and has built a wooden bridge over a pool.",
            "I like gardens too, but I do not like hard work.",
            "Every year I enter for the garden competition too, and I always win a little prize for the worst garden in the town!"
        ],
        chineseText: [
            "乔·桑德斯拥有我们镇上最漂亮的花园。",
            "几乎每个人都参加每年举办的最佳花园比赛，而每次都是乔获胜。",
            "比尔·弗里斯的花园比乔的花园大。",
            "比尔比乔也更为勤奋，种植的花卉和蔬菜也更多，但乔的花园更富有情趣。",
            "他修筑了一条条整洁的小路，并在一个池塘上架了一座小木桥。",
            "我也喜欢花园，但我却不愿意辛勤劳动。",
            "每年的花园比赛我也参加，不过我总是因镇上最劣的花园而获得一个小奖！"
        ]
    },
    {
        id: "2-9",
        bookId: 2,
        lessonNumber: 9,
        title: "A cold welcome",
        englishText: [
            "On Wednesday evening, we went to the Town Hall.",
            "It was the last day of the year and a large crowd of people had gathered under the Town Hall clock.",
            "It would strike twelve in twenty minutes' time.",
            "Fifteen minutes passed and then, at five to twelve, the clock stopped.",
            "The big minute hand did not move.",
            "We waited and waited, but nothing happened.",
            "Suddenly someone shouted.",
            "It's two minutes past twelve!",
            "The clock has stopped!",
            "I looked at my watch.",
            "It was true.",
            "The big clock refused to welcome the New Year.",
            "At that moment, everybody began to laugh and sing."
        ],
        chineseText: [
            "星期三的晚上，我们去了市政厅。",
            "那是一年的最后一天，一大群人聚集在市政厅的大钟下面。",
            "再过20分钟，大钟将敲响12下。",
            "15分钟过去了，而就在11点55分时，大钟停了。",
            "那根巨大的分针不动了。",
            "我们等啊等啊，可情况没有变化。",
            "突然有人喊道。",
            "已经是12点零2分了！",
            "那钟已经停了！",
            "我看了看我的手表。",
            "是这么回事。",
            "那座大钟不愿意迎接新年。",
            "此时，大家已经笑了起来，同时唱起了歌。"
        ]
    },
    {
        id: "2-10",
        bookId: 2,
        lessonNumber: 10,
        title: "Not for jazz",
        englishText: [
            "We have an old musical instrument.",
            "It is called a clavichord.",
            "It was made in Germany in 1681.",
            "Our clavichord is kept in the living-room.",
            "It has belonged to our family for a long time.",
            "The instrument was bought by my grandfather many years ago.",
            "Recently it was damaged by a visitor.",
            "She tried to play jazz on it!",
            "She struck the keys too hard and two of the strings were broken.",
            "My father was shocked.",
            "Now we are not allowed to touch it.",
            "It is being repaired by a friend of my father's."
        ],
        chineseText: [
            "我们有一件古老的乐器。",
            "叫击弦古钢琴。",
            "它是1681年德国制造的。",
            "我们这架钢琴放在起居室里。",
            "我们家有这件乐器已经很久了。",
            "是我祖父在很多年以前买的。",
            "可它最近被一个客人碰坏了。",
            "她试图用它来演奏爵士乐！",
            "她在击键时用力过猛，弄坏了两根琴弦。",
            "我父亲大为吃惊。",
            "现在我们不允许碰这件乐器了。",
            "父亲的一个朋友正在修理这件乐器。"
        ]
    },
    {
        id: "2-11",
        bookId: 2,
        lessonNumber: 11,
        title: "One good turn deserves another",
        englishText: [
            "I was having dinner at a restaurant when Harry Steele came in.",
            "Harry worked in a lawyer's office years ago, but he is now working at a bank.",
            "He gets a good salary, but he always borrows money from his friends and never pays it back.",
            "Harry saw me and came and sat at the same table.",
            "He has never borrowed money from me.",
            "While he was eating, I asked him to lend me 2 pounds.",
            "To my surprise, he gave me the money immediately.",
            "I have never borrowed any money from you, Harry said.",
            "So now you can pay for my dinner!"
        ],
        chineseText: [
            "我正在一家饭馆吃饭，托尼·斯提尔走了进来。",
            "托尼曾在一家律师事务所工作，而现在正在一家银行上班。",
            "他的薪水很高，但他却总是向朋友借钱，并且从来不还。",
            "托尼看见了我，就走过来和我坐到一张桌子旁。",
            "他从未向我借过钱。",
            "当他吃饭时，我提出向他借2英镑。",
            "令我惊奇的是，他立刻把钱给了我。",
            "我还从未向你借过钱，托尼说道。",
            "所以现在你可以替我付饭钱了！"
        ]
    },
    {
        id: "2-12",
        bookId: 2,
        lessonNumber: 12,
        title: "Goodbye and good luck",
        englishText: [
            "Our neighbour, Captain Charles Alison, will sail from Portsmouth tomorrow.",
            "We shall meet him at the harbour early in the morning.",
            "He will be in his small boat, Topsail.",
            "Topsail is a famous little boat.",
            "It has sailed across the Atlantic many times.",
            "Captain Alison will set out at eight o'clock, so we shall have plenty of time.",
            "We shall see his boat and then we shall say goodbye to him.",
            "He will be away for two months.",
            "We are very proud of him.",
            "He will take part in an important race across the Atlantic."
        ],
        chineseText: [
            "我们的邻居查尔斯·艾利森船长明天就要从朴次茅斯启航了。",
            "明天一大早我们将在码头为他送行。",
            "他将乘坐他的涛波赛号小艇。",
            "涛波赛号是艘有名的小艇。",
            "它已经多次横渡大西洋。",
            "艾利森船长将于8点钟启航，因此我们有充裕的时间。",
            "我们将参观他的船，然后和他告别。",
            "他要离开两个月。",
            "我们真为他感到自豪。",
            "他将参加一次重大的横渡大西洋的比赛。"
        ]
    },
    {
        id: "2-13",
        bookId: 2,
        lessonNumber: 13,
        title: "The Greenwood Boys",
        englishText: [
            "The Greenwood Boys are a group of popular singers.",
            "At present, they are visiting all parts of the country.",
            "They will be arriving here tomorrow.",
            "They will be coming by train and most of the young people in the town will be meeting them at the station.",
            "Tomorrow evening they will be singing at the Workers' Club.",
            "The Greenwood Boys will be staying for five days.",
            "During this time, they will give five performances.",
            "As usual, the police will have a difficult time.",
            "They will be trying to keep order.",
            "It is always the same on these occasions."
        ],
        chineseText: [
            "绿林少年是一个流行歌曲演唱团。",
            "目前他们正在全国各地巡回演出。",
            "明天他们就要到达此地。",
            "他们将乘火车来，镇上的大部分年轻人将到车站迎接他们。",
            "明晚他们将在工人俱乐部演出。",
            "绿林少年准备在此逗留5天。",
            "在此期间，他们将演出5场。",
            "同往常一样，警察的日子将不好过。",
            "他们将设法维持秩序。",
            "每逢这种场合，情况都是这样。"
        ]
    },
    {
        id: "2-14",
        bookId: 2,
        lessonNumber: 14,
        title: "Do you speak English?",
        englishText: [
            "I had an amusing experience last year.",
            "After I had left a small village in the south of France, I drove on to the next town.",
            "On the way, a young man waved to me.",
            "I stopped and he asked me for a lift.",
            "As soon as he had got into the car, I said good morning to him in French and he replied in the same language.",
            "Apart from a few words, I do not know any French at all.",
            "Neither of us spoke during the journey.",
            "I had nearly reached the town, when the young man suddenly said, very slowly, 'Do you speak English?'",
            "As I soon learnt, he was English himself!"
        ],
        chineseText: [
            "去年我有过一次有趣的经历。",
            "在离开法国南部的一个小村庄后，我继续驶往下一个城镇。",
            "途中，一个青年人向我招手。",
            "我把车停下，他向我提出要求搭车。",
            "他一上车，我就用法语向他问好，他也同样用法语回答我。",
            "除了个别几个单词外，我根本不会法语。",
            "旅途中我们谁也没讲话。",
            "就要到达那个镇时，那青年突然开了口，慢慢地说道：你会讲英语吗？",
            "我很快了解到，他自己就是个英国人！"
        ]
    },
    {
        id: "2-15",
        bookId: 2,
        lessonNumber: 15,
        title: "Good news",
        englishText: [
            "The secretary told me that Mr. Harmsworth would see me.",
            "I felt very nervous when I went into his office.",
            "He did not look up from his desk when I entered.",
            "After I had sat down, he said that business was very bad.",
            "He told me that the firm could not afford to pay such large salaries.",
            "Twenty people had already left.",
            "I knew that my turn had come.",
            "Mr. Harmsworth, I said in a weak voice.",
            "Don't interrupt, he said.",
            "Then he smiled and told me I would receive an extra thousand pounds a year!"
        ],
        chineseText: [
            "秘书告诉我说哈姆斯沃斯先生要见我。",
            "我走进他的办公室，感到非常紧张。",
            "我进去的时候，他连头也没抬。",
            "待我坐下后，他说生意非常不景气。",
            "他还告诉我，公司支付不起这么庞大的工资开支。",
            "有20个人已经离去。",
            "我知道这次该轮到我了。",
            "哈姆斯沃斯先生，我无力地说。",
            "不要打断我的话，他说。",
            "然后他笑了笑，告诉我说我每年将得到额外的1,000英镑收入！"
        ]
    },
    {
        id: "2-16",
        bookId: 2,
        lessonNumber: 16,
        title: "A polite request",
        englishText: [
            "If you park your car in the wrong place, a traffic policeman will soon find it.",
            "You will be very lucky if he lets you go without a ticket.",
            "However, this does not always happen.",
            "Traffic police are sometimes very polite.",
            "During a holiday in Sweden, I found this note on my car: 'Sir, we welcome you to our city. This is a \"No Parking\" area. You will enjoy your stay here if you pay attention to our street signs. This note is only a reminder.'",
            "If you receive a request like this, you cannot fail to obey it!"
        ],
        chineseText: [
            "一旦你把汽车停错了地方，交警很快就会发现。",
            "如果他没给你罚款单就放你走了，算你走运。",
            "然而，情况并不总是这样。",
            "交警有时也很客气。",
            "有一次在瑞典度假，我发现我的车上有这样一个字条：先生，欢迎您光临我们的城市。此处是禁止停车区。如果您对我们街上的标牌稍加注意，您在此会过得很愉快的。谨此提请注意。",
            "如果你收到这样的请求，你是不会不遵照执行的！"
        ]
    },
    {
        id: "2-17",
        bookId: 2,
        lessonNumber: 17,
        title: "Always young",
        englishText: [
            "My aunt Jennifer is an actress.",
            "She must be at least thirty-five years old.",
            "In spite of this, she often appears on the stage as a young girl.",
            "Jennifer will have to take part in a new play soon.",
            "This time, she will be a girl of seventeen.",
            "In the play, she must appear in a bright red dress and long black stockings.",
            "Last year in another play, she had to wear short socks and a bright, orange-coloured dress.",
            "If anyone ever asked her how old she is, she always answers, 'My dear, it must be terrible to be grown up!'"
        ],
        chineseText: [
            "我的姨妈詹尼弗是个女演员。",
            "她至少也有35岁了。",
            "尽管如此，她却常在舞台上扮演小姑娘。",
            "詹尼弗很快又要参加一个新剧的演出。",
            "这一次，她将扮演一个17岁的少女。",
            "演出时她必须穿一条鲜红色的裙子和黑色的长筒袜。",
            "去年在演另一个剧时，她不得不穿短袜和一件鲜艳的橘红色的衣服。",
            "一旦有人问起她有多大年纪，她总是回答：亲爱的，长成大人真可怕啊！"
        ]
    },
    {
        id: "2-18",
        bookId: 2,
        lessonNumber: 18,
        title: "He often does this!",
        englishText: [
            "After I had had lunch at a village inn, I looked for my bag.",
            "I had left it on a chair beside the door and now it wasn't there!",
            "As I was looking for it, the inn-keeper came in.",
            "Did you have a good meal? he asked.",
            "Yes, thank you, I answered, but I can't pay the bill. I haven't got my bag.",
            "The inn-keeper smiled and immediately went out.",
            "In a few minutes he returned with my bag and gave it back to me.",
            "I'm very sorry, he said.",
            "My dog had taken it into the garden.",
            "He often does this!"
        ],
        chineseText: [
            "我在一个乡村小饭馆里吃了午饭，然后找我的提包。",
            "我曾把它放在门边的椅子上，可这会儿不见了！",
            "当我正在找它时，店主走了进来。",
            "您吃得好吗？他问。",
            "很好，谢谢。我回答，但我付不了帐。我的提包没有了。",
            "店主笑了笑，马上走了出去。",
            "几分钟后他拿着我的提包回来了，把它还给了我。",
            "实在抱歉，他说。",
            "我的狗把它弄到花园里去了。",
            "他经常干这种事！"
        ]
    },
    {
        id: "2-19",
        bookId: 2,
        lessonNumber: 19,
        title: "Sold out",
        englishText: [
            "The play may begin at any moment, I said.",
            "It may have begun already, Susan answered.",
            "I hurried to the ticket-office.",
            "May I have two tickets please? I asked.",
            "I'm sorry, we've sold out, the girl said.",
            "What a pity! Susan exclaimed.",
            "Just then, a man hurried to the ticket-office.",
            "Can I return these two tickets? he asked.",
            "Certainly, the girl said.",
            "I went back to the ticket-office at once.",
            "Could I have those two tickets please? I asked.",
            "Certainly, the girl said.",
            "But they are for next Wednesday's performance.",
            "Do you still want them?",
            "I might as well have them, I said sadly."
        ],
        chineseText: [
            "剧马上就要开演了，我说。",
            "也许已经开演了呢，苏珊回答道。",
            "我匆匆赶到售票处。",
            "我可以买两张票吗？我问。",
            "对不起，票已售完，那姑娘说。",
            "真可惜！苏珊大声说。",
            "正在这时，一个男子匆匆奔向售票处。",
            "我可以退掉这两张票吗？他问。",
            "当然可以，那姑娘说。",
            "我马上又回到售票处。",
            "我可以买那两张票吗？我问。",
            "当然可以，那姑娘说。",
            "不过这两张是下星期三演出的票。",
            "您还要吗？",
            "我还是买下的好，我垂头丧气地说。"
        ]
    },
    {
        id: "2-20",
        bookId: 2,
        lessonNumber: 20,
        title: "One man in a boat",
        englishText: [
            "Fishing is my favourite sport.",
            "I often fish for hours without catching anything.",
            "But this does not worry me.",
            "Some fishermen are unlucky.",
            "Instead of catching fish, they catch old boots and rubbish.",
            "I am even less lucky.",
            "I never catch anything-not even old boots.",
            "After having spent whole mornings on the river, I always go home with an empty bag.",
            "You must give up fishing! my friends say.",
            "It's a waste of time.",
            "But they don't realize one important thing.",
            "I'm not really interested in fishing.",
            "I am only interested in sitting in a boat and doing nothing at all!"
        ],
        chineseText: [
            "钓鱼是我最喜欢的运动。",
            "我经常一钓数小时却一无所获。",
            "但我从不为此烦恼。",
            "有些钓鱼的人运气不佳。",
            "他们往往钓不到鱼，却钓到了旧靴子和垃圾。",
            "我就更不走运了。",
            "我啥也钓不到——连旧靴子也钓不到。",
            "在河上待上整整一个上午后，我总是提着空袋子回家。",
            "你得放弃钓鱼！我的朋友们说。",
            "这是浪费时间。",
            "但他们没认识到重要的一点。",
            "我对钓鱼其实并不感兴趣。",
            "我只是喜欢独坐舟中，无所事事而已！"
        ]
    },
    {
        id: "2-21",
        bookId: 2,
        lessonNumber: 21,
        title: "Mad or not?",
        englishText: [
            "Aeroplanes are slowly driving me mad.",
            "I live near an airport and passing planes can be heard night and day.",
            "The airport was built during the war, but for some reason it could not be used then.",
            "Last year, however, it came into use.",
            "Over a hundred people must have been driven away from their homes by the noise.",
            "I am one of the few people left.",
            "Sometimes I think this house will be knocked down by a passing plane.",
            "I have been offered a large sum of money to go away, but I am determined to stay here.",
            "Everybody says I must be mad and they are probably right."
        ],
        chineseText: [
            "飞机正在逐渐把我逼疯了。",
            "我住在一个机场附近，过往飞机日夜不绝于耳。",
            "机场是许多年前建的，但由于某种原因当时未能启用。",
            "然而去年机场开始使用了。",
            "有一百多人肯定是被噪音逼得已经弃家远去。",
            "我是少数留下来的人中的一个。",
            "有时我觉得这房子就要被一架飞过的飞机撞倒。",
            "他们曾向我提供一大笔钱让我搬走，但我决定留在这儿。",
            "大家都说我肯定是疯了，也许他们说的是对的。"
        ]
    },
    {
        id: "2-22",
        bookId: 2,
        lessonNumber: 22,
        title: "A glass envelope",
        englishText: [
            "My daughter, Jane, never dreamed of receiving a letter from a girl of her own age in Holland.",
            "Last year, we were travelling across the Channel and Jane put a piece of paper with her name and address on it into a bottle.",
            "She threw the bottle into the sea.",
            "She never thought of it again, but ten months later, she received a letter from a girl in Holland.",
            "Both girls write to each other regularly now.",
            "However, they have decided to use the post-office.",
            "Letters will cost a little more, but they will certainly travel faster."
        ],
        chineseText: [
            "我的女儿简从未想过会接到荷兰一位同龄姑娘的来信。",
            "去年，当我们横渡英吉利海峡时，简把一张写有她姓名和地址的纸条塞进了一只瓶子里。",
            "她把瓶子抛进了大海。",
            "之后她再也没想过这件事，但10个月后，她收到了荷兰一位姑娘的来信。",
            "现在这两个姑娘定期通信了。",
            "然而，她们还是决定利用邮局。",
            "这样虽然会稍微多花点钱，但肯定是快得多了。"
        ]
    },
    {
        id: "2-23",
        bookId: 2,
        lessonNumber: 23,
        title: "A new house",
        englishText: [
            "I had a letter from my sister yesterday.",
            "She lives in Nigeria.",
            "In her letter, she said that she would come to England next year.",
            "If she comes, she will get a surprise.",
            "We are now living in a beautiful new house in the country.",
            "Work on it had begun before my sister left.",
            "The house was completed five months ago.",
            "In my letter, I told her that she could stay with us.",
            "The house has many large rooms and there is a lovely garden.",
            "It is a very modern house, so it looks strange to some people.",
            "It must be the only modern house in the district."
        ],
        chineseText: [
            "昨天我收到了姐姐的一封信。",
            "她住在尼日利亚。",
            "她在信中说，她明年打算到英国来。",
            "她要是来了，会感到意外的。",
            "我们现在住在乡间一栋漂亮的新住宅里。",
            "这栋房子在我姐姐离开之前就已动工了。",
            "是在5个月以前竣工的。",
            "我在信中告诉她，她可以和我们住在一起。",
            "这栋房子有许多大房间，还有一个美丽的花园。",
            "这是一栋非常现代化的住宅，因此在有些人看来很古怪。",
            "它肯定是这个地区惟一的一栋现代化住宅。"
        ]
    },
    {
        id: "2-24",
        bookId: 2,
        lessonNumber: 24,
        title: "It could be worse",
        englishText: [
            "I entered the hotel manager's office and sat down.",
            "I had just lost £50 and I felt very upset.",
            "I left the money in my room, I said, and it's not there now.",
            "The manager was sympathetic, but he could do nothing.",
            "Everyone's losing money these days, he said.",
            "He started to complain about this wicked world but was interrupted by a knock at the door.",
            "A girl came in and put an envelope on his desk.",
            "It contained £50.",
            "I found this outside this gentleman's room, she said.",
            "Well, I said to the manager, there is still some honesty in this world!"
        ],
        chineseText: [
            "我走进饭店经理的办公室，坐了下来。",
            "我刚刚丢了50英镑，感到非常烦恼。",
            "我把钱放在房间里，我说，可现在没了。",
            "经理深表同情，但无能为力。",
            "现在大家都在丢钱，他说。",
            "他开始抱怨起这个邪恶的世道来，却被一阵敲门声打断了。",
            "一个姑娘走了进来，把一个信封放在了他桌上。",
            "里面装着50英镑。",
            "这是我在这位先生的房门外捡到的，她说。",
            "好吧，我对那位经理说，这世界上还是有诚实可言的！"
        ]
    },
    {
        id: "2-25",
        bookId: 2,
        lessonNumber: 25,
        title: "The English Channel",
        englishText: [
            "Erna Hart is going to swim across the English Channel tomorrow.",
            "She is going to set out from the French coast at five o'clock in the morning.",
            "Erna is only fourteen years old and she hopes to set up a new world record.",
            "She is a strong swimmer and many people feel that she is sure to succeed.",
            "Erna's father will set out with her in a small boat.",
            "Mr. Hart has trained his daughter for years.",
            "Tomorrow he will be watching her anxiously as she swims the long distance to England.",
            "Erna intends to take short rests every two hours.",
            "She will have something to drink but she will not eat any solid food.",
            "Most of Erna's school friends will be waiting for her on the English coast.",
            "Among them will be Erna's mother, who swam the Channel herself when she was a girl."
        ],
        chineseText: [
            "厄纳·哈特打算明天横渡英吉利海峡。",
            "她打算早上5点钟从法国海岸出发。",
            "厄纳只有14岁，她希望创一项新的世界纪录。",
            "她是一个游泳能手，很多人认为她一定能成功。",
            "厄纳的父亲将乘一条小船同她一道出发。",
            "哈特先生训练他的女儿已经多年了。",
            "明天他将焦急地注视着女儿游过这段漫长的距离到达英国。",
            "厄纳计划每两个小时休息一会儿。",
            "她将喝点儿东西，但不吃固体食物。",
            "厄纳的大多数同学将在英国海岸等候她。",
            "他们当中还会有厄纳的母亲，她自己年轻时也曾横渡英吉利海峡。"
        ]
    },
    {
        id: "2-26",
        bookId: 2,
        lessonNumber: 26,
        title: "The best art critics",
        englishText: [
            "I am an art student and I paint a lot of pictures.",
            "Many people pretend that they understand modern art.",
            "They always tell you what a picture is 'about'.",
            "Of course, many pictures are not 'about' anything.",
            "They are just pretty patterns.",
            "We like them in the same way that we like pretty curtain material.",
            "I think that young children often appreciate modern pictures better than anyone else.",
            "They notice more.",
            "My sister is only seven, but she always tells me whether my pictures are good or not.",
            "She came into my room yesterday.",
            "What are you doing? she asked.",
            "I'm hanging this picture on the wall, I answered.",
            "It's a new one. Do you like it?",
            "She looked at it critically for a moment.",
            "It's all right, she said.",
            "But isn't it upside down?",
            "I looked at it again.",
            "She was right! It was!"
        ],
        chineseText: [
            "我是个学艺术的学生，画了很多画。",
            "有很多人装成很懂现代艺术的样子。",
            "总是告诉你一幅画是关于什么的。",
            "当然，有很多画是什么意思也没有的。",
            "它们就是些好看的图案。",
            "我们喜爱它们就像我们喜欢漂亮的窗帘布一样。",
            "我觉得小孩子们往往比任何人都更能欣赏现代绘画。",
            "他们观察到的东西更多。",
            "我的妹妹只有7岁，但她总能说出我的画是好还是坏。",
            "昨天她到我房里来了。",
            "你在干什么呢？她问。",
            "我正把这幅画挂到墙上去，我答道。",
            "这是幅新画。你喜欢吗？",
            "她用挑剔的目光看了一会儿。",
            "还可以吧，她说。",
            "不过，是不是挂倒了？",
            "我又看了看。",
            "她是对的！真是挂倒了！"
        ]
    },
    {
        id: "2-27",
        bookId: 2,
        lessonNumber: 27,
        title: "No parking",
        englishText: [
            "Jasper White is one of those rare people who believe in ancient myths.",
            "He has just bought a new house in the city, but ever since he moved in, he has had trouble with motorists.",
            "When he returns home at night, he always finds that someone has parked a car outside his gate.",
            "Because of this, he has not been able to get his own car into his garage even once.",
            "Jasper has put up 'No Parking' signs outside his gate, but these have not had any effect.",
            "Now he has put an ugly stone head over the gate.",
            "It is one of the ugliest faces I have ever seen.",
            "I asked him what it was and he told me that it was Medusa, the Gorgon.",
            "Jasper hopes that she will turn motorists to stone.",
            "But none of them has been turned to stone yet!"
        ],
        chineseText: [
            "贾斯珀·怀特是那些少有的相信古代神话的人之一。",
            "他刚在城里买了一幢新房子，但自从搬进去后，便和汽车司机们打交道而不胜其烦。",
            "当他夜里回到家时，总是发现有人把汽车停在他的门外。",
            "为此，他甚至一次也没能把自己的车开进车库。",
            "贾斯珀在大门外竖起了几面禁止停车的牌子，但这些都不起作用。",
            "现在他把一个丑陋的石雕头像放在了大门上边。",
            "这是我见过的最丑陋的头像之一。",
            "我问他那是什么，他告诉我那是蛇发女怪美杜莎。",
            "贾斯珀希望她会把汽车司机变成石头。",
            "但到现在为止还没有一个人变成石头呢！"
        ]
    },
    {
        id: "2-28",
        bookId: 2,
        lessonNumber: 28,
        title: "A wet night",
        englishText: [
            "Late in the afternoon, the boys put up their tent in the middle of a field.",
            "As soon as this was done, they cooked a meal over an open fire.",
            "They were all hungry and the food smelled good.",
            "After a wonderful meal, they told stories and sang songs by the campfire.",
            "But some time later it began to rain.",
            "The boys felt tired so they put out the fire and crept into their tent.",
            "Their sleeping bags were warm and comfortable, so they all slept soundly.",
            "In the middle of the night, two boys woke up and began shouting.",
            "The tent was full of water!",
            "They all leapt out of their sleeping bags and hurried outside.",
            "It was raining heavily and they found that a stream had formed in the field.",
            "The stream wound its way across the field and then flowed right under their tent!"
        ],
        chineseText: [
            "傍晚时分，孩子们在田野中央搭起了帐篷。",
            "这件事刚刚做完，他们就在篝火上做起了饭。",
            "他们全都饿了，饭菜散发出阵阵香味。",
            "他们美美地吃了一顿饭后，就围在营火旁讲起了故事，唱起了歌。",
            "但过了一阵，天下起雨来。",
            "孩子们感到累了，所以他们扑灭了火，爬进了帐篷。",
            "他们的睡袋既暖和又舒服，因此都睡得很熟。",
            "午夜前后，有两个孩子醒了，大声叫了起来。",
            "原来帐篷里到处都是水！",
            "他们全都跳出睡袋，跑到外面。",
            "雨下得很大，他们发现地上已经形成了一条小溪。",
            "那小溪弯弯曲曲穿过田野，然后正好从他们的帐篷底下流了过去！"
        ]
    },
    {
        id: "2-29",
        bookId: 2,
        lessonNumber: 29,
        title: "Taxi!",
        englishText: [
            "Captain Ben Fawcett has bought an unusual taxi and has begun a new service.",
            "The 'taxi' is a small Swiss aeroplane called a 'Pilatus Porter'.",
            "This wonderful plane can carry seven passengers.",
            "The most surprising thing about it, however, is that it can land anywhere: on snow, water, or even on a ploughed field.",
            "Captain Fawcett's first passenger was a doctor who flew from Birmingham to a lonely village in the Welsh mountains.",
            "Since then, Captain Fawcett has flown passengers to many unusual places.",
            "Once he landed on the roof of a block of flats and on another occasion, he landed in a deserted car park.",
            "Captain Fawcett has just refused a strange request from a businessman.",
            "The man wanted to fly to Rockall, a lonely island in the Atlantic Ocean, but Captain Fawcett did not take him because the trip was too dangerous."
        ],
        chineseText: [
            "本·弗西特机长买了一辆不同寻常的出租汽车，并开始了一项新的业务。",
            "这辆出租汽车是一架小型瑞士飞机，叫皮勒特斯·波特号。",
            "这架奇妙的飞机可以载7名乘客。",
            "然而，最令人惊奇的是它能够在任何地方降落：雪地上、水面上，甚至刚耕过的田里。",
            "弗西特机长的第一位乘客是一位医生，他从伯明翰飞往威尔士山区一个偏僻的村庄。",
            "从那以后，弗西特机长已载送乘客到过许多不寻常的地方。",
            "一次他把飞机降落在了一栋公寓楼的屋顶上，还有一次，降落在了一个废弃的停车场上。",
            "弗西特机长刚刚拒绝了一位商人的奇怪请求。",
            "这个人想要飞往大西洋上的一个孤岛——罗卡尔岛，但弗西特机长之所以不送他去，是因为那段飞行太危险了。"
        ]
    },
    {
        id: "2-30",
        bookId: 2,
        lessonNumber: 30,
        title: "Football or polo?",
        englishText: [
            "The Wayle is a small river that cuts across the park near my home.",
            "I like sitting by the Wayle on fine afternoons.",
            "It was warm last Sunday, so I went and sat on the river bank as usual.",
            "Some children were playing games on the bank and there were some people rowing on the river.",
            "Suddenly, one of the children kicked a ball very hard and it went towards a passing boat.",
            "Some people on the bank called out to the man in the boat, but he did not hear them.",
            "The ball struck him so hard that he nearly fell into the water.",
            "I turned to look at the children, but there weren't any in sight: they had all run away!",
            "The man laughed when he realized what had happened.",
            "He called out to the children and threw the ball back to the bank."
        ],
        chineseText: [
            "威尔河是一条小河，它穿过我家附近的公园。",
            "我喜欢在晴朗的下午坐在威尔河边上。",
            "上星期日天气很暖和，于是我又和往常一样来到河畔坐下。",
            "有几个孩子在河岸上玩耍，还有几个人在河上划船。",
            "突然，有一个孩子狠狠地踢了一脚球，球便朝着一只驶过的小船飞去。",
            "岸上的一些人对着小船上的人高喊，但他没听见。",
            "球重重地砸在他身上，使他差点儿落入水中。",
            "我转过头去看那些孩子，但一个也不见，他们都跑了！",
            "当那个人明白了是怎么回事后，笑了起来。",
            "他大声叫着那些孩子，把球扔回到岸上。"
        ]
    }
];

let users = JSON.parse(localStorage.getItem('newConceptUsers')) || {};
let currentUser = null;
let currentUserId = localStorage.getItem('newConceptCurrentUser');
let history = [];
let mistakes = [];

function loadUserData() {
    if (currentUserId && users[currentUserId]) {
        currentUser = users[currentUserId];
        history = currentUser.history || [];
        mistakes = currentUser.mistakes || [];
    }
}

function saveUserData() {
    if (currentUserId && currentUser) {
        currentUser.history = history;
        currentUser.mistakes = mistakes;
        users[currentUserId] = currentUser;
        localStorage.setItem('newConceptUsers', JSON.stringify(users));
    }
}

function loginUser(username, password) {
    if (!users[username]) {
        return { success: false, message: '用户不存在' };
    }
    if (users[username].password !== password) {
        return { success: false, message: '密码错误' };
    }
    currentUserId = username;
    localStorage.setItem('newConceptCurrentUser', username);
    loadUserData();
    return { success: true };
}

function registerUser(username, password) {
    if (users[username]) {
        return { success: false, message: '用户名已存在' };
    }
    users[username] = {
        username: username,
        password: password,
        history: [],
        mistakes: []
    };
    localStorage.setItem('newConceptUsers', JSON.stringify(users));
    currentUserId = username;
    localStorage.setItem('newConceptCurrentUser', username);
    loadUserData();
    return { success: true };
}

function logoutUser() {
    currentUserId = null;
    currentUser = null;
    history = [];
    mistakes = [];
    localStorage.removeItem('newConceptCurrentUser');
}

function saveHistory() {
    saveUserData();
}

function addHistoryRecord(record) {
    history.unshift({
        id: Date.now().toString(),
        ...record,
        completedAt: new Date().toISOString()
    });
    saveHistory();
}

function getHistory() {
    return history;
}

function addMistake(mistake) {
    const exists = mistakes.find(m => 
        m.lessonId === mistake.lessonId && 
        m.chinese === mistake.chinese
    );
    if (!exists) {
        mistake.id = Date.now().toString() + '_' + Math.random().toString(36).substr(2, 9);
        mistake.addedAt = new Date().toISOString();
        mistake.successCount = 0;
        mistake.wrongCount = 1;
        mistakes.unshift(mistake);
        saveUserData();
    } else {
        exists.wrongCount = (exists.wrongCount || 1) + 1;
        exists.successCount = 0;
        exists.addedAt = new Date().toISOString();
        exists.userAnswer = mistake.userAnswer;
        saveUserData();
    }
}

function removeMistake(mistakeId) {
    mistakes = mistakes.filter(m => m.id !== mistakeId);
    saveUserData();
}

function getMistakes() {
    return mistakes;
}

function saveMistakes(newMistakes) {
    mistakes = newMistakes;
    saveUserData();
}

loadUserData();
