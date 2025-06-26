const background = [
    {
        eduCards: [
            {
                id: 0,
                title: 'PSG Arthur Prince',
                degree: 'Diploma in Computer Engineering',
                detail: "Diploma in Computer Engineering from PSG Polytechnic College Coimbatore.",
                year: '2022-2024'
            },
            {
                id: 1,
                title: 'Prince Second Degree ',
                degree: 'B-Tech IT, KEC from Erode',
                detail: "Currently Pursuing B-Tech IT in Kongu Engineering College from Erode.",
                year: '2024-2027'
            },
        ]
    }
]


export default function handler(req, res) {
    res.status(200).json(background)
}
