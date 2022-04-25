import Button from '@/components/buttons/Button';
import Layout from '@/components/layout/Layout';
import NextImage from '@/components/NextImage';
import Seo from '@/components/Seo';

const ITEMS = [
  { id: 1, name: 'Brown Brim', price: 25, imageName: 'brown-brim.jpg' },
  { id: 2, name: 'Snapback', price: 50, imageName: 'snapback.jpg' },
];

export default function DemoPage() {
  return (
    <Layout>
      <Seo />
      <main className='layout'>
        <div className='min-h-main flex flex-col items-center justify-center'>
          <h1>Welcome to face payment demo</h1>
          <p>
            During this demonstration, you will see how to do face payment using
            your e-wallet account
          </p>
          <Button>Start face payment demo</Button>
        </div>
        <div>
          <h1 className='text-center'>Suppose you are shopping for a hat</h1>

          <div className='flex flex-row justify-center space-x-8'>
            {ITEMS.map((item) => (
              <div
                key={item.id}
                className='flex min-h-[200px] w-1/2 max-w-[300px] flex-col rounded border-2 sm:min-h-[300px]'
              >
                <NextImage
                  src={`/images/${item.imageName}`}
                  className='relative w-full'
                  layout='responsive'
                  width={346}
                  height={326}
                />
                <div className='flex flex-col p-2'>
                  <div className='mb-8 flex justify-between'>
                    <h4>{item.name}</h4>
                    <h4>${item.price}</h4>
                  </div>
                  <Button variant='secondary'>Buy Now</Button>
                </div>
              </div>
            ))}
          </div>
          <div></div>
        </div>
      </main>
    </Layout>
  );
}
