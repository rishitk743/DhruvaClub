/**
 * ===================================================================
 * DHRUVA CLUB — WEBSITE CONTENT CONFIGURATION
 * ===================================================================
 * 
 * Edit this file to update any text, questions, options, images, WhatsApp links,
 * or club information without touching any HTML/CSS logic.
 *
 * Simply change the values below and commit/push to GitHub.
 * ===================================================================
 */

window.DHRUVA_CONFIG = {
  // Brand & Club Information
  club: {
    name: "Dhruva Club",
    tagline: "An Official Student Club of PVGCOET",
    badge: "Official Assessment 2026",
    logoPath: "assets/logo.png",

    // About Us Content (Displays in the collapsible info bar)
    about: {
      title: "About Dhruva Club",
      shortDescription: "Dhruva Club is a student youth initiative dedicated to holistic personality development, combining physical discipline (PQ), intellectual sharpness (IQ), emotional resilience (EQ), and spiritual wisdom (SQ).",
      mission: "To inspire, mentor, and cultivate grounded leaders equipped with character, competence, and compassion for modern challenges.",
      pillars: [
        {
          title: "Physical Quotient (PQ)",
          desc: "Health, energy, disciplined daily habits, and vitality."
        },
        {
          title: "Emotional Quotient (EQ)",
          desc: "Self-awareness, resilience, empathy, and interpersonal balance."
        },
        {
          title: "Intellectual Quotient (IQ)",
          desc: "Analytical reasoning, clarity of thought, and engineering acumen."
        },
        {
          title: "Spiritual Quotient (SQ)",
          desc: "Values, purpose, inner strength, and value-based living."
        }
      ]
    }
  },




  // WhatsApp Community Links (Redirect target based on verified token)
  whatsappLinks: {
    male: "https://chat.whatsapp.com/KScAduT2RdrFiI0nhAHwim",
    female: "https://chat.whatsapp.com/IqOcPV8pDrODJBVh6HJYFV",
    default: "https://chat.whatsapp.com/YOUR_DEFAULT_COMMUNITY_LINK"
  },

  // Test Structure Configuration
  // Each section represents a step in the multi-step form
  steps: [
    {
      id: "personal_details",
      title: "Student Profile & Registration",
      subtitle: "Please provide your basic details to personalize your assessment evaluation.",
      isPersonalDetails: true,
      fields: [
        {
          name: "fullName",
          label: "Full Name",
          type: "text",
          placeholder: "Enter your full name",
          required: true
        },
        {
          name: "whatsappNumber",
          label: "Phone / WhatsApp Number",
          type: "tel",
          placeholder: "10-digit mobile number (e.g. 9876543210)",
          required: true,
          pattern: "^[0-9]{10}$"
        },
        {
          name: "email",
          label: "Email Address",
          type: "email",
          placeholder: "name@example.com",
          required: true
        },
        {
          name: "gender",
          label: "Gender",
          type: "radio",
          required: true,
          options: ["Male", "Female"]
        },
        {
          name: "homeTown",
          label: "Home Town / Native City",
          type: "text",
          placeholder: "e.g. Pune, Mumbai, Nashik, etc.",
          required: true
        },
        {
          name: "branch",
          label: "Engineering Branch",
          type: "select",
          required: true,
          hasOtherInput: true,
          otherPlaceholder: "e.g. Chemical, Civil, Robotics, Instrumentation, etc.",
          options: [
            "Computer Engineering",
            "Information Technology (IT)",
            "Artificial Intelligence & Data Science (AI & DS)",
            "Electronics & Telecommunication (E&TC)",
            "Mechanical Engineering",
            "Electrical Engineering",
            "Printing and Packaging",
            "Other"
          ]
        },
        {
          name: "year",
          label: "Current Year & Division",
          type: "select",
          required: true,
          hasOtherInput: true,
          otherPlaceholder: "e.g. SE-A, TE-B, BE-C",
          options: [
            "FY - Div A",
            "FY - Div B",
            "FY - Div C",
            "FY - Div D",
            "FY - Div E",
            "FY - Div F",
            "FY - Div G",
            "FY - Div H",
            "FY - Div I",
            "FY - Div J",
            "FY - Div K",
            "FY - Div L",
            "Other"
          ]
        }
      ]
    },
    {
      id: "section_pq",
      dimension: "pq",
      title: "Section 1 — Personality Quotient",
      subtitle: "Choose the option that is closest to how you would normally respond.",
      category: "Personality Quotient (PQ)",
      questions: [
        {
          id: "pq_q1",
          question: "Someone points out your mistake in front of others. You:",
          options: [
            "Accept it and learn from it.",
            "Feel hurt and upset.",
            "Think about it later.",
            "Defend yourself immediately.",
            "Ignore what they say."
          ],
          optionScores: [5, 4, 3.5, 3, 2.5]
        },
        {
          id: "pq_q2",
          question: "You work hard but fail. You:",
          options: [
            "Blame the circumstances.",
            "Learn and try again.",
            "Think about what went wrong.",
            "Move on without thinking much.",
            "Lose motivation."
          ],
          optionScores: [2.5, 5, 4, 3.5, 3]
        },
        {
          id: "pq_q3",
          question: "You have a heated disagreement with someone close. You:",
          options: [
            "Avoid the person afterward.",
            "Say things you may regret.",
            "Listen and explain your point calmly.",
            "Take a break and return later.",
            "Keep arguing."
          ],
          optionScores: [3, 2.5, 5, 4, 3.5]
        },
        {
          id: "pq_q4",
          question: "Someone achieves what you wanted. You:",
          options: [
            "Feel inspired to work harder.",
            "Feel genuinely happy for them.",
            "Look for reasons their success isn't impressive.",
            "Compare yourself with them.",
            "Feel uncomfortable about your own progress."
          ],
          optionScores: [3.5, 3, 2.5, 5, 4]
        },
        {
          id: "pq_q5",
          question: "An important plan suddenly gets cancelled. You:",
          options: [
            "Look for another option.",
            "Feel frustrated.",
            "Blame whoever caused the change.",
            "Accept the change and decide what to do next.",
            "Complain but eventually accept it."
          ],
          optionScores: [4, 3, 2.5, 3.5, 5]
        },
        {
          id: "pq_q6",
          question: "Someone asks for your help when you are busy. You:",
          options: [
            "Help immediately.",
            "Tell them you are too busy.",
            "See if you can help without neglecting your work.",
            "Help only if they will help you later.",
            "Feel irritated."
          ],
          optionScores: [5, 4, 3.5, 3, 2.5]
        },
        {
          id: "pq_q7",
          question: "You receive an angry message. You:",
          options: [
            "Write a reply but wait before sending.",
            "Ignore it.",
            "Ask someone else what to do.",
            "Calm down and respond thoughtfully.",
            "Reply immediately."
          ],
          optionScores: [4, 3, 3.5, 5, 2.5]
        },
        {
          id: "pq_q8",
          question: "You realise that your decision hurt someone. You:",
          options: [
            "Explain why you did it.",
            "Accept your mistake and apologise.",
            "Try to correct the situation first.",
            "Avoid discussing it.",
            "Apologise if they were reasonable."
          ],
          optionScores: [3, 5, 4, 2.5, 3.5]
        },
        {
          id: "pq_q9",
          question: "You are making very slow progress toward an important goal. You:",
          options: [
            "Doubt your ability.",
            "Consider giving up.",
            "Change your approach and continue.",
            "Remember your purpose and keep going.",
            "Continue, but lose motivation sometimes."
          ],
          optionScores: [2.5, 3, 4, 5, 3.5]
        },
        {
          id: "pq_q10",
          question: "Someone behaves rudely toward you for no obvious reason. You:",
          options: [
            "Respond firmly.",
            "Feel upset about it.",
            "Avoid them afterward.",
            "Consider that something may be troubling them.",
            "Ask if something is bothering them."
          ],
          optionScores: [3, 2.5, 3.5, 4, 5]
        }
      ]
    },
    {
      id: "section_iq",
      dimension: "iq",
      title: "Section 2 — Intellectual Quotient",
      subtitle: "Choose the correct answer for each problem.",
      category: "Intellectual Quotient (IQ)",
      questions: [
        {
          id: "iq_q1",
          question: "What comes next in the sequence?\n3, 7, 15, 31, 63, ?",
          options: [
            "95",
            "111",
            "125",
            "127",
            "129"
          ],
          correctAnswer: "127",
          optionScores: [3, 3.5, 4, 5, 2.5]
        },
        {
          id: "iq_q2",
          question: "A product is marked 25% above its cost price and then sold at a 10% discount. What is the profit percentage?",
          options: [
            "10%",
            "12.5%",
            "15%",
            "17.5%",
            "20%"
          ],
          correctAnswer: "12.5%",
          optionScores: [3, 5, 3.5, 4, 2.5]
        },
        {
          id: "iq_q3",
          question: "All doctors are educated. Some educated people are writers. Which statement must be true?",
          options: [
            "Some doctors are writers.",
            "All writers are doctors.",
            "Some writers are doctors.",
            "All doctors are educated.",
            "No doctors are writers."
          ],
          correctAnswer: "All doctors are educated.",
          optionScores: [3.5, 2.5, 4, 5, 3]
        },
        {
          id: "iq_q4",
          question: "A can complete a job in 12 days and B in 18 days. How long will they take together?",
          options: [
            "7.2 days",
            "8 days",
            "9 days",
            "10 days",
            "12 days"
          ],
          correctAnswer: "7.2 days",
          optionScores: [5, 3, 3.5, 2.5, 4]
        },
        {
          id: "iq_q5",
          question: "Find the missing number:\n2, 6, 12, 20, 30, ?",
          options: [
            "36",
            "40",
            "42",
            "44",
            "48"
          ],
          correctAnswer: "42",
          optionScores: [3, 4, 5, 3.5, 2.5]
        },
        {
          id: "iq_q6",
          question: "A father is 3 times as old as his son. In 12 years, he will be twice his son's age. How old is the son now?",
          options: [
            "8",
            "12",
            "14",
            "16",
            "18"
          ],
          correctAnswer: "12",
          optionScores: [3.5, 5, 2.5, 4, 3]
        },
        {
          id: "iq_q7",
          question: "Five people are standing in a line. Ravi is ahead of Amit. Sameer is behind Amit. Neha is ahead of Ravi. Who must be ahead of Sameer?",
          options: [
            "Only Amit",
            "Only Ravi",
            "Both Ravi and Amit",
            "Neha only",
            "Cannot be determined"
          ],
          correctAnswer: "Both Ravi and Amit",
          optionScores: [3, 3.5, 5, 4, 2.5]
        },
        {
          id: "iq_q8",
          question: "A number is first increased by 25% and then decreased by 20%. What is the overall change?",
          options: [
            "5% increase",
            "5% decrease",
            "10% increase",
            "No change",
            "10% decrease"
          ],
          correctAnswer: "No change",
          optionScores: [3.5, 3, 4, 5, 2.5]
        },
        {
          id: "iq_q9",
          question: "If BOOK is coded as CPPL, how is MIND coded?",
          options: [
            "NJOE",
            "NJPE",
            "NHMC",
            "OJPF",
            "NJPD"
          ],
          correctAnswer: "NJOE",
          optionScores: [5, 3, 2.5, 4, 3.5]
        },
        {
          id: "iq_q10",
          question: "A clock gains 5 minutes every hour. If it is set correctly at 8:00 AM, what will it show at 2:00 PM?",
          options: [
            "2:05 PM",
            "2:10 PM",
            "2:15 PM",
            "2:30 PM",
            "3:00 PM"
          ],
          correctAnswer: "2:30 PM",
          optionScores: [3, 3.5, 4, 5, 2.5]
        }
      ]
    },
    {
      id: "section_sq",
      dimension: "sq",
      title: "Section 3 — Spiritual Quotient",
      subtitle: "Choose the option that most closely reflects your understanding or approach.",
      category: "Spiritual Quotient (SQ)",
      questions: [
        {
          id: "sq_q1",
          question: "When something difficult happens unexpectedly, what is the most constructive approach?",
          options: [
            "Look at what the situation can teach me.",
            "Accept that some things are simply beyond my control.",
            "Focus on getting through it as quickly as possible.",
            "Look for someone or something to blame.",
            "Assume that life is generally unfair."
          ],
          optionScores: [5, 4, 3.5, 3, 2.5]
        },
        {
          id: "sq_q2",
          question: "Two people perform the same action, but with very different intentions. What matters more?",
          options: [
            "The action itself.",
            "Both the action and the intention behind it.",
            "The result that follows.",
            "Whether other people approve of it.",
            "Whether the person benefits from it."
          ],
          optionScores: [2.5, 5, 4, 3.5, 3]
        },
        {
          id: "sq_q3",
          question: "A person repeatedly gets opportunities that another person does not. How would you understand this?",
          options: [
            "Life is simply unequal.",
            "Everything depends on luck.",
            "Circumstances may be influenced by causes beyond what we currently see.",
            "People always get exactly what they deserve.",
            "Opportunities have little connection with past actions."
          ],
          optionScores: [3, 2.5, 5, 4, 3.5]
        },
        {
          id: "sq_q4",
          question: "Someone hurts you deeply but later sincerely regrets it. What is the wiser response?",
          options: [
            "Forgive immediately and forget everything.",
            "Continue holding the hurt so that you don't get hurt again.",
            "Make sure they experience the same pain.",
            "Forgive while still learning from what happened and maintaining appropriate boundaries.",
            "Completely remove the person from your life regardless of their change."
          ],
          optionScores: [3.5, 3, 2.5, 5, 4]
        },
        {
          id: "sq_q5",
          question: "Which statement comes closest to your understanding of happiness?",
          options: [
            "Happiness mainly comes from achieving what I want.",
            "Happiness depends largely on favourable circumstances.",
            "Happiness comes from having fewer problems.",
            "Happiness is mainly about having good relationships.",
            "Lasting happiness depends more on inner understanding than on external circumstances."
          ],
          optionScores: [4, 3.5, 3, 2.5, 5]
        },
        {
          id: "sq_q6",
          question: "If a person keeps repeating the same harmful behaviour despite knowing its consequences, what is most likely missing?",
          options: [
            "Better circumstances.",
            "Greater self-awareness and inner discipline.",
            "More appreciation from others.",
            "Better luck.",
            "More material success."
          ],
          optionScores: [2.5, 5, 4, 3.5, 3]
        },
        {
          id: "sq_q7",
          question: "What does genuine personal growth most often involve?",
          options: [
            "Understanding myself more deeply and changing my patterns.",
            "Becoming successful and respected.",
            "Avoiding difficult situations.",
            "Getting more control over other people and circumstances.",
            "Proving that my beliefs are correct."
          ],
          optionScores: [5, 4, 3.5, 3, 2.5]
        },
        {
          id: "sq_q8",
          question: "If our body, roles and circumstances keep changing throughout life, what might this suggest?",
          options: [
            "Nothing meaningful can be concluded from change.",
            "Our identity is completely determined by our circumstances.",
            "We should avoid thinking about such questions.",
            "There may be a deeper aspect of identity beyond our changing roles and circumstances.",
            "Our identity is simply whatever we currently feel it is."
          ],
          optionScores: [3.5, 3, 2.5, 5, 4]
        },
        {
          id: "sq_q9",
          question: "If a person believes that life continues beyond one lifetime, what would that view most strongly encourage?",
          options: [
            "Focusing mainly on the present life.",
            "Trying to enjoy life as much as possible.",
            "Avoiding all worldly responsibilities.",
            "Believing that present actions have little importance.",
            "Taking greater responsibility for one's actions and their longer-term consequences."
          ],
          optionScores: [4, 3, 3.5, 2.5, 5]
        },
        {
          id: "sq_q10",
          question: "A person achieves almost everything they wanted, yet still feels empty. What might this indicate?",
          options: [
            "They simply need more achievements.",
            "They need more recognition from others.",
            "External success alone may not satisfy deeper needs.",
            "They have chosen the wrong career.",
            "They should avoid having ambitions altogether."
          ],
          optionScores: [3, 2.5, 5, 4, 3.5]
        }
      ]
    },
    {
      id: "community_joining",
      title: "Official WhatsApp Community Joining",
      subtitle: "Join the official Dhruva Club student community to receive mentor guidance, workshop updates, and exclusive resources.",
      category: "Community Joining",
      isCommunityJoining: true,
      cardTitle: "Dhruva Club Official Student Community",
      cardDescription: "Be a part of an empowering community of students committed to character, competence, and holistic growth.",
      buttonLabel: "Join Official WhatsApp Group",
      choices: [
        {
          id: "joined",
          label: "Yes, I have joined",
          desc: "I have clicked the button above and joined the official WhatsApp group."
        },
        {
          id: "join_later",
          label: "I will join later on",
          desc: "I will join the community group later using the link on my results dashboard."
        }
      ],
      consentText: "I confirm my selection above and agree to proceed to my assessment score evaluation."
    }
  ],

  // Result Page Configuration
  resultPage: {
    title: "Assessment Successfully Submitted!",
    badge: "Evaluation Complete",
    greeting: "Here is your personalized PQ-IQ-SQ holistic score analysis.",
    instruction: "Join your official student community group below to receive mentor guidance and workshop updates:",
    buttonText: "Join WhatsApp Community",
    fallbackNotice: "If the button above does not open directly, please contact the Dhruva Club coordinators.",
    followSteps: [
      {
        icon: "💬",
        title: "Join Community",
        desc: "Connect with like-minded peers and experienced mentors."
      },
      {
        icon: "🌟",
        title: "Exclusive Workshops",
        desc: "Access upcoming leadership, aptitude, and wisdom sessions."
      }
    ],
    // Combined CTA based on overall average score
    ctaTiers: [
      {
        min: 90, max: 100,
        heading: "Realise Your Potential",
        body: "You have a strong combination of qualities and potential. Join the Dhruva WhatsApp Community to channel your strengths, contribute your ideas and turn your potential into meaningful impact.",
        buttonText: "Realise My Potential"
      },
      {
        min: 80, max: 89,
        heading: "Channel Your Potential",
        body: "You have strong qualities to build upon. Join the Dhruva WhatsApp Community to channel your potential, explore opportunities and turn your strengths into meaningful action.",
        buttonText: "Channel My Potential"
      },
      {
        min: 70, max: 79,
        heading: "Take Your Growth Further",
        body: "In Dhruva Club we work on bringing out the best in you. We conduct different personality development, technical and spiritual programs. You will be updated about these in the community.",
        buttonText: "Take the Next Step"
      },
      {
        min: 60, max: 69,
        heading: "There's More to Build",
        body: "You already have a foundation to build on. Join the Dhruva WhatsApp Community to develop your strengths, discover new perspectives and keep moving forward.",
        buttonText: "Keep Growing"
      },
      {
        min: 50, max: 59,
        heading: "Your Next Step Starts Here",
        body: "Everyone has areas they can strengthen. Join the Dhruva WhatsApp Community to learn, grow and take meaningful steps toward becoming your best self.",
        buttonText: "Start Your Growth"
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────────
  // SCORE INSIGHTS — Full Word-doc content, 5 tiers per dimension
  // Each tier: intro + 8 bullet points (5 strengths + 3 constructive)
  // ─────────────────────────────────────────────────────────────────
  scoreInsights: {
    pq: {
      name: "Personality Quotient",
      shortName: "PQ",
      tag: "Character, Resilience & Communication",
      icon: "⚡",
      color: "#1A50BF",
      tiers: [
        {
          min: 90, max: 100,
          label: "Leading with Purpose",
          intro: "Your responses show consistently constructive patterns across different situations. You demonstrate strong self-awareness, resilience and empathy.",
          bullets: [
            "You understand your own responses and learn from experience.",
            "You remain resilient when facing setbacks.",
            "You approach difficult conversations thoughtfully.",
            "You show empathy toward people around you.",
            "You stay focused on meaningful goals.",
            "It would be valuable to continue seeking honest feedback to refine your strengths.",
            "You could use your strengths to support and mentor others.",
            "It would be beneficial to keep challenging yourself with new experiences."
          ]
        },
        {
          min: 80, max: 89,
          label: "Strong Personal Presence",
          intro: "Your responses show strong self-awareness, resilience and emotional control. The points below highlight the qualities you already demonstrate and ways to channel them further.",
          bullets: [
            "You think carefully before reacting to difficult situations.",
            "You treat setbacks as opportunities to learn.",
            "You stay focused when working toward important goals.",
            "You consider different perspectives and feelings.",
            "You adapt well to changing circumstances.",
            "It would be valuable to challenge yourself outside your comfort zone.",
            "You could continue developing your ability to support and influence others.",
            "It would be helpful to remain open to feedback even when you feel confident."
          ]
        },
        {
          min: 70, max: 79,
          label: "Finding Your Balance",
          intro: "Your responses show a strong set of constructive personality qualities. The points below highlight what is working well and a few ways you could continue developing.",
          bullets: [
            "You learn from setbacks instead of letting them hold you back.",
            "You try to handle disagreements thoughtfully.",
            "You adapt well when plans change.",
            "You consider the feelings and needs of others.",
            "You remain committed to meaningful goals.",
            "It would be helpful to stay calm and consistent when under pressure.",
            "You could continue building confidence in your own journey.",
            "It would be beneficial to take more initiative when opportunities arise."
          ]
        },
        {
          min: 60, max: 69,
          label: "Growing with Awareness",
          intro: "Your responses show that you have developed several positive qualities and are moving in a positive direction. The points below give a quick view of your current strengths and areas where further growth could help.",
          bullets: [
            "You are willing to learn from your mistakes.",
            "You can consider different perspectives during difficult situations.",
            "You show flexibility when circumstances change.",
            "You care about how your actions affect others.",
            "You can stay committed to important goals.",
            "It would help you to focus more on your own progress than on comparisons.",
            "You could benefit from becoming more consistent in managing difficult emotions.",
            "It would be helpful to turn your reflections into clear actions."
          ]
        },
        {
          min: 50, max: 59,
          label: "Building Your Foundation",
          intro: "Your responses show that you are developing qualities such as resilience, confidence and adaptability. The points below highlight your current strengths and a few areas that could support your growth.",
          bullets: [
            "You are willing to help others when they need support.",
            "You can reflect on your experiences and learn from them.",
            "You recognise when situations affect you emotionally.",
            "You continue working toward your goals despite difficulties.",
            "You can adapt when plans change unexpectedly.",
            "It would help you to view criticism as an opportunity to learn.",
            "It would be helpful to stay motivated even after setbacks.",
            "You could benefit from pausing before reacting in stressful situations."
          ]
        }
      ]
    },
    iq: {
      name: "Intellectual Quotient",
      shortName: "IQ",
      tag: "Logic, Aptitude & Critical Thinking",
      icon: "💡",
      color: "#0A1628",
      tiers: [
        {
          min: 90, max: 100,
          label: "Exceptional Reasoning",
          intro: "Your responses demonstrate highly developed analytical and problem-solving abilities. The points below highlight your strengths and ways to keep stretching your thinking.",
          bullets: [
            "You identify underlying structures quickly.",
            "You approach unfamiliar problems with flexible reasoning.",
            "You combine different pieces of information effectively.",
            "You can distinguish relevant information from distractions.",
            "You look beyond the obvious approach when solving problems.",
            "It would be valuable to keep exploring challenging problems without predefined methods.",
            "You could apply your reasoning to more creative and real-world challenges.",
            "It would be helpful to develop solutions that others can easily understand and use."
          ]
        },
        {
          min: 80, max: 89,
          label: "Advanced Thinker",
          intro: "Your responses show strong analytical ability across different types of problems. The points below highlight your reasoning strengths and ways to apply them more broadly.",
          bullets: [
            "You recognise underlying patterns rather than just surface similarities.",
            "You break complex problems into manageable parts.",
            "You connect different concepts to reach solutions.",
            "You adapt your reasoning when a straightforward approach fails.",
            "You can make logical decisions using limited information.",
            "It would be valuable to explore problems with multiple valid approaches.",
            "You could apply your reasoning more often to real-world and open-ended situations.",
            "It would be helpful to develop clearer ways of communicating complex ideas."
          ]
        },
        {
          min: 70, max: 79,
          label: "Thinking in Action",
          intro: "Your responses demonstrate solid reasoning skills and an ability to approach problems independently. The points below highlight your current strengths and ways to sharpen them further.",
          bullets: [
            "You can identify patterns beyond obvious sequences.",
            "You connect multiple pieces of information effectively.",
            "You can apply concepts to reach practical solutions.",
            "You approach problems with reasonable confidence.",
            "You can adjust your approach when the first method does not work.",
            "It would be valuable to challenge yourself with problems requiring deeper analysis.",
            "You could continue improving your speed without compromising accuracy.",
            "It would be helpful to practise explaining the reasoning behind your answers."
          ]
        },
        {
          min: 60, max: 69,
          label: "Sharpening Your Edge",
          intro: "Your responses show a workable foundation in reasoning and problem-solving. The points below highlight what you can already do and where additional practice could make you more consistent.",
          bullets: [
            "You can connect information to reach a logical conclusion.",
            "You understand common mathematical relationships.",
            "You can follow multi-step reasoning when the path is clear.",
            "You show developing accuracy in analytical questions.",
            "You are capable of learning new problem-solving approaches.",
            "It would help you to handle questions that allow multiple approaches.",
            "You could benefit from improving accuracy while solving quickly.",
            "It would be helpful to practise applying concepts rather than simply remembering methods."
          ]
        },
        {
          min: 50, max: 59,
          label: "Building Your Thinking",
          intro: "Your responses suggest that your basic reasoning skills are still developing. The points below highlight your current abilities and a few ways regular practice could strengthen them.",
          bullets: [
            "You can solve questions when the underlying method is clear.",
            "You show basic understanding of numerical relationships.",
            "You can recognise some straightforward patterns.",
            "You are able to work with structured information.",
            "You have a foundation that can improve through practice.",
            "It would help you to strengthen your fundamentals in mathematics and logical reasoning.",
            "You could benefit from practising unfamiliar problems rather than relying only on familiar patterns.",
            "It would be helpful to slow down and verify your reasoning before answering."
          ]
        }
      ]
    },
    sq: {
      name: "Spiritual Quotient",
      shortName: "SQ",
      tag: "Inner Resilience, Ethics & Purpose",
      icon: "🌿",
      color: "#B8960A",
      tiers: [
        {
          min: 90, max: 100,
          label: "A Deeper Sense of Purpose",
          intro: "Your responses show a deep and consistent approach to questions of purpose, responsibility and personal growth. The points below highlight this perspective and ways to keep deepening it.",
          bullets: [
            "You naturally look for deeper lessons in difficult experiences.",
            "You distinguish external actions from the intentions behind them.",
            "You take a long-term view of responsibility and consequences.",
            "You see personal growth as an ongoing process of inner change.",
            "You understand that fulfilment cannot depend entirely on external success.",
            "It would be valuable to continue deepening your perspective through experience and reflection.",
            "You could remain open when others present perspectives different from your own.",
            "It would be meaningful to turn your understanding into actions that positively affect others."
          ]
        },
        {
          min: 80, max: 89,
          label: "Deepening Your Perspective",
          intro: "Your responses indicate a mature approach to self-awareness, responsibility and meaning. The points below highlight this perspective and ways to carry it further.",
          bullets: [
            "You look at challenges as opportunities for deeper learning.",
            "You consider motives rather than judging actions alone.",
            "You recognise your responsibility for the consequences of your choices.",
            "You understand that lasting fulfilment involves more than achievement.",
            "You can maintain perspective when circumstances are difficult.",
            "It would be valuable to continue questioning perspectives you may take for granted.",
            "You could bring your deeper understanding more consistently into everyday decisions.",
            "It would be helpful to use your perspective to build stronger relationships."
          ]
        },
        {
          min: 70, max: 79,
          label: "Growing in Awareness",
          intro: "Your responses show that you think beyond immediate results and consider deeper meaning. The points below highlight your perspective and ways to continue developing it.",
          bullets: [
            "You consider both intention and action when judging situations.",
            "You understand that difficult experiences can lead to growth.",
            "You recognise the importance of taking responsibility for your choices.",
            "You understand that personal growth requires changing patterns.",
            "You can distinguish external achievement from deeper fulfilment.",
            "It would help you to examine your own assumptions more carefully.",
            "You could practise applying your values consistently during difficult situations.",
            "It would be beneficial to create space for deeper reflection before important choices."
          ]
        },
        {
          min: 60, max: 69,
          label: "Exploring Deeper Perspectives",
          intro: "Your responses show a growing awareness of the connection between your choices, experiences and personal growth. The points below offer a quick view of this perspective and ways to deepen it.",
          bullets: [
            "You recognise that experiences can teach valuable lessons.",
            "You understand that intentions influence the value of actions.",
            "You recognise that choices have consequences.",
            "You can see that external success does not guarantee fulfilment.",
            "You are becoming more aware of your inner motivations.",
            "It would be valuable to become more curious about the reasons behind your thoughts and actions.",
            "You could practise accepting situations without immediately judging them.",
            "It would be helpful to develop a clearer understanding of the values that guide you."
          ]
        },
        {
          min: 50, max: 59,
          label: "Beginning the Journey Within",
          intro: "Your responses suggest that you are beginning to explore questions about meaning, responsibility and personal growth. The points below highlight your current perspective and areas where reflection could help.",
          bullets: [
            "You are open to thinking about difficult experiences.",
            "You recognise that situations can affect people differently.",
            "You show some awareness of personal responsibility.",
            "You are willing to consider questions beyond immediate circumstances.",
            "You have an opportunity to develop greater self-awareness.",
            "It would help you to reflect more on why you respond to situations differently.",
            "You could benefit from looking beyond immediate emotions during difficulties.",
            "It would be helpful to explore what gives your actions meaning and direction."
          ]
        }
      ]
    }
  }
};

// Keep the assessment concise while preserving the configured question order.
window.DHRUVA_CONFIG.steps
  .filter(step => ["pq", "iq", "sq"].includes(step.dimension))
  .forEach(step => {
    step.questions = step.questions.slice(0, 5);
  });
