// This is a reference document for our purposes only
// We can refer to this document to remind us of how the schema shoud look like

let db = {
    users: [
        {
            userId: 'asdahsd23sjasdio3',
            email: 'test1@email.com',
            username: 'test1',
            createdAt: '2019-03-15T10:55:23.777Z',
            imageUrl: 'some/photo/url',
            bio: 'whatup i am test1',
            website: 'https://test1.com',
            location: 'Toronto, CA'            
        }
    ],
    posts: [
        {
            username: 'user1',
            body: 'this is the post body',
            createdAt: '2019-08-12T22:43:33.114Z',
            likeCount: 5,
            commentCount: 3
        }
    ],
    comments: [
        {
            username: 'user1',
            postId: '1sdjiodjoknvk31',
            body: 'check out this comment bruh',
            createdAt: '2019-03-15T10:55:23.777Z'
        }
    ]
}

let userDetails = {
    // Redux Data
    credentials: {
        userId: '123n1dkondo1kndw1okomd1',
        email: 'test1@email.com',
        username: 'test1',
        createdAt: '2019-03-15T10:55:23.777Z',
        imageUrl: 'some/photo/url',
        bio: 'whatup i am test1',
        website: 'https://test1.com',
        location: 'Toronto, CA'
    },
    likes: [
        {
            username: 'user1',
            postId: 'h1ij1o2j3ooknond'
        },
        {
            username: 'user2',
            postId: 'kjskocks1okn3123'
        }
    ]
}