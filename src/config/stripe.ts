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
        name: 'Premium',
        slug: 'premium',
        quota: 50,
        pagePerPdf: 25,
        price: {
            amount: 5000,
            priceIds: {
                test: 'price_1Oq3kGB4jpAyzhC8V60QuRDX',
                production: 'price_1Oq3kGB4jpAyzhC8V60QuRDX',
            }
        }
    }
]