export function seedDatabase(firebase) {
    const users = [
        {
            userId: 'Dps0lI6BSeXjafPRSVai3duKCpC2',
            userName: 'amandamcodes',
            fullName: 'Amanda Monteiro',
            emailAddress: 'a3monteiro@gmail.com',
            following: ['2'],
            followers: ['2', '3', '4'],
            dateCreated: Date.now()
        },
        {
            userId: '2',
            userName: 'ernie.a',
            fullName: 'Ernie Anders',
            emailAddress: 'earnie@anders.com',
            following: [],
            followers: ['Dps0lI6BSeXjafPRSVai3duKCpC2'],
            dateCreated: Date.now()
        },
        {
            userId: '3',
            userName: 'pricedani',
            fullName: 'Dani Price',
            emailAddress: 'dani@price.com',
            following: [''],
            followers: ['Dps0lI6BSeXjafPRSVai3duKCpC2'],
            dateCreated: Date.now()
        },
        {
            userId: '4',
            userName: 'lisas',
            fullName: 'Lisa Sampson',
            emailAddress: '',
            following: [''],
            followers: ['Dps0lI6BSeXjafPRSVai3duKCpC2'],
            dateCreated: Date.now()
        }
    ];

    for (let k = 0; k < users.length; k++) {
        firebase.firestore().collection('users').add(users[k]);
    }

    for (let i = 1; i <= 5; ++i) {
        firebase
        .firestore()
        .collection('photos')
        .add({
            photoId: i,
            userId: '2',
            imageSrc: `/images/users/raphael/${i}.jpg`,
            caption: 'Saint George and the Dragon',
            likes: [],
            comments: [
                {
                    displayName: 'dali',
                    comment: 'Love this place, looks like my animal farm!'
                },
                {
                    displayName: 'orwell',
                    comment: 'Would you mind if I used this picture?'
                }
            ],
            userLatitude: '40.7128',
            userLongitude: '74.0060',
            dateCreated: Date.now()
        });
    }
}