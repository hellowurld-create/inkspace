export const PLANS = [
    {
        name: 'Free',
        slug: 'free',
        quota: 10,
        pagePerPdf: 5,
        price: {
            amount: 0,
            priceIds: {
                test: '',
                production: '',
            }
        }
    },
      {
        name: 'Pro',
        slug: 'pro',
        quota: 50,
        pagePerPdf: 25,
        price: {
            amount: 5000,
            priceIds: {
                test: 'price_1OzqaOF49jWzWhCv8fRhwvpi',
                production: 'price_1OzqaOF49jWzWhCv8fRhwvpi',
            }
        }
    }
]